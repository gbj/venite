import { Component, Element, Prop, Listen, Event, EventEmitter, Host, State, Watch, h } from '@stencil/core';
import Debounce from 'debounce-decorator';

import { Change, Cursor, ResponsivePrayerLine, BibleReadingVerse, PsalmVerse, Heading } from '@venite/ldf';
import { handleInput } from './handle-input';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-text.i18n.en.json';
const LOCALE = {
  'en': EN
};import { TextFieldTypes } from '@ionic/core';

@Component({
  tag: 'ldf-editable-text',
  styleUrl: 'editable-text.css',
  shadow: true
})
export class EditableTextComponent {
  @Element() element: HTMLElement;
  private textarea : HTMLTextAreaElement | HTMLInputElement;
  private cursor : Cursor;
  private previousText : string;

  @State() currentText : string;
  @State() localeStrings: { [x: string]: string; };

  // Properties
  /**
   * Starting text for editing
   */
  @Prop() text: string;
  @Watch('text')
  textChanged(newText : string) {
    this.currentText = newText;
    this.previousText = this.currentText;
    if(this.textarea) {
      this.textarea.value = this.currentText;
    }
    this.autoGrow();
  }

  /** A JSON Pointer that points to the text field being edited */
  @Prop({ reflect: true }) path: string;

  /** Displays if text is falsy or an empty string */
  @Prop() placeholder: string;

  /** Whether to display as a short, single-line input */
  @Prop() short : boolean;

  /** Optional unit information (e.g., 'px') to add after the input */
  @Prop() unit? : string;

  /** Type to apply to `<input type=...>`, if `short` is `true` */
  @Prop() inputType : TextFieldTypes;

  /** The base object this expresses as part of `LiturgicalDocument`.value */
  @Prop() template : ResponsivePrayerLine | BibleReadingVerse | PsalmVerse | Heading | string = "";

  /** Function that converts a text node into a `template` — used when a node is split */
  @Prop() templateMaker : (s : string) => ResponsivePrayerLine | BibleReadingVerse | PsalmVerse | Heading | string = (s) => s;

  // Life Cycle
  componentDidRender() {
    // After the first render, with text in place, adjust size from minimum
    this.autoGrow();
  }

  // Events

  /** Tells the Editor that the cursor has moved within this input */
  @Event({ bubbles: true }) ldfCursorMoved : EventEmitter<Cursor>;

  /** Tell the Editor that a change has been made to the document */
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  /** Tells the Editor to add another child after this one in the document */
  @Event() ldfAddChildAfter : EventEmitter<{path: string; template: any;}>;

  /** Tells the Editor to merge this node with the previous one in the value */
  @Event() ldfMergeWithPrevious : EventEmitter<{path: string; value: string;}>;

  // Listeners

  /** When the user inputs something, autogrow the textarea and process the input */
  @Listen('input')
  onInput() {
    // first, update the size of the textarea to match the size of the text
    this.autoGrow();
    this.handleInput();
  }

  // Debounce calculating and emitting the change so we can send multi-character changes
  @Debounce(1250)
  handleInput() {
    this.registerCursor();
  
    // calculate changes to be made
    const change = handleInput(this.cursor.path, this.previousText, this.cursor.element.value, this.inputType);

    // save previous value for diffing purposes on next change
    this.previousText = this.cursor?.element?.value || '';

    // emit the event
    this.ldfDocShouldChange.emit(change);
  }

  // This textarea no longer has the focus, so we no longer know where the cursor is
  @Listen('focusout')
  onFocusOut() {
    this.cursor = undefined;
    this.ldfCursorMoved.emit(undefined);
  }

  // Each of focus/select/click/keydown could indicate an action taken that has moved the caret or selection
  @Listen('select')
  onSelect() {
    this.registerCursor();
  }

  @Listen('focus')
  onFocus() {
    this.registerCursor();
  }

  @Listen('click')
  onClick() {
    this.registerCursor();
  }

  @Listen('keydown')
  onKeyDown() {
    this.registerCursor();
  }

