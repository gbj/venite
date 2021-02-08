import { Element, Component, Prop, Watch, State, Host, h } from '@stencil/core';
import { Image } from '@venite/ldf';

import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './image.i18n.en.json';
const LOCALE = {
  'en': EN
};

@Component({
  tag: 'ldf-image',
  styleUrl: 'image.scss',
  shadow: true
})
export class ImageComponent {
  @Element() element : HTMLElement;

  // States
  @State() obj : Image;

  @State() localeStrings : Record<string, string>;

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
    this.loadLocaleStrings();
  }

  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <Host lang={this.obj.language}>
        { this.editable && <ldf-label-bar>
          <slot slot='end' name='controls'></slot>
        </ldf-label-bar> }
        <div class={`${this.obj?.style || ''} ${this.obj?.metadata?.align || ''}`}>
          {this.obj.value && this.obj.value.map((url, ii) =>
            this.editable ?
            <figure>
              <img src={url}
                alt={this.obj?.label}
                style={{
                  height: this.obj?.metadata?.height ? `${this.obj.metadata.height}px` : 'auto',
                  width: this.obj?.metadata?.width ? `${this.obj.metadata.width}px` : 'auto'
                }}
              />
              <figcaption>
                <code>{localeStrings.url}</code>
                <ldf-editable-text
                id={`${this.obj.uid || this.obj.slug}-${ii}`}
                text={url}
                path={`${this.path}/value/${ii}`}
              ></ldf-editable-text>
              </figcaption>
            </figure>
             :
            <img
              src={url}
              style={{
                height: this.obj?.metadata?.height ? `${this.obj.metadata.height}px` : 'auto',
                width: this.obj?.metadata?.width ? `${this.obj.metadata.width}px` : 'auto'
              }}
            />
          )}
        </div>
      </Host>
    );
  }
}
