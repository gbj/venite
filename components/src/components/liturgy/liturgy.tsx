import { Component, Prop, Watch, State, Host, Listen, h } from '@stencil/core';
import { Liturgy } from '../../../../ldf/src/liturgy/liturgy';

@Component({
  tag: 'ldf-liturgy',
  styleUrl: 'liturgy.css',
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
                path = `${valuePath}/${docIndex}`,
                afterPath = `${valuePath}/${docIndex + 1}`;
          return (
            <article>
              {/* Delete control — Display on hover */}
              {this.editable && <ldf-label-bar class={{ hidden: this.hasFocus !== path, visible: this.hasFocus == path }}>
                <ldf-editable-delete slot='end' base={valuePath} index={docIndex} obj={doc}></ldf-editable-delete>
              </ldf-label-bar>}

              {/* Render the document */}
              <ldf-liturgical-document doc={doc} path={path} editable={this.editable}></ldf-liturgical-document>

              {/* 'Add Block' interface */}
              {this.editable && <ldf-editable-add-block visible={this.hasFocus == path} path={afterPath}></ldf-editable-add-block>}
            </article>
          )
        }
      )}
      </Host>
    );
  }
}
