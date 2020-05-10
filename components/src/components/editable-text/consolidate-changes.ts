import { Change } from '@venite/ldf';

import json0 from 'ot-json0';

export function consolidateChanges(path : string, changes : Change[]) : Change[] {

  const composedOps = changes
    .map(change => change.op)
    .reduce((a, b) => json0.type.compose(a, b));

  return Array.isArray(composedOps) ?
    composedOps.map(op => new Change(path, new Array(op))) :
    new Array(new Change(path, composedOps));

}
