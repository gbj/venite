import { handleInput } from './handle-input';
import { Change } from '@venite/ldf';

describe('handleInput', () => {
  it('should generate events to apply an insert to blank string', async () => {
    const original = '';

    const event : Change = handleInput('/', original, 'Test.');

    expect(event).toEqual(new Change({
      path: '/',
      op: [
        {
          type: 'edit' as 'edit',
          value: ['Test.']
        }
      ]
    }));
  });

  it('should generate events to apply changes to any string', async () => {
    const original = 'My name.';

    const event : Change = handleInput('/', original, 'Your name.');

    expect(event).toEqual(new Change({
      path: '/',
      op: [
        {
          type: 'edit' as 'edit',
          value: [{ d: 2 }, 'Your']
        }
      ]
    }));
  });

  it('should generate changes to an undefined field', async () => {
    const original = undefined;

    const event : Change = handleInput('/', original, 'Your name.');

    expect(event).toEqual(new Change({
      path: '/',
      op: [
        {
          type: 'insertAt' as 'insertAt',
          value: 'Your name.'
        }
      ]
    }));
  });

  it('should handle inserts into text', async () => {
    const original = 'Your name';

    const event : Change = handleInput('/', original, 'Your real na');

    expect(event).toEqual(new Change({
      path: '/',
      op: [
        {
          type: 'edit' as 'edit',
          value: [5, 'real ', 2, { d: 2}]
        }
      ]
    }));
  });
})
