import { Component, Element, Prop, Watch, State, JSX, h, Host } from '@stencil/core';
import { Psalm, PsalmSection, PsalmVerse, Refrain, Heading, dateFromYMDString } from '@venite/ldf';

@Component({
  tag: 'ldf-psalm',
  styleUrl: 'psalm.scss',
  shadow: true
})
export class PsalmComponent {
  @Element() element : HTMLElement;

  // States
  @State() obj : Psalm;
  @State() localeStrings: { [x: string]: string; };
  @State() filteredValue : PsalmSection[];

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

  // Lifecycle events
  async componentWillLoad() {
    this.docChanged(this.doc);
    this.filter();
  }

  // Private methods
  async filter() {
    this.filteredValue = this.obj.filteredVerses();
  }

  // Render helpers
  antiphonNode(antiphon : string | Refrain | { [x: string]: string | Refrain }) : JSX.Element {
    if(typeof antiphon == 'string') {
      const refrain = new Refrain({ value: [ antiphon ], style: 'antiphon' });
      return <ldf-liturgical-document class='antiphon' doc={ refrain } editable={this.editable}></ldf-liturgical-document>
    } else if(antiphon instanceof Refrain || (typeof antiphon == 'object' && antiphon.type && antiphon.type == 'refrain')) {
      return <ldf-liturgical-document class='antiphon' doc={ antiphon as Refrain } editable={this.editable}></ldf-liturgical-document>
    } else if(typeof antiphon == 'object') {
      // antiphon is something like an O antiphon tree:
      // { '12/23': '...', '12/24': '...' }
      const date = this.obj.day ? dateFromYMDString(this.obj?.day?.date) : new Date();
      return this.antiphonNode(antiphon[`${date.getMonth()+1}/${date.getDate()}`]);
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

  headingNode(value : string = undefined, level : number = 3, showLatinName : boolean = true) : JSX.Element {
    let label : string = this.obj.label;
    if(this.obj.style == 'canticle' && this.obj.metadata && this.obj.metadata.number && this.obj.metadata.localname) {
      label = `${this.obj.metadata.number}. ${this.obj.metadata.localname}`;
    } else if(this.obj.style == 'canticle' && this.obj.metadata && this.obj.metadata.localname) {
      label = this.obj.metadata.localname;
    }
    const heading = new Heading({
      type: 'heading',
      metadata: { level },
      citation: this.obj?.citation,
      value: [value ?? label],
      source: this.obj?.source
    })
    return (
      <ldf-heading doc={heading}>
        {showLatinName && <h5 slot='additional'>{this.obj?.metadata?.latinname}</h5>}
      </ldf-heading>
    )
  }

  // Render
  render() {
    const includeAntiphon : boolean = this.obj.includeAntiphon();

    // create blank psalm verse pattern
    let pattern : PsalmVerse;
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

    return (
      <Host lang={this.obj?.language || 'en'}>
        <div class={`psalm-parent ${this.obj?.display_format || 'default'} ${noNumbers ? 'no-numbers' : ''}`}>
        {/* Slot for controls*/}
        <ldf-label-bar>
          <slot slot='end' name='controls'></slot>
        </ldf-label-bar>

        {/* Heading */}
        {this.headingNode()}

        {/* opening antiphon */}
        {includeAntiphon && this.antiphonNode(this.obj.metadata.antiphon)}

        {/* render each set of verses */}
        {this.filteredValue?.map((section, sectionIndex) => [
          // render a `Heading`, if this section has a `label`
          section.label && this.headingNode(section.label, 4, false),
  
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
                    template={pattern}>
                  </ldf-editable-text> :
                  <ldf-string text={verse.verse}
                    citation={{book: 'Psalm', chapter: this.obj.metadata && this.obj.metadata.number, verse: verse.number}}
                    dropcap={sectionIndex == 0 && verseIndex == 0 ? 'force' : 'disabled'}
                    index={verseIndex}>
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
                    dropcap='disabled'>
                  </ldf-string>}
                </div>
              );

              // render the verse
              return (
                <p class={this.editable ? 'psalm editable' : 'psalm'}>
                  {this.editable ?
                  <ldf-editable-text
                    id={`${this.obj.uid || this.obj.slug}-${sectionIndex}-${verseIndex}-number`}
                    text={verse.number}
                    path={`${this.path}/value/${sectionIndex}/value/${verseIndex}/number`}
                    placeholder='#'
                    template={pattern}>
                  </ldf-editable-text> :
                  (verse.number && <sup>{verse.number}</sup>)}
                  <div class='text'>{nodes}</div>
                </p>
              );
            }
          })}

          {/* at the end of each set, repeat the antiphon */}
          {
            this.obj.repeatAntiphon(sectionIndex, this.filteredValue.length)
            && <div class='repeat-antiphon'>{this.antiphonNode(this.obj?.metadata?.antiphon)}</div>
          }
          </div>
        ])}

      {/* include the Gloria Patri */}
      {this.obj?.metadata?.gloria && !this.obj.metadata.omit_gloria && this.gloriaNode(this.obj.metadata.gloria)}

      {/* include closing antiphon if
        * 1) there IS a Gloria, and it hasn't been omitted, or 
        * 2) there ISN'T a Gloria, and it HAS been omitted, which suggests it was removed seasonally */}
      {((this.obj?.metadata?.gloria && !this.obj.metadata.omit_gloria) || (this.obj?.metadata?.gloria === undefined && Boolean(this.obj?.metadata?.omit_gloria))) && includeAntiphon && this.antiphonNode(this.obj?.metadata?.antiphon)}
      </div>
        </Host>
    )
  }
}
