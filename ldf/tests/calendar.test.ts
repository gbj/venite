import { addOneDay } from '../src/calendar/utils/add-one-day';
import { easterInYear } from '../src/calendar/utils/easter-in-year';
import { sundayBefore } from '../src/calendar/utils/sunday-before';
import { dateFromYMD } from '../src/calendar/utils/date-from-ymd';
import { liturgicalWeek, LiturgicalWeekIndex } from '../src/calendar/utils/liturgical-week';
import { liturgicalDay } from '../src/calendar/utils/liturgical-day';
import { HolyDay } from '../src/calendar/holy-day';
import { LiturgicalWeek } from '../src/calendar/liturgical-week';

describe('easterInYear', () => {
  it(('gives the correct date for Easter for arbitrary years'), () => {
    const year1 = 2020, // April 12
          year2 = 1983, // April 3
          year3 = 2027; // March 28

    expect(easterInYear(year1).getMonth()).toEqual(3);
    expect(easterInYear(year1).getDate()).toEqual(12);

    expect(easterInYear(year2).getMonth()).toEqual(3);
    expect(easterInYear(year2).getDate()).toEqual(3);

    expect(easterInYear(year3).getMonth()).toEqual(2);
    expect(easterInYear(year3).getDate()).toEqual(28);
  });

  it(('handles the Julian calendar for Orthodox Easter'), () => {
    const year1 = 2008, // April 14
          year2 = 2010, // March 22
          year3 = 2016; // April 18

    expect(easterInYear(year1, true).getMonth()).toEqual(3);
    expect(easterInYear(year1, true).getDate()).toEqual(14);

    expect(easterInYear(year2, true).getMonth()).toEqual(2);
    expect(easterInYear(year2, true).getDate()).toEqual(22);

    expect(easterInYear(year3, true).getMonth()).toEqual(3);
    expect(easterInYear(year3, true).getDate()).toEqual(18);
  });
});

describe('sundayBefore', () => {
  it(('gives the Sunday before arbitrary dates'), () => {

    const test1 = sundayBefore(new Date(Date.parse("2020-05-21")));
    expect(test1.getMonth()).toEqual(4);
    expect(test1.getDate()).toEqual(17);

    const test2 = sundayBefore(new Date(Date.parse("2020-04-01")));
    expect(test2.getMonth()).toEqual(2);
    expect(test2.getDate()).toEqual(29);

    const test3 = sundayBefore(new Date(Date.parse("2020-01-04")));
    expect(test3.getMonth()).toEqual(11);
    expect(test3.getDate()).toEqual(29);
  });
});

describe('dateFromYMD', () => {
  it('should handle valid dates correctly', () => {
    const date = dateFromYMD('2020', '12', '20');
    expect(date.getFullYear()).toEqual(2020);
    expect(date.getMonth()).toEqual(11);
    expect(date.getDate()).toEqual(20);
    expect(date.getHours()).toEqual(0);
    expect(date.getMinutes()).toEqual(0);
    expect(date.getSeconds()).toEqual(0);
  });

  it('should handle dates that are too high for month by adding days and moving into next month', () => {
    const date = dateFromYMD('2020', '2', '30');
    expect(date.getFullYear()).toEqual(2020);
    expect(date.getMonth()).toEqual(2);
    expect(date.getDate()).toEqual(1);
    expect(date.getHours()).toEqual(0);
    expect(date.getMinutes()).toEqual(0);
    expect(date.getSeconds()).toEqual(0);
  });
});

