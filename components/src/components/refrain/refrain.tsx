import { Component, Prop, Watch, State, Host, h } from '@stencil/core';
import { Refrain } from '@venite/ldf';

@Component({
  tag: 'ldf-refrain',
  styleUrl: 'refrain.scss',
  scoped: true
})
export class RefrainComponent {
  // States
  @State() obj : Refrain;

  // Properties
  /**
   * An LDF Refrain object.
   */
  @Prop() doc : Refrain | string;
  @Watch('doc')
  docChanged(newDoc : Refrain | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Refrain(JSON.parse(newDoc));
      } else {
        this.obj = new Refrain(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new Refrain();
    }
  }

  /**
   * A JSON Pointer that points to the Collect being edited
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
    return (
      <Host lang={this.obj.language}>
        { this.editable && <ldf-label-bar>
          <slot slot='end' name='controls'></slot>
        </ldf-label-bar> }
        <div class={`${this.obj?.style || ''} ${this.obj?.metadata?.align || ''}`}>
        {this.obj.value && this.obj.value.map((para, ii) =>
          this.editable ?
          <ldf-editable-text
            id={`${this.obj.uid || this.obj.slug}-${ii}`}
            text={para}
            path={`${this.path}/value/${ii}`}
          ></ldf-editable-text> :
          <p
            id={`${this.obj.uid || this.obj.slug}-${ii}`}
            innerHTML={para}
          ></p>
        )}
        </div>
      </Host>
    );
  }
}
