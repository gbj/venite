import { Injectable } from "@angular/core";
import {
  BibleReading,
  BibleReadingVerse,
  BibleReferenceRange,
  Book,
  LiturgicalDocument,
  parseReference,
  Psalm,
} from "@venite/ldf";
import NRSV_STRUCTURE from "../../offline/bible/nrsv_structure.json";

type Verses = { book: Book; chapter: number; verses: string[] };

type LxxPsalmVerse = { number: number; a: string; b: string };
type LxxPsalms = Record<string, LxxPsalmVerse[]>;

@Injectable({
  providedIn: "root",
})
export class OsisBibleService {
  private _hebrewPsalms: Promise<LiturgicalDocument[]>;
  private _lxxPsalms: Promise<LxxPsalms>;

  constructor() {}

  async getHebrewPsalm(slug: string): Promise<LiturgicalDocument | undefined> {
    if (!this._hebrewPsalms) {
      this._hebrewPsalms = fetch(`/offline/psalter/hebrew_psalms.json`).then(
        (res) => res.json()
      );
    }
    const psalms = await this._hebrewPsalms;
    return psalms.find((doc) => doc.slug == slug);
  }

  async getLxxPsalm(
    doc: LiturgicalDocument
  ): Promise<LiturgicalDocument | undefined> {
    // helper
    function lxxVerse(
      psalms: LxxPsalms,
      num: string,
      verse_num: number,
      part: "a" | "b"
    ): string {
      let psalmNum = Number(num);
      let verseNum = verse_num;

      // see numbering at https://www.oca.org/liturgics/outlines/septuagint-numbering-psalms
      if (psalmNum <= 9) {
        psalmNum = psalmNum;
      } else if (psalmNum == 10) {
        psalmNum = 9;
        verseNum = verseNum + 21;
      } else if (psalmNum <= 114) {
        psalmNum = psalmNum - 1;
      } else if (psalmNum == 115) {
        psalmNum = 113;
        verseNum = verseNum + 8;
      } else if (psalmNum == 116 && verseNum <= 9) {
        psalmNum = 114;
      } else if (psalmNum == 116 && verseNum <= 19) {
        psalmNum = 115;
        verseNum = verseNum - 9;
      } else if (psalmNum <= 146) {
        psalmNum = psalmNum - 1;
      } else if (psalmNum == 147 && verseNum <= 11) {
        psalmNum = 146;
      } else if (psalmNum == 147) {
        verseNum = verseNum - 11;
      }

      return (psalms[psalmNum].find((verse) => verse.number == verseNum) || {})[
        part
      ];
    }

    // body
    if (!this._lxxPsalms) {
      this._lxxPsalms = fetch(`/offline/psalter/lxx_psalms.json`).then((res) =>
        res.json()
      );
    }
    const psalms = await this._lxxPsalms;
    if (doc.type == "psalm") {
      const number = (doc as Psalm).metadata?.number;
      return new LiturgicalDocument({
        ...doc,
        language: "el",
        version: "LXX",
        version_label: "LXX",
        value: ((doc as Psalm).value || []).map((section) => ({
          ...section,
          value: (section.value || []).map((verse) => ({
            ...verse,
            verse: lxxVerse(psalms, number, Number(verse.number), "a"),
            halfverse: lxxVerse(psalms, number, Number(verse.number), "b"),
          })),
        })),
      });
    } else {
      return doc;
    }
  }

  async getOriginalText(citation: string): Promise<LiturgicalDocument> {
    const v = this.versesFromCitation(citation);

    const book = v[0].verses[0].book,
      allVerses = await this.fetchVerses(book);
    const nested_value = await v.map(({ verses, bracketed }) =>
      verses.map((verses) =>
        verses.verses.map((verse) =>
          allVerses.find(
            (v) =>
              v.book == verses.book &&
              Number(v.chapter) == verses.chapter &&
              v.verse == verse
          )
        )
      )
    );

    const version = ORIGINAL_VERSION[book],
      language = version === "Hebrew" ? "he" : "el";

    const value = nested_value.flat().flat();
    // remove Greek vowels from first word, for drop-cap/small-caps purposes
    if (value[0]?.text) {
      const [first, ...rest] = value[0].text.split(" ");
      value[0].text =
        first.normalize("NFD").replace(/[\u0300-\u036f]/g, "") +
        " " +
        rest.join(" ");
    }

    return new BibleReading({
      type: "bible-reading",
      style: "long",
      language,
      version,
      citation,
      value: value.flat().flat(),
    });
  }

