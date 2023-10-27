import { requestHTML } from "./request-html";

export async function getYouVersionBook(
  bibleNumber: string,
  bookCode: string,
  chapter: string,
  bibleCode: string
): Promise<[string, string][]> {
  const url = `https://www.bible.com/bible/${bibleNumber}/${bookCode}.${chapter}.${bibleCode}`,
    page = await requestHTML(url);
  const nodes = Array.from(page.querySelectorAll("span"))
    .filter((span) => (span.getAttribute("class") || "").includes("_verse_"))
    .map((node) => {
      let spans = Array.from(node.querySelectorAll("span"));
      let label = "";
      let content = "";
      for (const span of spans) {
        if (span.getAttribute("class")?.includes("_label_")) {
          label += span.text;
        } else if (span.getAttribute("class")?.includes("_content_")) {
          content += " ";
          content += span.text;
        }
      }
      return [label.replace(/#/g, ""), content] as [string, string];
    });
  const finalNodes = [] as [string, string][];
  for (const [label, text] of nodes) {
    if (label && text) {
      finalNodes.push([label, text]);
    } else if (text) {
      const prevNode = finalNodes[finalNodes.length - 1];
      if (prevNode) {
        prevNode[1] += `\n${text}`;
      } else {
        finalNodes.push([label, text]);
      }
    }
  }
  return finalNodes;
}
