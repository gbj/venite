import {
  dateFromYMDString,
  Heading,
  LiturgicalDay,
} from "@venite/ldf/dist/cjs";
import {
  Paragraph,
  TextRun,
  TabStopType,
  TabStopPosition,
  AlignmentType,
} from "docx";
import { LDFStyles } from "./ldf-styles";
import { DocxChild } from "./ldf-to-docx";
import { LocaleStrings } from "./locale-strings";
import { notEmpty } from "./not-empty";

export function headingToDocx(
  doc: Heading,
  localeStrings: LocaleStrings
): DocxChild[] {
  const level: number = doc.metadata?.level ? doc.metadata.level : 4,
    hasCitation = Boolean(doc?.citation),
    hasSource = Boolean(doc?.source),
    isDate = doc?.style == "date",
    isDay = doc?.style == "day",
    isText =
      doc?.style == undefined || doc?.style == "text" || (!isDate && !isDay);

  function texts(): DocxChild[] {
    const value = doc?.value ?? [];

    const sections = [doc?.citation, (doc?.value || [])[1], doc?.source].filter(
      (n) => Boolean(n)
    ).length;

    const children: DocxChild[] = [
      headerNode(
        doc?.metadata?.level ?? 3,
        [
          value[0] ? new TextRun(doc.value[0].replace(/\t/g, "  ")) : null,
          value[1]
            ? new TextRun(`\t${doc.value[1].replace(/\t/g, "  ")}`)
            : null,
          doc?.citation
            ? new TextRun({
                style: LDFStyles.Citation,
                text: `${Array(3 - sections)
                  .fill("\t")
                  .join("")}${doc.citation}`,
              })
            : null,
          doc?.source && !doc?.citation
            ? new TextRun({
                style: LDFStyles.Normal,
                text: `${Array(3 - sections)
                  .fill("\t")
                  .join("")}${sourceToText()}`,
              })
            : null,
        ].filter(notEmpty),
        true
      ),
      ...value
        .slice(2, value.length)
        .map((text) => new Paragraph({ style: LDFStyles.Normal, text })),
    ].filter(notEmpty);
    //(doc?.value || []).map((text, index) => text ? headerNode(level, [textNode(text)], index == 0 || Boolean(text)) : null).filter(notEmpty)
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
    children: TextRun[],
    display: boolean
  ): Paragraph | null {
    return display
      ? new Paragraph({
          style: `Heading_${level}`,
          children,
          tabStops: [
            {
              type: TabStopType.CENTER,
              position: TabStopPosition.MAX / 2,
            },
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX,
            },
          ],
        })
      : null;
  }

  function textNode(text: string): TextRun {
    return new TextRun(text);
  }

  function dateNode(): TextRun | null {
    const hasDate = !!doc?.day?.date;
    if (hasDate) {
      const date = dateFromYMDString(doc?.day?.date || "");
      return new TextRun(
        date.toLocaleDateString("en", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
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
          (day?.week?.omit_the ? "" : localeStrings.the).replace("  ", " "),
          day?.week?.name,
        ];
      }
    }
  }

  const text = isText && doc?.value?.length > 0 ? texts() : null,
    date = isDate ? dateNode() : null,
    day = isDay && doc.day ? dayNode(doc.day) : null;

  const base = [
    ...(text ? text : []),
    date ? headerNode(level, [date], true) : null,
    day
      ? headerNode(
          level,
          day.map((n) => new TextRun(n)),
          true
        )
      : null,
  ].filter(notEmpty);

  if (isDay) {
    (doc.day?.holy_days || [])
      .filter((hd) => (hd?.type?.rank || 3) < 3 && hd.name)
      .forEach((hd) => {
        base.push(
          new Paragraph({
            style: "Default",
            children: [new TextRun({ text: `\t${hd.name}`, italics: true })],
            alignment: AlignmentType.CENTER,
          })
        );
      });
  }

  return base;
}
