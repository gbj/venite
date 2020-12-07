import { Component, Prop, Watch, State, Host, Listen, h } from '@stencil/core';
import { Liturgy } from '@venite/ldf';

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

  /** Documents in `preview` mode will display as if they're not editable, unless the user explicitly chooses to edit them */
  @Prop() preview : boolean = false;

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
          const valuePath = `${basePath}/value`,
                path = `${valuePath}/${docIndex}`;
          return (
            <article>
              {/* Render the document */}
              <ldf-liturgical-document
                doc={doc}
                path={path}
                base={valuePath}
                index={docIndex}
                editable={this.editable}
                preview={this.preview}
                parentType='liturgy'
              >
              </ldf-liturgical-document>

              {/* 'Add Block' interface */}
              {(this.editable || this.preview) && <ldf-editable-add-block
                visible={this.hasFocus == path || docIndex == ((this.obj?.value?.length || 0) - 1)}
                base={valuePath} index={docIndex + 1}
              ></ldf-editable-add-block>}
            </article>
          )
        }
      )}
      </Host>
    );
  }
}
