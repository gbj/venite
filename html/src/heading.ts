import {
  dateFromYMDString,
  Heading,
  LiturgicalDay,
} from "@venite/ldf/dist/cjs";
import { LDFToHTMLConfig } from "./config";
import { notEmpty } from "./not-empty";

export function headingToHTML(
  doc: Heading,
  localeStrings: Record<string, string>,
  config: LDFToHTMLConfig
): string {
  const ldf = config.includeLDF
    ? ` data-ldf="${encodeURI(JSON.stringify(doc))}"`
    : "";

  const level: number = doc.metadata?.level ? doc.metadata.level : 4,
    isDate = doc?.style == "date",
    isDay = doc?.style == "day",
    isText =
      doc?.style == undefined || doc?.style == "text" || (!isDate && !isDay);

  function texts(): string[] {
    const value = doc?.value ?? [];

    const sections = [doc?.citation, (doc?.value || [])[1], doc?.source].filter(
      (n) => Boolean(n)
    ).length;

    const children: string[] = [
      headerNode(
        doc?.metadata?.level ?? 3,
        [value[0] ? doc.value[0]?.replace(/\t/g, "  ") : null].filter(notEmpty),
        true
      ),
      value[1] ? `\t<span>${doc.value[1].replace(/\t/g, "  ")}</span>` : null,
      doc?.citation
        ? `${Array(3 - sections)
            .fill("\t")
            .join("")}<em class="citation">${doc.citation}</em>`
        : null,
      doc?.source && !doc?.citation
        ? `<cite class="source">${Array(3 - sections)
            .fill("\t")
            .join("")}${sourceToText()}</cite>`
        : null,
      ...value.slice(2, value.length).map((text) => `<p>${text}</p>`),
    ].filter(notEmpty);
    return children;
  }

  function sourceToText() {
    function sourceName(s: string) {
      switch (s) {
        case "bcp1979":
          return "BCP";
        default:
          return s;
      }
    }

    return doc?.source
      ? `${sourceName(doc.source.source)} ${doc.source.citation}`
      : "";
  }

  function headerNode(
    level: number,
    children: string[],
    display: boolean
  ): string | null {
    const text = children.join("\n");
    return display && text.trim() !== ""
      ? `<h${level}>${text}</h${level}>`
      : null;
  }

  function dateNode(): string | null {
    const hasDate = !!doc?.day?.date;
    if (hasDate) {
      const date = dateFromYMDString(doc?.day?.date || "");
      return date.toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      return null;
    }
  }

  function dayNode(day: LiturgicalDay): string[] {
    if (
      day?.holy_day_observed?.name &&
      (day?.holy_day_observed?.type?.rank || 0) >= 3
    ) {
      return [day?.holy_day_observed?.name];
    } else {
      const date = dateFromYMDString(day?.date);

      // Sunday => name of week
      if (date.getDay() == 0) {
        const the = localeStrings.the || " the ";
        return [
          day?.week?.omit_the
            ? ""
            : ` ${the[1].toUpperCase()}${the.slice(
                2,
                localeStrings.the.length
              )} `,
          ,
          day?.week?.name,
        ].filter(notEmpty);
      }
      // weekday => [weekday] after (the) [Sunday]
      else {
        return [
          date.toLocaleDateString("en", { weekday: "long" }),
          localeStrings.after || " after the ",
          day?.week?.omit_the ? "" : localeStrings.the,
          day?.week?.name,
        ];
      }
    }
  }

  const text = isText && doc?.value?.length > 0 ? texts() : null,
    date = isDate ? dateNode() : null,
    day = isDay && doc.day ? dayNode(doc.day) : null;

  return (
    (text && text.length > 0 && !(text.length == 0 && text[0].trim() == "")) ||
    day ||
    day
      ? [
          `<article ${ldf} class="doc heading" lang="${doc.language || "en"}">`,
          ...(text ? text : []),
          date ? headerNode(level, [date], true) : null,
          day ? headerNode(level, day, true) : null,
          `</article>`,
        ]
      : []
  )
    .filter(notEmpty)
    .join("\n");
}
