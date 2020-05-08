import { LiturgicalDocument } from './liturgical-document';

export class Meditation extends LiturgicalDocument {
  type: 'meditation';

  metadata: {
    /** Default length in seconds */
    length: number;
    delay: number;
  };

  /** Optionally: a guided meditation or other appropriate text */
  value: string[];

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Meditation> = {}) {
    super(data);
  }
}
