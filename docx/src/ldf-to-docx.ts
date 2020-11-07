import { LiturgicalDocument, Liturgy, Option, BibleReading, Heading, Refrain, Rubric, Text } from "@venite/ldf/dist/cjs";
import { DisplaySettings } from "./display-settings";
import { Document, HyperlinkRef, Paragraph, Table, TableOfContents } from "docx";
import { bibleReadingToDocx } from "./bible-reading-to-docx";
import { headingToDocx } from './heading-to-docx';
import { stylesFromLDF } from "./styles-from-ldf";
import { LocaleStrings, LOCALE_STRINGS } from "./locale-strings";
import { genericTextToDocx } from "./generic-text-to-docx";
import { LDFStyles } from "./ldf-styles";

export function ldfToDocx(inDoc : LiturgicalDocument, displaySettings : DisplaySettings) : Document {
  const styles = stylesFromLDF(inDoc),
    outDoc = new Document({ styles }),
    localeStrings = LOCALE_STRINGS['en'],
    children = docxChildrenFromLDF(inDoc, displaySettings, localeStrings);
    
  outDoc.addSection({ children });

  return outDoc;
}

export type DocxChild = (Paragraph | Table | TableOfContents | HyperlinkRef);

export function docxChildrenFromLDF(inDoc : LiturgicalDocument, displaySettings : DisplaySettings, localeStrings : LocaleStrings) : DocxChild[] {
  switch(inDoc?.type) {
    case "liturgy":
      return ((inDoc as Liturgy).value || [])
        .map((subDoc : LiturgicalDocument) => docxChildrenFromLDF(subDoc, displaySettings, localeStrings))
        .flat();
    case "option":
      const selected = (inDoc as Option).value[inDoc.metadata?.selected ?? 0];
      return docxChildrenFromLDF(selected, displaySettings, localeStrings);
    case "bible-reading":
      return bibleReadingToDocx(inDoc as BibleReading, displaySettings, localeStrings);
    case "heading":
      return headingToDocx(inDoc as Heading, displaySettings, localeStrings);
    case "refrain":
      return genericTextToDocx(inDoc as Refrain, LDFStyles.Refrain, displaySettings, localeStrings);
    case "rubric":
      return genericTextToDocx(inDoc as Rubric, LDFStyles.Rubric, displaySettings, localeStrings);
    case "text":
      return genericTextToDocx(inDoc as Text, LDFStyles.Normal, displaySettings, localeStrings);
    default:
      return [];
      //throw new Error(`"${inDoc.type}" is not a valid LDF type.`);
  }
}