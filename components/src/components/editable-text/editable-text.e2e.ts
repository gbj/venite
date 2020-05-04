import { newE2EPage } from '@stencil/core/testing';
import { EditableTextComponent } from './editable-text';

import { handleInput } from './handle-input';
import { Cursor } from './cursor';
import { TextEdit } from './text-edit';

describe('ldf-editable-text', () => {
  it('should render initial text', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-editable-text text="Keep watch, dear Lord"></ldf-editable-text>');

    const textarea = await page.find('ldf-editable-text >>> textarea'),
          cursor = new Cursor(textarea, 0, 0);

    let value = await textarea.getProperty('value');
    expect(value).toBe('Keep watch, dear Lord');
  });

  it('should handle insert into a blank string', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-editable-text text=""></ldf-editable-text>');

    const textarea = await page.find('ldf-editable-text >>> textarea'),
          cursor = new Cursor(textarea, 0, 0);

    let value = await textarea.getProperty('value');
    expect(value).toBe('');

    const textEdited = await page.spyOnEvent('textEdited');

    await textarea.press('T');
    await page.keyboard.down('Shift');
    await textarea.press('KeyE');
    await textarea.press('KeyS');
    await textarea.press('KeyT');
    await page.keyboard.up('Shift');

    let value2 = await textarea.getProperty('value');
    expect(value2).toBe('TEST');

    await page.waitForChanges();

    expect(textEdited).toHaveReceivedEventDetail([{
      op: 'insert',
      pos: 0,
      length: 0,
      value: 'TEST'
    }]);
  });

  it('do not merge multiple Backspace presses into one', async () => {
    const page = await newE2EPage();

    await page.setContent('<ldf-editable-text text=""></ldf-editable-text>');

    const textarea = await page.find('ldf-editable-text >>> textarea'),
          cursor = new Cursor(textarea, 4, 4);

    let value = await textarea.getProperty('value');
    expect(value).toBe('');

    await textarea.press('T');
    await textarea.press('h');
    await textarea.press('i');
    await textarea.press('s');
    await textarea.press(' ');
    await textarea.press('i');
    await textarea.press('s');

    await page.waitForChanges();
    let value2 = await textarea.getProperty('value');
    expect(value2).toBe('This is');

    const textEdited = await page.spyOnEvent('textEdited');

    await textarea.press('Backspace');
    await textarea.press('Backspace');
    await textarea.press('Backspace');
    await textarea.press('Backspace');

    await page.waitForChanges();
    let value3 = await textarea.getProperty('value');
    expect(value3).toBe('Thi')

    expect(textEdited).toHaveReceivedEventDetail([{
      op: 'delete',
      pos: 6,
      length: 1,
      value: ''
    }, {
      op: 'delete',
      pos: 5,
      length: 1,
      value: ''
    }, {
      op: 'delete',
      pos: 4,
      length: 1,
      value: ''
    }, {
      op: 'delete',
      pos: 3,
      length: 1,
      value: ''
    }]);
  });
});
