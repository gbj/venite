export class Citation {
  /** The URL (as a string) for the API from which more information about the source can be found */
  api: string = 'https://www.venite.app/api';

  /** A machine-readable unique identifying slug for the source */
  source: string;

  /** Citation within that source
   * @example
   * `'p. 812'`, `'#126'`, `'10.1.13'` */
  citation: string;

  /** Provides a human-readable string form of the citation */
  public toString(suppressSource : boolean = false) : string {
    return suppressSource ? this.citation : `${this.source} ${this.citation}`;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Citation> = {}) {
    Object.assign(this, data);
  }
}

export class SelectableCitation {
  book?: string;
  chapter?: string;
  verse?: string;
  label?: string;
  string?: string;
}
