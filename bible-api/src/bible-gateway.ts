import { BibleReading, BibleReadingVerse, Heading } from "@venite/ldf/dist/cjs";
import { requestHTML } from "./request-html";
import { HTMLElement, TextNode } from "node-html-parser";
import { consolidateVerses } from "./consolidate-verses";

export async function getBibleGateway(
  citation: string,
  version: string
): Promise<BibleReading> {
  const url = buildBibleGatewayURL(citation, version),
    page = await requestHTML(url),
    text = page.querySelectorAll(".passage-content p"),
    value = parseBibleGatewayResponse(text);

  return new BibleReading({
    type: "bible-reading",
    style: "long",
    citation,
    label: `${citation} (${version})`,
    language: "en",
    version,
    value,
  });
}

export function buildBibleGatewayURL(
  citation: string,
  version: string
): string {
  const params = new URLSearchParams();
  params.append("search", citation);
  params.append("version", version);
  return `https://www.biblegateway.com/passage/?${params.toString()}`;
}

export function parseBibleGatewayResponse(
  paragraphs: HTMLElement[]
): (BibleReadingVerse | Heading)[] {
  let paragraphResults: BibleReadingVerse[][] = new Array();

  paragraphs.forEach((paragraph) => {
    const verseNodes = paragraph.querySelectorAll(".text"),
      verses = Array.from(verseNodes).map((node) => {
        const bcv = (node.getAttribute("class") || "").split(" ")[1],
          [book, chapter, verse] = bcv.split("-");
        let text = "";
        if (node.childNodes.length) {
          for (const child of node.childNodes) {
            if (child.nodeType == 3) {
              text += child.toString();
              if (!text.endsWith(" ")) {
                text += " ";
              }
            } else if (
              child instanceof HTMLElement &&
              !child.childNodes.length
            ) {
              if (
                !child.classNames.includes("chapternum") &&
                !child.classNames.includes("versenum") &&
                !child.classNames.includes("crossreference") &&
                !child.classNames.includes("footnote")
              ) {
                text += child.text;
              }
            } else if (
              child instanceof HTMLElement &&
              !child.classNames.includes("chapternum") &&
              !child.classNames.includes("versenum") &&
              !child.classNames.includes("crossreference") &&
              !child.classNames.includes("footnote")
            ) {
              for (const subchild of child.childNodes) {
                if (subchild instanceof HTMLElement) {
                  if (
                    !subchild.classNames.includes("chapternum") &&
                    !subchild.classNames.includes("versenum") &&
                    !subchild.classNames.includes("crossreference") &&
                    !subchild.classNames.includes("footnote")
                  ) {
                    text += subchild.text;
                  }
                } else {
                  text += subchild.toString();
                }
              }
            }
          }
        } else {
          text += node.toString();
        }
        return {
          type: "bible-verse",
          book,
          chapter,
          verse,
          text: text.replace(/^\d+\s+/, ""),
        } as BibleReadingVerse;
      });
    paragraphResults.push(verses);
  });

  console.log("\n\nparagraphResults = ", paragraphResults, "\n\n");

  return consolidateVerses(paragraphResults).filter((verse) =>
    verse instanceof BibleReadingVerse
      ? verse.book !== undefined ||
        verse.chapter !== undefined ||
        verse.verse !== undefined
      : true
  );
}
