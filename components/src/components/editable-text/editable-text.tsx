import { Component, Element, Prop, Listen, Event, EventEmitter, Host, State, Watch, h } from '@stencil/core';
import Debounce from 'debounce-decorator';

import { Change, Cursor, ResponsivePrayerLine, BibleReadingVerse, PsalmVerse, Heading } from '@venite/ldf';
import { handleInput } from './handle-input';
import { getLocaleComponentStrings } from '../../utils/locale';
import { TextFieldTypes } from '@ionic/core';

@Component({
  tag: 'ldf-editable-text',
  styleUrl: 'editable-text.css',
  shadow: true
})
export class EditableTextComponent {
  @Element() el: HTMLElement;
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

  /** Type to apply to `<input type=...>`, if `short` is `true` */
  @Prop() inputType : TextFieldTypes;

  /** The base object this expresses as part of `LiturgicalDocument`.value */
  @Prop() template : ResponsivePrayerLine | BibleReadingVerse | (PsalmVerse | Heading)[] | string = "";

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
  @Debounce(500)
  handleInput() {
    // calculate changes to be made
    const change = handleInput(this.cursor.path, this.previousText, this.cursor.element.value);

    // save previous value for diffing purposes on next change
    this.previousText = this.cursor.element.value;

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
    if(!this.cursor || start !== this.cursor.start || end !== this.cursor.end) {
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

    console.log('event keyCode', event.keyCode,'cursor', this.cursor.start, '=>', this.cursor.end);

    // if this is an Enter key event without the shift key at the end of the textarea
    if(event.keyCode == 13 && !event.shiftKey && this.cursor.start == this.textarea.value.length) {
      event.preventDefault();
      this.ldfAddChildAfter.emit({path: this.path, template: this.template});
    }

    // if this is a Backspace key event at the beginning of the textarea
    if(event.keyCode == 8 && this.cursor.start == 0 && this.cursor.end == 0) {
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
  @Debounce(200)
  emitCursor(cursor : Cursor) {
    this.ldfCursorMoved.emit(cursor);
  }

  /** Asynchronously return localization strings */
  async getLocaleStrings() : Promise<{ [x: string]: string; }> {
    if(!this.localeStrings) {
      await this.loadLocaleStrings();
      return this.localeStrings;
    } else {
      return this.localeStrings;
    }
  }

  /** Asynchronously load localization strings */
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = await getLocaleComponentStrings(this.el);
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
        </Host>
      );
    }
  }
}
