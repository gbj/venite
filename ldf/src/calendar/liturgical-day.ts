import { Proper } from './proper';
import { LiturgicalColor } from './liturgical-color';
import { LiturgicalWeek } from './liturgical-week';
import { HolyDay } from './holy-day';

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
  season:
    | 'Advent'
    | 'Christmas'
    | 'Epiphany'
    | 'Lent'
    | 'HolyWeek'
    | 'Easter'
    | 'Pentecost'
    | 'Saints'
    | 'OrdinaryTime';

  /**
   * An array of possible {@link HolyDay}s that fall at this moment. It’s up to the consumer
   * to determine precedence.
   */
  holy_days?: HolyDay[];

  /** The {@link LiturgicalColor} used for the day */
  color?: string | LiturgicalColor;

  /** The {@link Proper} (i.e., for days after Pentecost) */
  proper?: Proper;

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

  /** Returns a native Date from the day's date string */
  getDate(): Date {
    const [y, m, d] = this.date.split('-'),
      date = new Date();
    date.setFullYear(parseInt(y));
    date.setMonth(parseInt(m) - 1); // months are 0-11, not 1-12
    date.setDate(parseInt(d));
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<LiturgicalDay> = {}) {
    Object.assign(this, data);
  }
}
