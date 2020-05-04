import { Component, Element, State, Listen, Host, Prop, Watch, h } from '@stencil/core';
import { Cursor, LiturgicalDocument } from '@venite/ldf';

@Component({
  tag: 'ldf-editor',
  styleUrl: 'editor.css',
  shadow: true
})
export class EditorComponent {
  @Element() el: HTMLElement;

  // States
  @State() cursor: Cursor;
  @State() obj : LiturgicalDocument;

  // Props
  @Prop() doc : LiturgicalDocument | string;
  @Watch('doc')
  docChanged(newDoc : LiturgicalDocument | string) {
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

  // Life Cycle
  componentWillLoad() {
  }

  // Listeners
  @Listen('cursorMoved')
  onCursorMoved(ev) {
    console.log('[Editor] Cursor Moved to', ev.detail)
  }

  @Listen('docChanged')
  onDocChanged(ev) {
    console.log('[Editor] Document changed', ev.detail);
  }

  render() {
    return (
      <Host>
        <ldf-liturgical-document
          editable='true'
          path='/'
          doc={this.obj}
        >
        </ldf-liturgical-document>
      </Host>
    );
  }
}
