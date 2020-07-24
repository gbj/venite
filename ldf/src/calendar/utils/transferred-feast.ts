import { subtractOneDay } from './add-one-day';
import { HolyDay } from '../holy-day';
import { LiturgicalDay } from '../liturgical-day';
import { dateFromYMD, dateFromYMDString } from './date-from-ymd';

export async function transferredFeast(
  liturgicalDayFinder: (d: Date) => Promise<LiturgicalDay>,
  specialDayFinder: (slug: string) => Promise<HolyDay | undefined>,
  feastDayFinder: (d: Date) => Promise<HolyDay | undefined>,
  todayDate: Date,
  acc: HolyDay[] = [],
  openDays: LiturgicalDay[] = [],
  originalDay: LiturgicalDay | undefined = undefined,
): Promise<HolyDay | undefined> {
  // today
  const today = await liturgicalDayFinder(todayDate),
    todayIsSunday = today?.slug?.startsWith('sunday-'),
    todaySpecial = await specialDayFinder(today.slug),
    todayFeast = await feastDayFinder(dateFromYMDString(today.date)),
    todayIsEmpty = isEmpty(todayIsSunday, todaySpecial, todayFeast);

  // yesterday
  const yesterdayDate = subtractOneDay(todayDate),
    yesterday = await liturgicalDayFinder(yesterdayDate),
    yesterdayIsSunday = yesterday?.slug?.startsWith('sunday-'),
    yesterdaySpecial = await specialDayFinder(yesterday.slug),
    yesterdayFeast = await feastDayFinder(dateFromYMDString(yesterday.date)),
    yesterdayIsEmpty = isEmpty(yesterdayIsSunday, yesterdaySpecial, yesterdayFeast);

  // if both days are empty
  if (todayIsEmpty && yesterdayIsEmpty) {
    // check ONE more day -- we will never need to transfer more than two days, but it does happen around Easter Week sometimes
    const dayBeforeYesterdayDate = subtractOneDay(yesterdayDate),
      dayBeforeYesterday = await liturgicalDayFinder(dayBeforeYesterdayDate),
      dayBeforeYesterdayIsSunday = dayBeforeYesterday?.slug?.startsWith('sunday-'),
      dayBeforeYesterdaySpecial = await specialDayFinder(dayBeforeYesterday.slug),
      dayBeforeYesterdayFeast = await feastDayFinder(dateFromYMDString(dayBeforeYesterday.date)),
      dayBeforeYesterdayIsEmpty = isEmpty(
        dayBeforeYesterdayIsSunday,
        dayBeforeYesterdaySpecial,
        dayBeforeYesterdayFeast,
      );

    if (dayBeforeYesterdayIsEmpty) {
      const openDaySlugs = openDays.map((day) => day.slug),
        originalDayIndex =
          openDaySlugs
            .reverse() // because accumulate moving backwards
            .indexOf(originalDay?.slug || '') || 0;
      return acc.reverse()[originalDayIndex]; // reverse because accumulate moving backwards
    } else {
      return transferredFeast(
        liturgicalDayFinder,
        specialDayFinder,
        feastDayFinder, // pass helpers
        subtractOneDay(todayDate), // recurse back to yesterday
        acc,
        [...openDays, today],
        originalDay || today,
      );
    }
  }
  // if today is empty and yesterday is not empty, recurse back one more day
  else if (todayIsEmpty && !yesterdayIsEmpty) {
    return transferredFeast(
      liturgicalDayFinder,
      specialDayFinder,
      feastDayFinder, // pass helpers
      subtractOneDay(todayDate), // check yesterday
      acc,
      [...openDays, today],
      originalDay || today,
    );
  }

  // if today is not empty and today's feast is not observed...
  else {
    // TODO -- check whether today's feast is observed today or not (don't transfer if it's observed today!)
    return transferredFeast(
      liturgicalDayFinder,
      specialDayFinder,
      feastDayFinder, // pass helpers
      subtractOneDay(todayDate), // check yesterday
      todayFeast && !todayFeast.eve && Number(todayFeast?.type?.rank) >= 3 ? [...acc, todayFeast] : acc, // include today's feast, but don't transfer "Eve of..."
      openDays,
      originalDay || today,
    );
  }
}

function isEmpty(isSunday: boolean, special: HolyDay | undefined, feast: HolyDay | undefined): boolean {
  const isEmptyCheckList = [special, feast]
    .concat(isSunday ? { type: { rank: 4 } } : undefined) // if it's a Sunday, it's a 4 by default
    .map((day) => day?.type?.rank)
    .filter((rank) => rank && rank > 2);
  return isEmptyCheckList.length == 0;
}
