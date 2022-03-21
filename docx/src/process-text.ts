import { TextRun } from "docx";
import { AllHtmlEntities } from "html-entities";
import { LDFStyles } from "./ldf-styles";

export function processText(text: string, style?: LDFStyles): TextRun[] {
  const entities = new AllHtmlEntities();

  return entities
    .decode(text)
    .replace(/\x93/g, "“")
    .replace(/\x94/g, "”")
    .replace(/\x97/g, "—")
    .replace(/\x92/, "’")
    .split("\n")
    .map((text, ii) =>
      ii == 0
        ? new TextRun({ text, style })
        : new TextRun({ text, style }).break()
    );
}
