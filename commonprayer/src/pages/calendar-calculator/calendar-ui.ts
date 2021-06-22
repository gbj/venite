import CalendarService from "./calendar-service.js";

async function setDay(ymd: string, calendar: string) {
  const day = await CalendarService.findDay(ymd, "bcp1979"),
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
        : `${date.toLocaleDateString("en", { weekday: "long" })} after ${
            day.week.omit_the ? "" : "the "
          }${day.week.name}`,
    el = document.importNode(template.content, true),
    title = el.querySelector("h1"),
    subtitle = el.querySelector("h2");

  // fill template
  title.innerText = dayName;

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
