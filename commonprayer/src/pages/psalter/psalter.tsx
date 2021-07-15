import h from "https://cdn.skypack.dev/vhtml@2.2.0";
import { Page } from "../../ssg/page.ts";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { Psalm } from "https://cdn.skypack.dev/@venite/ldf@^0.20.3";
import { ldfToHTML } from "https://cdn.skypack.dev/@venite/html@0.3.4";
import { LDF_TO_HTML_CONFIG } from "../../ssg/ldf-to-html-config.tsx";

const Psalter = await Page({
  main: async () => {
    const localization = LOCALIZATION.en;

    const tree = await Promise.all(
      PSALTER_LAYOUT.map(async (book) => [
        <h1>The Psalter</h1>,
        <h2>
          {localization.book} {localization.books[book.book - 1]}
        </h2>,
        ...(await Promise.all(
          book.days.map(async (day) => [
            <h3>
              {localization.days[day.day - 1]} {localization.day}
              {": "}
              {day.morning ? localization.morning : localization.evening}
            </h3>,
            ...(await Promise.all(
              day.psalms.map(async (psalm) => {
                const f = await Deno.readTextFile(
                    path.join(
                      path.fromFileUrl(import.meta.url),
                      "..",
                      "..",
                      "..",
                      "liturgy",
                      "psalter",
                      "bcp1979",
                      "psalm-" + psalm + ".json"
                    )
                  ),
                  doc = JSON.parse(f);
                const { data } = doc;
                return `<a id="psalm-${psalm}">
                  <div class="cp-doc" data-category="psalter" data-slug="psalm-${psalm}">${ldfToHTML(
                    new Psalm(data[0]),
                    LDF_TO_HTML_CONFIG
                  )}</div>
                </a>`;
              })
            )),
          ])
        )),
      ])
    );

    return `<main>${tree.flat().flat().join("\n")}</main>`;
  }
});

export default Psalter;