describe('liturgicalWeek', () => {
  it('should return indexes in the Advent and Easter cycles', () => {
    expect(liturgicalWeek(new Date(Date.parse("2020-12-24")))).toEqual({
      cycle: 'Advent',
      week: 4,
      proper: undefined
    });

    expect(liturgicalWeek(new Date(Date.parse("2020-5-23")))).toEqual({
      cycle: 'Easter',
      week: 12,
      proper: undefined
    });
  });

  it('should add propers for the season after Pentecost', () => {
    expect(liturgicalWeek(new Date(Date.parse("2020-7-25")))).toEqual({
      cycle: 'Easter',
      week: 21,
      proper: 11
    });
  });

  it('should not add propers for the last Sunday after the Epiphany', () => {
    expect(liturgicalWeek(new Date(Date.parse("2021-11-23")))).toEqual({
      cycle: 'Advent',
      week: 0,
      proper: undefined
    });
  });

  it('should add propers for the second-to-last Sunday after the Epiphany', () => {
    expect(liturgicalWeek(new Date(Date.parse("2021-11-16")))).toEqual({
      cycle: 'Easter',
      week: 39,
      proper: 28
    });
  });
});

/*describe('addOneDay', () => {
  it('should add a day to the date within a month', () => {
    const date = new Date(Date.parse('2020-02-03 11:00pm EST')),
          newDate = addOneDay(date);
    expect(newDate.getFullYear()).toEqual(2020);
    expect(newDate.getMonth()).toEqual(1);
    expect(newDate.getDate()).toEqual(4);
  });

  it('should add a day to the date across months', () => {
    const date = new Date(Date.parse('2020-03-31 7:00am EST')),
          newDate = addOneDay(date);
    expect(newDate.getFullYear()).toEqual(2020);
    expect(newDate.getMonth()).toEqual(3);
    expect(newDate.getDate()).toEqual(1);
  });

  it('should add a day to the date across years', () => {
    const date = new Date(Date.parse('2020-12-31 9:00pm EST')),
          newDate = addOneDay(date);
    expect(newDate.getFullYear()).toEqual(2021);
    expect(newDate.getMonth()).toEqual(0);
    expect(newDate.getDate()).toEqual(1);
  });
})*/

describe('liturgicalDay', () => {
  // Thursday May 21 2020
  const DATE = new Date();
  DATE.setFullYear(2020);
  DATE.setMonth(4);
  DATE.setDate(21);

  // Saturday May 30 2020 -- Eve of Pentecost
  const DATE2 = new Date();
  DATE2.setFullYear(2020);
  DATE2.setMonth(4);
  DATE2.setDate(30);

  it('should build `LiturgicalDay` object, given all the data', () => {
    expect(liturgicalDay(DATE, 'bcp1979', false, TEST_WEEK)).toEqual({
      date: '2020-5-21',
      slug: 'thursday-6th-easter',
      kalendar: 'bcp1979',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Easter',
      holy_days: [],
      color: 'Gold',
      propers: 'thursday-6th-easter'
    });
  });

  it('should be overridden by a feast day', () => {
    const day = liturgicalDay(DATE, 'bcp1979', false, TEST_WEEK),
          dayWithHolyDay = day.addHolyDays([ST_BILBO]);
    expect(dayWithHolyDay).toEqual({
      date: '2020-5-21',
      slug: 'st-bilbo',
      kalendar: 'bcp1979',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Saints',
      holy_days: [ST_BILBO],
      holy_day_observed: ST_BILBO,
      color: 'Red',
      propers: 'st-bilbo'
    });
  });

  it('should not override Sundays', () => {
    const sundayDate = new Date();
    sundayDate.setFullYear(2020);
    sundayDate.setMonth(4);
    sundayDate.setDate(24);

    const day = liturgicalDay(sundayDate, 'bcp1979', false, TEST_WEEK)

    expect(day.addHolyDays([ST_BILBO])).toEqual({
      date: '2020-5-24',
      slug: 'sunday-6th-easter',
      kalendar: 'bcp1979',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Easter',
      holy_days: [ST_BILBO],
      holy_day_observed: undefined,
      color: 'Gold',
      propers: 'sunday-6th-easter'
    });
  });

  it('should not be overridden by a day that doesn’t have its own slug (like a black-letter day)', () => {
    const day = liturgicalDay(DATE, 'bcp1979', false, TEST_WEEK),
          dayWithHolyDay = day.addHolyDays([ST_MERRY]);
    expect(dayWithHolyDay).toEqual({
      date: '2020-5-21',
      slug: 'thursday-6th-easter',
      kalendar: 'bcp1979',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Easter',
      holy_days: [ST_MERRY],
      color: 'Gold',
      propers: 'thursday-6th-easter'
    });
  });

  it('should choose a higher feast over a lower feast, regardless of order they’re called', () => {
    const day = liturgicalDay(DATE, 'bcp1979', false, TEST_WEEK),
          dayWithHolyDay = day.addHolyDays([ST_MERRY]).addHolyDays([ST_BILBO]);
    expect(dayWithHolyDay).toEqual({
      date: '2020-5-21',
      slug: 'st-bilbo',
      kalendar: 'bcp1979',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Saints',
      holy_days: [ST_MERRY, ST_BILBO],
      holy_day_observed: ST_BILBO,
      color: 'Red',
      propers: 'st-bilbo'
    });

    const day2WithHolyDay = day.addHolyDays([ST_BILBO]).addHolyDays([ST_MERRY]);
    expect(day2WithHolyDay).toEqual({
      date: '2020-5-21',
      slug: 'st-bilbo',
      kalendar: 'bcp1979',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Saints',
      holy_days: [ST_BILBO, ST_MERRY],
      holy_day_observed: ST_BILBO,
      color: 'Red',
      propers: 'st-bilbo'
    });

    const day3WithHolyDay = day.addHolyDays([ST_MERRY]).addHolyDays([CHRISTMAS]).addHolyDays([ST_BILBO]);
    expect(day3WithHolyDay).toEqual({
      date: '2020-5-21',
      slug: 'christmas',
      kalendar: 'bcp1979',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Christmas',
      holy_days: [ST_MERRY, CHRISTMAS, ST_BILBO],
      holy_day_observed: CHRISTMAS,
      color: 'White',
      propers: 'christmas'
    });

    const day4WithHolyDay = day.addHolyDays([ST_MERRY]).addHolyDays([ST_BILBO]).addHolyDays([CHRISTMAS]);
    expect(day4WithHolyDay).toEqual({
      date: '2020-5-21',
      slug: 'christmas',
      kalendar: 'bcp1979',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Christmas',
      holy_days: [ST_MERRY, ST_BILBO, CHRISTMAS],
      holy_day_observed: CHRISTMAS,
      color: 'White',
      propers: 'christmas'
    });
  });
});

