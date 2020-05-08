import { Component, Element, State, Listen, Host, Prop, Watch, JSX, h } from '@stencil/core';
import Debounce from 'debounce-decorator';

import { Cursor, Change, LiturgicalDocument, User } from '@venite/ldf';
import { EditorService } from './editor-service';
import { elementFromPath } from './utils/element-from-path';
import { applyChangeToElement } from './utils/apply';
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
  @State() users : User[] = new Array();

  cursors : {
    [user: string]: Cursor
  } = {};
  @State() cursorPos : {
    // indexed by username
    [user: string]: {
      start: { left: number; top : number; };
      end: { left: number; top : number; };
      target: HTMLTextAreaElement | HTMLInputElement;
    }
  } = {};

  hasJoinedDocument : boolean = false;

  // Props
  @Prop() docId : string;
  @Watch('docId')
  docIdChanged() {
    console.log('docId changed');
    this.joinNewDocument();
  }

  @Prop() userToken : string;
  @Watch('userToken')
  userTokenChanged() {
    console.log('userToken changed');
    this.joinNewDocument();
  }

  // Life Cycle
  componentWillLoad() {
    // Connect to the server, without logging in or opening a document
    EditorService.connect();

    // Join a document
    EditorService.join(this.docId, this.userToken);

    // Subscribe to observables that handle each of the events from the server
    EditorService.cursorMoved.subscribe((data) => this.receivedCursorMoved(data));
    EditorService.docChanged.subscribe((data) => this.receivedDocChanged(data));
    EditorService.refreshDoc.subscribe((data) => {
      // TODO: check whether we have focused into another area and started editing
      this.obj = data;
    })
    EditorService.users.subscribe((data) => {
      console.log('users = ', data);
      this.users = data;
    });
    EditorService.joined.subscribe((data) => {
      console.log('`joined` received', data);
      this.obj = data.doc;
      this.users = data.users;
      this.hasJoinedDocument = true;
    });
  }

  disconnectedCallback() {
    // disconnect from the server
    EditorService.disconnect();
  }

  // Listeners
  // Watch for cursor moves bubbled up from the editable-texts and send them to the server
  @Listen('cursorMoved')
  onCursorMoved(ev) {
    if(!ev.detail) {
      EditorService.emit('cursorMoved', new Cursor('', 0, 0, undefined));
      EditorService.emit('refreshDoc', this.docId);
    } else {
      EditorService.emit('cursorMoved', ev.detail);
    }
  }

  // Watch for edits bubbled up from the editable-texts and send them to the server
  @Listen('docChanged')
  onDocChanged(ev) {
    EditorService.emit('docChanged', ev.detail);
  }

  // Listen for scroll and window resize events and reset the cursors accordingly
  // (the cursor reset method is debounced)
  @Listen('scroll', { target: 'document' })
  onScroll() {
    console.log('scroll');
    this.clearCursors();
    this.resetCursors();
  }

  @Listen('resize', { target: 'window' })
  onResize() {
    console.log('resize');
    this.clearCursors();
    this.resetCursors();
  }

  // Local Methods

  clearCursors() {
    this.cursorPos = {};
  }

  // Debounce resetCursors() for e.g., scroll
  @Debounce(20)
  resetCursors() {
    const newCursorPos = {};
    Object.keys(this.cursors).forEach(username => {
      const cursor = this.cursors[username];
      this.cursorToPos(cursor, newCursorPos)
    });
    this.cursorPos = newCursorPos;
  }

  receivedCursorMoved(data : Cursor) {
    this.cursors[data.user] = data;
    this.cursorToPos(data, this.cursorPos);
    this.cursorPos = { ... this.cursorPos};
  }

  // mutates cursorPos
  cursorToPos(data : Cursor, cursorPos : any) {
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

        cursorPos[data.user] = {
          start: { top: start.top + rect.top, left: start.left + rect.left},
          end: { top: end.top + rect.top, left: end.left + rect.left},
          target: textarea
        };
      } else {
        // Cursor is nowhere; hide this user's cursor
        cursorPos[data.user] = undefined;
      }
    } else {
      // Cursor is nowhere; hide this user's cursor
      cursorPos[data.user] = undefined;
    }
  }

  receivedDocChanged(data : Change[]) {
    data.forEach((change) => {
      // swap out for actual username
      if(change.user !== this.userToken) {
        const target = elementFromPath(this.el, change.path),
              textarea : HTMLTextAreaElement = target.shadowRoot.querySelector('textarea');
        applyChangeToElement(textarea, change);
      }
    });
  }

  async joinNewDocument() {
    if(this.hasJoinedDocument) {
      EditorService.leave(this.docId);
      this.hasJoinedDocument = false;
    }
    EditorService.join(this.docId, this.userToken);
  }

  // Render helpers
  buildCursorMarker(username : string) : JSX.Element[] {
    const user = this.users.find(u => u.username == username),
          pos = this.cursorPos[username];

    // TODO: filter based on actual username, not userToken, once AuthService is setup

    if(user && pos && this.userToken !== username) {
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
      ];
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
      >{user.username}</div>
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
    const user = this.users.find(u => u.username == this.userToken);

    return (
      <Host>
        {/*
          <p>Doc: {this.docId} | User: {this.userToken}</p>
          <p>Users: {this.users.map(user =>
            (<span>
                <span class='user' style={{
                  backgroundColor: new Values(user.color).tint(40).hexString(),
                  borderColor: new Values(user.color).shade(10).hexString()
                }}>{user.username}</span>, </span>
            )
          )}</p>
          */}
        {/* "Logged in as" toolbar */}
        <ldf-label-bar>
          {user && <div slot='start'>Logged in as <span class='user' style={{
              backgroundColor: new Values(user.color).tint(40).hexString(),
              borderColor: new Values(user.color).shade(10).hexString()
            }}>{user.username}</span>.</div>}
          <slot name='controls' slot='end'/>
        </ldf-label-bar>

        {/* Cursors */}
        {this.cursorPos && Object.keys(this.cursorPos).map(username => this.buildCursorMarker(username))}

        {/* Render the actual liturgy */}
        {this.obj && <ldf-liturgical-document
          editable={true}
          path='/'
          doc={this.obj}>
        </ldf-liturgical-document>}
      </Host>
    );
  }
}
