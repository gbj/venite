import { Component, Prop, Watch, State, Host, JSX, Element, h } from '@stencil/core';
import { Heading, Citation, dateFromYMDString } from '@venite/ldf';
import { EditableNode } from './editable-node';

@Component({
  tag: 'ldf-heading',
  styleUrl: 'heading.scss',
  shadow: true
})
export class HeadingComponent {
  @Element() el : HTMLElement;

  // States
  @State() obj : Heading;

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
      console.warn(e);
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
  }

  // Convert level/text into an H... node
  private headerNode(level : number, contentNode : JSX.Element) : JSX.Element {
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
    }
    return node;
  }

  private textNode(text : string, index : number) : JSX.Element {
    return this.editable ? <EditableNode text={text} index={index} /> : text;
  }

  private dateNode() : JSX.Element {
    const hasDate = !!this.obj?.day?.date;
    if(hasDate) {
      const date = dateFromYMDString(this.obj?.day?.date),
            locale : string = (this.el?.closest('[lang]') as HTMLElement)?.lang || 'en';
      return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    } else {
      return [];
    }
  }

  private citationNode(c : string | Citation) : JSX.Element {
    const citation : string = typeof c == 'string' ?
      c :
      new Citation(c).toString();

    return (
      <div class='citation' slot='end'>
        {
          this.editable ?
          <ldf-editable-text
            id={`${this.obj.uid || this.obj.slug}-citation`}
            text={citation}
            path={`${this.path}/citation`}>
          </ldf-editable-text> :
          citation
        }
      </div>
    )
  }

  // Render
  render() {
    const level : number = this.obj.metadata ? this.obj.metadata.level : 4,
          hasCitation : boolean = this.obj.hasOwnProperty('citation') && this.obj.citation !== undefined,
          isText = this.obj?.style == undefined || this.obj?.style == 'text',
          isDate = this.obj?.style == 'date',
          isDay = this.obj?.style == 'day';
    
    // Render
    return (
      <Host lang={this.obj.language}>
        <ldf-label-bar>
          <slot slot='end' name='controls'></slot>
        </ldf-label-bar>

        <ldf-label-bar>
          {isText} {isDate} {isDay}
          {/* `Heading.label` => main header node */}
          {isText && this.obj?.value?.map((text, index) => this.headerNode(level, this.textNode(text, index)))}
          {isDate && this.headerNode(level, this.dateNode())}
          {isDay && this.headerNode(level, <ldf-day-name day={this.obj?.day}></ldf-day-name>)}

          <slot name='additional'></slot>

          {/* `Heading.citation` => right-aligned */}
          <slot name='citation' slot='end'>{hasCitation && this.citationNode(this.obj.citation)}</slot>
        </ldf-label-bar>
      </Host>
    );
  }
}
