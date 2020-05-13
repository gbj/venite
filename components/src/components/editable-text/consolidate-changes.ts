import { Change } from '@venite/ldf';

import json0 from 'ot-json0';

export function consolidateChanges(path : string, changes : Change[]) : Change {

  const composedOps = changes
    .map(change => change.op)
    .reduce((a, b) => json0.type.compose(a, b));

  return new Change({ path, op: composedOps });
}
