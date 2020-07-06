/** Represents preferred value for a single preference in a single liturgy language/version */
export class StoredPreference {
  /** Name of the preference */
  key: string;

  /** Selected value */
  value: string;

  /** User ID (blank if signed out and storing in local storage) */
  uid?: string;

  /** Language of the liturgy, if it's a liturgical preference */
  language?: string;

  /** Version of the liturgy, if it's a liturgical preference */
  version?: string;

  /** Slug of the liturgy, if it's a liturgical preference */
  liturgy?: string;
}
