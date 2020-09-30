import { Component, Prop, Watch, State, Host, Listen, Event, EventEmitter, JSX, Element, h } from '@stencil/core';
import { LiturgicalDocument, Liturgy, Meditation, BibleReading, Heading, Option, Psalm, Refrain, ResponsivePrayer, Rubric, Text, LiturgicalColor } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';
import { ConditionNode } from './condition-node';
import { LookupNode } from './lookup-node';

@Component({
  tag: 'ldf-liturgical-document',
  styleUrl: 'liturgical-document.scss',
  shadow: true
})
export class LiturgicalDocumentComponent {
  @Element() el: HTMLElement;

  // States
  @State() obj : LiturgicalDocument;
  @State() localeStrings: { [x: string]: string; };
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
    this.loadLocaleStrings();
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
    this.focusPath.emit(this.path);
    this.focusObj.emit({obj: this.obj, path: this.path});
  }

  /** Asynchronously return localization strings */
  async getLocaleStrings() : Promise<{ [x: string]: string; }> {
    if(!this.localeStrings) {
      await this.loadLocaleStrings();
      return this.localeStrings;
    } else {
      return this.localeStrings;
    }
  }

  /** Asynchronously load localization strings */
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = await getLocaleComponentStrings(this.el);
    } catch(e) {
      console.warn(e);
    }
  }

  /** Gives a loading view, a description of the document (if editing and has a lookup), or the component of the correct type */
  nodeFromDoc(doc : LiturgicalDocument) : JSX.Element {
    if(doc == undefined) {
      return customElements && customElements.get('ion-skeleton-text') ? <ion-skeleton-text></ion-skeleton-text> : <p>...</p>
    } else if(this.editable) {
      return this.editableNode(doc);
    } else {
      return this.chooseComponent(doc);
    }
  }

  editableNode(doc : LiturgicalDocument) : JSX.Element {
    const localeStrings = this.localeStrings || {};

    if(doc.condition && !doc.lookup) {
      return <ConditionNode doc={doc} localeStrings={localeStrings}>
        {this.chooseComponent(doc)}
      </ConditionNode>;
    } else if(doc.condition && doc.lookup) {
      return <ConditionNode doc={doc} localeStrings={localeStrings}>
        <LookupNode doc={doc} localeStrings={localeStrings}/>
      </ConditionNode>
    } else if(!doc.condition && doc.lookup) {
      return <LookupNode doc={doc} localeStrings={localeStrings}/>;
    } else {
      return this.chooseComponent(doc);
    }
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
        const color = this.obj?.day?.color,
          colorValue = color?.hasOwnProperty('hex') ? (color as LiturgicalColor).hex : (color as string) || '#3489eb';
        node = <ldf-meditation path={this.path} editable={this.editable} doc={doc as Meditation} color={colorValue}></ldf-meditation>;
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
    const node = this.nodeFromDoc(this.obj);

    return (
      node && <Host lang={this.obj?.language || 'en'}>
        {/* Settings/Delete Buttons */}
        {this.editable && <ldf-editable-metadata-buttons
          visible={this.hasFocus}
          base={this.base}
          index={this.index}
          obj={this.obj}
          parentType={this.parentType}>
        </ldf-editable-metadata-buttons>}

        {/* Render the Document */}
        {node}
      </Host>
    );
  }
}
