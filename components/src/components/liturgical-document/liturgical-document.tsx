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
  async docChanged(newDoc : LiturgicalDocument | string) {
    let provisionalObj : LiturgicalDocument;

    try {
      if(typeof newDoc == 'string') {
        provisionalObj = new LiturgicalDocument(JSON.parse(newDoc));
      } else {
        provisionalObj = new LiturgicalDocument(newDoc);
      }
    } catch(e) {
      console.warn(e);
      provisionalObj = new LiturgicalDocument();
    }

    this.obj = provisionalObj || new LiturgicalDocument();
  }

  /** A JSON Pointer that points to the LiturgicalDocument being edited */
  @Prop({ reflect: true }) path : string;

  /** A JSON Pointer that points to the array within which the item is nested */
  @Prop({ reflect: true }) base: string;

  /** Index within a larger array, if any */
  @Prop() index : number;

  /** Type of the parent `LiturgicalDocument`, if any */
  @Prop({ reflect: true }) parentType : 'liturgy' | 'cycle' | 'heading' | 'option' | 'refrain' | 'rubric' | 'text' | 'responsive' | 'bible-reading' | 'psalm' | 'meditation' | null = null;

  /**
   * Whether the object is editable
   */
  @Prop() editable : boolean;

  // Events
  @Event() focusPath : EventEmitter<string>;
  @Event() focusObj : EventEmitter<{obj: LiturgicalDocument; path: string;}>;

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
  }

  /** On hover, display Add Block buttons */
  @Listen('mouseover', { capture: true })
  onMouseOver() {
    this.hasFocus = true;
    this.focusPath.emit(this.path);
  }

  @Listen('mouseout', { capture: true })
  onMouseOut() {
    this.hasFocus = false;
    this.focusPath.emit(this.path);
  }

  // Firing the event during the capture phase the most specific LiturgicalDocument will
  // be handled last, i.e., the `Liturgy` won't override subdocuments
  @Listen('click', { capture: true })
  onClick() {
    this.hasFocus = true;
    this.focusObj.emit({obj: this.obj, path: this.path});
  }


  /** Processes generic LiturgicalDocument into component of the appropriate type */
  //@Method()
  chooseComponent(doc : LiturgicalDocument) : JSX.Element {
    let node : JSX.Element;

    switch(doc?.type) {
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
    const node = this.chooseComponent(this.obj);

    return (
      node && <Host lang={this.obj?.language}>
        {/* Settings/Delete Buttons */}
        {this.editable && <ldf-editable-metadata-buttons
          visible={this.hasFocus}
          base={this.base}
          index={this.index}
          obj={this.obj}
          parentType={this.parentType}>
        </ldf-editable-metadata-buttons>}

        {/* Render the Document */}
        {this.chooseComponent(this.obj)}
      </Host>
    );
  }
}
