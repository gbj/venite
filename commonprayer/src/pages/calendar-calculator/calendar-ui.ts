import CalendarService from "./calendar-service.js";
import LectionaryService from "./lectionary-service.js";
import { getLocale } from "./locale.js";

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
  },
};

async function setDay(ymd: string, calendar: string) {
  const locale = getLocale(),
    day = await CalendarService.findDay(ymd, "bcp1979"),
    details = document.getElementById("day-details"),
    template = document.getElementById("day-details-template"),
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
    readings = await LectionaryService.findReadings(day, "daily-office");

  // fill template
  title.innerText = dayName;
  readingList.innerHTML = readings
    .map((entry) => `<li>${entry.citation}</li>`)
    .join("\n");

  // empty out past entries
  while (details.firstChild) {
    details.removeChild(details.firstChild);
  }

  // add the template
  details.append(el);
}

// run main
const dateField = document.getElementById("date");

dateField.onchange = (ev) => setDay(ev.target.value, "bcp1979");

// Start with current day
const now = new Date();
dateField.value = `${now.getFullYear()}-${(now.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
setDay(dateField.value, "bcp1979");
