import { Component, Prop, Watch, State, Host, h } from '@stencil/core';
import { Liturgy } from '../../../../ldf/src/liturgy/liturgy';

@Component({
  tag: 'ldf-liturgy',
  shadow: true
})
export class LiturgyComponent {
  // States
  @State() obj : Liturgy;

  // Properties
  /**
   * An LDF Liturgy object. If both `doc` and `json` are passed, `doc` is used.
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

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
  }

  // Render
  render() {
    const basePath : string = this.path == '/' ? '' : `${this.path}/`;
    return (
      <Host lang={this.obj.language}>
        {this.obj.value.map((doc, docIndex) =>
          <ldf-liturgical-document doc={doc} path={`${basePath}/value/${docIndex}`} editable={this.editable}></ldf-liturgical-document>
        )}
      </Host>
    );
  }
}
