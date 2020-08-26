import { Change } from '@venite/ldf';
import { TextFieldTypes } from '@ionic/core';

import DiffMatchPatch from 'diff-match-patch';

export function handleInput(inPath: string, oldValue: string, newValue: string, inputType: TextFieldTypes) : Change {
  const path = inPath?.replace('//', '/');

  console.log('handleInput', inPath, '\n\noldValue: ', oldValue, '\n\nnewValue:', newValue);

  if(!oldValue) {
    console.log('[ldf-editable-text] previous value was undefined; new value is ', newValue);
    return new Change({ path, op: [{ type: 'set' as 'set', oldValue, value: newValue }] });
  } else if(typeof oldValue === 'number' || inputType == 'number') {
    return new Change({ path, op: [{ type: 'set' as 'set', oldValue: Number(oldValue), value: Number(newValue) }]});
  } else {
    // Build DiffMatchPatch patches from oldValue and newValue
    const dmp = new DiffMatchPatch(),
          diff = dmp.diff_main(oldValue, newValue);
    dmp.diff_cleanupSemantic(diff);
    const patches = dmp.patch_make(oldValue, diff);

    // Iterate over patches to build a `Change.op`
    const op = new Array();
    patches.forEach(patch => {
      const values = new Array();

      // start `skipCounter` at the patch start
      let skipCounter = patch.start1;

      patch.diffs.forEach(([operation, value]) => {
        switch(operation) {
          case 0:  // No Change
            skipCounter += value.length;
            break;
          case 1:  // Insert
            if(skipCounter > 0) {
              values.push(skipCounter);
              skipCounter = 0;
            }
            values.push(value);
            break;
          case -1: // Delete
            if(skipCounter > 0) {
              values.push(skipCounter);
              skipCounter = 0;
            }
            values.push({ d: value.length });
            break;
        }
      })
      op.push({ type: 'edit', value: values });
    });

    return new Change({ path, op });
  }
}
