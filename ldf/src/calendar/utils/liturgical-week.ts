import { easterInYear } from './easter-in-year';
import { sundayBefore } from './sunday-before';
import { dateOnly } from './date-only';
import { dateFromYMD } from './date-from-ymd';
import { PROPERS } from './propers';
import { Calendar, TEC_1979_CALENDAR } from '../calendar';

// one week in milliseconds
const ONE_WEEK : number = 7*24*60*60*1000;

export interface LiturgicalWeekIndex {
  cycle: 'Advent' | 'Christmas' | 'Epiphany' | 'Easter';
  week: number;
  proper?: number;
}

/** Returns the cycle and week offset that a given `Date` falls in */
export function liturgicalWeek(d : Date, calendar : Calendar = TEC_1979_CALENDAR) : LiturgicalWeekIndex {
  const date = new Date(d.getTime()); // avoid overwriting existing Date passed in
  const year : number = date.getFullYear(),
      easter : Date = easterInYear(year, calendar.julian),
      christmasEve : Date = new Date(year, 11, 24),
      last_epiphany : Date = sundayBefore(new Date(easter.getTime()-(calendar.easterCycleBegins - 0.1)*ONE_WEEK)),
      fourth_advent : Date = sundayBefore(christmasEve),
      last_pentecost : Date = sundayBefore(new Date(fourth_advent.getTime()-(calendar.christmasCycleBegins - 0.1)*ONE_WEEK));

  if(date >= last_pentecost || date < last_epiphany) {
    return christmasCycleWeek(date);
  } else {
    return easterCycleWeek(date, calendar);
  }
}

// Easter Cycle
function easterCycleWeek(date : Date, calendar : Calendar = TEC_1979_CALENDAR) : LiturgicalWeekIndex {
  // weeks from Easter
  const week : number = Math.round(weeksFromEaster(sundayBefore(date))+calendar.easterCycleBegins);
  return {
    cycle: 'Easter',
    week,
    // TODO -- adjust based on calendar.easterCycleBegins
    proper: week >= 14 && calendar.hasPropers ? calculateProper(date) : undefined
  }
}

function weeksFromEaster(date : Date) : number {
  return (date.getTime() - easterInYear(date.getFullYear()).getTime())/ONE_WEEK;
}

function calculateProper(date : Date) : number | undefined {
  // TODO -- adjust based on calendar.easterCycleBegins
  const lastSunday = sundayBefore(date);
  let proper;
  for(let ii = 0; ii < PROPERS.length-1; ii++) {
    if(closerThan(lastSunday, PROPERS[ii], PROPERS[ii+1])) {
      proper = ii + 1;
      break;
    }
  }
  return proper;
}

function closerThan(date : Date, mmdd1 : string, mmdd2 : string) : boolean {
  // mmdd1 and mmdd2 are format "May 11" : string
  let [mm1, dd1] = mmdd1.split("/"),
      [mm2, dd2] = mmdd2.split("/"),
      d1 = dateFromYMD(date.getFullYear().toString(), mm1, dd1),
      d2 = dateFromYMD(date.getFullYear().toString(), mm2, dd2);
  // is mmdd1 closer than mmdd2 to date?
  return (Math.abs(date.getTime() - d1.getTime()) < Math.abs(date.getTime() - d2.getTime()));
}

// Christmas Cycle
function christmasCycleWeek(d : Date) : LiturgicalWeekIndex {
  const date = dateOnly(d);

  const xmasYear : number = date.getMonth() >= 10 ? date.getFullYear() : date.getFullYear()-1,
        xmas : Date = new Date(xmasYear, 11, 25),
        xmasEve : Date = new Date(xmasYear, 11, 24),
        epiphany : Date = new Date(xmasYear+1, 0, 6);

  // If in Advent...
  if(date <= xmasEve) {
    // Have to calculate from Christmas Eve in case Christmas is a Sunday
    const fourthAdv = sundayBefore(xmasEve),
          weeksFromFourthAdv = (sundayBefore(date).getTime()-fourthAdv.getTime())/ONE_WEEK,
          week = Math.round(weeksFromFourthAdv)+4
    return {
      cycle: 'Advent',
      week,
      proper: week == 0 ? calculateProper(d) : undefined
    }
  } else if(date > xmasEve && date < epiphany) {
    // Christmas, between Christmas and Epiphany
    const weeksFromXmas = (date.getTime()-sundayBefore(xmas).getTime())/ONE_WEEK;
    return {
      cycle: 'Christmas',
      week: Math.floor(weeksFromXmas)
    }
  } else {
    // Epiphany
    const weeksFromEpiphany = (date.getTime()-sundayBefore(epiphany).getTime())/ONE_WEEK;
    return {
      cycle: 'Epiphany',
      week: Math.floor(weeksFromEpiphany)
    }
  }
}
