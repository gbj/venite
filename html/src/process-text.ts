export function processText(text: string): string {
  return text
    .replace(/\n/g, "<br>")
    .replace(/\t/g, "    ")
    .replace(/\*\*([^\*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^\*]+)\*/g, "<em>$1</em>");
}
