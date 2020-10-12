import { querySelectorDeep } from 'query-selector-shadow-dom';

export function elementFromPath(root : HTMLElement, path : string) : HTMLElement {
  console.log('(elementFromPath)', root, path);
  return querySelectorDeep(`[path="${path}"]`, document);
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
