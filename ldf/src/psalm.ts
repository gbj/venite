import { LiturgicalDocument, Heading, Refrain } from '.';

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
  halfverse: string;

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<PsalmVerse> = {}) {
    Object.assign(this, data);
  }
}

/** Psalm represents liturgical instructions. */
export class Psalm extends LiturgicalDocument {
  type: 'psalm';
  style: 'psalm' | 'canticle' | 'invitatory';
  citation: string;
  metadata? : {
    number?: string;
    localname?: string;
    latinname?: string;
    omit_antiphon?: boolean;
    omit_gloria?: boolean;

    // Helper LDFs packed in by compiled
    antiphon?: string | Refrain | { [x: string]: string | Refrain };
    gloria?: string | Refrain;
  }
  value : (PsalmVerse | Heading)[][];

  /** Returns a filtered list of verses based on citation */
  filteredVerses() : (PsalmVerse | Heading)[][] {
    let filtered : (PsalmVerse | Heading)[][] = new Array();

    if(this.citation && (this.citation.match(/Ps[^\s]*\s*\d+/) || this.citation == '')) {
      const versesInCitation : string[] = this.versesInCitation(this.citation);

      if(versesInCitation.length == 0) {
        /* if `versesInCitation` is empty, it's probably because
         * something like 'Psalm 80' was passed as citation
         */
        filtered = this.value;
      } else {
        this.value.forEach(section => {
          const newSection = new Array();

          section.forEach(verse => {
            if(
              (verse instanceof Heading || (verse as any).type && (verse as any).type == 'label') ||
              !verse.number ||
              versesInCitation.includes(verse.number)
            ) {
              newSection.push(verse);
            }
          });

          filtered.push(newSection);
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
  versesInCitation(citation : string) : string[] {
    // comments assume versesInCitation('Psalm 100:1-3,6-7, 11a')
          // search = [ "Psalm 100", "1-3", "6-7", "11a" ]
    const search = citation.split(/\s*[,:]\s*/),
          // whole = 'Psalm 100', psalm = 'Psalm', number = '100'
          // [whole, psalm, number] = search[0].match(/(Ps[^\s]*)\s(\d+)/),
          // verseRanges = [ "1-3", "6-7", "11a" ]
          verseRanges = search.slice(1);

    let verses = new Array();
    verseRanges.forEach(range => {
      const [first, last] = range.replace(/a-zA-Z/g, '').split('-');
      if(first && last) {
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
  includeAntiphon() : boolean {
    const metadata = this.metadata || {};
    return !!metadata.antiphon && // must have an antiphon
      !metadata.omit_antiphon; //&& // if we're supposed to omit it, omit it
      //!(this.style == 'canticle' && !metadata.omit_gloria);
  }

  /** Whether the antiphon should be repeated after a section of the given index */
  repeatAntiphon(setIndex : number, filteredValueLength : number = 0) : boolean {
    const metadata = this.metadata || {};

    if(filteredValueLength == 0) {
      filteredValueLength = this.filteredVerses().length;
    }

    return this.includeAntiphon() && // only if there's an antiphon
      (this.style == 'canticle' || this.style == 'invitatory') && // only for canticles and invitatories
      !(metadata.omit_gloria && // antiphon will repeat after Gloria, so don't include it here as well
        setIndex == filteredValueLength - 1); // if there's no Gloria, and this is the final set
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Psalm> = {}) {
    super(data);
  }
}
