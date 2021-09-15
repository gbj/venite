import {
  dateFromYMDString,
  LectionaryEntry,
  LiturgicalDay,
} from "https://cdn.skypack.dev/@venite/ldf@^0.21.0?dts";

export class LectionaryServiceController {
  private _lectionary: Record<string, Promise<LectionaryEntry[]>> = {};
  private _cache: Record<string, Promise<LectionaryEntry[]>> = {};

  async loadLectionary(lectionary: string): Promise<LectionaryEntry[]> {
    if (!this._lectionary[lectionary]) {
      const resp = await fetch(`/assets/lectionary/${lectionary}.json`);
      this._lectionary[lectionary] = resp.json();
    }
    return this._lectionary[lectionary];
  }

  findReadings(
    day: LiturgicalDay,
    lectionaryName: string,
    alternateYear = false
  ): Promise<LectionaryEntry[]> {
    const READING_ORDER = [
      "holy_day_morning_1",
      "holy_day_morning_2",
      "holy_day_evening_1",
      "holy_day_evening_2",
      "first_reading",
      "second_reading",
      "gospel",
    ];

    const slug = `${
      day.propers || day.slug
    }-${lectionaryName}-${alternateYear}`;
    if (!this._cache[slug]) {
      this._cache[slug] = this.loadLectionary(lectionaryName).then((entries) =>
        this.filterReadings(entries, day, lectionaryName, alternateYear).sort(
          (a, b) =>
            READING_ORDER.indexOf(a.type) - READING_ORDER.indexOf(b.type)
        )
      );
    }
    return this._cache[slug];
  }

  async findReading(
    day: LiturgicalDay,
    lectionaryName: string,
    readingType: string,
    alternateYear = false
  ): Promise<LectionaryEntry[]> {
    const entries = await this.findReadings(day, lectionaryName, alternateYear);
    return entries.filter((e) =>
      alternateYear
        ? e.type === readingType.replace("_alt", "")
        : e.type === readingType
    );
  }

  filterReadings(
    entries: LectionaryEntry[],
    day: LiturgicalDay,
    lectionaryName: string,
    alternateYear: boolean
  ): LectionaryEntry[] {
    const { when, whentype, includeDay } = this.when(
      lectionaryName,
      day,
      alternateYear
    );

    if (
      includeDay &&
      day.holy_day_observed &&
      day.slug &&
      day.holy_day_observed?.type?.rank > 2
    ) {
      return entries.filter((entry) => entry.day == day.slug);
    } else {
      let halfFiltered = entries.filter(
        (entry) =>
          (entry.when.toString() == when.toString() ||
            (alternateYear && entry.when.toString() !== when.toString())) &&
          (!entry.whentype || entry.whentype == whentype)
      );

      if (includeDay !== false) {
        const beforeFiltering = [...halfFiltered];

        // by day or (if RCL and not a holy day) by Sunday
        halfFiltered = halfFiltered.filter(
          (entry) =>
            entry.day == (day.propers || day.slug) ||
            ((lectionaryName === "rcl1" || lectionaryName === "rcl2") &&
              !day.holy_day_observed &&
              entry.day === day.week?.slug)
        );

        // if none found for day or (RCL) Sunday, try RCL Proper ___ Sunday
        if (halfFiltered?.length == 0) {
          halfFiltered = beforeFiltering.filter(
            (entry) =>
              entry.day == (day.propers || day.slug) ||
              ((lectionaryName === "rcl1" || lectionaryName === "rcl2") &&
                !day.holy_day_observed &&
                (entry.day === day.week?.slug ||
                  entry.day === day.week?.propers))
          );
        }

        // if still nothing, perhaps it's an RCL Holy Day that's listed under the Sunday (like Palm Sunday)
        if (halfFiltered?.length == 0) {
          halfFiltered = beforeFiltering.filter(
            (entry) =>
              entry.day == (day.propers || day.slug) ||
              ((lectionaryName === "rcl1" || lectionaryName === "rcl2") &&
                entry.day === day.week?.slug)
          );
        }
      }

      return halfFiltered;
    }
  }

  when(
    lectionaryName: string,
    day: LiturgicalDay,
    alternateYear: boolean
  ): { when: string; whentype: string; includeDay: boolean } {
    switch (lectionaryName) {
      case "30day-psalter":
        return {
          whentype: "date",
          when: dateFromYMDString(day.date).getDate().toString(),
          includeDay: false,
        };
      case "rcl1":
      case "rcl2":
        return {
          whentype: "year",
          when: day.years["rclsunday"].toString(),
          includeDay: true,
        };
      case "daily-office":
      case "daily-office-psalter":
      default:
        if (alternateYear) {
          const year = Number(day.years["bcp1979_daily_office"]);
          return {
            whentype: "year",
            when: ((year % 2) + 1).toString(),
            includeDay: true,
          };
        } else {
          return {
            whentype: "year",
            when: day.years["bcp1979_daily_office"].toString(),
            includeDay: true,
          };
        }
    }
  }
}

export const LectionaryService = new LectionaryServiceController();
