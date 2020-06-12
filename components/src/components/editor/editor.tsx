import { Component, Element, State, Listen, Host, Prop, Watch, Event, EventEmitter, JSX, h } from '@stencil/core';
import Debounce from 'debounce-decorator';

import { Cursor, Change, LiturgicalDocument, User } from '@venite/ldf';

import { elementFromPath } from './utils/element-from-path';
import getCaretCoordinates from 'textarea-caret';
import Values from 'values.js';

@Component({
  tag: 'ldf-editor',
  styleUrl: 'editor.css',
  shadow: true
})
export class EditorComponent {
  @Element() el: HTMLElement;

  // States
  @State() obj : LiturgicalDocument;

  @State() cursor: Cursor;

  @State() focusObj : { obj: LiturgicalDocument; path: string; };

  @State() cursorPos : {
    // indexed by username
    [user: string]: {
      start: { left: number; top : number; };
      end: { left: number; top : number; };
      target: HTMLTextAreaElement | HTMLInputElement;
    }
  } = {};

  // Props

   /** An LDF LiturgicalDocument object. */
  @Prop() doc : LiturgicalDocument | string;
  @Watch('doc')
  async docChanged(newDoc : LiturgicalDocument | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new LiturgicalDocument(JSON.parse(newDoc));
      } else {
        this.obj = new LiturgicalDocument(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new LiturgicalDocument();
    }
  }

  /** Users currently active in the document */
  @Prop() users : { [uid: string]: User; };

  /** Unique ID for the user editing in this editor */
  @Prop() uid : string;

  /** Cursor positions of active users */
  @Prop() cursors : { [user: string]: Cursor };
  @Watch('cursors')
  cursorsChanged() {
    this.clearCursors();
    this.resetCursors();
  }

  // Events
  /** User's cursor/selection changed */
  @Event() editorCursorMoved: EventEmitter<Cursor>;

  /** User has edited the document */
  @Event() editorDocShouldChange : EventEmitter<Change>;

  // Life Cycle
  connectedCallback() {
    // initial document load from property
    this.docChanged(this.doc);
  }

  // Listeners
  /** Watch for cursor moves bubbled up from the editable-texts and emit them from the editor */
  @Listen('ldfCursorMoved')
  onCursorMoved(ev : CustomEvent) {
    this.editorCursorMoved.emit(ev.detail || new Cursor('', 0, 0, undefined));
  }

  /** Watch for messages that doc should change from child components and emit them from the editor */
  @Listen('ldfDocShouldChange', { target: 'document' })
  onDocShouldChange(ev : CustomEvent) {
    console.log('ldf-editor is emitting change', ev.detail);
    this.editorDocShouldChange.emit(ev.detail);
  }

  /** Tells the Editor to add another child after this one in the document */
  @Listen('ldfAddChildAfter')
  onAddChildAfter(ev : CustomEvent) {
    // ev.detail is a string JSON pointer path, like  // /value/0/value/0
    const parts = ev.detail.path.split('/'),          // ["", "value", "0", "value", "0"]
          index = parts.slice(parts.length - 1)[0],   // "0"
          base = parts.slice(0, parts.length - 1);    // ["", "value", "0", "value"]

    // if 'index' is not a number (e.g., if you're in a psalm and pressed Enter in /value/0/value/0/verse),
    // then drop it and use the preceding parts of the path
    let root : string;
    if(Number(index) >= 0) {
      root = base.join('/');
    } else {
      const penultimate = parts.slice(parts.length - 2, parts.length - 1)[0],
            penultimateBase = parts.slice(0, parts.length - 2);
      root = [ ... penultimateBase, penultimate].join('/');
    }
    console.log(ev.detail.path, parts, base, index);
    const change = new Change({
            path: root,
            op: [{
              type: 'insertAt',
              index: Number(index) >= 0 ? Number(index) + 1 : undefined,
              value: ev.detail.template
            }]
          });
    console.log('addChildAfter - emit change', change);
    this.editorDocShouldChange.emit(change);
  }

