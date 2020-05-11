import { LiturgicalDocument } from './liturgical-document';

/** Text represents collect or any other short prayer. */
export class Text extends LiturgicalDocument {
  type: 'text';
  style: 'text' | 'prayer';
  value: string[];
  metadata?: {
    response: string;
    omit_response: boolean;
  };

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Text> = {}) {
    super(data);
  }
}
