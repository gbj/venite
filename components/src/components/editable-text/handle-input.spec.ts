import { handleInput } from './handle-input';
import { Cursor, Change } from '@venite/ldf';
import * as json0 from 'ot-json0';

describe('handleInput', () => {
  it('should generate events to apply an insert to blank string', async () => {
    const original = '';

    const cursor = new Cursor(undefined, 0, 0);
    const event : Change = handleInput('/', original, 'Test.');

    expect(event).toEqual(new Change('/', [ { p: [0], si: 'Test.' }]));
  });

  it('should generate events to apply changes to any string', async () => {
    const original = 'My name.';

    const cursor = new Cursor(undefined, 0, 0);
    const event : Change = handleInput('/', original, 'Your name.');

    expect(event).toEqual(new Change('/', [
      { p: [0], sd: 'My' },
      { p: [0], si: 'Your' }
    ]));
  });
})
