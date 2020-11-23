import { Component, Prop, Watch, State, Element, Host, JSX, h } from '@stencil/core';
import { ResponsivePrayer, ResponsivePrayerLine, Heading } from '@venite/ldf';

@Component({
  tag: 'ldf-responsive-prayer',
  styleUrl: 'responsive-prayer.scss',
  shadow: true
})
export class ResponsivePrayerComponent {
  @Element() element: HTMLElement;

  // States
  @State() obj : ResponsivePrayer;
  @State() localeStrings: { [x: string]: string; };

  // Properties
  /**
   * An LDF ResponsivePrayer object.
   */
  @Prop() doc : ResponsivePrayer | string;
  @Watch('doc')
  docChanged(newDoc : ResponsivePrayer | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new ResponsivePrayer(JSON.parse(newDoc));
      } else {
        this.obj = new ResponsivePrayer(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new ResponsivePrayer();
    }
  }

  /**
   * A JSON Pointer that points to the ResponsivePrayer being edited
   */
  @Prop({ reflect: true }) path : string;

  /**
   * Whether the object is editable
   */
  @Prop() editable : boolean;

  // Lifecycle events
  async componentWillLoad() {
    this.docChanged(this.doc);
  }

  // Render helpers
  /** renders a `ResponsivePrayerLine` as an `ldf-editable-text` */
  editableNode(line : ResponsivePrayerLine, index : number, part : 'label' | 'text' | 'response', template : ResponsivePrayerLine | undefined = undefined, templateMaker : (s : string) => ResponsivePrayerLine) : JSX.Element {
    return (
      <ldf-editable-text
        id={`${this.obj.uid}-${index}-${part}`}
        text={line[part]}
        path={`${this.path}/value/${index}/${part}`}
        template={template}
        templateMaker={templateMaker}
      >
      </ldf-editable-text>
    )
  }

  /** renders a `ResponsivePrayerLine` as an `ldf-string` */
  stringNode(line : ResponsivePrayerLine, index : number, part : 'label' | 'text' | 'response') : JSX.Element {
    return (
      <ldf-string
        citation={{label: this.obj.label}}
        id={`${this.obj.uid}-${index}-${part}`}
        text={line[part]}>
      </ldf-string>
    )
  }

  // Render the `response` in a litany, and handle `[Silence]` value
  litanyResponseStringNode(line : ResponsivePrayerLine, index : number) : JSX.Element {
    const text : string = line.response || this.obj.metadata.response;

    if(text == '[Silence]') {
      return (
        <span class='rubric'><br/>Silence</span>
      );
    } else {
      return (
        <span class='response'>
          <ldf-string
            citation={{label: this.obj.label}}
            id={`${this.obj.uid}-${index}-response`}
            text={text}>
          </ldf-string>
        </span>
      );
    }
  }


  // Render
  render() {
    if(this.obj.style == 'preces') {
      /* `preces` type returns a table like
       *    V.  O Lord, open our lips.
       *    R.  And our mouth shall proclaim thy praise. */
      const template = { label: '', text: '' },
        templateMaker = (text : string) => ({ label: '', text });

      return (
        <Host class={this.obj.style} lang={this.obj.language}>
          <ldf-label-bar>
            <slot slot='end' name='controls'></slot>
          </ldf-label-bar>

          {/* Heading */}
          {(this.obj?.label || this.obj?.citation || this.obj?.source) && <ldf-heading doc={new Heading({ type: 'heading', metadata: { level: 3 }, value: [this.obj.label], citation: this.obj.citation, source: this.obj.source })}></ldf-heading> }

          <table class="preces">
            {this.obj.value.map((line, index) =>
              <tr class="row">
                <td class="cell">
                  {this.editable ? this.editableNode(line, index, 'label', template, templateMaker) : this.stringNode(line, index, 'label')}
                </td>
                <td class={index % 2 == 0 ? 'cell' : 'cell response'}>
                  {this.editable ? this.editableNode(line, index, 'text', template, templateMaker) : this.stringNode(line, index, 'text')}
                </td>
              </tr>
            )}
          </table>
        </Host>
      )
    } else if(this.obj.style == 'litany') {
      /* `litany`type returns prayers and responses with a break between each pair, like
       *    That this evening may be holy, good, and peaceful,
       *    We entreat you, O Lord.
       *
       *    That your holy angels may lead us in paths of peace and goodwill,
       *    We entreat you, O Lord. */

      const template = { text: '', response: this.obj.metadata?.response || '' },
        templateMaker = (text : string) => ({ text, response: this.obj.metadata?.response || '' });

      return (
        <Host class={this.obj.style} lang={this.obj.language}>
        { this.editable && <ldf-label-bar>
          <slot slot='end' name='controls'></slot>
        </ldf-label-bar> }

        {/* Heading */}
        {(this.obj?.label || this.obj?.citation || this.obj?.source) && <ldf-heading doc={new Heading({ type: 'heading', metadata: { level: 3 }, value: [this.obj.label], citation: this.obj.citation, source: this.obj.source})}></ldf-heading>}

        {this.obj.value.map((line, index) => {
          // Classes depending on style and whether this line is optional
          let classes : string[] = new Array('litany');
          if(line.optional) {
            classes.push('optional');
          }

          // Render the line
          return (
            <p class={classes.join(' ')}>
              {/* render the text of the main line*/}
              {this.editable ? this.editableNode(line, index, 'text', template, templateMaker) : this.stringNode(line, index, 'text')}

              {/* if the `ResponsivePrayerLine` has a `response` property, render it*/}
              {line.response && (
                this.editable ?
                <span class='response'>{this.editableNode(line, index, 'response', template, templateMaker)}</span> :
                [<br/>, this.litanyResponseStringNode(line, index)]
              )}

              {/* if the `ResponsivePrayer` has a `response` but the line does not, use the parent object's response
                * doesn't use the helper functions, so we can point `path` to `ResponsivePrayer.response`*/}
              {(!line.response && this.obj.metadata?.response) && (
                this.editable ?
                <span class='response'>
                  <ldf-editable-text
                    id={`${this.obj.uid}-${index}-response`}
                    text={this.obj.metadata.response}
                    path={`${this.path}/response`}>
                  </ldf-editable-text>
                </span> :
                [<br/>, this.litanyResponseStringNode(line, index)]
              )}
            </p>
          )
        })}
        </Host>
      );
    } else {
      /* `responsive` type returns alternating lines like
       *    Lord, hear our prayer.
       *    And let our cry come to you.
       *    Let us pray. */
      const template = { text: '', response: this.obj.metadata?.response || '' },
        templateMaker = (text : string) => ({ text, response: this.obj.metadata?.response || '' });

      return (
        <Host class={this.obj.style} lang={this.obj.language}>

          {/* Heading */}
          {(this.obj?.label || this.obj?.citation || this.obj?.source) && <ldf-heading doc={new Heading({ type: 'heading', metadata: { level: 3 }, value: [this.obj.label], citation: this.obj.citation, source: this.obj.source })}></ldf-heading>}

          <p class='responsive'>
            {this.obj.value.map((line, index) =>
              [
                this.editable ?
                  <div>{this.editableNode(line, index, 'text', template, templateMaker)}</div> :
                  <div>{this.stringNode(line, index, 'text')}</div>,
                this.editable ?
                  <div class='response'>{this.editableNode(line, index, 'response', template, templateMaker)}</div> :
                  <div class='response'>{this.stringNode(line, index, 'response')}</div>
              ]
            )}
          </p>
        </Host>
      )
    }
  }
}
