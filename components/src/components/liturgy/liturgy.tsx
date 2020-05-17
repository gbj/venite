import { Component, Prop, Watch, State, Host, Listen, h } from '@stencil/core';
import { Liturgy } from '../../../../ldf/src/liturgy/liturgy';

@Component({
  tag: 'ldf-liturgy',
  shadow: true
})
export class LiturgyComponent {
  // States
  @State() obj : Liturgy;
  @State() hasFocus : string;

  // Properties
  /**
   * An LDF Liturgy object.
   */
  @Prop() doc : Liturgy | string;
  @Watch('doc')
  docChanged(newDoc : Liturgy | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Liturgy(JSON.parse(newDoc));
      } else {
        this.obj = new Liturgy(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new Liturgy();
    }
  }

  /**
   * A JSON Pointer that points to the Liturgy being edited
   */
  @Prop({ reflect: true }) path : string;

  /**
   * Whether the object is editable
   */
  @Prop() editable : boolean;

  setFocus(path : string) {
    this.hasFocus = path;
  }
  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
  }

  // Listens for ldf-liturgical-document event indicating mouseover
  @Listen('focusPath')
  onFocusPath(ev : CustomEvent) {
    this.hasFocus = ev.detail;
  }

  // Render
  render() {
    const basePath : string = this.path == '/' ? '' : `${this.path}/`;
    return (
      <Host lang={this.obj.language}>
        {this.obj.value.map((doc, docIndex) => {
          const path = `${basePath}/value/${docIndex}`;
          return (
            <article>
              {this.editable && <ldf-editable-add-block visible={this.hasFocus == path} path={path}></ldf-editable-add-block>}
              {this.editable && <ldf-editable-metadata visible={this.hasFocus == path} path={path} doc={doc}></ldf-editable-metadata>}
              <ldf-liturgical-document doc={doc} path={path} editable={this.editable}></ldf-liturgical-document>
            </article>
          )
        }
      )}
      </Host>
    );
  }
}
