/** Return `Date` of the Sunday before the given `Date`, stripped of time info */
export function sundayBefore(date: Date): Date {
  const s: Date = date;
  s.setDate(date.getDate() - date.getDay());
  s.setHours(0);
  s.setMinutes(0);
  s.setSeconds(0);
  s.setMilliseconds(0);
  return s;
}
