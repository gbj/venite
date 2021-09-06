import {
  dateFromYMDString,
  HolyDay,
  Liturgy,
  LiturgicalDay,
  LiturgicalDocument,
  LiturgicalWeek,
  addOneDay,
  dateToYMD,
  liturgicalWeek,
  liturgicalDay,
  transferredFeast,
  dateFromYMD,
} from "https://cdn.skypack.dev/@venite/ldf@^0.21.0?dts";

type Kalendar = {
  weeks: LiturgicalWeek[];
  feasts: HolyDay[];
  specials: HolyDay[];
};

export class CalendarServiceController {
  async findDay(ymd: string, kalendar: string): Promise<LiturgicalDay> {
    const date = this.dateFromYMDString(ymd),
      week = await this.findWeek(date),
      day = await this.buildDay(date, kalendar, week);
    return day;
  }

  async buildDay(
    date: Date,
    kalendar: string,
    week: LiturgicalWeek,
    liturgy?: Liturgy | LiturgicalDocument,
    vigil = false
  ) {
    // build the liturgical day
    console.log("date = ", date);
    const initialDay = liturgicalDay(
        vigil ? addOneDay(date) : date,
        kalendar,
        (liturgy as any)?.metadata?.evening || false,
        week
      ),
      day = vigil
        ? new LiturgicalDay({ ...initialDay, date: dateToYMD(date) })
        : initialDay;

    return await this.addHolyDays(day, vigil);
  }

  dateFromYMDString(ymd: string): Date {
    return dateFromYMDString(ymd);
  }

  // Used as an async getter for calendars — ensures each one is only fetched once
  private kalendars: Record<string, Promise<Kalendar>> = {};
  private kalendar(kalendar: string): Promise<Kalendar> {
    if (!this.kalendars[kalendar]) {
      this.kalendars[kalendar] = this.loadKalendar(kalendar);
    }
    return this.kalendars[kalendar];
  }

  private async loadKalendar(kalendar: string): Promise<Kalendar> {
    // in Deno runtime
    if (typeof Deno !== "undefined") {
      const json = await Deno.readTextFile(
        `./src/assets/calendar/${kalendar}.json`
      );
      return JSON.parse(json);
    }
    // in browser
    else {
      const resp = await fetch(`/assets/calendar/${kalendar}.json`),
        json = await resp.json();
      return json;
    }
  }

  // Finds the week in the BCP 1979 calendar
  async findWeek(date: Date, vigil = false): Promise<LiturgicalWeek> {
    const k = await this.kalendar("bcp1979"),
      query = liturgicalWeek(vigil ? addOneDay(date) : date),
      week = k.weeks.find(
        (week: any) => week.cycle == query.cycle && week.week == query.week
      ),
      weekWithProper = query.proper
        ? new LiturgicalWeek({
            ...week,
            proper: query.proper,
            propers: `proper-${query.proper}`,
          })
        : week;
    return weekWithProper;
  }

  // Adds holy days
  /** Find `HolyDay`s connected to either a date or a slug */
  async addHolyDays(
    day: LiturgicalDay,
    vigil: boolean
  ): Promise<LiturgicalDay> {
    // generate query from the `LiturgicalDay`
    const kalendar = (day as any)?.kalendar || "bcp1979",
      [y, m, d] = (day as any).date.split("-"),
      date = dateFromYMD(y, m, d),
      isSunday = date.getDay() === 0,
      observedDate = vigil ? addOneDay(date) : date,
      observedM = observedDate.getMonth() + 1,
      observedD = observedDate.getDate(),
      feasts = await this.findFeastDays(kalendar, `${observedM}/${observedD}`),
      specials = await this.findSpecialDays(kalendar, (day as any).slug);

    // Thanksgiving Day
    const isNovember = date.getMonth() === 10, // January is 0, Feb 1, etc., so Sept is 8
      isThursday = date.getDay() === 4, // Sunday is 0, Monday is 1
      nthWeekOfMonth = Math.ceil(date.getDate() / 7),
      thanksgiving =
        isNovember && isThursday && nthWeekOfMonth === 4
          ? await this.findSpecialDays(kalendar, "thanksgiving-day")
          : [],
      // Transferred feasts
      transferred: HolyDay | null = await transferredFeast(
        async (dfd: Date) => {
          const week = await this.findWeek(dfd);
          return liturgicalDay(dfd, kalendar, false, week);
        },
        async (slug: string) => {
          const days = await this.findSpecialDays(kalendar, slug);
          return days?.length > 0 ? days[0] : null;
        },
        async (dfd: Date) => {
          const days = await this.findFeastDays(
            kalendar,
            `${dfd.getMonth() + 1}/${dfd.getDate()}`
          );
          return days?.length > 0 ? days[0] : null;
        },
        date
      );

    let holydays = feasts
      .concat(transferred ? [transferred] : [])
      .concat(specials)
      .concat(thanksgiving);

    const highestHolyDayRank = Math.max(
      ...holydays.map((holyday) => (holyday as any).type?.rank ?? 3)
    );
    if (highestHolyDayRank >= 4) {
      holydays = holydays.filter(
        (holyday) =>
          (holyday as any).octave ||
          !(holyday as any).type?.rank ||
          (holyday as any).type?.rank >= highestHolyDayRank
      );
    } else if (isSunday) {
      holydays = holydays.filter(
        (holyday) =>
          (holyday as any).octave ||
          !(holyday as any).type?.rank ||
          (holyday as any).type?.rank >= 4
      );
    }

    // if some calendar other than bcp1979, filter out duplicate slugs
    if (kalendar !== "bcp1979") {
      const preferredCalendarSlugs = holydays
        .filter(
          (holyday) =>
            (holyday as any).kalendar === kalendar && (holyday as any).slug
        )
        .map((holyday) => (holyday as any).slug);
      holydays = holydays.filter(
        (holyday) =>
          (holyday as any).kalendar === kalendar ||
          !preferredCalendarSlugs.includes((holyday as any).slug)
      );
    }

    // incorporate them into the `LiturgicalDay`
    return day.addHolyDays(holydays);
  }

  async findSpecialDays(kalendar: string, slug: string): Promise<HolyDay[]> {
    const k = await this.kalendar(kalendar);
    if (kalendar === "lff2018") {
      const bcp = await this.kalendar("bcp1979");
      return bcp.specials
        .filter(
          (day) => (day as any).slug === slug && (day as any)?.type?.rank >= 3
        )
        .concat(
          k.specials.filter(
            (day) => (day as any).slug === slug || (day as any).day === slug
          )
        );
    } else {
      return k.specials.filter(
        (day) => (day as any).slug === slug || (day as any).day === slug
      );
    }
  }

  async findFeastDays(kalendar: string, mmdd: string): Promise<HolyDay[]> {
    const k = await this.kalendar(kalendar),
      bcp = kalendar !== "bcp1979" ? await this.kalendar("bcp1979") : null,
      feastDayToday: HolyDay[] =
        kalendar === "lff2018"
          ? bcp.feasts
              .filter(
                (day) =>
                  (day as any).mmdd === mmdd && (day as any)?.type?.rank >= 3
              )
              .concat(k.feasts.filter((day) => (day as any).mmdd === mmdd))
          : k.feasts.filter((day) => (day as any).mmdd == mmdd),
      eveToday =
        kalendar === "lff2018"
          ? bcp.feasts.filter(
              (day) => (day as any).mmdd === mmdd && (day as any).eve
            )
          : [];
    return feastDayToday.concat(eveToday);
  }
}

export const CalendarService = new CalendarServiceController();
