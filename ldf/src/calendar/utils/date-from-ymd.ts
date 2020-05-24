import { dateOnly } from './date-only';

// return date from year, month (1-12), and day
// defaults to today if any of fields are undefined
export function dateFromYMD(year : string, month : string, day : string) : Date {
  let d : Date = new Date();
  d = dateOnly(d);
  if(year && month && day) {
    d.setFullYear(parseInt(year));
    d.setMonth(parseInt(month)-1, parseInt(day));
  }
  return d;
}
