import { handleInput } from './handle-input';
import { Cursor, Change } from '@venite/ldf';
import * as jot from 'jot';

it('insertText: should generate events to JOT-apply an insert to blank string', async () => {
  const original = {
    'value': ''
  };

  const cursor = new Cursor(undefined, 0, 0);
  const event : Change = handleInput('insertText', 'TEST', undefined, cursor);

  const jots = new jot.APPLY('value',
    new jot.SPLICE(event.pos, event.length, event.value)
  );

  const edited = jots.apply(original);

  expect(original.value).toBe('');
  expect(edited.value).toBe('TEST');
});

it('insertText: should generate events to JOT-apply an insert to any string', async () => {
  const original = {
    'value': 'The Lord is good to me.'
  };

  const cursor = new Cursor(undefined, 8, 0);
  const event : Change = handleInput('insertText', ' my God', undefined, cursor);

  const jots = new jot.APPLY('value',
    new jot.SPLICE(event.pos, event.length, event.value)
  );

  const edited = jots.apply(original);

  expect(original.value).toBe('The Lord is good to me.');
  expect(edited.value).toBe('The Lord my God is good to me.');
});

it('insertText: replaces text when cursor is expanded and not collapsed', async () => {
  const original = {
    'value': 'The Lord is good to me.'
  };

  const cursor = new Cursor(undefined, 0, 3);
  const event : Change = handleInput('insertText', 'My', undefined, cursor);

  const jots = new jot.APPLY('value',
    new jot.SPLICE(event.pos, event.length, event.value)
  );

  const edited = jots.apply(original);

  expect(original.value).toBe('The Lord is good to me.');
  expect(edited.value).toBe('My Lord is good to me.');
});

it('insertFromPaste: should generate events to JOT-apply an insert to any string', async () => {
  const original = {
    'value': 'The Lord is good to me.'
  };

  const cursor = new Cursor(undefined, 8, 0);
  const event : Change = handleInput('insertFromPaste', ' my God', undefined, cursor);

  const jots = new jot.APPLY('value',
    new jot.SPLICE(event.pos, event.length, event.value)
  );

  const edited = jots.apply(original);

  expect(original.value).toBe('The Lord is good to me.');
  expect(edited.value).toBe('The Lord my God is good to me.');
});

it('insertLineBreak: should generate events to JOT-apply an insert to any string', async () => {
  const original = {
    'value': 'The Lord is good to me.'
  };

  const cursor = new Cursor(undefined, 9, 0);
  const event : Change = handleInput('insertLineBreak', null, undefined, cursor);

  const jots = new jot.APPLY('value',
    new jot.SPLICE(event.pos, event.length, event.value)
  );

  const edited = jots.apply(original);

  expect(original.value).toBe('The Lord is good to me.');
  expect(edited.value).toBe('The Lord \nis good to me.');
});

it('deleteContentBackward', async () => {
  const original = {
    'value': 'The Lord is good to me.'
  };

  const cursor = new Cursor(undefined, 23, 23);
  const events : Change[] = [handleInput('deleteContentBackward', null, undefined, cursor)];
  cursor.start--;
  cursor.end--;
  events.push(handleInput('deleteContentBackward', null, undefined, cursor));

  expect(events).toEqual([
    {
      op: 'delete',
      pos: 22,
      length: 1,
      value: ''
    }, {
      op: 'delete',
      pos: 21,
      length: 1,
      value: ''
    }
  ]);

  const jots = new jot.LIST(events.map(event =>
    new jot.APPLY('value',
      new jot.SPLICE(event.pos, event.length, event.value)
    )
  ));

  const edited = jots.apply(original);

  expect(original.value).toBe('The Lord is good to me.');
  expect(edited.value).toBe('The Lord is good to m');
});

it('deleteContentForward', async () => {
  const original = {
    'value': 'The Lord is good to me.'
  };

  const cursor = new Cursor(undefined, 0, 0);
  const events : Change[] = [handleInput('deleteContentForward', null, undefined, cursor)];
  events.push(handleInput('deleteContentForward', null, undefined, cursor));
  events.push(handleInput('deleteContentForward', null, undefined, cursor));

  expect(events).toEqual([
    {
      op: 'delete',
      pos: 0,
      length: 1,
      value: ''
    }, {
      op: 'delete',
      pos: 0,
      length: 1,
      value: ''
    }, {
      op: 'delete',
      pos: 0,
      length: 1,
      value: ''
    }
  ]);

  const jots = new jot.LIST(events.map(event =>
    new jot.APPLY('value',
      new jot.SPLICE(event.pos, event.length, event.value)
    )
  ));

  const edited = jots.apply(original);

  expect(original.value).toBe('The Lord is good to me.');
  expect(edited.value).toBe(' Lord is good to me.');
});

it('test whole-text substitution for e.g., insertFromDrop', async () => {
  const original = {
    'value': 'The Lord is good to me.'
  };

  const cursor = new Cursor(undefined, 0, 0);

  const event : Change = handleInput('historyUndo', null, 'The Lord is good to ', cursor);

  expect(event).toEqual(
    new Change('set', null, null, 'The Lord is good to ')
  );

  const jots = new jot.APPLY('value',
    new jot.SET(event.value)
  );

  const edited = jots.apply(original);

  expect(original.value).toBe('The Lord is good to me.');
  expect(edited.value).toBe('The Lord is good to ');
});
