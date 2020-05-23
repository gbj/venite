/** Represents a particular liturgical or sanctoral calendar */
export class Kalendar {
  slug: string;
  name: string;

  /** `true` if the `Kalendar` is only for saints’ days and does not include a full cycle of seasons */
  sanctoral: boolean;
}
