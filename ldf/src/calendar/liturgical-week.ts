import { LiturgicalColor } from './liturgical-color';

export const SEASONS = [
  'Advent',
  'Christmas',
  'Epiphany',
  'Lent',
  'HolyWeek',
  'Easter',
  'Ascension',
  'Pentecost',
  'Saints',
  'OrdinaryTime',
];
export type Seasons = typeof SEASONS;

export class LiturgicalWeek {
  /**
   * An identifying slug that distinguishes this week from all others
   * @example
   * // Week after the First Sunday after the Epiphany
   * '1st-epiphany'
   */
  slug: string;

  /** Overarching calendar this is a part of */
  kalendar?: string;

  /** Seasonal cycle within which it falls */
  cycle: 'Advent' | 'Christmas' | 'Epiphany' | 'Easter';

  /** Index within the seasonal cycle
   * @example
   * // Last Sunday after Pentecost = 0th week of Advent cycle
   * 0 */
  week: number;

  /** A machine-readable identifier for the liturgical season */
  season: Seasons[number];

  /** A human-readable name for the week, in English */
  name: string;

  /** Used for English-language formatting, generally when "week" name is the proper name of a Sunday.
   * @example
   * // "Thursday after Pentecost", not "Thursday after the Pentecost" */
  omit_the?: boolean = false;

  /** The {@link LiturgicalColor} used for the week */
  color: LiturgicalColor | string;

  /** The proper (i.e., for weeks after Pentecost) */
  proper?: number;

  /** Optionally `slug` as an identifier for readings and collects */
  propers?: string;

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<LiturgicalWeek> = {}) {
    Object.assign(this, data);
  }
}
