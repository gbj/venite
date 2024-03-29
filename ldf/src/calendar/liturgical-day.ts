import { LiturgicalColor } from './liturgical-color';
import { LiturgicalWeek } from './liturgical-week';
import { Seasons } from './seasons';
import { HolyDay } from './holy-day';
import { dateOnly } from './utils/date-only';
import { dateFromYMD, dateFromYMDString } from './utils/date-from-ymd';

interface ObservedInterface {
  date?: string;
  slug?: string;
  collect?: string;
  propers?: string;
  color?: string | LiturgicalColor;
  season?: Seasons[number] | undefined;
  octave?: string | undefined;
  mmdd?: string;
  kalendar?: string;
  alternate?: ObservedInterface;
}

/**
 * LiturgicalDay represents a particular moment in the liturgical calendar,
 * like "Monday in Holy Week" or "The Eve of the Epiphany."
 */
export class LiturgicalDay {
  /** Dates are always stored as YYYY-MM-DD. No time or timezone information is helpful.
   *  Date math can be done using a library like js-joda.
   * @example
   * const day = new LiturgicalDay();
   * day.date = '2020-06-25';
   * const [y, m, d] = day.date.split('-');
   * const dayDate : LocalDate = LocalDate.of(y, m, d)
   */
  date: string;

  /** Overarching calendar this is a part of */
  kalendar: string;

  /**
   * An identifying slug that distinguishes this day from all others
   * @example
   * // Wednesday after the First Sunday after the Epiphany
   * 'wednesday-1st-epiphany'
   */
  slug: string;

  /** True if this moment is the evening. Used to indicate the eve of feasts. */
  evening: boolean = false;

  /** The {@link LiturgicalWeek} during which this moment takes place. */
  week: LiturgicalWeek;

  /**
   * Stores information about where a date falls in various lectionary cycles
   * @example
   * // April 19, 2020
   * { "bcp1979_daily_office": 2, "bcp1979_daily_psalms": 2, "rclsunday": "A" }
   */
  years: { [x: string]: any };

  /** A machine-readable identifier for the liturgical season */
  season: Seasons[number];

  /** A machine-readable identifier day within the octave of which a day falls */
  octave?: string | undefined;

  /**  An array of possible {@link HolyDay}s that fall at this moment. It’s up to the consumer
   * to determine precedence. */
  holy_days?: HolyDay[];

  /** exists if one the listed `HolyDay`s is being observed */
  holy_day_observed?: HolyDay;

  /** The {@link LiturgicalColor} used for the day */
  color?: string | LiturgicalColor;

  /** URL for an image of an icon for the day */
  image?: string;

  /** Citation URL for an image */
  imageURL?: string;

  /** Optionally `slug` as an identifier for readings and collects
   * @example
   * // June 25, 2020
   * {
   *   ...,
   *   "slug":"thursday-3rd-pentecost"
   *   "propers": "thursday-proper-7"
   * }
   */
  propers?: string;

  /** Optionally `slug` as an identifier for a collect only, but not readings
   *  Used for e.g., Saturday evenings as first vespers of a Sunday
   */
  collect?: string;

  /** Optionally, an alternate observance for the same day */
  alternate?: LiturgicalDay;

  /** Returns a native Date from the day's date string */
  getDate(): Date {
    return dateFromYMDString(this.date);
  }

