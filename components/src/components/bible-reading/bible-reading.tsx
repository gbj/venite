import { Component, Element, Prop, Watch, State, Method, Host, JSX, h } from '@stencil/core';
import { BibleReading, BibleReadingVerse, Heading } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';


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

  // Public methods
  /** Asynchronously return localization strings */
  @Method()
  async getLocaleStrings() : Promise<{ [x: string]: string; }> {
    if(!this.localeStrings) {
      await this.loadLocaleStrings();
      return this.localeStrings;
    } else {
      return this.localeStrings;
    }
  }

  // Private methods
  /** Asynchronously load localization strings */
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = await getLocaleComponentStrings(this.element);
    } catch(e) {
      console.warn(e);
    }
  }

  loadVerses() {
    this.verses = this.obj.value || [];
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    if(this.verses) {
      /* Editable version */
      if(this.editable) {
        return (
          <Host lang={this.obj?.language}>
            <ldf-label-bar>
              <slot slot='end' name='controls'></slot>
            </ldf-label-bar>
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
                ? undefined// TODO heading
                : <div class="verse">
                    <ldf-editable-text slot="citation"
                      id={`verse-${verseIndex}-book`}
                      text={(verse as BibleReadingVerse).book}
                      path={`${this.path}/value/${verseIndex}/book`}
                      placeholder={localeStrings.book}
                      short={true}
                    >
                    </ldf-editable-text>
                  <ldf-editable-text slot="citation"
                      id={`verse-${verseIndex}-chapter`}
                      text={(verse as BibleReadingVerse).chapter}
                      path={`${this.path}/value/${verseIndex}/chapter`}
                      placeholder={localeStrings.chapter}
                      short={true}
                    >
                    </ldf-editable-text>
                    <ldf-editable-text slot="citation"
                      id={`verse-${verseIndex}-verse`}
                      text={(verse as BibleReadingVerse).verse}
                      path={`${this.path}/value/${verseIndex}/verse`}
                      placeholder={localeStrings.verse}
                      short={true}
                    >
                    </ldf-editable-text>
                    <ldf-editable-text slot="citation"
                      id={`verse-${verseIndex}-text`}
                      text={(verse as BibleReadingVerse).text}
                      path={`${this.path}/value/${verseIndex}/text`}
                      placeholder={localeStrings.text}
                      short={true}
                    >
                    </ldf-editable-text>
                  </div>
              ])}
            </section>
          </Host>
        );
      }
      /* `short` renders a few verses, with a response and citation. */
      else if(this.obj.style == 'short') {
        const shortResponse : boolean = (!this.obj.metadata || (this.obj.metadata.response && this.obj.metadata.response.length <= 5));

        let responseNode : JSX.Element;
        if(!(this.obj.metadata && this.obj.metadata.response)) {
          responseNode = <span class="response"> {localeStrings.amen}</span>;
        } else {
          responseNode = <span class="response"> {this.obj.metadata.response}</span>;
        }

        return (
          <Host lang={this.obj.language}>
            <ldf-label-bar>
              <slot slot='end' name='controls'></slot>
            </ldf-label-bar>
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
              {shortResponse && responseNode}
              <span class="citation">{ this.obj.citation }</span>
            </p>
            {!shortResponse && <p>{responseNode}</p>}
          </Host>
        );
      }
      /* `long` render a typical Bible reading in the liturgy */
      else {
        return (
          <Host>
            {/* Slot for controls */}
            <ldf-label-bar>
              <slot slot='end' name='controls'></slot>
            </ldf-label-bar>

            {/* Heading */}
            <ldf-heading doc={new Heading({ type: 'heading', metadata: {level: 3}, value: [this.obj.label], citation: this.obj.citation})}></ldf-heading>

            {/* Introductory text ("A Reading from..." or similar) */}
            {this.obj?.metadata?.compiled_intro && <ldf-liturgical-document doc={this.obj.metadata.compiled_intro}></ldf-liturgical-document>}

            {/* Bible text */}
            <p lang={this.obj.language}>
            {this.verses.map((verse, verseIndex) =>
              verse.hasOwnProperty('type') && (verse as Heading).type  === 'heading'
              ? <ldf-heading doc={new Heading(verse as Heading)}></ldf-heading>
              : [
                <sup>{(verse as BibleReadingVerse).verse}</sup>,
                <ldf-string
                  citation={verse}
                  id={`${(verse as BibleReadingVerse).chapter}-${(verse as BibleReadingVerse).book}-${(verse as BibleReadingVerse).verse}`}
                  text={(verse as BibleReadingVerse).text}
                  index={verseIndex}
                >
                </ldf-string>
              ]
            )}
            </p>
          </Host>
        );
      }
    } else {
      return this.loadingError ? <pre>{this.loadingError}</pre> : <p>{localeStrings.loading}</p>
    }
  }
}
