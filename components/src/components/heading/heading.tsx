import { Component, Prop, Watch, State, Host, JSX, Element, h } from '@stencil/core';
import { Heading, Citation, dateFromYMDString } from '@venite/ldf';
import { EditableNode } from './editable-node';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './heading.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-heading',
  styleUrl: 'heading.scss',
  shadow: true
})
export class HeadingComponent {
  @Element() element : HTMLElement;

  // States
  @State() obj : Heading;
  @State() localeStrings: { [x: string]: string; };

  // Properties
  /**
   * An LDF Heading object.
   */
  @Prop() doc : Heading | string;
  @Watch('doc')
  docChanged(newDoc : Heading | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Heading(JSON.parse(newDoc));
      } else {
        this.obj = new Heading(newDoc);
      }
    } catch(e) {
      console.warn('HEADING ERROR', e);
      this.obj = new Heading();
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

  // Convert level/text into an H... node
  private headerNode(level : number, contentNode : JSX.Element, display: boolean = true) : JSX.Element {
    let node : JSX.Element;
    switch(level) {
      case 1:
        node = <h1>{contentNode}</h1>;
        break;
      case 2:
        node = <h2>{contentNode}</h2>;
        break;
      case 3:
        node = <h3 slot='start'>{contentNode}</h3>;
        break;
      case 4:
        node = <h4 slot='start'>{contentNode}</h4>;
        break;
      case 5:
        node = <h5 slot='start'>{contentNode}</h5>;
        break;
      default:
        node = <h6>{contentNode}</h6>
    }
    return display && node;
  }

  private textNode(text : string, index : number) : JSX.Element {
    return this.editable
      ? <EditableNode uidOrSlug={this.obj.uid || this.obj.slug || ''} path={this.path} text={text} index={index} />
      : <ldf-string text={text}></ldf-string>;
  }

  private dateNode() : JSX.Element {
    const hasDate = !!this.obj?.day?.date;
    if(hasDate) {
      const date = dateFromYMDString(this.obj?.day?.date),
            locale : string = (this.element?.closest('[lang]') as HTMLElement)?.lang || 'en';
      return <div class="date">{date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</div>;
    } else {
      return [];
    }
  }

  private citationNode(c : string, slot : string = 'end') : JSX.Element {
    return (
      <div class='citation' slot={slot}>
        {
          this.editable ?
          <ldf-editable-text
            id={`${this.obj.uid || this.obj.slug}-citation`}
            text={c}
            path={`${this.path}/citation`}>
          </ldf-editable-text> :
          c
        }
      </div>
    )
  }

  private sourceNode(c : Citation) : JSX.Element {
    const text = new Citation(c).toString().replace('bcp1979', 'BCP');

    return (
      <div class='citation' slot='end'>
        {
          this.editable ?
          [
            <ldf-editable-text
              id={`${this.obj.uid || this.obj.slug}-source-source`}
              text={c?.source}
              path={`${this.path}/source/source`}>
            </ldf-editable-text>,
            <ldf-editable-text
              id={`${this.obj.uid || this.obj.slug}-source-citation`}
              text={c?.citation}
              path={`${this.path}/source/citation`}>
            </ldf-editable-text>,
          ] :
          text
        }
      </div>
    )
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    const level : number = this.obj.metadata ? this.obj.metadata.level : 4,
          hasCitation = Boolean(this.obj?.citation),
          hasSource = Boolean(this.obj?.source),
          isDate = this.obj?.style == 'date',
          isDay = this.obj?.style == 'day',
          isText = this.obj?.style == undefined || this.obj?.style == 'text' || (!isDate && !isDay);
    
    // Render
    return (
      <Host lang={this.obj?.language || 'en'}>
        <ldf-label-bar>
          <slot slot='end' name='controls'></slot>
        </ldf-label-bar>

        <ldf-label-bar
          center={this.obj?.metadata?.level <= 2}
          class={{
            'text': isText && (this?.obj?.value || []).filter(n => Boolean(n)).length > 0
          }}
        >
          {/* `Heading.label` => main header node */}
          {isText && this.obj?.value?.length > 0 && this.obj?.value?.map((text, index) => this.headerNode(level, this.textNode(text, index), Boolean(text)))}

          {isDate && !this.editable && this.dateNode()}
          {isDate && this.editable && <code class="lookup">{localeStrings.date}</code>}

          {isDay && !this.editable && <div class="date"><ldf-day-name day={this.obj?.day}></ldf-day-name></div>}
          {isDay && !this.editable && this.obj?.day?.holy_days?.length > 0 && <ul class="holy-days">
            {this.obj?.day?.holy_days
              .filter(day => day.type?.rank < 3)
              .map(day => <li class="holy-day">{day.name}</li>)}
          </ul>}
          {isDay && this.editable && <code class="lookup">{localeStrings.day}</code>}

          <slot name='additional'></slot>

          {/* `Heading.citation` => right-aligned */}
          <slot name='citation' slot='end'>
            {hasSource && this.sourceNode(this.obj.source)}
            {hasCitation && !hasSource && this.obj.citation !== this.obj.value[0] && this.citationNode(this.obj.citation)}
          </slot>
        </ldf-label-bar>
      </Host>
    );
  }
}
