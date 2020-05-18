import { Component, Element, State, Listen, Host, Prop, Watch, Method, JSX, h } from '@stencil/core';
import Debounce from 'debounce-decorator';
import { Subscription } from 'rxjs';

import { ChangeMessage, CursorMessage, Cursor, Change, LiturgicalDocument, User } from '@venite/ldf';

import { EditorService } from './editor-service';
import { elementFromPath } from './utils/element-from-path';
import { applyChange } from './utils/apply';
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

  @State() focusObj : LiturgicalDocument;

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

  // Store all our Subscriptions here so we can unsubscribe when the component unloads
  subscription : Subscription = new Subscription();

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
  connectedCallback() {
    // Connect to the server, without logging in or opening a document
    EditorService.connect();

    // Join a document
    EditorService.join(this.docId, this.userToken);

    // Subscribe to observables that handle each of the events from the server
    this.subscription.add(EditorService.cursorMoved.subscribe((data) => this.receivedCursorMoved(data)));
    this.subscription.add(EditorService.docChanged.subscribe((data) => this.receivedDocChanged(data)));
    this.subscription.add(EditorService.users.subscribe((data) => {
      console.log('users = ', data);
      this.users = data;
    }));
    this.subscription.add(EditorService.joined.subscribe((data) => {
      console.log('`joined` received', data);
      this.obj = data.doc;
      this.users = data.users;
      this.hasJoinedDocument = true;
    }));
  }

  // Listeners
  // Watch for cursor moves bubbled up from the editable-texts and send them to the server
  @Listen('ldfCursorMoved')
  onCursorMoved(ev : CustomEvent) {
    if(!ev.detail) {
      EditorService.moveCursor(new Cursor('', 0, 0, undefined));
    } else {
      EditorService.moveCursor(ev.detail);
    }
  }

  // TODO: simplify this now that model has changed
  /** docChanged event: the doc has already been changed, but we need to notify the server */
  @Listen('ldfEditableTextChanged')
  onEditableTextChanged(ev : CustomEvent) {
    EditorService.processChange(new Change(ev.detail));
  }

  /** docShouldChange event: we need to notify the server
    * Will update our doc when we get an ack from the server */
  @Listen('ldfDocShouldChange')
  onDocShouldChange(ev : CustomEvent) {
    //this.obj = new LiturgicalDocument(applyChange(this.obj, new Change(ev.detail)));
    console.log('change = ', ev.detail);
    EditorService.processChange(new Change(ev.detail));
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

  // fires when user is leaving the page
  @Listen('beforeunload', { target: 'window' })
  onBeforeUnload() {
    // leave the 'room' for the doc
    this.leave(this.docId);

    // disconnect from the server
    EditorService.disconnect();

    // unsubscribe from all subscriptions to avoid memory leak
    this.subscription.unsubscribe();
  }

  // listen for `LiturgicalDocumentComponent` to fire `focusPath` events when it is focused
  @Listen('focusObj')
  onFocusObj(ev : CustomEvent) {
    console.log('focusObj', ev.detail);
    this.focusObj = ev.detail;
  }

  // Public methods
  @Method()
  async leave(docId : string) : Promise<void> {
    EditorService.leave(docId);
    this.obj = null;
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
      this.cursorToPos(cursor, username, newCursorPos)
    });
    this.cursorPos = newCursorPos;
  }

  receivedCursorMoved(data : CursorMessage) {
    this.cursors[data.username] = data.cursor;
    this.cursorToPos(data.cursor, data.username, this.cursorPos);
    this.cursorPos = { ... this.cursorPos};
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

  async receivedDocChanged(message : ChangeMessage) {
    const change = message.change;
    change.path = undefined; // paths have already been set by server
    const oldObj = this.obj;
    this.obj = new LiturgicalDocument(JSON.parse(JSON.stringify(applyChange(this.obj, new Change(change)))));
    console.log('(rDC)', oldObj, change, this.obj);
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
    const user = this.users.find(u => u.username == this.userToken),
          otherUsers = this.users.filter(u => u.username !== this.userToken),
          focusObj = this.focusObj || new LiturgicalDocument();

    return (
      <Host>
        {/* Header contains auth toolbar and document toolbar */}
        <ion-header>
          {/* "Logged in as" toolbar */}
          <ldf-label-bar>
            <div slot='start'>
              {user && <span>Logged in as <span class='user' style={{
                  backgroundColor: new Values(user.color).tint(40).hexString(),
                  borderColor: new Values(user.color).shade(10).hexString()
                }}>{user.username}</span>. </span>}
              {
                otherUsers && otherUsers.length > 0 && otherUsers.map(u =>
                  <span>
                    <span class='user' style={{
                      backgroundColor: new Values(u.color).tint(40).hexString(),
                      borderColor: new Values(u.color).shade(10).hexString()
                    }}>{u.username}</span>
                  </span>
                ).reduce((acc, x) => acc === null ? [x] : [acc, ', ', x], null)
              }
            </div>
            <slot name='controls' slot='end'/>
          </ldf-label-bar>

          {/* Metadata toolbar for subdocuments */}
          {focusObj && focusObj.type && <ldf-editable-metadata
              doc={focusObj}
              visible={true}
              collapsed={false}>
            </ldf-editable-metadata>}
        </ion-header>
        <ion-content style={{ height: '100vh', width: '100vw' }}>
          {/* Cursors */}
          {this.cursorPos && Object.keys(this.cursorPos).map(username => this.buildCursorMarker(username))}

          {/* Editable version of liturgy */}
          {this.obj && <ldf-liturgical-document
            editable={true}
            path='/'
            doc={this.obj}>
          </ldf-liturgical-document>}

          {/* Preview version of liturgy */}
          {this.obj && <ldf-liturgical-document
            editable={false}
            path='/'
            doc={this.obj}>
          </ldf-liturgical-document>}
        </ion-content>
      </Host>
    );
  }
}
