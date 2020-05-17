import { Component, Prop, Watch, State, Host, Listen, Event, EventEmitter, JSX, h } from '@stencil/core';
import { LiturgicalDocument, Liturgy, Meditation, BibleReading, Heading, Option, Psalm, Refrain, ResponsivePrayer, Rubric, Text } from '@venite/ldf';

@Component({
  tag: 'ldf-liturgical-document',
  shadow: true
})
export class LiturgicalDocumentComponent {
  // States
  @State() obj : LiturgicalDocument;
  @State() hasFocus : boolean = false;

  // Properties
  /**
   * An LDF LiturgicalDocument object.
   */
  @Prop() doc : LiturgicalDocument | string;
  @Watch('doc')
  docChanged(newDoc : LiturgicalDocument | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new LiturgicalDocument(JSON.parse(newDoc));
      } else {
        this.obj = new LiturgicalDocument(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new LiturgicalDocument();
    }
  }

  /** A JSON Pointer that points to the LiturgicalDocument being edited */
  @Prop({ reflect: true }) path : string;

  /**
   * Whether the object is editable
   */
  @Prop() editable : boolean;

  // Events
  @Event() focusPath : EventEmitter<string>;

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
  }

  /** On hover, display Add Block buttons */
  @Listen('mouseover')
  onMouseOver() {
    this.focusPath.emit(this.path);
  }

  @Listen('mouseout')
  onMouseOut() {
    this.focusPath.emit(this.path);
  }

  @Listen('click')
  onClick() {
    this.focusPath.emit(this.path);
  }


  /** Processes generic LiturgicalDocument into component of the appropriate type */
  //@Method()
  chooseComponent(doc : LiturgicalDocument) : JSX.Element {
    let node : JSX.Element;

    switch(doc.type) {
      case 'liturgy':
        node = <ldf-liturgy path={this.path} editable={this.editable} doc={doc as Liturgy}></ldf-liturgy>;
        break;
      case 'heading':
        node = <ldf-heading path={this.path} editable={this.editable} doc={doc as Heading}></ldf-heading>;
        break;
      case 'meditation':
        node = <ldf-meditation path={this.path} editable={this.editable} doc={doc as Meditation}></ldf-meditation>;
        break;
      case 'option':
        node = <ldf-option path={this.path} editable={this.editable} doc={doc as Option}></ldf-option>;
        break;
      case 'refrain':
        node = <ldf-refrain path={this.path} editable={this.editable} doc={doc as Refrain}></ldf-refrain>;
        break;
      case 'rubric':
        node = <ldf-rubric path={this.path} editable={this.editable} doc={doc as Rubric}></ldf-rubric>;
        break;
      case 'text':
        node = <ldf-text path={this.path} editable={this.editable} doc={doc as Text}></ldf-text>
        break;
      case 'responsive':
        node = <ldf-responsive-prayer path={this.path} editable={this.editable} doc={doc as ResponsivePrayer}></ldf-responsive-prayer>
        break;
      case 'bible-reading':
        node = <ldf-bible-reading path={this.path} editable={this.editable} doc={doc as BibleReading}></ldf-bible-reading>
        break;
      case 'psalm':
        node = <ldf-psalm path={this.path} editable={this.editable} doc={doc as Psalm}></ldf-psalm>
        break;
      default:
        console.warn('invalid type for document', doc);
        break;
    }

    return node;
  }

  // Render
  render() {
    return (
      <Host lang={this.obj.language}>
        {this.chooseComponent(this.obj)}
      </Host>
  );
  }
}
