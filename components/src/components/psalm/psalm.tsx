import { modalController } from '@ionic/core';
import { Component, Element, Prop, Event, Watch, State, JSX, h, Host, EventEmitter } from '@stencil/core';
import { Psalm, PsalmSection, PsalmVerse, Refrain, Heading, dateFromYMDString, LiturgicalDocument, Change } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './psalm.i18n.en.json';
const LOCALE = {
  'en': EN,
};

@Component({
  tag: 'ldf-psalm',
  styleUrl: 'psalm.scss',
  scoped: true
})
export class PsalmComponent {
  @Element() element : HTMLElement;

  // States
  @State() obj : Psalm;
  @State() localeStrings: { [x: string]: string; };
  @State() filteredValue : PsalmSection[];
  @State() focusedVerse : number | undefined = undefined;
  @State() focusedSection : number | undefined = undefined;

  // Properties
  /** The LDF Psalm to be rendered, either as JSON or an Object */
  @Prop() doc : Psalm | string;
  @Watch('doc')
  docChanged(newDoc : Psalm | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Psalm(JSON.parse(newDoc));
      } else {
        this.obj = new Psalm(newDoc);
      }
      this.filter();
    } catch(e) {
      console.warn(e);
      this.obj = new Psalm();
    }
  }

  /** A JSON Pointer that points to the Psalm being edited */
  @Prop({ reflect: true }) path : string;

  /** Whether the object is editable */
  @Prop() editable : boolean;

  // Events
  @Event({ bubbles: true }) ldfAskForCanticleOptions : EventEmitter<string>;

  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  async componentWillLoad() {
    this.docChanged(this.doc);
    this.loadLocaleStrings();
    this.filter();
  }

  // Private methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  async changeCanticle() {
    const modal = await modalController.create({
      component: 'ldf-editable-filter-documents',
    });
    modal.componentProps = {
      modal,
      type: "canticle",
      changeCallback: (doc : LiturgicalDocument) => {
        this.ldfDocShouldChange.emit(new Change({
          path: this.path,
          op: [{
            type: 'set',
            oldValue: this.obj,
            value: doc
          }]
        }))
      }
    }

    await modal.present();

    this.ldfAskForCanticleOptions.emit(this.path);
  }

  async filter() {
    this.filteredValue = this.obj.filteredVerses();
  }

  // Render helpers
  antiphonNode(antiphon : string | Refrain | { [x: string]: string | Refrain }, notEditable : boolean = false) : JSX.Element {
    if(typeof antiphon == 'string') {
      const refrain = new Refrain({ type: 'refrain', value: [ antiphon ], style: 'antiphon' });
      return <ldf-refrain class='antiphon' doc={ refrain } editable={this.editable && !notEditable} path={`${this.path}/metadata/antiphon`}></ldf-refrain>
    } else if(antiphon?.type) {
      return <ldf-liturgical-document class='antiphon' doc={(antiphon as LiturgicalDocument)} path={`${this.path}/metadata/antiphon`} editable={this.editable && !notEditable}></ldf-liturgical-document>
    } else if(typeof antiphon == 'object') {
      // antiphon is something like an O antiphon tree:
      // dates can be either MM/DD or MM-DD
      // { '12/23': '...', '12/24': '...' }
      const date = this.obj.day ? dateFromYMDString(this.obj?.day?.date) : new Date();
      return this.antiphonNode(antiphon[`${date.getMonth()+1}/${date.getDate()}`] || antiphon[`${date.getMonth() + 1}-${date.getDate()}`], true);
    }
  }

  gloriaNode(gloria : string | Refrain) : JSX.Element {
    if(typeof gloria == 'string') {
      const refrain = new Refrain({ value: [ gloria ], style: 'gloria' });
      return <ldf-liturgical-document doc={ refrain } editable={this.editable}></ldf-liturgical-document>
    } else {
      return <ldf-liturgical-document doc={ gloria } editable={this.editable}></ldf-liturgical-document>
    }
  }

  headingNode(value : string = undefined, level : number = 3, showLatinName : boolean = true, omitCitation : boolean = false) : JSX.Element {
    let label : string = this.obj.label;
    if(this.obj.style == 'canticle' && this.obj.metadata && this.obj.metadata.number && this.obj.metadata.localname) {
      label = `${this.obj.metadata.number}. ${this.obj.metadata.localname}`;
    } else if(this.obj.style == 'canticle' && this.obj.metadata && this.obj.metadata.localname) {
      label = this.obj.metadata.localname;
    }
    const heading = new Heading({
      type: 'heading',
      metadata: { level },
      citation: !omitCitation ? this.obj?.citation : undefined,
      value: [value ?? label],
      source: this.obj?.source
    })
    return (
      this.editable
      ? [
        <ldf-label-bar>
          <h3 slot="start" class="editable-label">
            <ldf-editable-text
              id="label"
              text={this.obj?.label}
              path={`${this.path}/label`}
              placeholder={this.localeStrings?.label}
            >
            </ldf-editable-text>
          </h3>
          {this.obj?.metadata && <ldf-editable-text
            id="latinname"
            text={this.obj?.metadata?.latinname}
            path={`${this.path}/metadata/latinname`}
            placeholder={this.localeStrings?.latinname}
          >
          </ldf-editable-text>}
          <ldf-editable-text slot="end"
            id="source-source"
            text={this.obj?.source?.source}
            path={`${this.path}/source/source`}
            placeholder={this.localeStrings?.source}
          >
          </ldf-editable-text>
          <ldf-editable-text slot="end"
            id="source-citation"
            text={this.obj?.source?.citation}
            path={`${this.path}/source/citation`}
            placeholder={this.localeStrings?.source_citation}
          >
          </ldf-editable-text>
        </ldf-label-bar>,
        <ldf-label-bar>
          <ldf-editable-text
            slot="start"
            id="citation"
            text={this.obj?.citation}
            path={`${this.path}/citation`}
            placeholder={this.localeStrings?.citation}
          >
          </ldf-editable-text>
        </ldf-label-bar>
      ]
      : <ldf-heading doc={heading}>
        {showLatinName && <h5 slot='additional'>{this.obj?.metadata?.latinname}</h5>}
      </ldf-heading>
    )
  }

  insertSectionBreakAfterVerse(sectionIndex : number, verseIndex : number) {
    const section = this.obj.value[sectionIndex],
      remainingVerses = section.value.slice(0, verseIndex + 1),
      movingVerses = section.value.slice(verseIndex + 1);
    this.ldfDocShouldChange.emit(new Change({
      path: `${this.path}/value/${sectionIndex}`,
      op: [{
        type: 'set',
        oldValue: section,
        value: {...section, value: remainingVerses}
      }]
    }));
    this.ldfDocShouldChange.emit(new Change({
      path: `${this.path}/value`,
      op: [{
        type: 'insertAt',
        index: sectionIndex + 1,
        oldValue: section,
        value: {...section, value: movingVerses}
      }]
    }));
  }

  removeSectionBreakAfter(sectionIndex : number) {
    const thisSection = this.obj.value[sectionIndex],
      nextSection = this.obj.value[sectionIndex + 1];
    if(thisSection && nextSection) {
      const combinedValue = thisSection.value.concat(nextSection.value);
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/value/${sectionIndex}/value`,
        op: [{
          type: 'set',
          oldValue: thisSection.value,
          value: combinedValue
        }]
      }));
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/value`,
        op: [{
          type: 'deleteAt',
          index: sectionIndex + 1,
          oldValue: nextSection
        }]
      }));
    }
  }

  // Render
  render() {
    const includeAntiphon : boolean = this.obj.includeAntiphon();

    console.log('includeAntiphon = ', includeAntiphon);

    // create blank psalm verse pattern
    let pattern : PsalmVerse,
      templateMaker : (text : string) => PsalmVerse = (verse : string) => ({ type: 'psalm-verse', number: '', halfverse: '', verse });
    if(this.editable) {
      pattern = { ... (this.obj?.value[0]?.value[0] || { type: 'psalm-verse', number: '', halfverse: '', verse: '' }) };
      if(pattern.number) {
        pattern.number = '';
      }
      if(pattern.halfverse) {
        pattern.halfverse = '';
      }
      if(pattern.verse) {
        pattern.verse = '';
      }
    }

    const noNumbers = (this.obj?.value || [])
      .map(section => section.value.map(verse => !Boolean(verse.number)))
      .flat()
      .reduce((a, b) => a || b, false);

    const localeStrings = this.localeStrings || {};

    return (
      <Host lang={this.obj?.language || 'en'}>
        <div class={`psalm-parent ${this.editable ? 'editable' : ''} ${this.obj?.display_format || 'default'} ${noNumbers ? 'no-numbers' : ''}`}>
        {/* Slot for controls*/}
        { (this.editable || this.obj?.style === 'canticle') && <ldf-label-bar>
          <slot slot='end' name='controls'>
            {this.obj?.style === 'canticle' && this.obj?.metadata?.changeable && <ldf-label-bar>
              <slot slot='end' name='controls'>
                <ion-buttons>
                  <ion-button onClick={() => this.changeCanticle()}>
                    <ion-icon name="swap-horizontal" slot="start"></ion-icon>
                    <ion-label>{localeStrings.changeCanticle}</ion-label>
                  </ion-button>
                </ion-buttons>
              </slot>
            </ldf-label-bar>}
          </slot>
        </ldf-label-bar> }

        {/* Heading */}
        {this.headingNode()}

        {/* opening antiphon */}
        {includeAntiphon && this.antiphonNode(this.obj.metadata.antiphon)}

        {/* render each set of verses */}
        {this.filteredValue?.map((section, sectionIndex) => [
          // render a `Heading`, if this section has a `label`
          section.label && this.headingNode(section.label, 4, false, true),
  
          // build a set of verses
          <div class='psalm-set'>
          {section.value.map((verse, verseIndex) => {
            // build each verse
            if(verse instanceof Heading) {
              // for e.g., the Benedicite, Heading passed at head of section
              return <ldf-heading doc={verse}></ldf-heading>;
            } else {
              // otherwise, it's a normal psalm verse
              const nodes : JSX.Element[] = new Array();

              // 1st half of verse
              nodes.push(
                <div class='verse'>
                  {this.editable ?
                  <ldf-editable-text
                    id={`${this.obj.uid || this.obj.slug}-${sectionIndex}-${verseIndex}-verse`}
                    text={verse.verse}
                    path={`${this.path}/value/${sectionIndex}/value/${verseIndex}/verse`}
                    placeholder='Lorem ipsum sit dolor amet, *'
                    template={pattern}
                    templateMaker={templateMaker}>
                  </ldf-editable-text> :
                  <ldf-string text={verse.verse}
                    citation={{book: 'Psalm', chapter: this.obj.metadata && this.obj.metadata.number, verse: verse.number}}
                    dropcap={sectionIndex == 0 && verseIndex == 0 ? 'force' : 'disabled'}
                    index={verseIndex}
                    fragment={this.path}
                  >
                  </ldf-string>}
                </div>
              );

              nodes.push(<br/>);

              // 2nd half of verse
              nodes.push(
                <div class='halfverse'>
                  {this.editable ?
                  <ldf-editable-text
                    id={`${this.obj.uid || this.obj.slug}-${sectionIndex}-${verseIndex}-halfverse`}
                    text={verse.halfverse}
                    path={`${this.path}/value/${sectionIndex}/value/${verseIndex}/halfverse`}
                    placeholder='consectetur adipiscing elit.'
                    template={pattern}>
                  </ldf-editable-text> :
                  <ldf-string text={verse.halfverse}
                    citation={{book: 'Psalm', chapter: this.obj.metadata && this.obj.metadata.number, verse: verse.number}}
                    dropcap='disabled'
                    fragment={this.path}
                  >
                  </ldf-string>}
                </div>
              );

              // render the verse
              return (
                <p class={this.editable ? 'psalm editable' : 'psalm'} onClick={() => {
                  this.focusedVerse = verseIndex;
                  this.focusedSection = sectionIndex;
                }}>
                  {this.editable ?
                  <ldf-editable-text
                    id={`${this.obj.uid || this.obj.slug}-${sectionIndex}-${verseIndex}-number`}
                    text={verse.number}
                    path={`${this.path}/value/${sectionIndex}/value/${verseIndex}/number`}
                    placeholder='#'
                    template={pattern}>
                  </ldf-editable-text> :
                  (verse.number && <sup>{verse.number}</sup>)}
                  <div class='text'>
                    {nodes}
                    {/* + section break button */}
                    {this.editable && <ion-button fill="clear" class={{"section-break": true, "hidden": this.focusedVerse !== verseIndex || this.focusedSection !== sectionIndex}}
                      onClick={() => this.insertSectionBreakAfterVerse(sectionIndex, verseIndex)}
                    >
                      {localeStrings.section_break_insert}
                    </ion-button>}
                  </div>
                </p>
              );
            }
          })}

          {/* at the end of each set, repeat the antiphon */}
          {
            this.obj.repeatAntiphon(sectionIndex, this.filteredValue.length)
            && <div class='repeat-antiphon'>{this.antiphonNode(this.obj?.metadata?.antiphon)}</div>
          }

          {/* button to remove section break if editable */}
          { this.editable && this.obj.value.length > (sectionIndex + 1) && <ion-button fill="clear" class="section-break"
            onClick={() => this.removeSectionBreakAfter(sectionIndex)}
          >{localeStrings.section_break_remove}</ion-button> }
          </div>
        ])}

      {/* include the Gloria Patri */}
      {this.obj?.metadata?.gloria && !this.obj.metadata.omit_gloria && this.gloriaNode(this.obj.metadata.gloria)}

      {/* include closing antiphon if
        * 1) there IS a Gloria, and it hasn't been omitted, or 
        * 2) there ISN'T a Gloria, or
        * 3) it HAS been omitted */}
      {((this.obj?.metadata?.gloria && !this.obj.metadata.omit_gloria) || (this.obj?.metadata?.gloria === undefined || Boolean(this.obj?.metadata?.omit_gloria))) && includeAntiphon && this.antiphonNode(this.obj?.metadata?.antiphon)}
      </div>
        </Host>
    )
  }
}
