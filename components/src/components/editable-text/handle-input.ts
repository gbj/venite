import { Change } from './change';
import { Cursor } from './cursor';

export function handleInput(
  inputType : string,
  data : string,
  textareaValue : string,
  cursor : Cursor
) : Change {
  let edit : Change;

  switch(inputType) {
    /* TODO -- handle other input types **/

    // insert: at cursor, overwrite 0 characters (i.e., insert) with data
    case 'insertText':
    case 'insertFromPaste':
      edit = new Change('insert', cursor.start, 0, data);
      break;

    // insert line break (data is null in this case)
    case 'insertLineBreak':
      edit = new Change('insert', cursor.start, 0, '\n');
      break;

    case 'deleteContentBackward':
    case 'deleteByCut':
      if(cursor.start == cursor.end) {
        // deleteContentBackward w/ collapsed cursor: at cursor - 1, overwrite forward 1 characters with ''
        edit = new Change('delete', cursor.start - 1, 1, '');
      } else {
        // deleteContentBackward w/ open cursor: at cursor start, overwrite forward [length of selection ] characters with ''
        // applies to deleteByCut as well
        edit = new Change('delete', cursor.start, Math.abs(cursor.end - cursor.start), '');
      }
      break;

    // deleteContentBackward: at cursor, overwrite forward [length of selection + 1] characters with ''
    case 'deleteContentForward':
      edit = new Change('delete', cursor.start, Math.abs(cursor.end - cursor.start) + 1, '');
      break;

    // dumb insert: in cases where cursor might not be respected, swap out full text
    case 'insertReplacementText':
    case 'insertFromDrop':
    default:
      edit = new Change('set', null, null, textareaValue);
      break;
  }

  return edit;
}