const TEST_WEEK = {
  kalendar: 'bcp1979',
  slug: '6th-easter',
  cycle: 'Easter' as 'Easter',
  omit_the: false,
  week: 12,
  season: 'Easter' as "Easter" | "Advent" | "Christmas" | "Epiphany" | "Lent" | "HolyWeek" | "Pentecost" | "Saints" | "OrdinaryTime",
  name: 'Sixth Sunday of Easter',
  color: 'Gold'
}
const TEST_PENTECOST_WEEK = {
  kalendar: 'bcp1979',
  slug: 'pentecost',
  cycle: 'Easter' as 'Easter',
  omit_the: true,
  week: 14,
  season: 'OrdinaryTime' as "Easter" | "Advent" | "Christmas" | "Epiphany" | "Lent" | "HolyWeek" | "Pentecost" | "Saints" | "OrdinaryTime",
  name: 'Pentecost',
  color: 'Green'
}
const ST_BILBO : HolyDay = {
  kalendar: 'bcp1979',
  slug: 'st-bilbo',
  type: {
    name: 'Feast Day',
    rank: 3
  },
  mmdd: '5/21',
  name: 'St. Bilbo’s Day',
  season: 'Saints',
  color: 'Red'
}
const ST_MERRY : HolyDay = {
  kalendar: 'bcp1979',
  type: {
    name: 'Black-Letter',
    rank: 2
  },
  mmdd: '5/21',
  name: 'St. Merry’s Day'
}
const CHRISTMAS : HolyDay = {
  kalendar: 'bcp1979',
  slug: 'christmas',
  type: {
    name: 'Feast of Our Lord',
    rank: 5
  },
  mmdd: '5/21',
  name: 'Christmas',
  season: 'Christmas',
  color: 'White'
}
