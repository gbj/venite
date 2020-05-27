export function addOneDay(date : Date) : Date {
  return new Date(date.getTime() + 60 * 60 * 24 * 1000);
}
