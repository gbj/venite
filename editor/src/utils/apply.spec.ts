import { applyChangeToElement } from './apply';
import { Change } from '@venite/ldf';

describe('applyChangeToElement', () => {
  it('should overrwrite text with inserts', () => {
    const textarea = new HTMLTextAreaElement();
    textarea.value = 'This is a sentence.';

    const change = new Change('/fake/path', 'insert', 0, 4, 'It');

    applyChangeToElement(textarea, change);
    expect(textarea.value).toEqual('It is a sentence.');
  })
})
