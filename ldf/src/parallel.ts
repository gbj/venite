import { LiturgicalDocument } from './liturgical-document';

export class Parallel extends LiturgicalDocument {
  type: 'parallel';

  metadata: {
    /** A map of languages (ISO 639-1 two-letter codes) and whether to display their respective parallel texts */
    parallels?: Record<string, boolean>;
  };

  value: LiturgicalDocument[];

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Parallel> = {}) {
    super(data);
  }
}
