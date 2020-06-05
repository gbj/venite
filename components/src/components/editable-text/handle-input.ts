import { Change } from '@venite/ldf';

import DiffMatchPatch from 'diff-match-patch';

export function handleInput(path: string, oldValue: string, newValue: string) : Change {

  // Build DiffMatchPatch patches from oldValue and newValue
  const dmp = new DiffMatchPatch(),
        diff = dmp.diff_main(oldValue, newValue);
  dmp.diff_cleanupSemantic(diff);
  const patches = dmp.patch_make(oldValue, diff);

  // Iterate over patches to build a `Change.op`
  const op = new Array();
  patches.forEach(patch => {
    let index = patch.start1;
    patch.diffs.forEach(([operation, value]) => {
      switch(operation) {
        case 1:  // Insert
          op.push({ type: 'insertAt', index, value });
        case 0:  // No Change
          index += value.length;
          break;
        case -1: // Delete
          for (let ii = 0; ii < value.length; ii++) {
            op.push({ type: 'deleteAt', index });
          }
          break;
      }
    })
  });

  return new Change({ path: path?.replace('//', '/'), op });
}
