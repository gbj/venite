import { Component, Element, Prop, Listen, Event, EventEmitter, Host, State, Watch, h } from '@stencil/core';
import Debounce from 'debounce-decorator';

import { Change, Cursor } from '@venite/ldf';
import { handleInput } from './handle-input';
import { getLocaleComponentStrings } from '../../utils/locale';

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

  // Life Cycle
  componentDidRender() {
    // After the first render, with text in place, adjust size from minimum
    this.autoGrow();
  }

  // Events
  @Event({ bubbles: true }) ldfCursorMoved : EventEmitter<Cursor>;
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  @Listen('beforeinput')
  onBeforeInput() {
    this.previousText = this.cursor.element.value;
  }

  // Listeners
  @Listen('input')
  async onInput() {
    // first, update the size of the textarea to match the size of the text
    this.autoGrow();
    this.handleInput();
  }

  // Debounce calculating and emitting the change so we can send multi-character changes
  @Debounce(200)
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
            placeholder={this.placeholder || localeStrings.placeholder}>{this.currentText}</textarea>
        </Host>
      );
    } else {
      return (
        <Host>
          <ion-input
            ref={async el => this.textarea = await el.getInputElement()}
            placeholder={this.placeholder || localeStrings.placeholder}
            value={this.currentText}>
          </ion-input>
        </Host>
      );
    }
  }
}
