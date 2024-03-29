/** `Preference` represents a single preference in any given liturgy */
export class Preference {
  /** Key of this preference within the parent `Liturgy`’s `preferences` */
  key?: string;

  /** Human-readable label for the preference */
  label: string;

  /** Optional: Category to which a preference belongs, if any.
   * @example
   * // groups together preferences referring to supplemental devotions
   * category: 'supplement' */
  category?: string;

  /** Optional: Additional descriptive text. Can include HTML. */
  description?: string;

  /** Optional: Only show description (if any) if the given value is selected */
  descriptionOnlyIfValue?: string;

  /** Array of options for this preference, in order they will be displayed.
   * Defaults to first in array if `PreferenceOption.default` is not set.  */
  options: PreferenceOption[];

  /** Index for ordering within a set of preferences in the UI. (If not present, defaults to alphabet order.) */
  index?: number;

  /** Given a `value` for the preference, returns the full option */
  getPreferenceOption(value: string): PreferenceOption | undefined {
    return this.options.find((option) => option.value == value);
  }

  /** Returns the default value for the preference */
  getDefaultPref(): string {
    const defaultPref = this.options.filter((opt) => opt.default)[0],
      firstPref = this.options[0];
    return (defaultPref || firstPref).value;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Preference> = {}) {
    Object.assign(this, data);
  }
}

export class PreferenceOption {
  /** Machine-readable value, which will probably be used in a `Piece.condition`
   * @example
   * 'bcp1979_30day_psalter' */
  value: string;

  /** Human-readable label for the
   * @example
   * '30-Day Psalm Cycle'  */
  label: string;

  /** Default value for this preference. */
  default?: boolean;

  /** Can be used to pass additional data that the liturgy compiler will use. */
  metadata?: {
    /** Used in reading preferences
     * @example
     * // First Reading in Episcopal Evening Prayer is OT reading for alternate year
     * { "value": "readingA", "label": "OT/First Reading (Alternate Year)", "metadata": { "alternateYear": true } }  */
    alternateYear?: boolean;

    /** Used in canticle-table preferences
     * @example
     * // Rite I canticle table falls back to Rite II table when it doesn't add any options
     * { "value": "rite_i", "label": "Rite I", "metadata": { "fallback": "bcp1979" } }  */
    fallback?: string;
  };
}
