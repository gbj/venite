import { LiturgicalDocument } from "@venite/ldf/dist/cjs";

import {
  Liturgy,
  Option,
  BibleReading,
  Heading,
  Image,
  Refrain,
  Rubric,
  Text,
  Psalm,
  ResponsivePrayer,
} from "@venite/ldf/dist/cjs";
import { bibleReadingToHTML } from "./bible-reading";
import { genericTextToHTML } from "./generic-text";
import { headingToHTML } from "./heading";
import { LOCALE_STRINGS } from "./locale";
import { psalmToHTML } from "./psalm";
import { responsivePrayerToHTML } from "./responsive-prayer";
import { optionToHTML } from "./option";

export function ldfToHTML(
  inDoc: LiturgicalDocument,
  includeLDF = false
): string {
  const localeStrings = LOCALE_STRINGS["en"];

  switch (inDoc?.type) {
    case "liturgy":
      return ((inDoc as Liturgy).value || [])
        .map((subDoc: LiturgicalDocument) => ldfToHTML(subDoc, true))
        .flat()
        .join("\n");
    case "option":
      return optionToHTML(inDoc as Option);
    case "bible-reading":
      return bibleReadingToHTML(
        inDoc as BibleReading,
        localeStrings,
        includeLDF
      );
    case "heading":
      return headingToHTML(inDoc as Heading, localeStrings, includeLDF);
    case "meditation":
      return "";
    case "image":
      return ((inDoc as Image).value || [])
        .map(
          (src: string) =>
            `<article class="doc image"${
              includeLDF ? ` data-ldf="${JSON.stringify(inDoc)}` : ""
            }><img src="${src}"></article>`
        )
        .join("\n");
    case "psalm":
      return psalmToHTML(inDoc as Psalm, localeStrings, includeLDF);
    case "responsive":
      return responsivePrayerToHTML(
        inDoc as ResponsivePrayer,
        localeStrings,
        includeLDF
      );
    /** Text fields with various styles */
    case "refrain":
      return genericTextToHTML(
        inDoc as Refrain,
        "refrain",
        localeStrings,
        includeLDF
      );
    case "rubric":
      return genericTextToHTML(
        inDoc as Rubric,
        "rubric",
        localeStrings,
        includeLDF
      );
    case "text":
      return genericTextToHTML(
        inDoc as Text,
        inDoc?.display_format === "unison" ? "unison" : "normal",
        localeStrings,
        includeLDF
      );
    default:
      return "";
    //throw new Error(`"${inDoc.type}" is not a valid LDF type.`);
  }
}
