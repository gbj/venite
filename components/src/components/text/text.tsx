import { Component, Prop, Watch, State, Element, Host, Method, h } from '@stencil/core';
import { Text, Heading } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-text',
  styleUrl: 'text.scss',
  shadow: true
})
export class TextComponent {
  @Element() element: HTMLElement;

  // States
  @State() obj : Text;
  @State() localeStrings: { [x: string]: string; };

  // Properties
  /**
   * An LDF Text object.
   */
  @Prop() doc : Text | string;
  @Watch('doc')
  docChanged(newDoc : Text | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Text(JSON.parse(newDoc));
      } else {
        this.obj = new Text(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new Text();
    }
  }

  /**
   * A JSON Pointer that points to the Text being edited
   */
  @Prop({ reflect: true }) path : string;

  /**
   * Whether the object is editable
   */
  @Prop() editable : boolean;

  // Lifecycle events
  async componentWillLoad() {
    this.docChanged(this.doc);
    this.loadLocaleStrings();
  }

  // Public methods
  /** Asynchronously return localization strings */
  @Method()
  async getLocaleStrings() : Promise<{ [x: string]: string; }> {
    if(!this.localeStrings) {
      await this.loadLocaleStrings();
      return this.localeStrings;
    } else {
      return this.localeStrings;
    }
  }

  // Private methods
  /** Asynchronously load localization strings */
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = await getLocaleComponentStrings(this.element);
    } catch(e) {
      console.warn(e);
    }
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {},
          compiledValue : string[][] = (this.obj.value || ['']).map(s => {
            return s.match(/[\*\w‘’“”\n\s]+([^\*\w‘’“”\n\s])/g);
          });

    if(this.editable) {
      return (
        <Host lang={this.obj.language}>
          <ldf-label-bar>
            <slot slot='end' name='controls'></slot>
          </ldf-label-bar>

          {/* Heading */}
          <ldf-heading doc={new Heading({ type: 'heading', metadata: { level: 3 }, value: [this.obj.label], citation: this.obj.citation})}></ldf-heading>

          {this.obj.value.map((prayer, prayerIndex) =>
            <ldf-editable-text
              id={`${this.obj.uid || this.obj.slug}-${prayerIndex}`}
              text={prayer}
              path={`${this.path}/value/${prayerIndex}`}>
            </ldf-editable-text>
          )}
          {!(this.obj.metadata && this.obj.metadata.omit_response) && <span class='response'>
            <ldf-editable-text
              id={`${this.obj.uid || this.obj.slug}-response`}
              text={this.obj.metadata && this.obj.metadata.response}
              path={`${this.path}/response`}
              placeholder={localeStrings.amen}>
            </ldf-editable-text>
          </span>}
        </Host>
      );
    } else {
      return (
        <Host lang={this.obj.language}>
          <ldf-label-bar>
            <slot slot='end' name='controls'></slot>
          </ldf-label-bar>

          {/* Heading */}
          <ldf-heading
            path={this.path}
            doc={new Heading({ type: 'heading', metadata: { level: 3 }, value: [this.obj.label], citation: this.obj.citation})}>
          </ldf-heading>

          {
            compiledValue.map((prayer, prayerIndex) =>
              <p id={`${this.obj.uid || this.obj.slug}-prayerIndex`}>
                  {prayer.map((chunk, chunkIndex) =>
                    <span id={`${this.obj.uid || this.obj.slug}-${prayerIndex}-${chunkIndex}`}>
                      <ldf-string text={chunk}
                        citation={{label: this.obj.label}}
                        dropcap={this.obj.value[prayerIndex].length > 200 && chunkIndex == 0 ? 'force' : 'enabled'}
                        index={prayerIndex + chunkIndex}>
                      </ldf-string>
                    </span>
                  )}
                  {this.obj.metadata && this.obj.metadata.response && <span class="response"> {this.obj.metadata.response}</span>}
                  {(!(this.obj.metadata && this.obj.metadata.response) && this.obj.style == 'prayer') && <span class="response"> {localeStrings.amen}</span>}
              </p>
            )
          }
        </Host>
      );
    }
  }
}
