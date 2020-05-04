export class Proper {
  /** The number of the proper, e.g., 7 for Proper 7 */
  proper: number;

  /** A unique slug used to compose LiturgicalDay slugs, e.g., "proper-7" */
  slug: string;

  /** A human-readable label for the week, e.g., "Proper 7" */
  label: string;

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Proper> = {}) {
    Object.assign(this, data);
  }
}
