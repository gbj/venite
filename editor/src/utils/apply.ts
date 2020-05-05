import * as jot from 'jot';
import * as pointer from 'json-pointer';

export function apply(obj : any, path : string) { //, op : any) {
  const splitPath : string[] = path.split('/'),
        propertyName = splitPath[splitPath.length - 1],
        applyAgainst = pointer.get(obj, splitPath.slice(0, splitPath.length - 1));
  return new jot.APPLY(propertyName, new jot.SPLICE(0, 1, "")).apply(applyAgainst);
}