  /** Given a LiturgicalDay, returns a new LiturgicalDay that includes the feasts passed */
  addHolyDays(holydays: HolyDay[], saveAlternate?: boolean): LiturgicalDay {
    const day: LiturgicalDay = this;

    holydays = holydays
      // filter out eves if it's not evening
      .filter((feast) => !feast.eve || this.evening)
      // filter out days that are supposed to stop after a certain Sunday
      // viz., the 1979 daily lectionary for January 8, 9, 10, 11, etc., stops at the 1st Sunday after the Epiphany
      .filter((feast) => feast.stops_at_sunday !== day.week.slug)
      .map((feast) => {
        // if a feast has an `evening` field and it's evening, use that
        if (feast.hasOwnProperty('evening') && this.evening == true) {
          return feast.evening;
        }
        // if a feast has a `morning` field and it's morning, use that
        else if (feast.hasOwnProperty('morning') && this.evening == false) {
          return feast.morning;
        }
        // if a feast is the eve of something and it's evening, use that feast
        else if (feast && feast.eve && this.evening == true) {
          return feast;
        }
        // if none of these, just return the feast
        else {
          return feast;
        }
      })
      .filter((feast) => !!feast) as HolyDay[];

    // Determine whether a holy day takes precedence over the ordinary day
    const observed: ObservedInterface = this.observedDay(this, (this.holy_days || new Array()).concat(holydays));

    // overwrite the day's slug with the observed day's slug if they differ
    const holy_day_rank = Number((observed as HolyDay)?.type?.rank),
      holy_day_is_observed = observed?.slug && (observed?.slug !== day.slug || holy_day_rank > 2),
      slug = holy_day_is_observed && holy_day_rank > 2 ? observed.slug : day.slug;

    let propers = this.propers;
    if (slug !== this.slug) {
      propers = slug;
    }

    const color = observed.color || this.color,
      collect = observed.collect || this.collect,
      season = observed.season || this.season,
      octave = (this.holy_days || [])
        ?.concat(holydays)
        ?.map((holyday) => holyday.octave)
        .filter((octave) => Boolean(octave))
        .reduce((acc, curr) => (acc ? acc : curr || acc), undefined);

    return new LiturgicalDay({
      ...this,
      slug,
      propers: holy_day_is_observed && holy_day_rank > 2 ? observed?.propers || observed?.slug : propers,
      color,
      season,
      octave,
      collect,
      holy_days: (this.holy_days || new Array()).concat(holydays),
      holy_day_observed: holy_day_is_observed ? (observed as HolyDay) : this.holy_day_observed,
      alternate: saveAlternate && slug !== this.slug && holy_day_rank < 5 ? this : undefined,
    });
  }

  /** Given a `LiturgicalDay` and a set of `HolyDay`s, it returns whichever option takes precedence */
  observedDay(day: ObservedInterface, holydays: ObservedInterface[]): ObservedInterface {
    // rank: Principal Feast (5), Sunday (4), Holy Day (3), random other days (2), ferial weekday (1)
    function getRank(item: any, type: 'holyday' | 'weekday'): number {
      // ranked items => go with rank
      if (type == 'holyday') {
        return item?.type?.rank || 2;
      } else {
        // if `day.date` is defined, used it to generate a date
        // otherwise, use the current date
        const date = day.date ? dateFromYMDString(day.date) : dateOnly(new Date());

        // Sundays => 4
        if (date.getDay() == 0) {
          return 4;
        }
        // weekdays => 1
        else {
          return 1;
        }
      }
    }

    const sorted = holydays
      .map((holyday) => ({ rank: getRank(holyday, 'holyday'), obj: holyday }))
      .concat({ rank: getRank(day, 'weekday'), obj: day })
      .sort((a, b) => {
        // equal rank => choose earlier feast (probably )
        if (a.rank === b.rank && a.obj.mmdd && b.obj.mmdd) {
          const [bMM, bDD] = b.obj.mmdd.split('/'),
            [aMM, aDD] = a.obj.mmdd.split('/'),
            bDate = new Date(),
            aDate = new Date();
          bDate.setMonth(parseInt(bMM) - 1);
          bDate.setDate(parseInt(bDD));
          aDate.setMonth(parseInt(aMM) - 1);
          aDate.setDate(parseInt(aDD));
          return a.obj.mmdd === b.obj.mmdd && a.obj.kalendar !== b.obj.kalendar
            ? a.obj.kalendar === day.kalendar
              ? -1
              : 1
            : aDate.getTime() - bDate.getTime();
        } else {
          return b.rank - a.rank;
        }
      });

    return { ...sorted[0].obj };
  }

  // whether this day is ranked as a Major Feast
  isFeast(): boolean {
    const isSunday = this.getDate().getDay() === 0,
      hasRank = (this.holy_day_observed?.type?.rank || 1) >= 3,
      holyWeek = this.slug?.includes('holy-week') || this.slug?.includes('palm-sunday'),
      ashWednesdayWeek = this.slug?.includes('last-epiphany'),
      ascensionWeek = this.slug?.includes('6th-easter'),
      easterWeek = this.slug == 'easter' || this.week?.slug == 'easter',
      ember = this.season?.includes('Ember');
    return isSunday || (hasRank && !holyWeek && !easterWeek && !ashWednesdayWeek && !ascensionWeek && !ember);
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<LiturgicalDay> = {}) {
    Object.assign(this, data);
  }
}
