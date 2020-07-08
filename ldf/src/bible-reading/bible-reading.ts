import { LiturgicalDocument } from '../liturgical-document';
import { BibleReadingVerse } from './bible-reading-verse';
import { BIBLE_BOOK_ABBREVIATIONS } from './bible-book-abbreviations';
import { BIBLE_BOOK_NAMES } from './bible-book-names.i18n';

const STYLES = ['long', 'short'] as const;
type StyleTuple = typeof STYLES;

/** BibleReading represents liturgical instructions. */
export class BibleReading extends LiturgicalDocument {
  type: 'bible-reading';
  style: StyleTuple[number];
  citation: string;
  metadata?: {
    compiled_intro?: LiturgicalDocument;
    intro?: LiturgicalDocument;
    response?: string;
  };
  value: BibleReadingVerse[];

  /** Replaces ${longName} or ${shortName} in LD passed as intro with appropriate value */
  compileIntro(): void {
    if (this.metadata && this.metadata.intro) {
      const abbrev = this.abbrevFromCitation(),
        bookCode = this.bookCodeFromAbbrev(abbrev),
        longName = this.longNameFromBookCode(bookCode),
        shortName = this.shortNameFromBookCode(bookCode);

      const newValue: any[] = new Array();

      this.metadata?.intro?.value?.forEach((introValue: any) => {
        // Intro is presumably a Text or similar
        if (typeof introValue == 'string') {
          newValue.push(
            introValue
              .replace(/\$\{longName\}/g, longName.replace('The', 'the'))
              .replace(/\$\{shortName\}/g, shortName),
          );
        }
        // Intro is presumably a ResponsivePrayer or similar
        else if (introValue.hasOwnProperty('text')) {
          newValue.push({
            ...introValue,
            text: introValue.text
              .replace(/\$\{longName\}/g, longName.replace('The', 'the'))
              .replace(/\$\{shortName\}/g, shortName),
          });
        }
        // if it's neither of those, do nothing at all to it
        else {
          newValue.push(introValue);
        }
      });

      this.metadata.compiled_intro = new LiturgicalDocument({ ...this.metadata.intro, value: newValue });

      console.log('compiled intro is now', this.metadata.compiled_intro);
    }
  }

  /** Generates an abbreviated book name from citation
   * @example
   * // returns 'Genesis'
   * this.citation = 'Gen. 3:4'
   * this.abbrevFromCitation() */
  abbrevFromCitation(): string {
    let citation: string;
    try {
      const matches = (this.citation || '').match(/(\d*\s*[a-zA-Z]+)/);
      citation = matches ? matches[0] : '';
    } catch (e) {
      citation = this.citation;
    }
    return citation.replace(/\./g, '');
  }

  /** Given an abbreviated book name, returns the name of the book
   * @example
   * // returns 'Genesis'
   * this.bookCodeFromAbbrev('Gen') */
  bookCodeFromAbbrev(a: string): string {
    const abbrev = a.replace(/\./g, ''),
      searchResult = BIBLE_BOOK_ABBREVIATIONS.find(
        (book) => book.name == abbrev || book.aliases.includes(abbrev) || book.name.includes(abbrev),
      );
    return searchResult ? searchResult.name : a;
  }

  /** Given a book name, returns the full name in the language passed; if not found, returns book name given
   * @example
   * // returns 'The Book of Genesis'
   * this.longNameFromBookCode('Genesis') */
  longNameFromBookCode(bookName: string, lang: string = 'en'): string {
    const bookResult = BIBLE_BOOK_NAMES[this.bookCodeFromAbbrev(bookName)],
          searchResult = (bookResult || {})[lang];
    return searchResult ? searchResult.long : bookName;
  }

  /** Given a book name, returns the short name in the language passed; if not found, returns book name given
   * @example
   * // returns 'Genesis'
   * this.shortNameFromBookCode('Genesis') */
  shortNameFromBookCode(bookName: string, lang: string = 'en'): string {
    const bookResult = BIBLE_BOOK_NAMES[this.bookCodeFromAbbrev(bookName)],
          searchResult = (bookResult || {})[lang];
    return searchResult ? searchResult.short : bookName;
  }

  /** Returns the list of all possible `style` values.  */
  availableStyles() : ReadonlyArray<string> {
    return STYLES;
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<BibleReading> = {}) {
    super(data);
  }
}
