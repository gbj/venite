import { alertController, loadingController } from '@ionic/core';
import { Component, Element, Prop, Event, Watch, State, JSX, h, EventEmitter, Host } from '@stencil/core';
import { BibleReading, BibleReadingVerse, Change, Heading, versionToString } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './bible-reading.i18n.en.json';
import ES from './bible-reading.i18n.es.json';
import { fetchReading } from './fetch-reading';
const LOCALE = {
  'en': EN,
  'es': ES
};

@Component({
  tag: 'ldf-bible-reading',
  styleUrl: 'bible-reading.scss',
  shadow: true
})
export class BibleReadingComponent {
  @Element() element : HTMLElement;

  // States
  @State() obj : BibleReading;
  @State() localeStrings: { [x: string]: string; };
  @State() verses : (BibleReadingVerse | Heading)[];
  @State() loadingError : string;

  // Properties
  /**
   * An LDF BibleReading object.
   */
  @Prop() doc : BibleReading | string;
  @Watch('doc')
  docChanged(newDoc : BibleReading | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new BibleReading(JSON.parse(newDoc));
      } else {
        this.obj = new BibleReading(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new BibleReading();
    }
    this.loadVerses();
  }

  /**
   * A JSON Pointer that points to the Collect being edited
   */
  @Prop({ reflect: true }) path : string;

  /**
   * Whether the object is editable
   */
  @Prop() editable : boolean;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  async componentWillLoad() {
    this.docChanged(this.doc);

    this.loadLocaleStrings();

    this.loadVerses();

    // process intro
    if(this.obj.metadata && this.obj.metadata.intro) {
      try {
        this.obj.compileIntro();
        this.obj = new BibleReading({ ... this.obj });
      } catch(e) {
        console.warn(e);
        console.warn(this.obj);
      }
    }
  }

  // Private methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  async changeReading() {
    const localeStrings = this.localeStrings || {};
  
    const alert = await alertController.create({
      header: localeStrings.changeReading,
      inputs: [
        {
          name: 'citation',
          type: 'text',
          value: this.obj?.citation,
          placeholder: localeStrings.newCitation
        },
      ],
      buttons: [
        {
          text: localeStrings.cancel,
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: localeStrings.ok,
          handler: async (data) => {
            this.ldfDocShouldChange.emit(new Change({
              path: this.path,
              op: [
                {
                  type: 'set',
                  index: 'citation',
                  oldValue: this.obj?.citation,
                  value: data?.citation
                }
              ]
            }));

            const loading = await loadingController.create({
              message: localeStrings.loading
            });
            await loading.present();

            const newReading = await fetchReading(
              data.citation,
              versionToString(this.obj?.version)
            );

            await loading.dismiss();

            this.ldfDocShouldChange.emit(new Change({
              path: this.path,
              op: [{
                type: 'set',
                index: 'value',
                oldValue: this.obj?.value,
                value: newReading?.value || []
              }]
            }));

            this.obj = new BibleReading({
              ... this.obj,
              citation: data?.citation,
              value: newReading?.value || []
            });
            this.loadVerses();
          }
        }
      ]
    });

