import { requestHTML } from "./request-html";
import { BibleReading, BibleReadingVerse, Heading } from "@venite/ldf/dist/cjs";
import { HTMLElement } from "node-html-parser";
import { firstVerseOfCitation } from "./parse-citation";
import { consolidateVerses } from "./consolidate-verses";

type OremusVersion = "AV" | "NRSV" | "NRSVAE" | "BCP" | "CW" | "LP";

export async function getOremus(
  citation: string,
  version: OremusVersion
): Promise<BibleReading> {
  const url = buildOremusURL(citation, version),
    page = await requestHTML(url),
    text = page.querySelector("div.bibletext"),
    value = parseOremusResponse(citation, text, version);

  if (value == null && version === "NRSV") {
    return getOremus(citation, "NRSVAE");
  } else {
    return new BibleReading({
      type: "bible-reading",
      style: "long",
      citation,
      label: `A Reading from ${citation} (${version})`,
      language: "en",
      version: version === "AV" ? "KJV" : version,
      value: value || [],
    });
  }
}

export function buildOremusURL(
  citation: string,
  version: OremusVersion
): string {
  const params = new URLSearchParams();
  params.append("passage", citation);
  params.append("version", version);
  params.append("fnote", "NO");
  params.append("show_ref", "NO");
  params.append("headings", "NO");
  params.append("omithidden", "YES");
  return `https://bible.oremus.org/?${params.toString()}`;
}

export function parseOremusResponse(
  citation: string,
  textEl: HTMLElement,
  version: OremusVersion
): (BibleReadingVerse | Heading)[] | null {
  const nodes = textEl?.childNodes,
    verses: BibleReadingVerse[][] = new Array();

  let lastVerseNum: number,
    parsedCitation = firstVerseOfCitation(citation),
    { book, chapter, verse } = parsedCitation
      ? parsedCitation
      : { book: undefined, chapter: undefined, verse: undefined },
    chapterIncremented: boolean = false;

  if (nodes?.length > 0) {
    nodes?.forEach((paragraph, sectionIndex) => {
      if (!verses[sectionIndex]) {
        verses[sectionIndex] = new Array();
      }
      let verseTexts: string[] = new Array();
      paragraph.childNodes?.forEach((child, childIndex) => {
        if (child instanceof HTMLElement && child.classNames.includes("cc")) {
          verses[sectionIndex].push({
            book,
            chapter,
            verse,
            text: verseTexts.join(""),
          });
          verseTexts = new Array();
          chapter = child.text;
          chapterIncremented = true;
          verse = "1";
        } else if (
          child instanceof HTMLElement &&
          child.tagName.toLowerCase() == "br"
        ) {
          verseTexts.push("\n");
        } else if (
          child instanceof HTMLElement &&
          (child.classNames.includes("ww") ||
            child.classNames.includes("ii") ||
            child.classNames.includes("vnumVis"))
        ) {
          verses[sectionIndex].push({
            book,
            chapter,
            verse,
            text: verseTexts.join(""),
          });
          verseTexts = new Array();
          const newVerse = child.text?.trim();
          // if number of verse has but chapter hasn't, increment chapter number...
          if (Number(newVerse) < Number(verse) && !chapterIncremented) {
            chapter = (Number(chapter) + 1).toString();
          }
          verse = newVerse;
        } else if (
          child instanceof HTMLElement &&
          (child.classNames.includes("sectVis") ||
            child.classNames.includes("passageref"))
        ) {
        } else if (
          child instanceof HTMLElement &&
          child.tagName.toLowerCase() == "a"
        ) {
        } else if (
          child instanceof HTMLElement &&
          child.classNames.includes("sc")
        ) {
          verseTexts.push(
            child.text.replace(/\n$/, " ").replace(/\s+/g, " ").toUpperCase()
          );
        } else if (child.text?.length < 20 && child.text?.endsWith("-->")) {
        } else {
          verseTexts.push(child.text.replace(/\n$/, " "));
        }
      });
      verses[sectionIndex].push({
        book,
        chapter,
        verse,
        text: verseTexts.join("").replace(/&nbsp;/g, " "),
      });
      verseTexts = new Array();
      verses[sectionIndex] = verses[sectionIndex].filter(
        (v) => !v.text.match(/^\s*$/)
      );
    });
  } else {
    return null;
  }

  return consolidateVerses(
    verses
      .filter(
        (section) =>
          section && section.length > 0 && !section[0].text.match(/^\s*$/)
      )
      .map((section) =>
        section.map((verse) =>
          version === "AV"
            ? {
                ...verse,
                text: verse?.text?.replace(/\s*\n\s*$/, " "),
              }
            : verse
        )
      )
  );
}