  /** Tells the Editor to merge this node with the previous one in the value */
  @Listen('ldfMergeWithPrevious')
  onMergeWithPrevious(ev : CustomEvent ) {
    console.log('mergeWithPrevious', ev.detail.path, ev.detail.value);
    const path = ev.detail.path,
          parts = path.split('/'),                    // ["", "value", "0", "value", "0"]
          index = parts.slice(parts.length - 1)[0],   // "0"
          base = parts.slice(0, parts.length - 1),    // ["", "value", "0", "value"]
          root = base.join('/'),
          previousIndex = Number(index) - 1;

    // if we've fired this on the first element, do nothing
    if(previousIndex >= 0) {
      // otherwise, look up the value of the previous element
      const previousElement = elementFromPath(this.el, `${root}/${previousIndex}`),
            textarea = previousElement.shadowRoot.querySelector('textarea'),
            previousValue = textarea?.value,
            // delete the deleted node
            deleteOp = {
              type: 'deleteAt' as 'deleteAt',
              index: Number(index) >= 0 ? Number(index) : undefined,
              oldValue: ev.detail.value
            },
            // insert text into the previous node
            editOp = {
              type: 'edit' as 'edit',
              index: Number(previousIndex),
              value: previousValue.length > 0 ? [previousValue.length, ev.detail.value] : [ev.detail.value]
            },
            deleteChange = new Change({
              path: root,
              op: [
                deleteOp
              ]
            }),
            editChange = new Change({
              path: root,
              op: [
                editOp
              ]
            });
      console.log('mergeWithPrevious emitting', this.obj, deleteChange, editChange);
      this.editorDocShouldChange.emit(deleteChange);
      this.editorDocShouldChange.emit(editChange);
    }
  }

  // Listen for scroll and window resize events and reset the cursors accordingly
  // (the cursor reset method is debounced)
  @Listen('scroll', { target: 'document' })
  onScroll() {
    this.clearCursors();
    this.resetCursors();
  }

  @Listen('resize', { target: 'window' })
  onResize() {
    this.clearCursors();
    this.resetCursors();
  }

  // listen for `LiturgicalDocumentComponent` to fire `focusObj` and `focusPath` events when it is focused
  @Listen('focusObj')
  onFocusObj(ev : CustomEvent) {
    this.focusObj = ev.detail;
  }

  // Local Methods
  clearCursors() {
    this.cursorPos = {};
  }

  // Debounce resetCursors() for e.g., scroll
  @Debounce(20)
  resetCursors() {
    const newCursorPos = {},
          cursors = this.cursors || {};
    Object.keys(cursors).forEach(username => {
      const cursor = cursors[username];
      this.cursorToPos(cursor, username, newCursorPos)
    });
    this.cursorPos = newCursorPos;
  }

  // mutates cursorPos
  cursorToPos(data : Cursor, user : string, cursorPos : any) {
    if(data && data.path) {
      // Cursor is somewhere
      const target : HTMLElement = elementFromPath(this.el, data.path);
      if(target) {
        let textarea : HTMLTextAreaElement | HTMLInputElement = target.shadowRoot.querySelector('textarea');
        if(!textarea) {
          textarea = target.shadowRoot.querySelector('input');
        }

        const rect = textarea.getBoundingClientRect();

        const start = getCaretCoordinates(textarea, data.start, undefined),
              end = getCaretCoordinates(textarea, data.end, undefined);

        cursorPos[user] = {
          start: { top: start.top + rect.top, left: start.left + rect.left},
          end: { top: end.top + rect.top, left: end.left + rect.left},
          target: textarea
        };
      } else {
        // Cursor is nowhere; hide this user's cursor
        cursorPos[user] = undefined;
      }
    } else {
      // Cursor is nowhere; hide this user's cursor
      cursorPos[user] = undefined;
    }
  }

