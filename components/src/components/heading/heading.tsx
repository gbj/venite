import { Component, Prop, Watch, State, Host, JSX, h } from '@stencil/core';
import { Heading, Citation } from '@venite/ldf';

@Component({
  tag: 'ldf-heading',
  styleUrl: 'heading.scss',
  shadow: true
})
export class HeadingComponent {
  // States
  @State() obj : Heading;

  // Properties
  /**
   * An LDF Heading object. If both `doc` and `json` are passed, `doc` is used.
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
  private headerNode(level : number, text : string) : JSX.Element {
    let node : JSX.Element;
    switch(level) {
      case 1:
        node = <h1>{this.editable ? this.editableNode(text) : text}</h1>;
        break;
      case 2:
        node = <h2>{this.editable ? this.editableNode(text) : text}</h2>;
        break;
      case 3:
        node = <h3 slot='start'>{this.editable ? this.editableNode(text) : text}</h3>;
        break;
      case 4:
        node = <h4 slot='start'>{this.editable ? this.editableNode(text) : text}</h4>;
        break;
      case 5:
        node = <h5 slot='start'>{this.editable ? this.editableNode(text) : text}</h5>;
        break;
    }
    return node;
  }

  private editableNode(text : string) : JSX.Element {
    return (
      <ldf-editable-text
        id={`${this.obj.uid || this.obj.slug}-heading`}
        text={text}
        path={`${this.path}/label`}>
      </ldf-editable-text>
    );
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
          label : string = this.obj.label,
          hasLabel : boolean = label && label !== '',
          hasCitation : boolean = this.obj.hasOwnProperty('citation') && this.obj.citation !== undefined;

    return (
      <Host lang={this.obj.language}>
        <ldf-label-bar>
          <slot slot='end' name='controls'></slot>
        </ldf-label-bar>

        <ldf-label-bar>
          {hasLabel && this.headerNode(level, label)}
          <slot name='additional'/>
          {hasCitation && this.citationNode(this.obj.citation)}
        </ldf-label-bar>
      </Host>
    );
  }
}
