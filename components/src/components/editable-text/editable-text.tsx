import { Component, Element, Prop, Listen, Event, EventEmitter, Method, Host, State, Watch, h } from '@stencil/core';
import Debounce from 'debounce-decorator';

import { Change, Cursor } from '@venite/ldf';
import { handleInput } from './handle-input';
import { consolidateChanges } from './consolidate-changes';
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
  private edits : Change[] = new Array();
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
  }

  /**
   * A JSON Pointer that points to the Collect being edited
   */
  @Prop({ reflect: true }) path: string;

  /**
   * Displays if text is falsy or an empty string
   */
  @Prop() placeholder: string;

  /**
   * Whether to display as a short, single-line input
   */
  @Prop() short : boolean;

  // Life Cycle
  componentDidRender() {
    // After the first render, with text in place, adjust size from minimum
    this.autoGrow();
  }

  // Events
  @Event({ bubbles: true }) cursorMoved : EventEmitter<Cursor>;
  @Event({ bubbles: true }) docChanged : EventEmitter<Change[]>;

  // Listeners
  @Listen('input')
  async onInput() {
    // first, update the size of the textarea to match the size of the text
    this.autoGrow();

    // second, determine the appropriate Change event to be sent, depending
    // on the input type

    // push this particular edit onto the stack
    this.edits.push(handleInput(this.cursor.path, this.previousText, this.cursor.element.value));
    this.previousText = this.cursor.element.value;

    /* call the processEvents() to emit an event
     * this method is debounced so that, as we type, new edits will be pushed onto the stack
     * and will finally be collated and emitted as an event */
    const consolidated = this.processEdits();
    console.log('consolidated = ', consolidated);

  }

  /** Reduces the list of edits triggered by input events to as few contiguous edits as possible.
   *  and emits it as a `docChanged` event  */
  @Debounce(200)
  processEdits() : Change[] {
    const consolidated =  consolidateChanges(this.cursor.path, this.edits);

    // clear out the old edits
    this.edits = new Array();

    // emit and return the new ones
    this.docChanged.emit(consolidated);
    return consolidated;
  }

  // This textarea no longer has the focus, so we no longer know where the cursor is
  @Listen('focusout')
  onFocusOut() {
    this.cursor = undefined;
    this.cursorMoved.emit(undefined);
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

  // Public Methods
  /** Sets private cursor field to a Cursor instance and sends it as a `cursor` event */
  @Method()
  async registerCursor() : Promise<Cursor> {
    const start = this.textarea.selectionStart,
          end = this.textarea.selectionEnd;
    if(!this.cursor || start !== this.cursor.start || end !== this.cursor.end) {
      this.cursor = new Cursor(this.path, this.textarea.selectionStart, this.textarea.selectionEnd, this.textarea);
      this.emitCursor(this.cursor);
    }
    return this.cursor;
  }

  /** Expand the child textarea horizontally to fit its content */
  autoGrow() {
    if(!this.short) {
      /* this code is cosmetic, not essential, and relies on the global `window`
       * we can't guarantee that `window` is always available (e.g., in Angular Unievrsal)
       * so if there’s no window, just do nothing and let the textarea UI be
       */
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
    this.cursorMoved.emit(cursor);
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
          <input
            ref={el => this.textarea = el as HTMLInputElement}
            placeholder={this.placeholder || localeStrings.placeholder}
            value={this.currentText}/>
        </Host>
      );
    }
  }
}
