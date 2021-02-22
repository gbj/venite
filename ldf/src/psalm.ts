import { LiturgicalDocument } from './liturgical-document';
import { Heading } from './heading';
import { Refrain } from './refrain';

const STYLES = ['psalm', 'canticle', 'invitatory'] as const;
type StyleTuple = typeof STYLES;

/** Psalm represents liturgical instructions. */
export class Psalm extends LiturgicalDocument {
  type: 'psalm';
  style: StyleTuple[number];
  metadata?: {
    number?: string;
    localname?: string;
    latinname?: string;
    omit_antiphon?: boolean;
    omit_gloria?: boolean;

    // Helper LDFs packed in by compiler
    insert_seasonal_antiphon?: boolean;
    antiphon?: string | Refrain | { [x: string]: string | Refrain };
    gloria?: string | Refrain;

    /** Whether it should be possible to swap this for another psalm/canticle in the UI */
    changeable?: boolean | undefined;
  };
  value: PsalmSection[];

  /** Returns a filtered list of verses based on citation */
  filteredVerses(): PsalmSection[] {
    let filtered: PsalmSection[] = new Array();

    if (this.citation && (this.citation.match(/Ps[^\s]*\s*\d+/) || this.citation == '')) {
      const versesInCitation: string[] = this.versesInCitation(this.citation);

      if (versesInCitation.length == 0) {
        /* if `versesInCitation` is empty, it's probably because
         * something like 'Psalm 80' was passed as citation */
        filtered = this.value;
      } else {
        this.value.forEach((section) => {
          const newSection = new Array();

          section.value.forEach((verse) => {
            if (!verse.number || versesInCitation.includes(verse.number)) {
              newSection.push(verse);
            }
          });

          filtered.push({ ...section, value: newSection });
        });
      }
    } else {
      filtered = this.value;
    }

    return filtered;
  }

  /** Transforms an ordinary citation into a list of included verse numbers
   * @example
   * // returns ['1', '2', '3', '6', '7', '11']
   * versesInCitation('Psalm 100:1-3,6-7, 11a')
   * */
  versesInCitation(citation: string): string[] {
    // comments assume versesInCitation('Psalm 100:1-3,6-7, 11a')
    // search = [ "Psalm 100", "1-3", "6-7", "11a" ]
    const search = citation.replace(/Ps[\w\.]*\s*/g, '').split(/\s*[,:\s]\s*/),
      // whole = 'Psalm 100', psalm = 'Psalm', number = '100'
      // [whole, psalm, number] = search[0].match(/(Ps[^\s]*)\s(\d+)/),
      // verseRanges = [ "1-3", "6-7", "11a" ]
      verseRanges = search.slice(1);

    let verses = new Array();
    verseRanges.forEach((range) => {
      const [first, last] = range.replace(/a-zA-Z/g, '').split(/-|–/);
      if (first && last) {
        for (let ii = parseInt(first); ii <= parseInt(last); ii++) {
          verses.push(ii.toString());
        }
      } else {
        verses.push(first);
      }
    });

    return verses;
  }

  /** Whether the antiphon should be included */
  includeAntiphon(): boolean {
    const metadata = this.metadata || {};
    return (
      !!metadata.antiphon && !metadata.omit_antiphon // must have an antiphon
    ); //&& // if we're supposed to omit it, omit it
    //!(this.style == 'canticle' && !metadata.omit_gloria);
  }

  /** Whether the antiphon should be repeated after a section of the given index */
  repeatAntiphon(setIndex: number, filteredValueLength: number = 0): boolean {
    const metadata = this.metadata || {};

    if (filteredValueLength == 0) {
      filteredValueLength = this.filteredVerses().length;
    }

    return (
      this.includeAntiphon() && // only if there's an antiphon
      !(
        (metadata.omit_gloria && setIndex == filteredValueLength - 1) // antiphon will repeat after Gloria, so don't include it here as well
      )
    ); // if there's no Gloria, and this is the final set
  }

  /** Returns the list of all possible `style` values.  */
  availableStyles(): ReadonlyArray<string> {
    return STYLES;
  }

  /** Returns the list ofall possible `display_format` values. */
  availableDisplayFormats(): ReadonlyArray<string> {
    return ['default', 'omit', 'unison', 'wholeverse', 'halfverse'];
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Psalm> = {}) {
    super(data);
  }
}

/** Section breaks can be used to introduce a heading, or to indicate a place for an antiphon to be inserted  */
export class PsalmSection {
  type: 'psalm-section';
  label?: string;
  value: PsalmVerse[];
}

/** PsalmVerse is a single verse or line
 * @example
 * // 1  The Lord is my shepherd; *
 * //      I shall not be in want.
 * { number: "1", verse: "The Lord is my shepherd; *", halfverse: "I shall not be in want."}
 * */
export class PsalmVerse {
  type: 'psalm-verse';
  number?: string;
  verse: string;
  halfverse?: string;

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<PsalmVerse> = {}) {
    Object.assign(this, data);
  }
}
