import { LiturgicalDocument } from '../liturgical-document';
import { BibleReadingVerse } from './bible-reading-verse';
import { BIBLE_BOOK_ABBREVIATIONS } from './bible-book-abbreviations';
import { BIBLE_BOOK_NAMES } from './bible-book-names.i18n';
import { Heading } from '../heading';
import { ordinalSuffix } from './ordinal-suffix';

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
    omit_response?: boolean;
  };
  value: (BibleReadingVerse | Heading)[];

  /** Replaces ${longName} or ${shortName} in LD passed as intro with appropriate value */
  compileIntro(): void {
    if (this.metadata && this.metadata.intro) {
      const abbrev = this.abbrevFromCitation() ?? this.citation,
        bookCode = this.bookCodeFromAbbrev(abbrev ?? ''),
        longName = abbrev ? this.longNameFromBookCode(bookCode ?? '', this.language || 'en') : '—',
        shortName = abbrev ? this.shortNameFromBookCode(bookCode ?? '', this.language || 'en') : '—',
        chapter = this.chapterFromCitation(),
        verse = this.verseFromCitation();

      const newValue: any[] = new Array();

      const process = (s: string) =>
        s
          .replace(/\$\{longName\}/g, (longName ?? abbrev).replace('The', 'the'))
          .replace(/\$\{shortName\}/g, shortName ?? abbrev)
          .replace(/\$\{chapter\}/g, `${ordinalSuffix(Number(chapter) || 1)}`)
          .replace(/\$\{verse\}/g, `${ordinalSuffix(Number(verse) || 1)}`);

      this.metadata?.intro?.value?.forEach((introValue: any) => {
        // Intro is presumably a Text or similar
        if (typeof introValue == 'string') {
          newValue.push(process(introValue));
        }
        // Intro is presumably a ResponsivePrayer or similar
        else if (introValue.hasOwnProperty('text')) {
          newValue.push({
            ...introValue,
            text: process(introValue.text),
          });
        }
        // if it's neither of those, do nothing at all to it
        else {
          newValue.push(process(introValue));
        }
      });

      this.metadata.compiled_intro = new LiturgicalDocument({ ...this.metadata.intro, value: newValue });
    }
  }

  /** Generates an abbreviated book name from citation
   * @example
   * // returns 'Genesis'
   * this.citation = 'Gen. 3:4'
   * this.abbrevFromCitation() */
  abbrevFromCitation(): string | undefined {
    let citation: string;
    try {
      const matches = (this.citation || '').match(/(\d*\s*[a-zA-Z]+)/);
      citation = matches ? matches[0] : '';
    } catch (e) {
      citation = this.citation;
    }
    return citation.replace(/\./g, '');
  }

  /** Gives number of first chapter of citation */
  chapterFromCitation(): string | undefined {
    const matches = (this.citation || '').split(';')[0]?.match(/[\s\.:](\d+)/g);
    if (matches) {
      const [chapter] = matches;
      return typeof chapter === 'string' ? chapter.trim().replace(/[\.,:]/g, '') : undefined;
    } else {
      return undefined;
    }
  }

  /** Gives number of first verse of citation */
  verseFromCitation(): string | undefined {
    const matches = (this.citation || '').split(';')[0]?.match(/[\s\.:](\d+)/g);
    if (matches) {
      const [, verse] = matches;
      return typeof verse === 'string' ? verse.trim().replace(/[\.,:]/g, '') : undefined;
    } else {
      return undefined;
    }
  }

  /** Given an abbreviated book name, returns the name of the book
   * @example
   * // returns 'Genesis'
   * this.bookCodeFromAbbrev('Gen') */
  bookCodeFromAbbrev(a: string): string | undefined {
    if (a) {
      const abbrev = a.replace(/\./g, ''),
        searchResult = BIBLE_BOOK_ABBREVIATIONS.find(
          (book) => book.name == abbrev || book.aliases.includes(abbrev) || book.name.includes(abbrev),
        );
      return searchResult ? searchResult.name : a;
    } else {
      return undefined;
    }
  }

  /** Given a book name, returns the full name in the language passed; if not found, returns book name given
   * @example
   * // returns 'The Book of Genesis'
   * this.longNameFromBookCode('Genesis') */
  longNameFromBookCode(bookName: string, lang: string = 'en'): string | undefined {
    const bookCode = this.bookCodeFromAbbrev(bookName);
    if (bookCode) {
      const bookResult = BIBLE_BOOK_NAMES[bookCode];
      let searchResult = (bookResult || {})[lang];
      if (!searchResult) {
        searchResult = (bookResult || {})['en'];
      }
      return searchResult ? searchResult.long : bookName;
    } else {
      return undefined;
    }
  }

  /** Given a book name, returns the short name in the language passed; if not found, returns book name given
   * @example
   * // returns 'Genesis'
   * this.shortNameFromBookCode('Genesis') */
  shortNameFromBookCode(bookName: string, lang: string = 'en'): string | undefined {
    const bookResult = BIBLE_BOOK_NAMES[this.bookCodeFromAbbrev(bookName) ?? ''],
      searchResult = (bookResult || {})[lang];
    return searchResult ? searchResult.short : bookName;
  }

  /** Returns the list of all possible `style` values.  */
  availableStyles(): ReadonlyArray<string> {
    return STYLES;
  }

  /** No meaningful difference in display formats for this type */
  availableDisplayFormats() {
    return ['default', 'omit'];
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<BibleReading> = {}) {
    super(data);
  }
}
