export class LiturgicalColor {
  /** Unique, identifying name
   * @example
   * `'Red'` */
  name: string;

  /** Hex code (including #) or other CSS-compliant color code
   * @example
   * `'#ff0000'` */
  hex: string;

  /** URL for icon to be used for this color */
  image?: string;

  /** Citation URL for the image */
  imageUrl?: string;

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<LiturgicalColor> = {}) {
    Object.assign(this, data);
  }
}
