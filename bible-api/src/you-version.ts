import { BibleReading, BibleReadingVerse, Heading } from "@venite/ldf/dist/cjs";
import { requestHTML } from "./request-html";

export async function getYouVersionBook(
  bibleNumber: string,
  bookCode: string,
  chapter: string,
  bibleCode: string
): Promise<[string, string][]> {
  const url = `https://www.bible.com/bible/${bibleNumber}/${bookCode}.${chapter}.${bibleCode}`,
    page = await requestHTML(url);
  return Array.from(page.querySelectorAll(".verse"))
    .map((node) => [
      node.querySelector(".label"),
      node.querySelector(".content"),
    ])
    .filter(([label, content]) => label && content)
    .map(([label, content]) => [
      label?.firstChild?.toString() || "",
      content?.firstChild?.toString() || "",
    ]);
}
