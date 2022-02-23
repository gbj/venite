import { Injectable } from "@angular/core";
import { Observable, of, from } from "rxjs";
import {
  BibleReading,
  BibleReadingVerse,
  Book,
  LiturgicalDocument,
  parseReference,
} from "@venite/ldf";
import { BibleServiceInterface } from "@venite/ng-service-api";
import { HttpClient } from "@angular/common/http";
import {
  catchError,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from "rxjs/operators";

const LOADING = new BibleReading({
  type: "bible-reading",
  style: "long",
  value: [{ text: "Loading..." }],
});

@Injectable({
  providedIn: "root",
})
export class BibleService implements BibleServiceInterface {
  constructor(private http: HttpClient) {}

  getText(
    citation: string,
    version: string = "NRSV"
  ): Observable<BibleReading> {
    let didSwitchVersion = false;

    // check for ESV apocrypha
    const r = new BibleReading({
        type: "bible-reading",
        style: "long",
        citation,
        version,
      }),
      abbrev = r.abbrevFromCitation(),
      code = r.bookCodeFromAbbrev(abbrev),
      isApocrypha = [
        "Tobit",
        "Judith",
        "Baruch",
        "1 Maccabees",
        "2 Maccabees",
        "Wisdom",
        "Sirach",
        "1 Esdras",
        "2 Esdras",
        "Bel",
        "Azariah",
      ].includes(code);

    if (version === "ESV" && isApocrypha) {
      didSwitchVersion = true;
      version = "NRSV";
    }

    let adaptedCitation = citation;
    if (version == "NRSV" || version == "KJV") {
      adaptedCitation = citation.replace("(", "[").replace(")", "]");
    } else if (version == "ESV") {
      // ESV API can't handle brackets well
      adaptedCitation = citation.replace(/[\[\]]/g, ", ");
    }

    if (version == "RV09") {
      return this.dblGetReading(
        citation,
        "es",
        "RV09"
      ) as Observable<BibleReading>;
    } else {
      return this.http
        .get<BibleReading>(
          `https://us-central1-venite-2.cloudfunctions.net/bible`,
          { params: { citation: adaptedCitation, version } }
        )
        .pipe(
          map((doc) =>
            !didSwitchVersion
              ? new BibleReading({ ...doc, citation })
              : new BibleReading({
                  ...doc,
                  citation: `${citation} (${version})`,
                })
          ),
          startWith(LOADING),
          catchError((e) => {
            console.warn(
              `(BibleService) error loading ${citation} (${version})`,
              e
            );
            //return of(undefined);
            return version === "NRSV" || citation.startsWith("psalm_")
              ? of(undefined)
              : this.getText(citation, "NRSV");
          }),
          shareReplay()
        );
    }
  }

  dblGetReading(
    citation: string,
    language: string,
    version: string
  ): Observable<LiturgicalDocument> {
    return this.getText(citation, "KJV").pipe(
      map((reading) => {
        const versesOnly = reading.value.filter(
          (verse) => verse["type"] != "heading"
        ) as BibleReadingVerse[];
        const reference = parseReference(
            versesOnly[0].book +
              " " +
              versesOnly[0].chapter +
              ":" +
              versesOnly[0].verse
          ),
          book = reference[0].start.book,
          verses = versesOnly.map(({ chapter, verse }) => ({
            chapter,
            verse,
          }));
        return { book, verses };
      }),
      switchMap(async ({ book, verses }) => {
        const usxBookCode = usxBookCodeFromBookName(book),
          url = `/assets/dbl/${version}/release/USX_1/${usxBookCode}.usx`,
          xml = await this.fetchXml(url);
        return usxToLdf(language, version, xml, usxBookCode, verses);
      }),
      switchMap((doc) =>
        doc?.value?.length > 0 && (doc.value[0] as BibleReadingVerse).text
          ? of(doc)
          : this.getText(citation, "NRSV").pipe(
              map(
                (doc) =>
                  new BibleReading({
                    ...doc,
                    value: [
                      {
                        text: " [Este libro no aparece en nuestra edición de la Reina-Valera.]\n\n",
                      },
                      ...doc.value,
                    ],
                  })
              )
            )
      )
    );
  }

  async fetchXml(url: string): Promise<XMLDocument> {
    const resp = await fetch(url),
      text = await resp.text(),
      tree = new DOMParser().parseFromString(text, "text/xml");
    console.log("text = ", text);
    return tree;
  }
}

/* DBL Functionality */
function usxBookCodeFromBookName(bookName: Book): string | undefined {
  const names = {
    [Book.Genesis]: "GEN",
    [Book.Exodus]: "EXO",
    [Book.Leviticus]: "LEV",
    [Book.Numbers]: "NUM",
    [Book.Deuteronomy]: "DEU",
    [Book.Joshua]: "JOS",
    [Book.Judges]: "JDG",
    [Book.Ruth]: "RUT",
    [Book.FirstSamuel]: "1SA",
    [Book.SecondSamuel]: "2SA",
    [Book.FirstKings]: "1KI",
    [Book.SecondKings]: "2KI",
    [Book.FirstChronicles]: "1CH",
    [Book.SecondChronicles]: "2CH",
    [Book.Ezra]: "EZR",
    [Book.Nehemiah]: "NEH",
    [Book.Esther]: "EST",
    [Book.Job]: "JOB",
    [Book.Psalms]: "PSA",
    [Book.Proverbs]: "PRO",
    [Book.Ecclesiastes]: "ECC",
    [Book.SongOfSolomon]: "SNG",
    [Book.Isaiah]: "ISA",
    [Book.Jeremiah]: "JER",
    [Book.Lamentations]: "LAM",
    [Book.Ezekiel]: "EZK",
    [Book.Daniel]: "DAN",
    [Book.Hosea]: "HOS",
    [Book.Joel]: "JOL",
    [Book.Amos]: "AMO",
    [Book.Obadiah]: "OBA",
    [Book.Jonah]: "JON",
    [Book.Micah]: "MIC",
    [Book.Nahum]: "NAM",
    [Book.Habakkuk]: "HAB",
    [Book.Zephaniah]: "ZEP",
    [Book.Haggai]: "HAG",
    [Book.Zechariah]: "ZEC",
    [Book.Malachi]: "MAL",
    [Book.Matthew]: "MAT",
    [Book.Mark]: "MRK",
    [Book.Luke]: "LUK",
    [Book.John]: "JHN",
    [Book.Acts]: "ACT",
    [Book.Romans]: "ROM",
    [Book.FirstCorinthians]: "1CO",
    [Book.SecondCorinthians]: "2CO",
    [Book.Galatians]: "GAL",
    [Book.Ephesians]: "EPH",
    [Book.Philippians]: "PHP",
    [Book.Colossians]: "COL",
    [Book.FirstThessalonians]: "1TH",
    [Book.SecondThessalonians]: "2TH",
    [Book.FirstTimothy]: "1TI",
    [Book.SecondTimothy]: "2TI",
    [Book.Titus]: "TIT",
    [Book.Philemon]: "PHM",
    [Book.Hebrews]: "HEB",
    [Book.James]: "JAS",
    [Book.FirstPeter]: "1PE",
    [Book.SecondPeter]: "2PE",
    [Book.FirstJohn]: "1JN",
    [Book.SecondJohn]: "2JN",
    [Book.ThirdJohn]: "3JN",
    [Book.Jude]: "JUD",
    [Book.Revelation]: "REV",
    [Book.Tobit]: "TOB",
    [Book.Judith]: "JDT",
    [Book.Baruch]: "BAR",
    [Book.FirstMaccabees]: "1MA",
    [Book.SecondMaccabees]: "2MA",
    [Book.Wisdom]: "WIS",
    [Book.Ecclesiasticus]: "SIR",
    [Book.FirstEsdras]: "1ES",
    [Book.SecondEsdras]: "2ES",
    [Book.Bel]: "BEL",
    [Book.PrayerOfAzariah]: "AZA",
    [Book.EpistleJeremiah]: "LJE",
  };
  return names[bookName];
}

function usxToVerses(
  tree: XMLDocument,
  bookCode: string,
  verses: { chapter: string; verse: string }[]
): { book: string; chapter: string; verse: string; text: string }[] {
  const value = [];

  // remove all footnotes and references, once
  tree.querySelectorAll("note").forEach((el) => el.remove());
  tree.querySelectorAll("ref").forEach((el) => el.remove());

  // iterate over verses and extract text
  for (const { chapter, verse } of verses) {
    console.log("tree = ", tree);
    const vid = `${bookCode} ${chapter}:${verse}`,
      verseMatches = tree.querySelectorAll(`[sid="${vid}"], [vid="${vid}"]`);

    let text = "";

    verseMatches.forEach((el) => {
      let node;
      if (el.tagName == "para") {
        node = el.firstChild;
        text += "\n";
      } else {
        node = el as ChildNode;
      }

      if (node) {
        text += node.textContent;
      }

      while (
        node.nextSibling &&
        (node.nextSibling.nodeType == Node.TEXT_NODE ||
          (node.nextSibling as HTMLElement).tagName !== "verse")
      ) {
        text += node.nextSibling.textContent;
        node = node.nextSibling;
      }
      text += " ";
    });

    value.push({ book: bookCode, chapter, verse, text });
  }

  return value;
}

function usxToLdf(
  language: string,
  version: string,
  tree: XMLDocument,
  bookCode: string,
  verses: { chapter: string; verse: string }[]
): LiturgicalDocument {
  const value = usxToVerses(tree, bookCode, verses);

  return new BibleReading({
    type: "bible-reading",
    style: "long",
    language,
    version,
    value,
  });
}
