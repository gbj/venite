import { Component, Element, Prop, Watch, State, Method, Host, JSX, h } from '@stencil/core';
import { BibleReading, BibleReadingVerse, Heading } from '@venite/ldf';
import { BibleReadingService } from './bible-reading-service';
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
  @State() verses : BibleReadingVerse[];
  @State() loadingError : string;

  // Properties
  /**
   * An LDF BibleReading object. If both `doc` and `json` are passed, `doc` is used.
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

    // load reading of value into stateful `verses`
    if(this.obj.value) {
      this.verses = this.obj.value;
    } else {
      // if passed empty value, try to use BibleReadingService to load content
      this.loadCitation();
    }

    // process intro
    if(this.obj.metadata && this.obj.metadata.intro) {
      this.obj.compileIntro();
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

  /** Load and render a particular Bible passage given by citation from the API */
  @Method()
  async loadCitation(citation : string = undefined, version : string = undefined) {
    try {
      this.verses = await BibleReadingService.find(
        citation || this.obj.citation,
        version || this.obj.version,
        this.obj.api
      );
    } catch(e) {
      this.loadingError = e.toString();
    }
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    if(this.verses) {
      /* `short` renders a few verses, with a response and citation. */
      if(this.obj.style == 'short') {
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
                <ldf-string
                  citation={{book: verse.book, chapter: verse.chapter, verse: verse.verse}}
                  id={this.obj.uid}
                  text={verse.text}>
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
            <ldf-heading doc={new Heading({ type: 'heading', label: this.obj.label, citation: this.obj.citation})}></ldf-heading>

            {/* Introductory text ("A Reading from..." or similar) */}
            {
              this.obj.metadata && this.obj.metadata.intro &&
                <ldf-liturgical-document doc={this.obj.metadata.intro}></ldf-liturgical-document>
            }

            {/* Bible text */}
            <p lang={this.obj.language}>
            {this.verses.map((verse, verseIndex) =>
              [
                <sup>{verse.verse}</sup>,
                <ldf-string
                  citation={verse}
                  id={`${verse.chapter}-${verse.book}-${verse.verse}`}
                  text={verse.text}
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
      return <pre>{this.loadingError}</pre> || <p>{localeStrings.loading}</p>
    }
  }
}
