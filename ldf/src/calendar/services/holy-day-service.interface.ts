import { HolyDay } from '../holy-day';

export interface IHolyDayService {
  /** `HolyDay` for a feast that either has slug or falls on date
    * @example
    * // returns info for Ash Wednesday
    * getHolyDay('wednesday-last-epiphany', new Date(Date.parse('2020-02-26')))
    *  */
  getHolyDays(slug : string, date : Date) : HolyDay[];

  /** `HolyDay` for a particular slug
    * @example
    * // returns info for Ash Wednesday
    * specialDay('wednesday-last-epiphany') */
  specialDay(slug : string) : HolyDay[];

  /** `HolyDay` any feast date defined by being on that day
    * @example
    * // returns info for Christmas Eve
    * feastDate(new Date(Date.parse('2020-12-24'))) */
  feastDate(date : Date) : HolyDay[];
}
