//import * as jot from 'jot';
//import * as pointer from 'json-pointer';
import { Change } from '@venite/ldf';

/*export function apply(obj : any, path : string) { //, op : any) {
  const splitPath : string[] = path.split('/'),
        propertyName = splitPath[splitPath.length - 1],
        applyAgainst = pointer.get(obj, splitPath.slice(0, splitPath.length - 1));
  return new jot.APPLY(propertyName, new jot.SPLICE(0, 1, "")).apply(applyAgainst);
}*/

export function applyChangeToElement(el : any, change : Change) {
  const textarea : HTMLTextAreaElement = el.shadowRoot.querySelector('textarea');
  console.log('changing', el, textarea, textarea.value);
  let old : string = textarea.value;


  switch(change.op) {
    case 'insert':
      console.log('old value = ', old);
      textarea.value = (old.substring(0, change.pos) +
        change.value +
        old.substring(change.pos + change.length, old.length));
      console.log('[inserted] new value = ', textarea.value);
      break;
    case 'delete':
      textarea.value = old.substring(0, change.pos) +
        change.value +
        old.substring(change.pos + change.length, old.length);
        console.log('[deleted] new value = ', textarea.value);
      break;
    case 'set':
      break;
  }
}
