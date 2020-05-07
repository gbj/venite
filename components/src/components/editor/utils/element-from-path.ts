import { querySelectorDeep } from 'query-selector-shadow-dom';

export function elementFromPath(root : HTMLElement, path : string) : HTMLElement {
  return querySelectorDeep(`[path="${path}"]`, root);
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

export function elementFromPath2(root : HTMLElement, remaining : string[] = [], level : number = 0, pathSoFar : string = '') {
  //const parts = path.split('//');

  if(remaining.length == 1) {
    console.log('branch A')
    console.log('remaining', remaining, level, pathSoFar);
    console.log(`${pathSoFar}//${remaining[0]}`);
    console.log(root.shadowRoot.querySelector(`[path="${pathSoFar}//${remaining[0]}"]`));
    return root.shadowRoot.querySelector(`[path="${pathSoFar}//${remaining[0]}"]`);
  } else {
    console.log('branch B');
    console.log('remaining', remaining, level, pathSoFar);
    console.log(`${pathSoFar}${remaining[0]}`);
    console.log(root.shadowRoot.querySelector(`[path="${pathSoFar}//${remaining[0]}"]`));
    return elementFromPath2(
      root.shadowRoot.querySelector(`[path="${pathSoFar}//${remaining[0]}"]`),
      remaining.slice(1),
      level + 1,
      `${pathSoFar}//${remaining[0]}`
    );
  }
}
