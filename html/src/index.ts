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
import { LDFToHTMLConfig } from "./config";

export function ldfToHTML(
  inDoc: LiturgicalDocument,
  config: LDFToHTMLConfig
): string {
  const localeStrings = LOCALE_STRINGS["en"];

  // lookups by category, slug, lectionary, etc.
  if (inDoc?.lookup && (!inDoc.value || inDoc.value?.length === 0)) {
    return `<article class="lookup ${inDoc.lookup.type}">${config.lookupLinks(
      inDoc
    )}</article>`;
  }
  // compiled documents
  else {
    switch (inDoc?.type) {
      case "liturgy":
        return ((inDoc as Liturgy).value || [])
          .map((subDoc: LiturgicalDocument) =>
            ldfToHTML(subDoc, { ...config, includeLDF: true })
          )
          .flat()
          .join("\n");
      case "option":
        return optionToHTML(inDoc as Option, config);
      case "bible-reading":
        return bibleReadingToHTML(inDoc as BibleReading, localeStrings, config);
      case "heading":
        return headingToHTML(inDoc as Heading, localeStrings, config);
      case "meditation":
        return "";
      case "image":
        return ((inDoc as Image).value || [])
          .map(
            (src: string) =>
              `<article class="doc image"${
                config.includeLDF ? ` data-ldf="${JSON.stringify(inDoc)}` : ""
              }><img src="${src}"></article>`
          )
          .join("\n");
      case "psalm":
        return psalmToHTML(inDoc as Psalm, localeStrings, config);
      case "responsive":
        return responsivePrayerToHTML(
          inDoc as ResponsivePrayer,
          localeStrings,
          config
        );
      /** Text fields with various styles */
      case "refrain":
        return genericTextToHTML(
          inDoc as Refrain,
          "refrain",
          localeStrings,
          config
        );
      case "rubric":
        return genericTextToHTML(
          inDoc as Rubric,
          "rubric",
          localeStrings,
          config
        );
      case "text":
        return genericTextToHTML(
          inDoc as Text,
          inDoc?.display_format === "unison" ? "unison" : "normal",
          localeStrings,
          config
        );
      default:
        return "";
      //throw new Error(`"${inDoc.type}" is not a valid LDF type.`);
    }
  }
}
