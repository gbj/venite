import { LiturgicalDocument } from './liturgical-document';

/** Refrain represents a short text like the Gloria Patri, Hail Mary, or an Antiphon */
export class Refrain extends LiturgicalDocument {
  type: 'refrain';
  style: 'normal' | 'antiphon' | 'gloria';
  value: string[];

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Refrain> = {}) {
    super(data);
  }
}
