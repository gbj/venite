import { LiturgicalWeek } from '../liturgical-week';
import { ISeasonService } from '../services/season-service.interface';
import { easterInYear } from './easter-in-year';
import { sundayBefore } from './sunday-before';

// one week in milliseconds
const ONE_WEEK : number = 7*24*60*60*1000;

/** Returns the `LiturgicalWeek` that a given `Date` falls in */
export function liturgicalWeek(d : Date, seasons : ISeasonService) : LiturgicalWeek {
  const date = new Date(d.getTime()); // avoid overwriting existing Date passed in
  const year : number = date.getFullYear(),
      easter : Date = easterInYear(year),
      christmas : Date = new Date(year, 11, 25),
      christmasEve : Date = new Date(year, 11, 24),
      last_epiphany : Date = sundayBefore(new Date(easter.getTime()-6.9*ONE_WEEK)),
      fourth_advent : Date = sundayBefore(christmasEve),
      first_advent : Date = sundayBefore(new Date(fourth_advent.getTime()-2.9*ONE_WEEK)),
      last_pentecost : Date = sundayBefore(new Date(fourth_advent.getTime()-3.9*ONE_WEEK));

  let week : LiturgicalWeek;

  if(date >= last_pentecost || date < last_epiphany) {
    week = seasons.christmasCycleWeek(date);
  } else {
    week = seasons.easterCycleWeek(date);
  }

  return week;
}
