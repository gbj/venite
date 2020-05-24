import { LiturgicalDay } from '../liturgical-day';
import { LiturgicalWeek } from '../liturgical-week';
import { LiturgicalColor } from '../liturgical-color';
import { HolyDay } from '../holy-day';

import { liturgicalWeek } from './liturgical-week';
import { dailyOfficeYear, rclYear } from './lectionary-year';
import { PROPERS } from './propers';

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Returns the `LiturgicalDay` that a given `Date` falls on */
export function liturgicalDay(
  date : Date,
  kalendar : string,
  evening : boolean = false,
  vigil : boolean = false,
  week : LiturgicalWeek
) : LiturgicalDay {
  const slug = buildDaySlug(date, week.slug),
        officeYear = dailyOfficeYear(date, week);

  return new LiturgicalDay({
    date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    kalendar,
    evening,
    slug,
    propers: week.proper ? buildDaySlug(date, week.proper.slug) : slug,
    week,
    years: {
      "bcp1979_daily_office": officeYear,
      "bcp1979_daily_psalms": officeYear,
      "rclsunday": rclYear(date, week)
    },
    holy_days: [],
    season: week.season,
    color: week.color
  });
}

/*export function addVigil(day : LiturgicalDay, tomorrowDate : Date, tomorrowWeek : LiturgicalWeek, tomorrowHolyDays : HolyDay[]) : LiturgicalDay {
  // If observing the vigil of e.g., a Sunday or feast day, move the clock forward by a day
  const tomorrowSlug : string = buildDaySlug(tomorrowDate, tomorrowWeek.slug),

  observed = observedDay(tomorrowDate, tomorrowWeek, tomorrowHolyDays);
  // if observed is the same week, i.e., the next weekday in the same week
  if(observed.slug == day.slug) {
    observed.slug = tomorrowSlug;
  }
  week.propers = tomorrowWeek.propers;
}*/

function buildDaySlug(date : Date, slug : string) : string {
  return `${WEEKDAYS[date.getDay()].toLowerCase()}-${slug}`;
}
