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
    todayIsEmpty = isEmpty(acc[0], todayIsSunday, todaySpecial, todayFeast);

  // yesterday
  const yesterdayDate = subtractOneDay(todayDate),
    yesterday = await liturgicalDayFinder(yesterdayDate),
    yesterdayIsSunday = yesterday?.slug?.startsWith('sunday-'),
    yesterdaySpecial = await specialDayFinder(yesterday.slug),
    yesterdayFeast = await feastDayFinder(dateFromYMDString(yesterday.date)),
    yesterdayIsEmpty = isEmpty(acc[0], yesterdayIsSunday, yesterdaySpecial, yesterdayFeast);

  const dayBeforeYesterdayDate = subtractOneDay(yesterdayDate),
    dayBeforeYesterday = await liturgicalDayFinder(dayBeforeYesterdayDate),
    dayBeforeYesterdayIsSunday = dayBeforeYesterday?.slug?.startsWith('sunday-'),
    dayBeforeYesterdaySpecial = await specialDayFinder(dayBeforeYesterday?.slug),
    dayBeforeYesterdayFeast = await feastDayFinder(dateFromYMDString(dayBeforeYesterday?.date)),
    dayBeforeYesterdayIsEmpty = isEmpty(
      acc[0],
      dayBeforeYesterdayIsSunday,
      dayBeforeYesterdaySpecial,
      dayBeforeYesterdayFeast,
    );

  //console.log('\n\ntoday is ', today.date);
  //console.log('acc is', acc.map(hd => hd.slug));
  //console.log('openDays is ', openDays.map((day) => day.slug));

  // if both days are empty
  if (todayIsEmpty && yesterdayIsEmpty) {
    //console.log('today is empty and yesterday is empty');

    // in Christmastide, we need to check an extra day, for the cases in which Christmas is Sunday and feasts can be transferred several days
    const isChristmastide = todayDate.getMonth() === 11 && todayDate.getDate() > 25;

    // check ONE more day -- we will rarely need to transfer more than two days, but it does happen around Easter Week sometimes
    if (dayBeforeYesterdayIsEmpty) {
      //console.log('  and the day before yesterday is empty');
      const openDaySlugs = openDays.map((day) => day.slug),
        originalDayIndex =
          openDaySlugs
            .reverse() // because accumulate moving backwards
            .indexOf(originalDay?.slug || '') || 0;
      //console.log('yielding a transferred feast, which is the ', originalDayIndex < 0 ? 0 : originalDayIndex, originalDay?.slug, 'th item in ', acc.map(hd => hd.slug));
      return acc.reverse()[originalDayIndex < 0 ? 0 : originalDayIndex]; // reverse because accumulate moving backwards
    } else {
      //console.log('  and the day before yesterday is not empty');
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
    //console.log('today is empty and yesterday is not empty');
    const observed = todayFeast ? today.observedDay(today, [todayFeast, yesterdayFeast || todayFeast]) : today,
      isObserved = observed.slug === todayFeast?.slug;
    //console.log('is today’s feast observed today?', isObserved);
    return transferredFeast(
      liturgicalDayFinder,
      specialDayFinder,
      feastDayFinder, // pass helpers
      subtractOneDay(todayDate), // check yesterday
      todayFeast && !todayFeast.eve && !isObserved && Number(todayFeast?.type?.rank) >= 3 ? [...acc, todayFeast] : acc, // include today's feast, but don't transfer "Eve of...",
      [...openDays, today],
      originalDay || today,
    );
  }

  // if today is not empty and today's feast is not observed...
  else {
    //console.log('today is not empty');
    if (yesterdayIsEmpty) {
      //console.log('  yesterday is empty');
      // if today is observed today don't transfer
      const observed = todayFeast ? today.observedDay(today, [todayFeast]) : today;
      if (observed.slug == todayFeast?.slug) {
        //console.log('    and the feast is observed today');
        return transferredFeast(
          liturgicalDayFinder,
          specialDayFinder,
          feastDayFinder, // pass helpers
          subtractOneDay(todayDate), // check yesterday
          acc,
          openDays,
          originalDay || today,
        );
      } else {
        //console.log('    and the feast is not observed today');
        return transferredFeast(
          liturgicalDayFinder,
          specialDayFinder,
          feastDayFinder, // pass helpers
          subtractOneDay(todayDate), // check yesterday
          todayFeast && !todayFeast.eve && Number(todayFeast?.type?.rank) >= 3 ? [...acc, todayFeast] : acc,
          openDays,
          originalDay || today,
        );
      }
    } else {
      //console.log('  yesterday is not empty');
      const observed = todayFeast ? today.observedDay(today, [todayFeast]) : today,
        isObserved = observed.slug === todayFeast?.slug;
      //console.log('     is today’s feast observed?', isObserved);
      return transferredFeast(
        liturgicalDayFinder,
        specialDayFinder,
        feastDayFinder, // pass helpers
        subtractOneDay(todayDate), // check yesterday
        todayFeast && !todayFeast.eve && !isObserved && Number(todayFeast?.type?.rank) >= 3
          ? [...acc, todayFeast]
          : acc, // include today's feast, but don't transfer "Eve of..."
        openDays,
        originalDay || today,
      );
    }
  }
}

function isEmpty(
  forFeast: HolyDay | undefined,
  isSunday: boolean,
  special: HolyDay | undefined,
  feast: HolyDay | undefined,
): boolean {
  const isEmptyCheckList = [special, feast]
    .concat(isSunday ? { type: { rank: 4 } } : undefined) // if it's a Sunday, it's a 4 by default
    .map((day) => day?.type?.rank)
    .filter((rank) => rank && rank > (forFeast?.type?.rank ?? 3));
  return isEmptyCheckList.length == 0;
}