  async fetchVerses(book: Book): Promise<BibleReadingVerse[]> {
    const version = ORIGINAL_VERSION[book];
    switch (version) {
      case "Hebrew":
        return this.fetchVersesBHS(book);
      case "GNT":
        return this.fetchVersesGNT(book);
      default:
        throw "Original languages not implemented for this version yet.";
    }
  }

  async fetchVersesBHS(book: Book): Promise<BibleReadingVerse[]> {
    const tree = await this.fetchXml(this.buildUrl(book)),
      bookTree = tree.querySelector(`[osisID="${OSIS_BOOK_CODES[book]}"]`),
      verses = Array.from(bookTree.querySelectorAll("verse")).map(
        (verseNode) => {
          const citation =
            verseNode.getAttribute("osisID") || verseNode.getAttribute("eID");
          const [, chapter, verse] = citation.split(".");
          const text = Array.from(verseNode.querySelectorAll("w"))
            .map((wordNode) => wordNode.textContent)
            .join(" ")
            .replace(/\//g, "");
          return new BibleReadingVerse({
            book,
            chapter,
            verse,
            text,
          });
        }
      );
    return verses;
  }

  async fetchVersesGNT(book: Book): Promise<BibleReadingVerse[]> {
    const tree = await this.fetchXml(this.buildUrl(book)),
      bookTree = tree.querySelector(`[osisID="${OSIS_BOOK_CODES[book]}"]`);
    const verses: BibleReadingVerse[] = [];
    let currentChapter;
    let currentVerse;
    let currentWords: string[] = [];

    Array.from(bookTree.querySelectorAll("verse, w")).forEach((child) => {
      if (child.tagName === "verse") {
        const verseId =
            child.getAttribute("osisID") ||
            child.getAttribute("sID") ||
            child.getAttribute("eID"),
          [, chapter, verse] = verseId.split(".");
        if (currentChapter && currentVerse) {
          verses.push({
            book,
            chapter: currentChapter,
            verse: currentVerse,
            text: currentWords.join(" ") + " ",
          });
        }
        currentChapter = chapter;
        currentVerse = verse;
        currentWords = [];
      } else if (child.tagName == "w") {
        // also capture punctuation, as this version has it in text nodes that are not captured by the query
        if (child.nextSibling.nodeType === 3) {
          // text node
          currentWords.push(
            child.textContent + child.nextSibling.textContent.trim()
          );
        } else {
          currentWords.push(child.textContent);
        }
      }
    });

    return verses;
  }

  async fetchXml(url: string): Promise<XMLDocument> {
    const resp = await fetch(url),
      text = await resp.text(),
      tree = new DOMParser().parseFromString(text, "text/xml");
    return tree;
  }

  buildUrl(book: Book): string {
    const bookCode = OSIS_BOOK_CODES[book],
      version = ORIGINAL_VERSION[book];
    switch (version) {
      case "Hebrew":
        return `https://raw.githubusercontent.com/openscriptures/morphhb/master/wlc/${bookCode}.xml`;
      case "GNT":
        return "https://raw.githubusercontent.com/scott-fleischman/sblgnt-osis/master/SBLGNT.osis.xml";
      default:
        throw "Original-language version not implemented yet for this book.";
    }
  }

  versesFromCitation(
    citation: string
  ): { verses: Verses[]; bracketed: boolean }[] | null {
    function arrayRange(size: number, startAt = 0): number[] | null {
      try {
        return [...Array(size < 0 ? 0 : size).keys()].map((i) => i + startAt);
      } catch (e) {
        return null;
      }
    }

    const query = parseReference(citation);

    const structure = NRSV_STRUCTURE;

    let previousRange: BibleReferenceRange | null = null;

    try {
      return query.map((range) => {
        const start = range.start || previousRange?.start,
          end = range.end || start; // 'null' end means a single-verse citation
        const startB = start.book || previousRange?.start?.book,
          startC = Number(start.chapter) || previousRange?.start?.chapter || 1,
          startV = Number(start.verse) || 1;

        const endB = startB; // this does not have to be true in general for a citation, but there are no cross-book citations in the lectionary
        const endC =
          Number(end?.chapter) ||
          Number(previousRange?.end?.chapter) ||
          Number(previousRange?.start?.chapter) ||
          Math.max(
            ...Object.keys(structure[endB] || {})
              .map((chapterNumber) => Number(chapterNumber))
              .filter((n) => !Number.isNaN(n))
          );
        const endV =
          Number(end?.verse) ||
          Math.max(
            ...Object.keys(structure[endB][endC.toString()])
              .map((verseNumber) => Number(verseNumber))
              .filter((n) => !Number.isNaN(n))
          );

        const book = structure[startB];

        const chapters = arrayRange(endC - startC + 1, startC),
          verses = chapters.map((chapter) => ({
            book: startB, // again, because no cross-book citations
            chapter: chapter,
            verses: Array.from(
              new Set(
                (book[chapter.toString()] || []).filter(
                  (verse: string) =>
                    (chapter >= startC &&
                      Number(verse) >= startV &&
                      chapter < endC) ||
                    (chapter == endC &&
                      Number(verse) >= startV &&
                      Number(verse) <= endV) ||
                    (startC !== endC &&
                      chapter == endC &&
                      Number(verse) <= endV)
                )
              )
            ) as string[],
          }));

        previousRange = {
          start: {
            book: startB,
            chapter: startC,
            verse: startV,
          },
          end: {
            book: endB,
            chapter: endC,
            verse: endV,
          },
          bracketed: range.bracketed,
        };

        return { verses, bracketed: range.bracketed };
      });
    } catch (e) {
      console.warn(e);
      return null;
    }
  }
}

export const OSIS_BOOK_CODES: Record<Book, string> = {
  [Book.Genesis]: "Gen",
  [Book.Exodus]: "Exod",
  [Book.Leviticus]: "Lev",
  [Book.Numbers]: "Num",
  [Book.Deuteronomy]: "Deut",
  [Book.Joshua]: "Josh",
  [Book.Judges]: "Judg",
  [Book.Ruth]: "Ruth",
  [Book.FirstSamuel]: "1Sam",
  [Book.SecondSamuel]: "2Sam",
  [Book.FirstKings]: "1Kgs",
  [Book.SecondKings]: "2Kgs",
  [Book.FirstChronicles]: "1Chr",
  [Book.SecondChronicles]: "2Chr",
  [Book.Ezra]: "Ezra",
  [Book.Nehemiah]: "Neh",
  [Book.Esther]: "Esth",
  [Book.Job]: "Job",
  [Book.Psalms]: "Ps",
  [Book.Proverbs]: "Prov",
  [Book.Ecclesiastes]: "Eccl",
  [Book.SongOfSolomon]: "Song",
  [Book.Isaiah]: "Isa",
  [Book.Jeremiah]: "Jer",
  [Book.Lamentations]: "Lam",
  [Book.Ezekiel]: "Ezek",
  [Book.Daniel]: "Dan",
  [Book.Hosea]: "Hos",
  [Book.Joel]: "Joel",
  [Book.Amos]: "Amos",
  [Book.Obadiah]: "Obad",
  [Book.Jonah]: "Jonah",
  [Book.Micah]: "Mic",
  [Book.Nahum]: "Nah",
  [Book.Habakkuk]: "Hab",
  [Book.Zephaniah]: "Zeph",
  [Book.Haggai]: "Hag",
  [Book.Zechariah]: "Zech",
  [Book.Malachi]: "Mal",
  [Book.Matthew]: "Matt",
  [Book.Mark]: "Mark",
  [Book.Luke]: "Luke",
  [Book.John]: "John",
  [Book.Acts]: "Acts",
  [Book.Romans]: "Rom",
  [Book.FirstCorinthians]: "1Cor",
  [Book.SecondCorinthians]: "2Cor",
  [Book.Galatians]: "Gal",
  [Book.Ephesians]: "Eph",
  [Book.Philippians]: "Phil",
  [Book.Colossians]: "Col",
  [Book.FirstThessalonians]: "1Thess",
  [Book.SecondThessalonians]: "2Thess",
  [Book.FirstTimothy]: "1Tim",
  [Book.SecondTimothy]: "2Tim",
  [Book.Titus]: "Titus",
  [Book.Philemon]: "Phlm",
  [Book.Hebrews]: "Heb",
  [Book.James]: "Jas",
  [Book.FirstPeter]: "1Pet",
  [Book.SecondPeter]: "2Pet",
  [Book.FirstJohn]: "1John",
  [Book.SecondJohn]: "2John",
  [Book.ThirdJohn]: "3John",
  [Book.Jude]: "Jude",
  [Book.Revelation]: "Rev",
  [Book.Tobit]: "Tob",
  [Book.Judith]: "Jdt",
  [Book.Wisdom]: "Wis",
  [Book.Ecclesiasticus]: "Sir",
  [Book.Baruch]: "Bar",
  [Book.EpistleJeremiah]: "EpJer",
  [Book.PrayerOfAzariah]: "PrAzar",
  [Book.Susanna]: "Sus",
  [Book.Bel]: "Bel",
  [Book.FirstMaccabees]: "1Macc",
  [Book.SecondMaccabees]: "2Macc",
  [Book.ThirdMaccabees]: "3Macc",
  [Book.FourthMaccabees]: "4Macc",
  [Book.FirstEsdras]: "1Esd",
  [Book.SecondEsdras]: "2Esd",
  [Book.Psalm151]: "AddPs",
  [Book.None]: null,
  [Book.FourthEsdras]: "4Esd",
  [Book.Ester]: "AddEsth",
};

export const OSIS_BOOK_CODES_REVERSE: Record<string, Book> = {
  Gen: Book.Genesis,
  Exod: Book.Exodus,
  Lev: Book.Leviticus,
  Num: Book.Numbers,
  Deut: Book.Deuteronomy,
  Josh: Book.Joshua,
  Judg: Book.Judges,
  Ruth: Book.Ruth,
  "1Sam": Book.FirstSamuel,
  "2Sam": Book.SecondSamuel,
  "1Kgs": Book.FirstKings,
  "2Kgs": Book.SecondKings,
  "1Chr": Book.FirstChronicles,
  "2Chr": Book.SecondChronicles,
  Ezra: Book.Ezra,
  Neh: Book.Nehemiah,
  Esth: Book.Esther,
  Job: Book.Job,
  Ps: Book.Psalms,
  Prov: Book.Proverbs,
  Eccl: Book.Ecclesiastes,
  Song: Book.SongOfSolomon,
  Isa: Book.Isaiah,
  Jer: Book.Jeremiah,
  Lam: Book.Lamentations,
  Ezek: Book.Ezekiel,
  Dan: Book.Daniel,
  Hos: Book.Hosea,
  Joel: Book.Joel,
  Amos: Book.Amos,
  Obad: Book.Obadiah,
  Jonah: Book.Jonah,
  Mic: Book.Micah,
  Nah: Book.Nahum,
  Hab: Book.Habakkuk,
  Zeph: Book.Zephaniah,
  Hag: Book.Haggai,
  Zech: Book.Zechariah,
  Mal: Book.Malachi,
  Matt: Book.Matthew,
  Mark: Book.Mark,
  Luke: Book.Luke,
  John: Book.John,
  Acts: Book.Acts,
  Rom: Book.Romans,
  "1Cor": Book.FirstCorinthians,
  "2Cor": Book.SecondCorinthians,
  Gal: Book.Galatians,
  Eph: Book.Ephesians,
  Phil: Book.Philippians,
  Col: Book.Colossians,
  "1Thess": Book.FirstThessalonians,
  "2Thess": Book.SecondThessalonians,
  "1Tim": Book.FirstTimothy,
  "2Tim": Book.SecondTimothy,
  Titus: Book.Titus,
  Phlm: Book.Philemon,
  Heb: Book.Hebrews,
  Jas: Book.James,
  "1Pet": Book.FirstPeter,
  "2Pet": Book.SecondPeter,
  "1John": Book.FirstJohn,
  "2John": Book.SecondJohn,
  "3John": Book.ThirdJohn,
  Jude: Book.Jude,
  Rev: Book.Revelation,
  Tob: Book.Tobit,
  Jdt: Book.Judith,
  Wis: Book.Wisdom,
  Sir: Book.Ecclesiasticus,
  Bar: Book.Baruch,
  EpJer: Book.EpistleJeremiah,
  PrAzar: Book.PrayerOfAzariah,
  Sus: Book.Susanna,
  Bel: Book.Bel,
  "1Macc": Book.FirstMaccabees,
  "2Macc": Book.SecondMaccabees,
  "3Macc": Book.ThirdMaccabees,
  "4Macc": Book.FourthMaccabees,
  "1Esd": Book.FirstEsdras,
  "2Esd": Book.SecondEsdras,
  "4Esd": Book.FourthEsdras,
  AddPs: Book.Psalm151,
};
export type OriginalVersion = "Hebrew" | "GNT" | "LXX" | null;
export const ORIGINAL_VERSION: Record<Book, OriginalVersion> = {
  [Book.Genesis]: "Hebrew",
  [Book.Exodus]: "Hebrew",
  [Book.Leviticus]: "Hebrew",
  [Book.Numbers]: "Hebrew",
  [Book.Deuteronomy]: "Hebrew",
  [Book.Joshua]: "Hebrew",
  [Book.Judges]: "Hebrew",
  [Book.Ruth]: "Hebrew",
  [Book.FirstSamuel]: "Hebrew",
  [Book.SecondSamuel]: "Hebrew",
  [Book.FirstKings]: "Hebrew",
  [Book.SecondKings]: "Hebrew",
  [Book.FirstChronicles]: "Hebrew",
  [Book.SecondChronicles]: "Hebrew",
  [Book.Ezra]: "Hebrew",
  [Book.Nehemiah]: "Hebrew",
  [Book.Esther]: "Hebrew",
  [Book.Job]: "Hebrew",
  [Book.Psalms]: "Hebrew",
  [Book.Proverbs]: "Hebrew",
  [Book.Ecclesiastes]: "Hebrew",
  [Book.SongOfSolomon]: "Hebrew",
  [Book.Isaiah]: "Hebrew",
  [Book.Jeremiah]: "Hebrew",
  [Book.Lamentations]: "Hebrew",
  [Book.Ezekiel]: "Hebrew",
  [Book.Daniel]: "Hebrew",
  [Book.Hosea]: "Hebrew",
  [Book.Joel]: "Hebrew",
  [Book.Amos]: "Hebrew",
  [Book.Obadiah]: "Hebrew",
  [Book.Jonah]: "Hebrew",
  [Book.Micah]: "Hebrew",
  [Book.Nahum]: "Hebrew",
  [Book.Habakkuk]: "Hebrew",
  [Book.Zephaniah]: "Hebrew",
  [Book.Haggai]: "Hebrew",
  [Book.Zechariah]: "Hebrew",
  [Book.Malachi]: "Hebrew",
  [Book.Matthew]: "GNT",
  [Book.Mark]: "GNT",
  [Book.Luke]: "GNT",
  [Book.John]: "GNT",
  [Book.Acts]: "GNT",
  [Book.Romans]: "GNT",
  [Book.FirstCorinthians]: "GNT",
  [Book.SecondCorinthians]: "GNT",
  [Book.Galatians]: "GNT",
  [Book.Ephesians]: "GNT",
  [Book.Philippians]: "GNT",
  [Book.Colossians]: "GNT",
  [Book.FirstThessalonians]: "GNT",
  [Book.SecondThessalonians]: "GNT",
  [Book.FirstTimothy]: "GNT",
  [Book.SecondTimothy]: "GNT",
  [Book.Titus]: "GNT",
  [Book.Philemon]: "GNT",
  [Book.Hebrews]: "GNT",
  [Book.James]: "GNT",
  [Book.FirstPeter]: "GNT",
  [Book.SecondPeter]: "GNT",
  [Book.FirstJohn]: "GNT",
  [Book.SecondJohn]: "GNT",
  [Book.ThirdJohn]: "GNT",
  [Book.Jude]: "GNT",
  [Book.Revelation]: "GNT",
  [Book.Tobit]: "LXX",
  [Book.Judith]: "LXX",
  [Book.Wisdom]: "LXX",
  [Book.Ecclesiasticus]: "LXX",
  [Book.Baruch]: "LXX",
  [Book.EpistleJeremiah]: "LXX",
  [Book.PrayerOfAzariah]: "LXX",
  [Book.Susanna]: "LXX",
  [Book.Bel]: "LXX",
  [Book.FirstMaccabees]: "LXX",
  [Book.SecondMaccabees]: "LXX",
  [Book.ThirdMaccabees]: "LXX",
  [Book.FourthMaccabees]: "LXX",
  [Book.FirstEsdras]: "LXX",
  [Book.SecondEsdras]: "LXX",
  [Book.Psalm151]: "LXX",
  [Book.None]: null,
  [Book.FourthEsdras]: "LXX",
  [Book.Ester]: "LXX",
};
