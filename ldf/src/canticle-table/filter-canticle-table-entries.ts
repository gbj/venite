import { CanticleTableEntry } from './canticle-table';
import { LiturgicalDay } from '../calendar/liturgical-day';
import { dateFromYMDString } from '../calendar/utils/date-from-ymd';

export function filterCanticleTableEntries(
  entries: CanticleTableEntry[],
  day: LiturgicalDay,
  whichTable: string,
  nth: number,
  fallbackTable: string | undefined = undefined,
  defaultCanticles: { [time: string]: string[] } | undefined = undefined,
): CanticleTableEntry[] {
  const isEvening: boolean = day.evening,
    date = dateFromYMDString(day.date),
    dayRank = day?.holy_day_observed?.type?.rank || 2,
    dayOfWeek = date.getDay(),
    isSunday = dayOfWeek == 0,
    isFeast: boolean =
      (day instanceof LiturgicalDay ? day.isFeast() : new LiturgicalDay(day).isFeast()) && (!isSunday || dayRank > 4),
    days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekday: string = isFeast ? 'FeastDay' : days[dayOfWeek];

  const primaryEntries = fallbackTable ? entries.filter((entry) => entry.table == whichTable) : entries,
    primaryWeekdayEntries = primaryEntries.filter((entry) => !entry?.weekday || entry?.weekday == weekday),
    // if not found, try fallback table
    weekdayEntries =
      primaryWeekdayEntries.length == 0 && fallbackTable
        ? primaryEntries.filter(
            (entry) => entry?.table == fallbackTable && (!entry?.weekday || entry?.weekday == weekday),
          )
        : primaryWeekdayEntries,
    // if entry specifies `season`, `week`, `day`, or `evening`, they must match
    filteredEntries = weekdayEntries.filter(
      (entry) =>
        entry &&
        (!entry.season || entry.season == day.season) &&
        (!entry.week || entry.week == day.week.slug) &&
        (!entry.day || entry.day == day.slug) &&
        entry.evening == isEvening,
    ),
    // find based on day with highest precedence, then week, then season, then just take whatever's there
    dayEntries = filteredEntries.filter((e) => e.day == day.slug),
    weekEntries = filteredEntries.filter((e) => e.week == day.week.slug),
    seasonEntries = filteredEntries.filter((e) => e.season == day.season);

  let preferredEntries = filteredEntries;
  if (seasonEntries?.length > 0) {
    preferredEntries = seasonEntries;
  } else if (dayEntries?.length > 0) {
    preferredEntries = dayEntries;
  } else if (weekEntries?.length > 0) {
    preferredEntries = weekEntries;
  }

  if (preferredEntries?.length == 0 && fallbackTable) {
    return filterCanticleTableEntries(entries, day, fallbackTable, nth, undefined, defaultCanticles);
  } else if (preferredEntries?.length == 0 && defaultCanticles !== undefined) {
    const defaultCanticle = new CanticleTableEntry();
    return new Array({
      ...defaultCanticle,
      slug: defaultCanticles[isEvening ? 'evening' : 'morning'][nth],
    });
  } else {
    return preferredEntries;
  }
}
