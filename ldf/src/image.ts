import { LiturgicalDocument } from './liturgical-document';

const STYLES = ['normal', 'slideshow', 'carousel'] as const;
type StyleTuple = typeof STYLES;

/** Refrain represents a short text like the Gloria Patri, Hail Mary, or an Antiphon */
export class Image extends LiturgicalDocument {
  type: 'image';
  style: StyleTuple[number];
  metadata: {
    height: number;
    width: number;
    align: 'left' | 'right' | 'center';
  };
  /** Array of image URLs, including (possibly) base-64-encoded images */
  value: string[];

  /** Returns the list of all possible `style` values. Child classes should override if they have styles available. */
  availableStyles(): ReadonlyArray<string> {
    return STYLES;
  }

  availableDisplayFormats() {
    return [];
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Image> = {}) {
    super(data);
  }
}