    await alert.present();
  }

  loadVerses() {
    this.verses = this.obj.value || [];
  }

  paragraphs() : (BibleReadingVerse | Heading)[][] {
   const paragraphs : (BibleReadingVerse | Heading)[][] = new Array();
        let currentParagraph : (BibleReadingVerse | Heading)[] = new Array();
        this.verses.forEach(verse => {
          if(verse.hasOwnProperty('type') && (verse as Heading).type === 'heading') {
            paragraphs.push(currentParagraph);
            currentParagraph = new Array();
          } else {
            currentParagraph.push(verse);
          }
        });
        paragraphs.push(currentParagraph);
    return paragraphs;
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    if(this.verses) {
      /* Editable version */
      if(this.editable) {
        const template : BibleReadingVerse = { ...this.verses[0], text: '' },
          templateMaker : (text: string) => BibleReadingVerse = (text : string) => ({ ...template, text });

        return (
          <div lang={this.obj?.language} class={`editable bible-reading ${this.obj?.display_format || 'default'}`}>
            {this.editable && <ldf-label-bar>
              <slot slot='end' name='controls'>
                <ion-buttons>
                  <ion-button onClick={() => this.changeReading()}>
                    <ion-icon name="swap-horizontal" slot="start"></ion-icon>
                    <ion-label>{localeStrings.changeReading}</ion-label>
                  </ion-button>
                </ion-buttons>
              </slot>
            </ldf-label-bar>}
            {/* Heading */}
            <ldf-heading doc={new Heading({ type: 'heading', metadata: {level: 3}, value: [this.obj.label]})}>
              <ldf-editable-text slot="citation"
                id="citation"
                text={this.obj?.citation}
                path={`${this.path}/citation`}
                placeholder={localeStrings.citation}
              >
              </ldf-editable-text>
            </ldf-heading>

            {/* Introductory text ("A Reading from..." or similar) */}
            {this.obj?.metadata?.compiled_intro && <ldf-liturgical-document editable={true} doc={this.obj.metadata.compiled_intro}></ldf-liturgical-document>}

            <section class="verses">
              {this.verses.map((verse, verseIndex) => [
                verse.hasOwnProperty('type') && (verse as Heading).type === 'heading'
                ? <ldf-heading editable={true} doc={verse as Heading} path={`${this.path}/value/${verseIndex}`}></ldf-heading>
                : <div class="editable-verse">
                    <div class="editable-citation">
                      <ldf-editable-text
                        class="book"
                        id={`verse-${verseIndex}-book`}
                        text={(verse as BibleReadingVerse).book}
                        path={`${this.path}/value/${verseIndex}/book`}
                        placeholder={localeStrings.book}
                        short={true}
                      >
                      </ldf-editable-text>
                      <ldf-editable-text
                        id={`verse-${verseIndex}-chapter`}
                        text={(verse as BibleReadingVerse).chapter}
                        path={`${this.path}/value/${verseIndex}/chapter`}
                        placeholder={localeStrings.chapter}
                        short={true}
                      >
                      </ldf-editable-text> :
                      <ldf-editable-text
                        id={`verse-${verseIndex}-verse`}
                        text={(verse as BibleReadingVerse).verse}
                        path={`${this.path}/value/${verseIndex}/verse`}
                        placeholder={localeStrings.verse}
                        short={true}
                      ></ldf-editable-text>
                    </div>
                    <ldf-editable-text
                      id={`verse-${verseIndex}-text`}
                      text={(verse as BibleReadingVerse).text}
                      path={`${this.path}/value/${verseIndex}/text`}
                      placeholder={localeStrings.text}
                      short={false}
                      template={template}
                      templateMaker={templateMaker}
                    >
                    </ldf-editable-text>
                  </div>
              ])}
            </section>
          </div>
        );
      }
      /* `short` renders a few verses, with a response and citation. */
      else if(this.obj.style == 'short') {
        const shortResponse : boolean = (this.obj?.metadata?.response || localeStrings.amen).length <= 5;

        let responseNode : JSX.Element;
        if(!this.obj?.metadata?.response) {
          responseNode = <span class="response"> {localeStrings.amen}</span>;
        } else {
          responseNode = <span class="response"> {this.obj.metadata.response}</span>;
        }

        return (
          <Host>
            {this.obj?.label && <ldf-heading doc={new Heading({ type: 'heading', metadata: {level: 3}, value: [this.obj.label]})}></ldf-heading>}
            <div lang={this.obj?.language} class={`bible-reading ${this.obj?.display_format || 'default'}`}>
              {/* Bible text */}
              <p>
                {this.verses.map(verse =>
                  verse.hasOwnProperty('type') && (verse as Heading).type  === 'heading'
                  ? <ldf-heading doc={new Heading(verse as Heading)}></ldf-heading>
                  : <ldf-string
                    citation={{book: (verse as BibleReadingVerse).book, chapter: (verse as BibleReadingVerse).chapter, verse: (verse as BibleReadingVerse).verse}}
                    id={this.obj.uid}
                    text={(verse as BibleReadingVerse).text}>
                  </ldf-string>
                )}
                {shortResponse && !this.obj?.metadata?.omit_response && responseNode}
                <span class="citation">{ this.obj.citation }</span>
              </p>
              {!shortResponse && !this.obj?.metadata?.omit_response && <p>{responseNode}</p>}
            </div>
          </Host>
        );
      }
      /* `long` render a typical Bible reading in the liturgy */
      else {
        const paragraphs = this.paragraphs();

        return (
          <div lang={this.obj?.language} class={`bible-reading ${this.obj?.display_format || 'default'}`}>
            {/* Heading */}
            <ldf-heading doc={new Heading({ type: 'heading', metadata: {level: 3}, value: [this.obj.label], citation: this.obj.citation})}></ldf-heading>

            {/* Introductory text ("A Reading from..." or similar) */}
            {this.obj?.metadata?.compiled_intro && <ldf-liturgical-document doc={this.obj.metadata.compiled_intro}></ldf-liturgical-document>}

            {/* Bible text */}
            {paragraphs.map((paragraph, paragraphIndex) => <p lang={this.obj.language}>
              {paragraph.map((verse, verseIndex) =>
                verse.hasOwnProperty('type') && (verse as Heading).type  === 'heading'
                ? <ldf-heading doc={new Heading(verse as Heading)}></ldf-heading>
                : [
                  <sup>{(verse as BibleReadingVerse).verse}</sup>,
                  <ldf-string
                    citation={verse}
                    dropcap={paragraphIndex == 0 && verseIndex == 0 ? 'force' : 'disabled'}
                    id={`${(verse as BibleReadingVerse).chapter}-${(verse as BibleReadingVerse).book}-${(verse as BibleReadingVerse).verse}`}
                    text={(verse as BibleReadingVerse).text}
                    index={verseIndex}
                  >
                  </ldf-string>
                ]
              )}
            </p>)}
          </div>
        );
      }
    } else {
      return this.loadingError ? <pre>{this.loadingError}</pre> : <p>{localeStrings.loading}</p>
    }
  }
}
