import { applyChangeToElement } from './apply';
import { Change } from '@venite/ldf';

// mock TextArea
class HTMLTextAreaElement {
  value: string;
}

describe('applyChangeToElement', () => {

  it('should replace text', () => {
    const textarea = new HTMLTextAreaElement();
    textarea.value = 'My name.';

    const change = new Change('/', [
      { p: [0], sd: 'My' },
      { p: [0], si: 'Your' }
    ])

    applyChangeToElement(textarea, change);
    expect(textarea.value).toEqual('Your name.');
  });

});
