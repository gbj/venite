import { LiturgicalDocument } from './liturgical-document';

export class Heading extends LiturgicalDocument {
  type: 'heading';

  metadata: {
    /** `level` roughly corresponds to HTML headers H1, H2, etc.
     * Higher numbers are 'lower' in a tree */
    level?: number;

    /** What kind of value to display
     * If `text`, displays plain text stored in `value`
     * If `day`, displays name of `LiturgicalDay` stored in `day`
     * If `date`, displays localized version of `Date` determined by `dateFromYMDString(day.date)`
     */
    type: 'text' | 'day' | 'date';
  };

  /** Contains the text of the heading */
  value: string[];

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Heading> = {}) {
    super(data);
  }
}
