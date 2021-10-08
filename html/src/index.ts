import {
  LiturgicalDocument,
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
  Parallel,
} from "@venite/ldf/dist/cjs";
import { bibleReadingToHTML } from "./bible-reading";
import { genericTextToHTML } from "./generic-text";
import { headingToHTML } from "./heading";
import { LOCALE_STRINGS } from "./locale";
import { psalmToHTML } from "./psalm";
import { responsivePrayerToHTML } from "./responsive-prayer";
import { optionToHTML } from "./option";
import { LDFToHTMLConfig } from "./config";
import { parallelToHTML } from "./parallel";

function docToHtml(inDoc: LiturgicalDocument, config: LDFToHTMLConfig): string {
  const localeStrings = LOCALE_STRINGS["en"];

  switch (inDoc?.type) {
    case "liturgy":
      return ((inDoc as Liturgy).value || [])
        .map((subDoc: LiturgicalDocument) => [
          subDoc.slug ? `<a name="${subDoc.slug}"></a>` : null,
          ldfToHTML(subDoc, { ...config, includeLDF: true }),
        ])
        .flat()
        .flat()
        .filter((n) => Boolean(n))
        .join("\n");
    case "parallel":
      return parallelToHTML(inDoc as Parallel, config);
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
              config.includeLDF
                ? ` data-ldf="${encodeURI(JSON.stringify(inDoc))}"`
                : ""
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
  }
}

export function ldfToHTML(
  inDoc: LiturgicalDocument,
  config: LDFToHTMLConfig
): string {
  // lookups by category, slug, lectionary, etc.
  if (inDoc?.lookup && (!inDoc.value || inDoc.value?.length === 0)) {
    return `<article class="lookup ${inDoc.lookup.type} ${
      inDoc?.hidden ? " hidden" : ""
    }" data-ldf="${encodeURI(JSON.stringify(inDoc))}">${config.lookupLinks(
      inDoc
    )}</article>`;
  }
  // compiled documents
  else {
    const doc = docToHtml(inDoc, config);
    // Very limited Markdown
    return doc
      .replace(/\*\*([^\*>]*)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^\*>]*)\*/g, "<em>$1</em>");
  }
}
