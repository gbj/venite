import { LiturgicalDocument } from '../liturgical-document';
import { Preference } from './preference';

/** Represents the "recipe" to compile a liturgy */
export class Liturgy extends LiturgicalDocument {
  type: 'liturgy';

  metadata: {
    /** `Preferences` instance that a liturgy can access while being compiled */
    preferences : {
      [x: string]: Preference;
    };

    /** Optional: Alternative versions to be used as a backstop when compiling the liturgy.
     * @example
     * // liturgyversions for `EOW` liturgy
     * `['eow', 'bcp1979']`
     */
    liturgyversions? : string[];

    /** "Supplements" are not standalone liturgies and should not be listed in a menu of options to pray */
    supplement?: boolean;

    /** True if this is inherently an evening liturgy, like Evening Prayer or Compline */
    evening: boolean;
  }

  /** Value is an array of any kind of LiturgicalDocument, including child classes */
  value: LiturgicalDocument[];
}
