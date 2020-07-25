import { LiturgicalDocument } from './liturgical-document';

const STYLES = ['text', 'day', 'date'] as const;
type StyleTuple = typeof STYLES;

export class Heading extends LiturgicalDocument {
  type: 'heading';

  /** What kind of value to display
   * If `text`, displays plain text stored in `value`
   * If `day`, displays name of `LiturgicalDay` stored in `day`
   * If `date`, displays localized version of `Date` determined by `dateFromYMDString(day.date)`
   */
  style: StyleTuple[number];

  metadata: {
    /** `level` roughly corresponds to HTML headers H1, H2, etc.
     * Higher numbers are 'lower' in a tree */
    level?: number;
  };

  /** Contains the text of the heading */
  value: string[];

  /** Returns the list of all possible `style` values.  */
  availableStyles(): ReadonlyArray<string> {
    return STYLES;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Heading> = {}) {
    super(data);
  }
}
