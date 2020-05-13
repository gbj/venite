import { Change, LiturgicalDocument } from '@venite/ldf';

import * as json0 from 'ot-json0';

/** Pure function: returns a new `LiturgicalDocument` that applies `change` to the old `LiturgicalDocument` given by `doc` */
export function applyChange(doc : LiturgicalDocument, change : Change) : LiturgicalDocument {
  console.log('fullyPathedOps = ', change.fullyPathedOp());
  return new LiturgicalDocument(json0.type.apply(doc, change.fullyPathedOp()));
}

/** Mutates the value of `input` (an `input` or `textarea`) based on `change` */
export function applyChangeToElement(input : HTMLTextAreaElement | HTMLInputElement, change : Change) : string {
  console.log('applyChangeToElement', input, change);

  const currentValue = input.value;

  const newValue = json0.type.apply(currentValue, change.op);
  input.value = newValue;

  return newValue;
}
