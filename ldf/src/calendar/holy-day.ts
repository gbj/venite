import { LiturgicalColor } from './liturgical-color';
import { Seasons } from './seasons';

export class HolyDay {
  /** An identifying slug for the day.
   * @optional
   * Not required for days that don't have their own propers.
   * @example
   * // Feb. 2, The Presentation
   * `'the-presentation'` */
  slug?: string;

  /** Optional hagiography */
  bio?: string[];

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

  /** Optional: Slug used to find collect in the API, if different from `slug` property */
  collect?: string;

  /** Optional: Human-readable name of the feast */
  name?: string;

  /** Optional: Human-readable subtitle of the feast */
  subtitle?: string;

  /** A machine-readable identifier for the liturgical season */
  season?: Seasons[number];

  /** A machine-readable identifier for the season this day was before a holy day overrode it. */
  base_season?: Seasons[number];

  /** A machine-readable identifier day within the octave of which a day falls */
  octave?: string | undefined;

  /** Categories for this feast that are not liturgical seasons
   * @example
   * ["Bishop", "Martyr"]
   */
  category?: string[];

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

  /** URL for an image of an icon for the day */
  image?: string;

  /** Citation URL for an image */
  imageURL?: string;

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<HolyDay> = {}) {
    Object.assign(this, data);
  }
}
