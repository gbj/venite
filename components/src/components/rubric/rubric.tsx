import { Component, Prop, Watch, State, Host, h } from '@stencil/core';
import { Rubric } from '@venite/ldf';

@Component({
  tag: 'ldf-rubric',
  styleUrl: 'rubric.scss',
  scoped: true
})
export class RubricComponent {
  // States
  @State() obj : Rubric;

  // Properties
  /**
   * An LDF Rubric object.
   */
  @Prop() doc : Rubric | string;
  @Watch('doc')
  docChanged(newDoc : Rubric | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Rubric(JSON.parse(newDoc));
      } else {
        this.obj = new Rubric(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new Rubric();
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
        {this.obj.value.map((para, ii) =>
          this.editable ?
          <ldf-editable-text
            id={`${this.obj.uid || this.obj.slug}-${ii}`}
            text={para}
            path={`${this.path}/value/${ii}`}
          ></ldf-editable-text> :
          <p
            id={`${this.obj.uid || this.obj.slug}-${ii}`}
            class='rubric'
          >{para}</p>
        )}
      </Host>
    );
  }
}
