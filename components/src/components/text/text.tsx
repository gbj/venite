import { Component, Prop, Watch, State, Element, Host, h } from '@stencil/core';
import { Text, Heading } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';
import '@vanillawc/wc-markdown';

import EN from './text.i18n.en.json';
import ES from './text.i18n.es.json';
const LOCALE = {
  'en': EN,
  'es': ES
};
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

  // Private methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
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
    let value = this.obj?.metadata?.rollup
      ? (this.obj?.value || []).map(s => s.replace(/\s+/g, ' '))
      : (this.obj?.value || []);
    let compiledValue : string[][] = value.map(s => {
      return s.split(/([\*\w\n\s,:;\.\-–—“”‘’\!\?”\[\]\%\(\)]+([^\*\w\n\s,;:\.“”‘’”\-–—\!\?\[\]\%\(\)]))/g);
    })
    if(!this.editable && this.obj?.display_format === 'abbreviated') {
      const firstSection = compiledValue[0],
        lastSection = compiledValue[compiledValue.length - 1];
      const firstChunk = this.truncate(firstSection[0]),
        lastChunk = this.truncate(lastSection[lastSection.length - 1], true);
      compiledValue = [[firstChunk], [lastChunk]];
    }
     
      
    if(this.editable) {
      return (
        <Host lang={this.obj.language}>
          <ldf-label-bar>
            <slot slot='end' name='controls'></slot>
          </ldf-label-bar>

          {/* Heading */}
          <ldf-heading doc={new Heading({ type: 'heading', metadata: { level: 3 }, value: [this.obj.label], citation: this.obj.citation, source: this.obj.source })}></ldf-heading>

          <div class={`text ${this.editable ? 'editable' : ''} ${this.obj?.display_format || 'default'}`}>
            {this.obj.value.map((prayer, prayerIndex) =>
              <ldf-editable-text
                id={`${this.obj.uid || this.obj.slug}-${prayerIndex}`}
                text={prayer}
                path={`${this.path}/value/${prayerIndex}`}>
              </ldf-editable-text>
            )}
            {(this.obj?.style === 'prayer' || (this.obj?.metadata?.response && !this.obj?.metadata?.omit_response)) && <span class='response'>
              <ldf-editable-text
                id={`${this.obj.uid || this.obj.slug}-response`}
                text={this.obj.metadata && this.obj.metadata.response}
                path={`${this.path}/response`}
                placeholder={localeStrings.amen}>
              </ldf-editable-text>
            </span>}
          </div>
        </Host>
      );
    }
    else {
      /** `markdown` types */
      if(this.obj?.style === 'markdown') {
        return (this.obj?.value || []).map(value => <wc-markdown>{value}</wc-markdown>);
      }
      /** `text` and `prayer` types */
      else {  
        return (
          <div lang={this.obj?.language || 'en'} class={`text ${this.obj?.display_format || 'default'}`}>
            {/* Heading */}
            {(this.obj?.label || this.obj?.citation) && <ldf-heading
              path={this.path}
              doc={new Heading({ type: 'heading', metadata: { level: 3 }, value: [this.obj.label], citation: this.obj.citation})}>
            </ldf-heading>}
  
            {
              compiledValue.map((prayer, prayerIndex) =>
                <p id={`${this.obj.uid || this.obj.slug}-prayerIndex`}>
                    {prayer?.map((chunk, chunkIndex) =>
                      <span id={`${this.obj.uid || this.obj.slug}-${prayerIndex}-${chunkIndex}`}>
                        <ldf-string text={chunk}
                          citation={{label: this.obj.label}}
                          dropcap={prayerIndex === 0 && chunkIndex <= 1 ? "enabled" : "disabled"}
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
}