  // Render helpers
  buildCursorMarker(uid : string) : JSX.Element[] {
    const user = this.users[uid],
          pos = this.cursorPos[uid];

    if(user && pos && this.uid !== uid) {
      console
      const fontSize = getComputedStyle(pos.target).fontSize;

      return [
        // label
        this.buildCursorLabel(user, fontSize, pos.start.left, pos.start.top),
        // basic rectangle
        this.buildCursorRectangle('main-wing', user, pos.start.left == pos.end.left, fontSize, pos.start.left, pos.start.top, pos.end.left - pos.start.left, pos.end.top - pos.start.top),
        // "right-wing" rectangle
        pos.end.top !== pos.start.top && this.buildCursorRectangle('right-wing', user, false, fontSize, pos.start.left, pos.start.top, parseInt(getComputedStyle(pos.target).width), pos.end.top - pos.start.top, 0),
        // "left-wing" rectangle
        pos.end.top !== pos.start.top && this.buildCursorRectangle('left-wing', user, false, fontSize, pos.target.getBoundingClientRect().x, pos.start.top, pos.start.left, pos.end.top - pos.start.top, 0, 1.5)
      ];;
    } else {
      return [];
    }
  }

  buildCursorLabel(user : User, fontSize : string, left : number, top : number) : JSX.Element {
    return (
      <div
        class='cursor-label'
        style={{
          left: `${Math.round(left)}px`,
          top: `calc(${Math.round(top)}px - ${fontSize})`,
          backgroundColor: new Values(user.color).tint(75).hexString(),
          borderColor: new Values(user.color).shade(40).hexString()
        }}
      >{user.displayName}</div>
    );
  }

  buildCursorRectangle(wing : string, user : User, collapsed : boolean, fontSize : string, left : number, top : number, width : number, height : number = 0, addlHeight : number = 1.5, addlTop : number = 0) {
    const style = {
      left: `${Math.round(left)}px`,
      top: `calc(${Math.round(top)}px + calc(${addlTop} * ${fontSize}))`,
      width: `${Math.round(width)}px`,
      height: `calc(${Math.round(height)}px + calc(${addlHeight} * ${fontSize}))`,
      backgroundColor: new Values(user.color).tint(75).hexString(),
      borderColor: new Values(user.color).shade(40).hexString()
    };

    return (
      <div
        class={collapsed ? `cursor collapsed ${wing}` : `cursor ${wing}`}
        style={style}>
      </div>
    );
  }

  render() {
    // TODO #auth -- replace this with real user info
    const users = this.users || {},
          user : User = users[this.uid],
          otherUsers : [string, User][] = Object.entries(users).filter(u => u[0] !== this.uid);

    return (
      <Host>
        {/* "Logged in as" toolbar */}
        <ldf-label-bar>
          <div slot='start'>
            {user && <span>Logged in as <span class='user' style={{
                backgroundColor: new Values(user.color).tint(40).hexString(),
                borderColor: new Values(user.color).shade(10).hexString()
              }}>{user.displayName}</span>. </span>}
            {
              otherUsers && otherUsers.length > 0 && otherUsers.map(([, u]) => (
                <span>
                <span class='user' style={{
                  backgroundColor: new Values(u.color).tint(40).hexString(),
                  borderColor: new Values(u.color).shade(10).hexString()
                }}>{u.displayName}</span>
              </span>
              )).reduce((acc, x) => acc === null ? [x] : [acc, ', ', x], null)
            }
          </div>
          <slot name='controls' slot='end'/>
        </ldf-label-bar>

        {/* Cursors */}
        {this.cursorPos && Object.keys(this.cursorPos).map(username => this.buildCursorMarker(username))}

        {/* Editable version of liturgy */}
        {this.obj && <ldf-liturgical-document
          editable={true}
          path='/'
          doc={this.obj}>
        </ldf-liturgical-document>}
      </Host>
    );
  }
}