  // Private Methods
  /** Sets private cursor field to a Cursor instance and sends it as a `cursor` event */
  registerCursor() : Cursor {
    const start = this.textarea.selectionStart,
          end = this.textarea.selectionEnd;
    if(!this.cursor || start !== this.cursor?.start || end !== this.cursor?.end) {
      this.cursor = new Cursor(this.path, this.textarea.selectionStart, this.textarea.selectionEnd, this.textarea);
      this.emitCursor(this.cursor);
    }
    return this.cursor;
  }

  /** Expand the child textarea vertically to fit its content */
  autoGrow() {
    if(!this.short && this.textarea) {
      /* this code is cosmetic, not essential, and relies on the global `window`
       * we can't guarantee that `window` is always available (e.g., in Angular Universal)
       * so if there’s no window, just do nothing and let the textarea UI be */
      if(window) {
        // reset the textarea height
        this.textarea.style.height = '1.5em';

        // calculate the textarea’s height
        const computed = window.getComputedStyle(this.textarea),
              height = parseInt(computed.getPropertyValue('border-top-width')) +
                       parseInt(computed.getPropertyValue('padding-top')) +
                       this.textarea.scrollHeight +
                       parseInt(computed.getPropertyValue('padding-bottom')) +
                       parseInt(computed.getPropertyValue('border-bottom-width')) +
                       5;

        // set the new height of the textarea
        this.textarea.style.height = `${height}px`;
      }
    }
  }

  /** Check for one of
   * 1) Enter at end of textarea => emit an event telling the parent to add another node in its value here
   * 2) Enter in middle of line => add a line break (i.e., normal behavior)
   * 3) Shift + Enter anywhere => add a line break (i.e., normal behavior) */
  checkEnter(event : KeyboardEvent) {
    this.registerCursor();

    // if this is an Enter key event without the shift key
    if(event.keyCode == 13 && !event.shiftKey) {
      // at the end of the textarea — add child after
      if(this.cursor?.start == this.textarea.value.length) {
        event.preventDefault();
        this.ldfAddChildAfter.emit({path: this.path, template: this.template});
      }
      // in the middle of the textarea — split the node
      else {
        event.preventDefault();
        const unsplitValue = this.textarea.value,
          firstHalf = unsplitValue.slice(0, this.cursor?.start ?? 0),
          secondHalf = unsplitValue.slice(this.cursor?.start ?? 0, this.textarea.value.length);
        this.ldfDocShouldChange.emit(new Change({path: this.path, op: [{ type: 'set', oldValue: unsplitValue, value: firstHalf }]}));
        this.ldfAddChildAfter.emit({path: this.path, template: this.templateMaker(secondHalf)});
      }
    }

    // if this is a Backspace key event at the beginning of the textarea
    if(event.keyCode == 8 && this.cursor?.start == 0 && this.cursor?.end == 0) {
      event.preventDefault();
      this.ldfMergeWithPrevious.emit({ path: this.path, value: this.currentText});
    }
  }

  // Lifecycle
  componentWillLoad() {
    this.loadLocaleStrings();
    this.textChanged(this.text);
    this.previousText = this.text;
  }

  // Debounce emitting the change, not registering the change
  // That means the cursor will also be in the right place when edits need to refer to it,
  // but also that we won't be sending cursor updates to the server constantly as we type
  @Debounce(500)
  emitCursor(cursor : Cursor) {
    this.ldfCursorMoved.emit(cursor);
  }

  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  render() {
    const localeStrings = this.localeStrings || {};

    // Ordinarily, use textarea
    if(!this.short) {
      return (
        <Host>
          <textarea
            ref={el => this.textarea = el as HTMLTextAreaElement}
            placeholder={this.placeholder || localeStrings.placeholder}
            onKeyDown={(event : KeyboardEvent) => this.checkEnter(event)}>{this.currentText}</textarea>
        </Host>
      );
    } else {
      return (
        <Host>
          <ion-input
            ref={async el => this.textarea = await el.getInputElement()}
            placeholder={this.placeholder || localeStrings.placeholder}
            value={this.currentText}
            onKeyDown={(event : KeyboardEvent) => this.checkEnter(event)}
            type={this.inputType || 'text'}>
          </ion-input>
          {this.unit && this.unit}
        </Host>
      );
    }
  }
}
