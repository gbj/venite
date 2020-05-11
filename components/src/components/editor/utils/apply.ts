import { Change, LiturgicalDocument } from '@venite/ldf';

import * as json0 from 'ot-json0';

/** Pure function: returns a new `LiturgicalDocument` that applies `change` to the old `LiturgicalDocument` given by `doc` */
export function applyChange(doc : LiturgicalDocument, change : Change) : LiturgicalDocument {
  // change.path is a pointer to the part of the object to be changed
  const pathParts : (string | number)[] = change.path ?
    change.path
      .split('/')
  //    .map(part => parseInt(part) ? parseInt(part) : part)
      .filter(part => part !== '') :
    new Array();

  const fullyPathedOps = change.op.map(op => { return { ... op, p: pathParts.concat(op.p) } });

  console.log('pathParts = ', pathParts);
  console.log('fullyPathedOps = ', fullyPathedOps);
  return new LiturgicalDocument(json0.type.apply(doc, fullyPathedOps));
}

/** Mutates the value of `input` (an `input` or `textarea`) based on `change` */
export function applyChangeToElement(input : HTMLTextAreaElement | HTMLInputElement, change : Change) : string {
  console.log('applyChangeToElement', input, change);

  const currentValue = input.value;

  const newValue = json0.type.apply(currentValue, change.op);
  input.value = newValue;

  return newValue;
}
