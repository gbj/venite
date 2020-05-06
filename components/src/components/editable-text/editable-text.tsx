import { Component, Element, Prop, Listen, Event, EventEmitter, Method, Host, h } from '@stencil/core';
import Debounce from 'debounce-decorator';

import { Change, Cursor } from '@venite/ldf';
import { handleInput } from './handle-input';

@Component({
  tag: 'ldf-editable-text',
  styleUrl: 'editable-text.css',
  shadow: true
})
export class EditableTextComponent {
  @Element() el: HTMLElement;
  private textarea : HTMLTextAreaElement;
  private cursor : Cursor;
  private edits : Change[] = new Array();

  // Properties
  /**
   * Starting text for editing
   */
  @Prop() text: string;

  /**
   * A JSON Pointer that points to the Collect being edited
   */
  @Prop({ reflect: true }) path: string;

  /**
   * Displays if text is falsy or an empty string
   */
  @Prop() placeholder: string;

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
  onInput(ev : InputEvent) {
    // first, update the size of the textarea to match the size of the text
    this.autoGrow();

    // second, determine the appropriate Change event to be sent, depending
    // on the input type
    let edit : Change = handleInput(ev.inputType, ev.data, this.cursor.element.value, this.cursor);

    // push this particular edit onto the stack
    this.edits.push(edit);

    /* call the processEvents() to emit an event
     * this method is debounced so that, as we type, new edits will be pushed onto the stack
     * and will finally be collated and emitted as an event */
    this.processEdits();
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

  // Debounce emitting the change, not registering the change
  // That means the cursor will also be in the right place when edits need to refer to it,
  // but also that we won't be sending cursor updates to the server constantly as we type
  @Debounce(200)
  emitCursor(cursor : Cursor) {
    this.cursorMoved.emit(cursor);
  }

  /** Reduces the list of edits triggered by input events to as few contiguous edits as possible.
   *  and emits it as a `docChanged` event  */
  @Debounce(200)
  @Method()
  async processEdits() : Promise<Change[]> {
    const consolidatedEdits : Change[] = new Array();
    let consolidated : Change;

    // Edits have been accumulating in a queue in this.edits on each input
    // copy this into a local variable, and clear out the queue
    const edits = this.edits;
    this.edits = new Array();

    /** consolidate these edits into the smallest number of possible changes
      * for example, merge
      * @example
      * yields 'The', '(Backspace)', 'is'
      * from six changes 'T' 'h' 'e' '(Backspace)' 'i' 's' */
    edits.forEach((cur, index) => {
      if(cur.op == 'insert') {
        const next = edits[index + 1];

        if(!consolidated) {
          consolidated = new Change(cur.path, cur.op, cur.pos, cur.length, cur.value);
        } else {
          consolidated = new Change(cur.path, cur.op, consolidated.pos, consolidated.length + cur.length, `${consolidated.value}${cur.value}`);
        }

        if(!next) {
          consolidatedEdits.push(consolidated);
        }
      } else {
        if(consolidated) {
          consolidatedEdits.push(consolidated);
        }
        consolidatedEdits.push(cur);
      }
    });

    console.log(consolidatedEdits);
    this.docChanged.emit(consolidatedEdits);
    this.edits = new Array();
    return consolidatedEdits;
  }

  // Private Methods
  autoGrow() {
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

  render() {
    return (
      <Host>
        <textarea
          ref={el => this.textarea = el as HTMLTextAreaElement}
          placeholder={this.placeholder}>{this.text}</textarea>
      </Host>
    );
  }
}
