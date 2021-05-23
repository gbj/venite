import { Component, Element, State, Listen, Host, Prop, Watch, Event, EventEmitter, h } from '@stencil/core';

import { Cursor, Change, LiturgicalDocument, User } from '@venite/ldf';

import { elementFromPath } from '../../utils/element-from-path';
import Values from 'values.js';
import { querySelectorDeep } from 'query-selector-shadow-dom';

@Component({
  tag: 'ldf-editor',
  styleUrl: 'editor.css',
  scoped: true
})
export class EditorComponent {
  @Element() el: HTMLElement;

  // States
  @State() obj : LiturgicalDocument;

  @State() cursor: Cursor;

  @State() focusObj : { obj: LiturgicalDocument; path: string; };

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
  /** Cursor positions of active users. Drills down to `<ldf-editor-cursors>` */
  @Prop() cursors : { [user: string]: Cursor };

  /** Whether to list users who are active in the editing session */
  @Prop() listUsers : boolean = true;

  /** Editors in `preview` mode will show a preview of each document, unless explicitly prompted to edit that document */
  @Prop() preview : boolean = false;

  // Events
  /** User's cursor/selection changed */
  @Event() editorCursorMoved: EventEmitter<Cursor>;

  /** User has edited the document */
  @Event() editorDocShouldChange : EventEmitter<Change | Change[]>;

  /** User is requesting we add a new LiturgicalDocument block at JSON pointer path `base`/`index` */
  @Event() editorDocShouldAdd : EventEmitter<{ base: string; index: number; }>;

  @Event() editorAskForBibleIntros : EventEmitter<EventTarget>;

  @Event() editorAskForCanticleOptions : EventEmitter<EventTarget>;

  @Event() editorAskForPrayersAndThanksgivings : EventEmitter<EventTarget>;

  @Event() editorShouldAddGloriaPatri : EventEmitter<{ path: string; language: string; version: string; oldValue: LiturgicalDocument | undefined; }>;

  // Life Cycle
  componentWillLoad() {
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
        this.editorDocShouldChange.emit(ev.detail);
  }

  /** Watch for a request to add a new LiturgicalDocument block and emit it from the editor */
  @Listen('ldfDocShouldAdd')
  onDocShouldAdd(ev : CustomEvent) {
    this.editorDocShouldAdd.emit(ev.detail);
  }

  /** Tells the Editor to add another child after this one in the document */
  @Listen('ldfAddChildAfter')
  onAddChildAfter(ev : CustomEvent) {
    const { path, index } = this.pathAndIndexFromPath(ev.detail.path);

    const change = new Change({
            path,
            op: [{
              type: 'insertAt',
              index: index + 1,
              value: ev.detail.template
            }]
          });

    this.editorDocShouldChange.emit(change);
  }

  /** Tells the Editor to merge this node with the previous one in the value */
  @Listen('ldfMergeWithPrevious')
  onMergeWithPrevious(ev : CustomEvent ) {
    const { path, index, previousIndex, field } = this.pathAndIndexFromPath(ev.detail.path),
          parts = path.split('/'),
          previousPath = parts
            //.slice(0, parts.length - 1)
            .concat(previousIndex.toString())
            .concat(field)                    // e.g., 'text' or 'verse', if in a complex type
            .join('/')
            .replace(/\/$/, '');               // replace trailing / that arises if `field` is `undefined`

    // if we've fired this on the first element, do nothing
    if(previousIndex >= 0) {
      // otherwise, look up the value of the previous element
      const previousElement = elementFromPath(this.el, previousPath),
            textarea = previousElement.shadowRoot?.querySelector('textarea') || previousElement.querySelector('textarea'),
            previousValue = textarea?.value,
            // delete the deleted node
            deleteOp = {
              type: 'deleteAt' as const,
              index,
              oldValue: ev.detail.value
            },
            // insert text into the previous node
            editOp = {
              type: 'edit' as const,
              index: previousIndex,
              value: previousValue.length > 0 ? [previousValue.length, ev.detail.value] : [ev.detail.value]
            },
            deleteChange = new Change({
              path,
              op: [
                deleteOp
              ]
            }),
            editChange = new Change({
              path: previousPath,
              op: [
                editOp
              ]
            });
      this.editorDocShouldChange.emit(editChange);
      this.editorDocShouldChange.emit(deleteChange);

      /** Move textarea cursor into previous element */
      textarea.focus();
      textarea.selectionStart = previousValue.length;
      textarea.selectionEnd = previousValue.length;
    }
  }

  @Listen('ldfAskForBibleIntros', { target: 'document' })
  onAskForBibleIntros(ev : CustomEvent) {
    this.editorAskForBibleIntros.emit((ev.target as HTMLElement).querySelector('ldf-editable-metadata-metadata-fields'));
  }

  @Listen('ldfAskForCanticleOptions', { target: 'document' })
  onAskForCanticleOptions() {
    this.editorAskForCanticleOptions.emit(querySelectorDeep('ldf-editable-filter-documents'));
  }

  @Listen('ldfAskForPrayersAndThanksgivings', { target: 'document' })
  onAskForPT(/*ev : CustomEvent*/) {
    this.editorAskForPrayersAndThanksgivings.emit(querySelectorDeep('ldf-prayers-and-thanksgivings'));
  }

  @Listen('ldfShouldAddGloriaPatri', { target: 'document' })
  onShouldAddGloriaPatri(ev : CustomEvent) {
    this.editorShouldAddGloriaPatri.emit(ev.detail);
  }

  pathAndIndexFromPath(startPath : string) : { path : string; index : number; previousIndex: number; field: string; } {
    // path is a string JSON pointer path, like          // /value/0/value/0
    const parts = startPath.split('/'),                  // ["", "value", "0", "value", "0"]
          baseIndex = parts.slice(parts.length - 1)[0],  // "0"
          base = parts.slice(0, parts.length - 1);       // ["", "value", "0", "value"]

    let path : string,
        index : number,
        field : string;
    if(Number(baseIndex) >= 0) {
      path = base.join('/');
      index = Number(baseIndex);
    }
    // if 'baseIndex' is not a number (e.g., if you're in a psalm and pressed Enter in /value/0/value/0/verse),
    // then drop it and use the preceding parts of the path
    else {
      const penultimate = parts.slice(parts.length - 2, parts.length - 1)[0],
            penultimateBase = parts.slice(0, parts.length - 2);
      path = penultimateBase.join('/');
      index = Number(penultimate);
      field = baseIndex;
    }

    return { path, index, previousIndex: Number(index) - 1, field };
  }

  // listen for `LiturgicalDocumentComponent` to fire `focusObj` and `focusPath` events when it is focused
  @Listen('focusObj')
  onFocusObj(ev : CustomEvent) {
    this.focusObj = ev.detail;
  }

  render() {
    // TODO #auth -- replace this with real user info
    const users = this.users || {},
          user : User = users[this.uid],
          otherUsers : [string, User][] = Object.entries(users).filter(u => u[0] !== this.uid);

    return (
      <Host>
        {/* "Logged in as" toolbar */}
        {this.listUsers && <ldf-label-bar>
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
        </ldf-label-bar>}

        <ldf-editor-cursors
          parent={this.el}
          cursors={this.cursors}
          users={this.users}
          uid={this.uid}
        ></ldf-editor-cursors>

        {/* Editable version of liturgy */}
        {this.obj && <ldf-liturgical-document
          editable={true}
          preview={this.preview}
          path='/'
          doc={this.obj}>
        </ldf-liturgical-document>}
      </Host>
    );
  }
}
