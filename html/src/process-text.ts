export function processText(text: string): string {
  return text.replace(/\n/g, "<br>");
}
