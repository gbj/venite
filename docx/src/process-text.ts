import { TextRun } from "docx";
import { AllHtmlEntities } from "html-entities";

export function processText(text : string) : TextRun[] {
  const entities = new AllHtmlEntities();

  return entities.decode(text)
    .split('\n').map((text, ii) => ii == 0 ? new TextRun(text) : new TextRun(text).break());
}