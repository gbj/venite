import * as jot from 'jot';
import * as pointer from 'json-pointer';

export function apply(obj : any, path : string, op : any) {
  const splitPath : string[] = path.split('/'),
        propertyName = splitPath[splitPath.length - 1],
        applyAgainst = pointer.get(obj, splitPath.slice(0, splitPath.length - 1));
  return new jot.APPLY(propertyName, new jot.SPLICE(0, 1, "")).apply(applyAgainst);
}


export function insertTextInEditableText(start : number, end : number, value : string) {
  let textarea = document
    .querySelector('#editable ldf-liturgy').shadowRoot          // ldf-liturgy
    .querySelector('[path="/value/3"]').shadowRoot              // ldf-liturgical-document
    .querySelector('[path="/value/3/"]').shadowRoot             // ldf-text
    .querySelector('[path="/value/3//value/0//"]').shadowRoot   // ldf-editable
    .querySelector('textarea');                                 // textarea

  textarea.setSelectionRange(start, end);
  textarea.setRangeText(value);
}
