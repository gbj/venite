import { LiturgicalDocument } from './liturgical-document';

const STYLES = ['normal', 'antiphon', 'gloria'] as const;
type StyleTuple = typeof STYLES;

/** Refrain represents a short text like the Gloria Patri, Hail Mary, or an Antiphon */
export class Refrain extends LiturgicalDocument {
  type: 'refrain';
  style: StyleTuple[number];
  value: string[];

  /** Returns the list of all possible `style` values. Child classes should override if they have styles available. */
  availableStyles(): ReadonlyArray<string> {
    return STYLES;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Refrain> = {}) {
    super(data);
  }
}
