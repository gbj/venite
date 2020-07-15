import { Component, Prop, Watch, State, Host, FunctionalComponent, JSX, h } from '@stencil/core';
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
  private headerNode(level : number, text : string, index : number) : JSX.Element {
    const EditableNode : FunctionalComponent<{ text: string; index: number; }> = ({text, index}) => (
      <ldf-editable-text
        id={`${this.obj.uid || this.obj.slug}-heading-${index}`}
        text={text}
        path={`${this.path}/value/${index}`}>
      </ldf-editable-text>
    );

    let node : JSX.Element;
    switch(level) {
      case 1:
        node = <h1>{this.editable ? <EditableNode text={text} index={index} /> : text}</h1>;
        break;
      case 2:
        node = <h2>{this.editable ? <EditableNode text={text} index={index}/> : text}</h2>;
        break;
      case 3:
        node = <h3 slot='start'>{this.editable ? <EditableNode text={text} index={index}/> : text}</h3>;
        break;
      case 4:
        node = <h4 slot='start'>{this.editable ? <EditableNode text={text} index={index}/> : text}</h4>;
        break;
      case 5:
        node = <h5 slot='start'>{this.editable ? <EditableNode text={text} index={index}/> : text}</h5>;
        break;
    }
    return node;
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
          hasCitation : boolean = this.obj.hasOwnProperty('citation') && this.obj.citation !== undefined;

    // Functional Components

    // Render
    return (
      <Host lang={this.obj.language}>
        <ldf-label-bar>
          <slot slot='end' name='controls'></slot>
        </ldf-label-bar>

        <ldf-label-bar>
          {/* `Heading.label` => main header node */}
          {this.obj?.value?.map((text, index) => this.headerNode(level, text, index))}

          <slot name='additional'></slot>

          {/* `Heading.citation` => right-aligned */}
          <slot name='citation'>{hasCitation && this.citationNode(this.obj.citation)}</slot>
        </ldf-label-bar>
      </Host>
    );
  }
}