export const PSALTER_LAYOUT = [
  {
    book: 1,
    days: [
      {
        day: 1,
        morning: true,
        psalms: ["1", "2", "3", "4", "5"],
      },
      {
        day: 1,
        morning: false,
        psalms: ["6", "7", "8"],
      },
      {
        day: 2,
        morning: true,
        psalms: ["9", "10", "11"],
      },
      {
        day: 2,
        morning: false,
        psalms: ["12", "13", "14"],
      },
      {
        day: 3,
        morning: true,
        psalms: ["15", "16", "17"],
      },
      {
        day: 3,
        morning: false,
        psalms: ["18-i", "18-ii"],
      },
      {
        day: 4,
        morning: true,
        psalms: ["19", "20", "21"],
      },
      {
        day: 4,
        morning: false,
        psalms: ["22", "23"],
      },
      {
        day: 5,
        morning: true,
        psalms: ["24", "25", "26"],
      },
      {
        day: 5,
        morning: false,
        psalms: ["27", "28", "29"],
      },
      {
        day: 6,
        morning: true,
        psalms: ["30", "31"],
      },
      {
        day: 6,
        morning: false,
        psalms: ["32", "33", "34"],
      },
      {
        day: 7,
        morning: true,
        psalms: ["35", "36"],
      },
      {
        day: 7,
        morning: false,
        psalms: ["37-i", "37-ii"],
      },
      {
        day: 8,
        morning: true,
        psalms: ["38", "39", "40"],
      },
      {
        day: 8,
        morning: false,
        psalms: ["41", "42", "43"],
      },
      {
        day: 9,
        morning: true,
        psalms: ["44", "45", "46"],
      },
      {
        day: 9,
        morning: false,
        psalms: ["47", "48", "49"],
      },
      {
        day: 10,
        morning: true,
        psalms: ["50", "51", "52"],
      },
      {
        day: 10,
        morning: false,
        psalms: ["53", "54", "55"],
      },
      {
        day: 11,
        morning: true,
        psalms: ["56", "57", "58"],
      },
      {
        day: 11,
        morning: false,
        psalms: ["59", "60", "61"],
      },
      {
        day: 12,
        morning: true,
        psalms: ["62", "63", "64"],
      },
      {
        day: 12,
        morning: false,
        psalms: ["65", "66", "67"],
      },
      {
        day: 13,
        morning: true,
        psalms: ["68"],
      },
      {
        day: 13,
        morning: false,
        psalms: ["69", "70"],
      },
      {
        day: 14,
        morning: true,
        psalms: ["71", "72"],
      },
      {
        day: 14,
        morning: false,
        psalms: ["73", "74"],
      },
      {
        day: 15,
        morning: true,
        psalms: ["75", "76", "77"],
      },
      {
        day: 15,
        morning: false,
        psalms: ["78-i", "78-ii"],
      },
      {
        day: 16,
        morning: true,
        psalms: ["79", "80", "81"],
      },
      {
        day: 16,
        morning: false,
        psalms: ["82", "83", "84", "85"],
      },
      {
        day: 17,
        morning: true,
        psalms: ["86", "87", "88"],
      },
      {
        day: 17,
        morning: false,
        psalms: ["89-i", "89-ii"],
      },
      {
        day: 18,
        morning: true,
        psalms: ["90", "91", "92"],
      },
      {
        day: 18,
        morning: false,
        psalms: ["93", "94"],
      },
      {
        day: 19,
        morning: true,
        psalms: ["95", "96", "97"],
      },
      {
        day: 19,
        morning: false,
        psalms: ["98", "99", "100", "101"],
      },
      {
        day: 20,
        morning: true,
        psalms: ["102", "103"],
      },
      {
        day: 20,
        morning: false,
        psalms: ["104"],
      },
      {
        day: 21,
        morning: true,
        psalms: ["105-i", "105-ii"],
      },
      {
        day: 21,
        morning: false,
        psalms: ["106-i", "106-ii"],
      },
      {
        day: 22,
        morning: true,
        psalms: ["107-i", "107-ii"],
      },
      {
        day: 22,
        morning: false,
        psalms: ["108", "109"],
      },
      {
        day: 23,
        morning: true,
        psalms: ["110", "111", "112", "113"],
      },
      {
        day: 23,
        morning: false,
        psalms: ["114", "115"],
      },
      {
        day: 24,
        morning: true,
        psalms: ["116", "117", "118"],
      },
      {
        day: 24,
        morning: false,
        psalms: ["119-aleph", "119-beth", "119-gimel", "119-daleth"],
      },
      {
        day: 25,
        morning: true,
        psalms: ["119-he", "119-waw", "119-zayin", "119-heth", "119-teth"],
      },
      {
        day: 25,
        morning: false,
        psalms: ["119-yodh", "119-kaph", "119-lamedh", "119-mem"],
      },
      {
        day: 26,
        morning: true,
        psalms: ["119-nun", "119-samekh", "119-ayin", "119-pe", "119-sadhe"],
      },
      {
        day: 26,
        morning: false,
        psalms: ["119-qoph", "119-resh", "119-shin", "119-taw"],
      },
      {
        day: 27,
        morning: true,
        psalms: ["120", "121", "122", "123", "124", "125"],
      },
      {
        day: 27,
        morning: false,
        psalms: ["126", "127", "128", "129", "130", "131"],
      },
      {
        day: 28,
        morning: true,
        psalms: ["132", "133", "134", "135"],
      },
      {
        day: 28,
        morning: false,
        psalms: ["136", "137", "138"],
      },
      {
        day: 29,
        morning: true,
        psalms: ["139", "140"],
      },
      {
        day: 29,
        morning: false,
        psalms: ["141", "142", "143"],
      },
      {
        day: 30,
        morning: true,
        psalms: ["144", "145", "146"],
      },
      {
        day: 30,
        morning: false,
        psalms: ["147", "148", "149", "150"],
      },
    ],
  },
];

export const LOCALIZATION = {
  en: {
    loading: "Loading...",
    title: "The Psalter",
    book: "Book",
    morning: "Morning Prayer",
    evening: "Evening Prayer",
    books: ["One", "Two", "Three", "Four", "Five"],
    day: "Day",
    days: [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eight",
      "Ninth",
      "Tenth",
      "Eleventh",
      "Twelfth",
      "Thirteenth",
      "Fourteenth",
      "Fifteenth",
      "Sixteenth",
      "Seventeenth",
      "Eighteenth",
      "Nineteenth",
      "Twentieth",
      "Twenty-First",
      "Twenty-Second",
      "Twenty-Third",
      "Twenty-Fourth",
      "Twenty-Fifth",
      "Twenty-Sixth",
      "Twenty-Seventh",
      "Twenty-Eighth",
      "Twenty-Ninth",
      "Thirtieth",
    ],
  },
};
