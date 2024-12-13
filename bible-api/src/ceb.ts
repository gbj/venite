import { BibleReading, BibleReadingVerse, Heading } from "@venite/ldf/dist/cjs";
import { requestHTML } from "./request-html";
import { HTMLElement, TextNode } from "node-html-parser";
import { consolidateVerses } from "./consolidate-verses";

export async function getCEB(citation: string): Promise<BibleReading> {
  const url = buildCEBURL(citation),
    page = await requestHTML(url),
    text = page.querySelectorAll("#ceb_search_results p"),
    value = parseCEBResponse(text);

  return new BibleReading({
    type: "bible-reading",
    style: "long",
    citation,
    label: `A Reading from ${citation} (CEB)`,
    language: "en",
    version: "CEB",
    value,
  });
}

export function buildCEBURL(citation: string): string {
  const params = new URLSearchParams();
  params.append("query", citation);
  return `https://www.commonenglishbible.com/explore/passage-lookup/?${params.toString()}`;
}

export function parseCEBResponse(
  paragraphs: HTMLElement[]
): (BibleReadingVerse | Heading)[] {
  let paragraphResults: BibleReadingVerse[][] = new Array();
  paragraphs.forEach((paragraph) => {
    let book: string, chapter: string, verse: string;
    let verses: BibleReadingVerse[] = new Array();

    paragraph.childNodes
      .filter(
        (node) =>
          node instanceof TextNode ||
          (node instanceof HTMLElement &&
            (node.classNames.includes("text") ||
              node.classNames.includes("line") ||
              node.tagName === "br" ||
              node.classNames.includes("indent-1") ||
              node.classNames.includes("indent-2") ||
              node.rawAttributes?.class?.includes("chapter-")))
      )
      .forEach((node) => {
        // push data for this node
        let text: string = "";

        if (
          node instanceof HTMLElement &&
          node.rawAttributes?.class?.includes("chapter-")
        ) {
          node = node.querySelector(".text");
        }

        if (
          node instanceof HTMLElement &&
          node.rawAttributes?.class?.includes("indent-2")
        ) {
          text += "\t";
          node = node.querySelector(".text");
        }

        // update running citation, if a citation class is on a .text element
        if (node instanceof HTMLElement && node.classNames.includes("text")) {
          const citation = node.classNames.find(
            (className) => className !== "text"
          );
          if (citation) {
            [book, chapter, verse] = citation.split("-");
          }
        }

        try {
          text += node.childNodes
            .filter((n) => {
              if (n instanceof HTMLElement) {
                return !n.classNames.includes("versenum");
              } else {
                return true;
              }
            })
            .map((n) => {
              if (n instanceof HTMLElement) {
                if (n.classNames.includes("small-caps")) {
                  return n.text.toUpperCase();
                } else if (n.tagName == "br") {
                  return "\n";
                } else {
                  return n.text;
                }
              } else {
                return n.text;
              }
            })
            .join("")
            .replace(/\s\s+/, "\t");
          if (node instanceof HTMLElement && node.tagName == "br") {
            text = "\n";
          }
          console.log("text = ", text);
        } catch (e) {
          console.error(e);
          text = paragraph.text;
        }

        console.log({ book, chapter, verse, text });

        verses.push({
          book,
          chapter,
          verse,
          text: text.replace(/^\d+\s*/, " "),
        });
      });

    // merge duplicate verses

    paragraphResults.push(verses);
  });

  return consolidateVerses(paragraphResults).filter((verse) =>
    verse instanceof BibleReadingVerse
      ? verse.book !== undefined ||
        verse.chapter !== undefined ||
        verse.verse !== undefined
      : true
  );
}
