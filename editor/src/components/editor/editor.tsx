import { Component, Element, State, Listen, Host, Prop, Watch, h } from '@stencil/core';
import { Cursor, Change, LiturgicalDocument, User } from '@venite/ldf';
import { EditorService } from './editor-service';
import { elementFromPath } from '../../utils/element-from-path';
import { applyChangeToElement } from '../../utils/apply';
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
  @State() cursorPos : {
    // indexed by username
    [user: string]: {
      start: { left: number; top : number; };
      end: { left: number; top : number; }
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
    } else {
      EditorService.emit('cursorMoved', ev.detail);
    }
  }

  // Watch for edits bubbled up from the editable-texts and send them to the server
  @Listen('docChanged')
  onDocChanged(ev) {
    EditorService.emit('docChanged', ev.detail);
  }

  // Local Methods
  receivedCursorMoved(data : Cursor) {
    if(data && data.path) {
      // Cursor is somewhere
      const target : HTMLElement = elementFromPath(this.el, data.path);
      if(target) {
        const textarea = target.shadowRoot.querySelector('textarea');

        const rect = textarea.getBoundingClientRect();

        const start = getCaretCoordinates(textarea, data.start, undefined),
              end = getCaretCoordinates(textarea, data.end, undefined);

        this.cursorPos[data.user] = {
          start: { top: start.top + rect.top, left: start.left + rect.left},
          end: { top: end.top + rect.top, left: end.left + rect.left}
        };
        this.cursorPos = {... this.cursorPos};
        console.log(this.cursorPos);
      } else {
        // Cursor is nowhere; hide this user's cursor
        this.cursorPos[data.user] = undefined;
        this.cursorPos = {... this.cursorPos};
      }
    } else {
      // Cursor is nowhere; hide this user's cursor
      this.cursorPos[data.user] = undefined;
      this.cursorPos = {... this.cursorPos};
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

  render() {
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

        {/* Cursors */}
        {this.cursorPos && Object.keys(this.cursorPos).map(username => {
          const user = this.users.find(u => u.username == username),
                pos = this.cursorPos[username];
          console.log(this.users, user);
          // TODO: filter based on actual username, not userToken, once AuthService is setup
          if(user && this.cursorPos[username] && this.userToken !== username) {
            return [
              <div
                class='cursor-label'
                style={{
                  left: `${Math.round(pos.start.left)}px`,
                  top: `calc(${Math.round(pos.start.top)}px - 1.5em)`,
                  backgroundColor: new Values(user.color).tint(60).hexString(),
                  borderColor: new Values(user.color).shade(40).hexString()
                }}
              >{user.username}</div>,
              <div
                class={pos.start.left == pos.end.left ? 'cursor collapsed' : 'cursor'}
                style={{
                  left: `${Math.round(pos.start.left)}px`,
                  top: `${Math.round(pos.start.top)}px`,
                  width: `${Math.round(pos.end.left - pos.start.left)}px`,
                  backgroundColor: new Values(user.color).tint(60).hexString(),
                  borderColor: new Values(user.color).shade(40).hexString()
                }}>
              </div>
            ];
          } else {
            return undefined;
          }
        }
        )}

        {/* Render the actual liturgy */}
        {this.obj && <ldf-liturgical-document
          editable='true'
          path='/'
          doc={this.obj}>
        </ldf-liturgical-document>}
      </Host>
    );
  }
}
