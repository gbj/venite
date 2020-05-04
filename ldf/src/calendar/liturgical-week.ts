import { LiturgicalColor } from './liturgical-color';
import { Proper } from './proper';

export class LiturgicalWeek {
  /**
   * An identifying slug that distinguishes this week from all others
   * @example
   * // Week after the First Sunday after the Epiphany
   * '1st-epiphany'
   */
  slug: string;

  /**
   * Index within the seasonal cycle
   * @example
   * // Last Sunday after Pentecost = 0th week of Advent cycle
   * 0
   */
  week: number;

  /** A machine-readable identifier for the liturgical season */
  season: 'Advent' | 'Christmas' | 'Epiphany' | 'Lent' | 'HolyWeek' | 'Easter' | 'Pentecost' | 'Saints' | 'OrdinaryTime';

  /** A human-readable name for the week, in English */
  name: string;

  /** The {@link LiturgicalColor} used for the week */
  color: LiturgicalColor;

  /** The {@link Proper} (i.e., for weeks after Pentecost) */
  proper?: Proper;

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<LiturgicalWeek> = {}) {
    Object.assign(this, data);
  }
}
