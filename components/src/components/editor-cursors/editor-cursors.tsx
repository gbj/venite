import { Component, State, Listen, Prop, Watch, JSX, h } from '@stencil/core';
import Debounce from 'debounce-decorator';
import { elementFromPath } from '../../utils/element-from-path';
import Values from 'values.js';

import { Cursor, User } from '@venite/ldf';

import getCaretCoordinates from 'textarea-caret';

@Component({
  tag: 'ldf-editor-cursors',
  styleUrl: 'editor-cursors.css',
  shadow: true
})
export class EditorComponent {
  @State() cursorPos : {
    // indexed by username
    [user: string]: {
      start: { left: number; top : number; };
      end: { left: number; top : number; };
      target: HTMLTextAreaElement | HTMLInputElement;
    }
  } = {};

  @Prop() parent : HTMLElement;

  /** Users currently active in the document */
  @Prop({ reflect: true }) users : { [uid: string]: User; };

  /** Unique ID for the user editing in this editor */
  @Prop({ reflect: true }) uid : string;

  /** Cursor positions of active users */
  @Prop({ reflect: true }) cursors : { [user: string]: Cursor };
  @Watch('cursors')
  cursorsChanged() {
    this.clearCursors();
    this.resetCursors();
    console.log('(ldf-editor-cursors) cursors updated, to ', this.cursors, ' now ', this.cursorPos);
  }

  // Life Cycle
  componentWillLoad() {
    console.log('(ldf-editor-cursors) initial cursor load, cursors = ', this.cursors);
    this.cursorsChanged();
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

  // Debounce resetCursors() for e.g., scroll
  @Debounce(20)
  resetCursors() {
    console.log('resetting cursors from ', this.cursors);
    const newCursorPos = {},
          cursors = this.cursors || {};
    Object.keys(cursors).forEach(username => {
      const cursor = cursors[username];
      this.cursorToPos(cursor, username, newCursorPos)
    });
    this.cursorPos = newCursorPos;
    console.log('reset to ', this.cursorPos);
  }

  clearCursors() {
    this.cursorPos = {};
  }

  // mutates cursorPos
  cursorToPos(data : Cursor, user : string, cursorPos : any) {
    if(data && data.path) {
      // Cursor is somewhere
      const target : HTMLElement = elementFromPath(this.parent, data.path);
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
    return (
      this.cursorPos && Object.keys(this.cursorPos).map(username => this.buildCursorMarker(username))
    );
  }
}
