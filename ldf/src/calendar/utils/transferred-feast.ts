import { subtractOneDay } from './add-one-day';
import { HolyDay } from '../holy-day';
import { LiturgicalDay } from '../liturgical-day';
import { dateFromYMD } from './date-from-ymd';

export function transferredFeast(
    liturgicalDayFinder : (d : Date) => LiturgicalDay,
    specialDayFinder : (slug : string) => HolyDay | undefined,
    feastDayFinder : (d : Date) => HolyDay | undefined,
    todayDate : Date,
    acc : HolyDay[] = [],
    openDays : LiturgicalDay[] = [],
    originalDay : LiturgicalDay | undefined = undefined
) : HolyDay | undefined {
    // today
    const today = liturgicalDayFinder(todayDate),
          [todayY, todayM, todayD] = today.date.split('-'),
          todayIsSunday = today?.slug?.includes('sunday'),
          todaySpecial = specialDayFinder(today.slug),
          todayFeast = feastDayFinder(dateFromYMD(todayY, todayM, todayD)),
          todayIsEmpty = isEmpty(todayIsSunday, todaySpecial, todayFeast);

    // yesterday
    const yesterdayDate = subtractOneDay(todayDate),
          yesterday = liturgicalDayFinder(yesterdayDate),
          [yesterdayY, yesterdayM, yesterdayD] = yesterday.date.split('-'),
          yesterdayIsSunday = yesterday?.slug?.includes('sunday'),
          yesterdaySpecial = specialDayFinder(yesterday.slug),
          yesterdayFeast = feastDayFinder(dateFromYMD(yesterdayY, yesterdayM, yesterdayD)),
          yesterdayIsEmpty = isEmpty(yesterdayIsSunday, yesterdaySpecial, yesterdayFeast);

    // if both days are empty
    if(todayIsEmpty && yesterdayIsEmpty) {
        // check ONE more day -- we will never need to transfer more than two days, but it does happen around Easter Week sometimes
        const dayBeforeYesterdayDate = subtractOneDay(yesterdayDate),
          dayBeforeYesterday = liturgicalDayFinder(dayBeforeYesterdayDate),
          [dayBeforeYesterdayY, dayBeforeYesterdayM, dayBeforeYesterdayD] = dayBeforeYesterday.date.split('-'),
          dayBeforeYesterdayIsSunday = dayBeforeYesterday?.slug?.includes('sunday'),
          dayBeforeYesterdaySpecial = specialDayFinder(dayBeforeYesterday.slug),
          dayBeforeYesterdayFeast = feastDayFinder(dateFromYMD(dayBeforeYesterdayY, dayBeforeYesterdayM, dayBeforeYesterdayD)),
          dayBeforeYesterdayIsEmpty = isEmpty(dayBeforeYesterdayIsSunday, dayBeforeYesterdaySpecial, dayBeforeYesterdayFeast);
        
        console.log('today is ', todayDate);
        console.log('today has feasts', todaySpecial?.slug, todayFeast?.slug, 'isSunday = ', todayIsSunday);
        console.log('yesterday has feasts', yesterdaySpecial?.slug, yesterdayFeast?.slug, 'isSunday = ', yesterdayIsSunday);
        console.log('both days are empty.');
        console.log('accumulated holy days are', acc);
        console.log('\n\n');

        console.log('day before yesterday has feasts', dayBeforeYesterdaySpecial, dayBeforeYesterdayFeast)
        console.log('day before yesterday is empty?', dayBeforeYesterdayIsEmpty);
        console.log('open days = ', openDays.map(day => day.slug));

        if(dayBeforeYesterdayIsEmpty) {
            const openDaySlugs = openDays.map(day => day.slug),
                  originalDayIndex = openDaySlugs
                    .reverse()  // because accumulate moving backwards
                    .indexOf(originalDay?.slug || '') || 0;
            console.log('origin day is ', originalDay?.slug);
            console.log('today is open day #', originalDayIndex);
            return acc.reverse()[originalDayIndex]; // reverse because accumulate moving backwards
        } else {
            return transferredFeast(
                liturgicalDayFinder, specialDayFinder, feastDayFinder,  // pass helpers
                subtractOneDay(todayDate),  // recurse back to yesterday
                acc,
                [ ... openDays, today],
                originalDay || today
            )
        }
    }
    // if today is empty and yesterday is not empty, recurse back one more day
    else if(todayIsEmpty && !yesterdayIsEmpty) {
        console.log('today is ', todayDate)
        console.log('today is empty, yesterday is not.');
        console.log('today has feasts', todaySpecial?.slug, todayFeast?.slug, 'isSunday = ', todayIsSunday);
        console.log('yesterday has feasts', yesterdaySpecial?.slug, yesterdayFeast?.slug, 'isSunday = ', yesterdayIsSunday);
        console.log('\n\n');
        return transferredFeast(
            liturgicalDayFinder, specialDayFinder, feastDayFinder,  // pass helpers
            subtractOneDay(todayDate),  // check yesterday
            acc,
            [ ... openDays, today ],
            originalDay || today
        )
    }

    // if today is not empty and today's feast is not observed...
    else {
        // TODO -- check whether today's feast is observed today or not (don't transfer if it's observed today!)
        console.log('today is ', todayDate)
        console.log('today is not empty, yesterday is empty.');
        console.log('\n\n');
        return transferredFeast(
            liturgicalDayFinder, specialDayFinder, feastDayFinder,  // pass helpers
            subtractOneDay(todayDate),  // check yesterday
            todayFeast && !todayFeast.eve ? [ ... acc, todayFeast ] : acc, // include today's feast, but don't transfer "Eve of..."
            openDays,
            originalDay || today
        );
    }
 }

function isEmpty(isSunday : boolean, special : HolyDay | undefined, feast : HolyDay | undefined) : boolean {
    return [special, feast]
        .concat(isSunday ? { type: { rank: 4 } } : undefined) // if it's a Sunday, it's a 4 by default
        .map(day => day?.type?.rank)
        .filter(rank => rank && rank > 2)
        .length == 0;
}