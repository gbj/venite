import { LiturgicalDocument } from './liturgical-document';

export class Heading extends LiturgicalDocument {
  type: 'heading';

  metadata: {
    /** `level` roughly corresponds to HTML headers H1, H2, etc.
      * Higher numbers are 'lower' in a tree */
    level?: number;

    /** If break == true and no other information provided, simply a section break */
    break?: boolean;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Heading> = {}) {
    super(data);
  }
}
