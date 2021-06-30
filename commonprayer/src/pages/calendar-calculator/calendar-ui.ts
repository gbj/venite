import { CalendarService, LectionaryService } from "./services.bundle.js";
import { getLocale } from "./locale.js";
import { LectionaryEntry } from "https://cdn.skypack.dev/@venite/ldf@^0.20.2?dts";

export enum Psalter {
  DailyOffice = "office",
  ThirtyDay = "30",
}

const LOCALIZATION = {
  en: {
    after: "after",
    the: "the",
    first_reading: "First Reading",
    second_reading: "Second Reading",
    gospel: "Gospel",
    holy_day_morning_1: "First Reading (Morning)",
    holy_day_morning_2: "Second Reading (Morning)",
    holy_day_evening_1: "First Reading (Evening)",
    holy_day_evening_2: "Second Reading (Evening)",
    daily_office_readings: "Daily Office Readings",
    first_reading_alt: "First Reading (alternate year)",
  },
};

function buildList<T>(el: Element, items: T[], f: (t: T) => string) {
  el.innerHTML = items.map(f).join("\n");
}

async function setDay(ymd: string, calendar: string, psalter: Psalter) {
  const locale = getLocale(),
    day = await CalendarService.findDay(ymd, "bcp1979"),
    details = document.getElementById("day-details"),
    template = document.getElementById(
      "day-details-template"
    ) as HTMLTemplateElement,
    date = CalendarService.dateFromYMDString(day.date),
    dayName =
      day?.holy_day_observed?.name && day?.holy_day_observed?.type?.rank >= 3
        ? // holy day
          day?.holy_day_observed?.name
        : date.getDay() === 0
        ? // Sunday
          day.week.name
        : `${date.toLocaleDateString("en", { weekday: "long" })} ${
            LOCALIZATION[locale].after
          } ${day.week.omit_the ? "" : LOCALIZATION[locale].the + " "}${
            day.week.name
          }`,
    el = document.importNode(template.content, true),
    title = el.querySelector("h1"),
    subtitle = el.querySelector("h2"),
    collect = el.querySelector("#collect"),
    readingList = el.querySelector("#readings"),
    morningPsalmList = el.querySelector("#morning-psalms"),
    eveningPsalmList = el.querySelector("#evening-psalms"),
    readings: LectionaryEntry[] = await LectionaryService.findReadings(
      day,
      "daily-office"
    ),
    psalms: LectionaryEntry[] = await LectionaryService.findReadings(
      day,
      psalter === Psalter.DailyOffice ? "daily-office-psalter" : "30day-psalter"
    ),
    morningPsalms = psalms.filter((e) => e.type === "morning_psalms"),
    eveningPsalms = psalms.filter((e) => e.type === "evening_psalms");

  // fill template
  title.innerText = dayName;
  buildList(readingList, readings, (entry) => `<li>${entry.citation}</li>`);
  buildList(
    morningPsalmList,
    morningPsalms,
    (entry) => `<li>${entry.citation}</li>`
  );
  buildList(
    eveningPsalmList,
    eveningPsalms,
    (entry) => `<li>${entry.citation}</li>`
  );

  // empty out past entries
  while (details.firstChild) {
    details.removeChild(details.firstChild);
  }

  // add the template
  details.append(el);
}

// run main
const dateField = document.getElementById("date") as HTMLInputElement;

function dateValue(): string {
  return dateField.value;
}

function psalterValue(): Psalter {
  return (document.querySelector("[name=psalter]:checked") as HTMLInputElement)
    .value as Psalter;
}

// update every time date field changes, or any psalter radio button changes
dateField.onchange = () => setDay(dateValue(), "bcp1979", psalterValue());
document.querySelectorAll("[name=psalter]").forEach((el: HTMLElement) => {
  el.onchange = () => setDay(dateValue(), "bcp1979", psalterValue());
});

// Start with current day
const now = new Date();
dateField.value = `${now.getFullYear()}-${(now.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
setDay(dateField.value, "bcp1979", Psalter.DailyOffice);
