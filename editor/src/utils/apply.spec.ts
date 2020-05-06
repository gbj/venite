import { applyChangeToElement } from './apply';
import { Change } from '@venite/ldf';

// mock TextArea
class HTMLTextAreaElement {
  value: string;
}

describe('applyChangeToElement', () => {

  it('should overrwrite text with inserts', () => {
    const textarea = new HTMLTextAreaElement();
    textarea.value = 'This is a sentence.';

    const change = new Change('/fake/path', 'insert', 0, 4, 'It');

    applyChangeToElement(textarea, change);
    expect(textarea.value).toEqual('It is a sentence.');
  });

  it('should plain insert text', () => {
    const textarea = new HTMLTextAreaElement();
    textarea.value = 'This is a sentence.';

    const change = new Change('/fake/path', 'insert', 0, 0, 'A');

    applyChangeToElement(textarea, change);
    expect(textarea.value).toEqual('AThis is a sentence.');
  });

  it('should delete', () => {
    const textarea = new HTMLTextAreaElement();
    textarea.value = 'This is a sentence.';

    applyChangeToElement(textarea, new Change('/fake/path', 'delete', 3, 1, ''));
    applyChangeToElement(textarea, new Change('/fake/path', 'delete', 2, 1, ''));
    applyChangeToElement(textarea, new Change('/fake/path', 'delete', 1, 1, ''));
    applyChangeToElement(textarea, new Change('/fake/path', 'delete', 0, 1, ''));
    expect(textarea.value).toEqual(' is a sentence.');
  });

  it('should handle mixed inserts and deletes', () => {
    const textarea = new HTMLTextAreaElement();
    textarea.value = 'This is a sentence.';

    applyChangeToElement(textarea, new Change('/fake/path', 'delete', 3, 1, ''));
    applyChangeToElement(textarea, new Change('/fake/path', 'delete', 2, 1, ''));
    applyChangeToElement(textarea, new Change('/fake/path', 'insert', 2, 0, 'Test'));
    applyChangeToElement(textarea, new Change('/fake/path', 'delete', 5, 1, ''));
    applyChangeToElement(textarea, new Change('/fake/path', 'delete', 4, 1, ''));
    expect(textarea.value).toEqual('ThTe is a sentence.');
  });

  it('should handle sets', () => {
    const textarea = new HTMLTextAreaElement();
    textarea.value = 'This is a sentence.';

    applyChangeToElement(textarea, new Change('/fake/path', 'set', 0, 0, 'Boom.'));
    expect(textarea.value).toEqual('Boom.');
  });

  it('should handle ranged delete', () => {
    const textarea = new HTMLTextAreaElement();
    textarea.value = 'The Lord Almighty grant us a peaceful night and a perfect end.';

    applyChangeToElement(textarea, new Change('/fake/path', 'delete', 0, 3, ''));
    expect(textarea.value).toEqual(' Lord Almighty grant us a peaceful night and a perfect end.');
  });

});
