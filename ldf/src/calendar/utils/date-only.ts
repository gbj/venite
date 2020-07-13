// strip away everything but year, month, day
export function dateOnly(d: Date): Date {
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}
