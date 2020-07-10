import { BibleReading, BibleReadingVerse } from "@venite/ldf";
import { httpsGet } from "./request-html";
import { firstVerseOfCitation } from "./parse-citation";
import { consolidateVerses } from "./consolidate-verses";

const API_TOKEN = '0944246351810bab2585914629c992f61f1c427f';

export async function getESV(citation : string) : Promise<BibleReading> {
  const url = buildESVURL(citation),
        resp = await httpsGet(url, { 'Authorization': `Token ${API_TOKEN}`}),
        json = JSON.parse(resp),
        value = parseESVResponse(citation, json?.data);

  return new BibleReading({
    type: 'bible-reading',
    style: 'long',
    citation,
    label: `A Reading from ${citation} (ESV)`,
    language: 'en',
    version: 'ESV',
    value
  });
}

export function buildESVURL(citation : string) : string {
  const params = new URLSearchParams();
  params.append('q', citation);
  params.append('include-passage-references', 'false');
  params.append('include-verse-numbers', 'true');
  params.append('include-first-verse-numbers', 'true');
  params.append('include-footnotes', 'false');
  params.append('include-headings', 'false');
  return `https://api.esv.org/v3/passage/text/?${params.toString()}`;
}

interface ESVJSONResponse {
  query: string;
  canonical: string;
  parsed: number[][];
  passage_meta: PassageMeta[];
  passages: string[];
}

interface PassageMeta {
  canonical: string;
  chapter_start: number[];
  chapter_end: number[];
  prev_verse: number;
  next_verse: number;
  prev_chapter: number[];
  next_chapter: number[];
}

export function parseESVResponse(citation : string, data : ESVJSONResponse) : BibleReadingVerse[] {

  let parsedCitation = firstVerseOfCitation(citation),
      {book, chapter, verse} = parsedCitation ? parsedCitation : { book: undefined, chapter: undefined, verse: undefined };
    
  const verses = data.passages.map(passage => passage.match(/(\[\d+\])([^\[]*)/g)),
        readingVerses = new Array();
  let lastVerse : BibleReadingVerse;
  verses.forEach((set, setIndex) => {
    const setVerses = new Array();
    (set || new Array()).forEach((line, lineIndex) => {
      let verse = line.match(/\[(\d+)\]/g)[0].replace(/[\[\]]/g, ''),
          text = line.replace(/\[(\d+)\]\s+/g, '').replace('(ESV)', '');

      if(lineIndex == 0 && setIndex > 0) {
        lastVerse = readingVerses[setIndex - 1][readingVerses[setIndex - 1].length - 1];
      } else if(lineIndex > 0) {
        lastVerse = setVerses[lineIndex - 1];
      }

      if(lastVerse && Number(lastVerse?.verse) > Number(verse)) {
        chapter = (Number(lastVerse?.chapter)+1).toString();
      }

      setVerses.push({ book, chapter, verse, text });
    });
    readingVerses.push(setVerses);
  });

  return consolidateVerses(readingVerses.flat());
}