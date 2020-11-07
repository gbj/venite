import { TextRun } from "docx";

export function processText(text : string) : TextRun[] {
  return text.split('\n').map((text, ii) => ii == 0 ? new TextRun(text) : new TextRun(text).break());
}