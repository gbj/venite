import { LiturgicalDocument } from './liturgical-document';

const STYLES = ['preces', 'litany', 'responsive'] as const;
type StyleTuple = typeof STYLES;

/** Text represents collect or any other short prayer. */
export class ResponsivePrayer extends LiturgicalDocument {
  type: 'responsive';
  style: StyleTuple[number];
  value: ResponsivePrayerLine[];
  metadata?: {
    response: string;
  };

  /** Returns the list of all possible `style` values. */
  availableStyles(): ReadonlyArray<string> {
    return STYLES;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<ResponsivePrayer> = {}) {
    super(data);
  }
}

/** One line of a responsive prayer
 * @example
 * { label: '℣', text: 'Lord, open my lips.' }
 * @example
 * { label: 'line', text: 'That this evening may be holy, good, and peaceful.' }
 */
export class ResponsivePrayerLine {
  label?: string;
  text: string;
  response?: string;
  optional?: boolean;
}
