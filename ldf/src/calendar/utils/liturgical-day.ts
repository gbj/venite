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

interface ObservedInterface {
  date?: string;
  slug: string;
  propers?: string;
  color?: string | LiturgicalColor;
  season?: 'Advent' | 'Christmas' | 'Epiphany' | 'Lent' | 'HolyWeek' | 'Easter' | 'Pentecost' | 'Saints' | 'OrdinaryTime' | undefined;
}

export function addHolyDays(day : LiturgicalDay, evening : boolean, holydays : HolyDay[]) : LiturgicalDay {
  holydays = holydays
    .map(feast => {
      // if a feast has an `evening` field and it's evening, use that
      if(feast.hasOwnProperty('evening') && evening == true) {
        return feast.evening;
      }
      // if a feast has a `morning` field and it's morning, use that
      else if(feast.hasOwnProperty('morning') && evening == false) {
        return feast.morning;
      }
      // if a feast is the eve of something and it's evening, use that feast
      else if(feast && feast.eve && evening == true) {
        return feast;
      }
      // if none of these, just return the feast
      else {
        return feast;
      }
    })
    .filter(feast => !!feast) as HolyDay[];

  // Determine whether a holy day takes precedence over the ordinary day
  const observed : ObservedInterface = observedDay(day, holydays);

  // overwrite the day's slug with the observed day's slug if they differ
  const slug = (observed?.slug !== day.slug) ? observed.slug : day.slug;

  let propers = day.propers;
  if(slug !== day.slug) {
    propers = slug;
  }

  const color = observed.color || day.color,
        season = observed.season || day.season;

  return new LiturgicalDay({
    ... day,
    slug,
    propers,
    color,
    season,
    holy_days: (day.holy_days || new Array()).concat(holydays)
  })
}

/** Given a `LiturgicalDay` and a set of `HolyDay`s, it returns whichever option takes precedence */
function observedDay(day : ObservedInterface, holydays : ObservedInterface[]) : ObservedInterface {
  // rank: Principal Feast (5), Sunday (4), Holy Day (3), random other days (2), ferial weekday (1)
  function getRank(item : any, type: 'holyday' | 'weekday') : number {
    // ranked items => go with rank
    if(type == 'holyday') {
      return item?.type?.rank || 2;
    } else {
      // Sundays => 4
      if(new Date(Date.parse(day.date || '')).getDay() == 0) {
        return 4;
      }
      // weekdays => 1
      else {
        return 1;
      }
    }
  }

  const sorted = holydays
    .map(holyday => ({ rank: getRank(holyday, 'holyday'), obj: holyday}))
    .concat({ rank: getRank(day, 'weekday'), obj: day })
    .sort((a: { rank: number; }, b: { rank: number; }) => b.rank - a.rank);

  return { ... sorted[0].obj};
}

function buildDaySlug(date : Date, slug : string) : string {
  return `${WEEKDAYS[date.getDay()].toLowerCase()}-${slug}`;
}
