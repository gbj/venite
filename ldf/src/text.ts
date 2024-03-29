import { LiturgicalDocument } from './liturgical-document';

const STYLES = ['text', 'prayer', 'markdown', 'authorized-prayers'] as const;
type StyleTuple = typeof STYLES;

/** Text represents collect or any other short prayer. */
export class Text extends LiturgicalDocument {
  type: 'text';
  style: StyleTuple[number];
  value: string[];
  metadata?: {
    response: string;
    omit_response: boolean;
    omit_label: boolean;
    rollup: boolean;
  };

  /** Returns the list of all possible `style` values. */
  availableStyles(): ReadonlyArray<string> {
    return STYLES;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Text> = {}) {
    super(data);
  }
}
