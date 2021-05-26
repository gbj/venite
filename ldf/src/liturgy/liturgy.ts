import { LiturgicalColor } from '../calendar/liturgical-color';
import { LiturgicalDocument } from '../liturgical-document';
import { Preference } from './preference';

/** Represents the "recipe" to compile a liturgy */
export class Liturgy extends LiturgicalDocument {
  type: 'liturgy';

  metadata: {
    /** `Preferences` instance that a liturgy can access while being compiled; some are hard-coded keywords
     * @example `lectionary` refers to a lectionary for readings
     * @example `bibleVersion` is a preferred Bible translation
     * @example `psalterVersion` is a preferred translation of the Psalms
     * @example `readingA`, `readingB`, `readingC` are the readings to be used in the service
     * @example `canticleTable` is a cycle of canticles to be used in the service
     */
    preferences: {
      [x: string]: Preference;
    };

    /** `Preferences` for special liturgies
     * Should not be saved in between instances of praying this liturgy
     * e.g., Maundy Thursday `footwashing` preferences */
    special_preferences: {
      [x: string]: Preference;
    };

    /** Optional: Alternative versions to be used as a backstop when compiling the liturgy.
     * @example
     * // liturgyversions for `EOW` liturgy
     * `['eow', 'bcp1979']`
     */
    liturgyversions?: string[];

    /** "Supplements" are not standalone liturgies and should not be listed in a menu of options to pray */
    supplement?: boolean;

    /** True if this is inherently an evening liturgy, like Evening Prayer or Compline */
    evening: boolean;

    /** A color to be used for the service. This will override the liturgical color of the day. Useful for e.g., the Burial service, which is white no matter the day. */
    color?: string | LiturgicalColor;

    /** A font to be used for the service. Will override user font choice. */
    font?: string | undefined;

    /** A list of pronouns that the user should be given the option to swap out. */
    pronouns?: string[];
  };

  /** Value is an array of any kind of LiturgicalDocument, including child classes */
  value: LiturgicalDocument[];

  /** No meaningful differences in display format for liturgies */
  availableDisplayFormats() {
    return [];
  }
}
