/** Holds instructions on how to adapt liturgies given the Proper Liturgies for Special Days
  * e.g., Ash Wednesday, */
export class ProperLiturgy {
  /** Matches to slug of a LiturgicalDay */
  slug: string;

  /** Set a particular preference to the value `true` when loading liturgy */
  preference: string;

  /** Chooses a particular liturgy */
  liturgy: string;

  /** A human-readable name; either the name of the whole liturgy, or a label for a piece.
   * @example
   * `'Morning Prayer'`, `'The Apostles’ Creed'` */
  label: string;

  /** Language code (typically an ISO 639-1 two-letter code)
   * @example
   * `'en'` */
  language: string;
}
