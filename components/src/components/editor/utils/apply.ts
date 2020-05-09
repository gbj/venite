import { Change } from '@venite/ldf';

import * as json0 from 'ot-json0';

export function applyChangeToElement(textarea : HTMLTextAreaElement, change : Change) : string {
  const currentValue = textarea.value;

  const newValue = json0.type.apply(currentValue, new Array(change.op));
  textarea.value = newValue;

  return newValue;
}
