import { Change } from '@venite/ldf';

import jsondiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';

export function handleInput(path: string, oldValue: string, newValue: string) : Change {

  return new Change({ path, op: jsondiff(oldValue, newValue, diffMatchPatch) });

}
