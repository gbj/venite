import { Component, Prop, Watch, State, Host, h } from '@stencil/core';
import { Image } from '@venite/ldf';

@Component({
  tag: 'ldf-image',
  styleUrl: 'image.scss',
  shadow: true
})
export class ImageComponent {
  // States
  @State() obj : Image;

  // Properties
  /**
   * An LDF Image object.
   */
  @Prop() doc : Image | string;
  @Watch('doc')
  docChanged(newDoc : Image | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Image(JSON.parse(newDoc));
      } else {
        this.obj = new Image(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new Image();
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
        <ldf-label-bar>
          <slot slot='end' name='controls'></slot>
        </ldf-label-bar>
        <div class={`${this.obj?.style || ''} ${this.obj?.metadata?.align || ''}`}>
          {this.obj.value && this.obj.value.map((url, ii) =>
            this.editable ?
            <figure>
              <img src={url} />
              <figcaption>
                <ldf-editable-text
                id={`${this.obj.uid || this.obj.slug}-${ii}`}
                text={url}
                path={`${this.path}/value/${ii}`}
              ></ldf-editable-text>
              </figcaption>
            </figure>
             :
            <img src={url} />
          )}
        </div>
      </Host>
    );
  }
}
