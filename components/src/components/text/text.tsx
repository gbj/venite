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

  truncate(s : string, last : boolean = false, words : number = 20) : string {
    const keepPieces = words * 2,
      split = s.split(/([^\w])/g);
    if(!last) {
      return split.slice(0, keepPieces).concat('...').join("")
    } else {
      return new Array('...').concat(split.slice(split.length - keepPieces)).join("")
    }
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};
    let compiledValue : string[][] = (this.obj?.value || []).map(s => {
      return s.split(/([\*\w\n\s,:;\.“”‘’\!\?”\[\]\%]+([^\*\w\n\s,;:\.“”‘’”\!\?\[\]\%]))/g);
    })
    if(!this.editable && this.obj?.display_format === 'abbreviated') {
      const firstSection = compiledValue[0],
        lastSection = compiledValue[compiledValue.length - 1];
      //let firstChunk : string, lastChunk : string;
      const firstChunk = this.truncate(firstSection[0]),
        lastChunk = this.truncate(lastSection[lastSection.length - 1], true);
      console.log('firstChunk = ', firstChunk, 'lastChunk = ', lastChunk);
      compiledValue = [[firstChunk], [lastChunk]];
      console.log('abbreviated compiled Value to ', compiledValue);
    }
     
      
    if(this.editable) {
      return (
        <Host lang={this.obj.language}>
          <ldf-label-bar>
            <slot slot='end' name='controls'></slot>
          </ldf-label-bar>

          {/* Heading */}
          <ldf-heading doc={new Heading({ type: 'heading', metadata: { level: 3 }, value: [this.obj.label], citation: this.obj.citation, source: this.obj.source })}></ldf-heading>

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
      let firstTextLongEnoughForDropcap = -1;
      if(this.obj?.value?.length > 0) {
        const firstDropcappableChild = this.obj.value.find(piece => 
          piece.length >= 150
        );
        firstTextLongEnoughForDropcap = this.obj.value.indexOf(firstDropcappableChild);
      }

      return (
        <div lang={this.obj?.language || 'en'} class={`text ${this.obj?.display_format || 'default'}`}>
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
                  {prayer?.map((chunk, chunkIndex) =>
                    <span id={`${this.obj.uid || this.obj.slug}-${prayerIndex}-${chunkIndex}`}>
                      <ldf-string text={chunk}
                        citation={{label: this.obj.label}}
                        dropcap={prayerIndex === firstTextLongEnoughForDropcap && chunkIndex <= 1 ? "force" : "disabled"}
                        index={prayerIndex + chunkIndex}>
                      </ldf-string>
                    </span>
                  )}
                  {this.obj?.metadata?.response && prayerIndex == compiledValue.length - 1 && <span class="response"> {this.obj.metadata.response}</span>}
                  {!this.obj?.metadata?.response && this.obj.style == 'prayer' && prayerIndex == compiledValue.length - 1 && <span class="response"> {localeStrings.amen}</span>}
              </p>
            )
          }
        </div>
      );
    }
  }
}
