import { LiturgicalDay } from '../liturgical-day';
import { LiturgicalWeek } from '../liturgical-week';

import { dailyOfficeYear, rclYear } from './lectionary-year';
//import { PROPERS } from './propers';

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Returns the `LiturgicalDay` that a given `Date` falls on */
export function liturgicalDay(
  date : Date,
  kalendar : string,
  evening : boolean = false,
  week : LiturgicalWeek
) : LiturgicalDay {
  const slug = buildDaySlug(date, week.slug),
        officeYear = dailyOfficeYear(date, week);

  return new LiturgicalDay({
    date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    kalendar,
    evening,
    slug,
    propers: week.proper ? buildDaySlug(date, `proper-${week.proper}`) : slug,
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

function buildDaySlug(date : Date, slug : string) : string {
  return `${WEEKDAYS[date.getDay()].toLowerCase()}-${slug}`;
}
