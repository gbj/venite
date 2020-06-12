import { LiturgicalColor } from './liturgical-color';

export class HolyDay {
  /** An identifying slug for the day.
   * @optional
   * Not required for days that don't have their own propers.
   * @example
   * // Feb. 2, The Presentation
   * `'the-presentation'` */
  slug?: string;

  /** Overarching calendar this is a part of */
  kalendar?: string;

  /** Used to determine feast precedence in conflicts, from 1 (ferial weekday) to 5 (Feast of Our Lord) */
  type?: {
    name?: string;
    rank: number;
  };

  /** Optional: Identifies the month/date of the feast
   * @example
   * // Feb. 2, The Presentation
   * `'2/2'`
   */
  mmdd?: string;

  /** Optional: Slug used to find readings in the API, if different from `slug` property */
  readings?: string;

  /** Optional: Human-readable name of the feast */
  name?: string;

  /** A machine-readable identifier for the liturgical season */
  season?:
    | 'Advent'
    | 'Christmas'
    | 'Epiphany'
    | 'Lent'
    | 'HolyWeek'
    | 'Easter'
    | 'Pentecost'
    | 'Saints'
    | 'OrdinaryTime';

  /** Optional: Identifies whether it is the Eve of ___ */
  eve?: boolean;

  /** The {@link LiturgicalColor} used for the day, or an identifying slug for the color that can be used to look it up */
  color?: LiturgicalColor | string;

  /** Slug of a {@link LiturgicalWeek} after which this is no longer observed. Used for weekdays after Epiphany. */
  stops_at_sunday?: string;

  /** Allows inclusion of alternate holy days for morning and evening. Used for transition from Christmas season to Epiphany on 1/5*/
  morning?: HolyDay;

  /** Allows inclusion of alternate holy days for morning and evening. Used for transition from Christmas season to Epiphany on 1/5*/
  evening?: HolyDay;

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<HolyDay> = {}) {
    Object.assign(this, data);
  }
}
