import { LiturgicalDocument } from './liturgical-document';

/** Rubric represents liturgical instructions. */
export class Rubric extends LiturgicalDocument {
  type: 'rubric';
  value: string[];

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Rubric> = {}) {
    super(data);
  }

  availableDisplayFormats() {
    return [];
  }
}
