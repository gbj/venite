import { easterInYear } from '../src/calendar/utils/easter-in-year';
import { sundayBefore } from '../src/calendar/utils/sunday-before';
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

describe('liturgicalDay', () => {
  const DATE = new Date();
  DATE.setFullYear(2020);
  DATE.setMonth(4);
  DATE.setDate(21);

  it('should build `LiturgicalDay` object, given all the data', () => {
    expect(liturgicalDay(DATE, 'bcp1979', false, false, TEST_WEEK, [])).toEqual({
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

  it('should handle vigils', () => {
    expect(liturgicalDay(DATE, 'bcp1979', true, true, TEST_WEEK, [])).toEqual({
      date: '2020-5-21',
      slug: 'friday-6th-easter',
      kalendar: 'bcp1979',
      evening: true,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Easter',
      holy_days: [],
      color: 'Gold',
      propers: 'friday-6th-easter'
    });
  });

  it('should be overridden by a feast day', () => {
    expect(liturgicalDay(DATE, 'bcp1979', false, false, TEST_WEEK, [ST_BILBO])).toEqual({
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
      color: 'Red',
      propers: 'st-bilbo'
    });
  });

  it('should not override Sundays', () => {
    const sundayDate = new Date();
    sundayDate.setFullYear(2020);
    sundayDate.setMonth(4);
    sundayDate.setDate(24);

    expect(liturgicalDay(sundayDate, 'bcp1979', false, false, TEST_WEEK, [ST_BILBO])).toEqual({
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
      color: 'Gold',
      propers: 'sunday-6th-easter'
    });
  });
});

const TEST_WEEK = {
  kalendar: 'bcp1979',
  slug: '6th-easter',
  cycle: 'Easter' as 'Easter',
  week: 12,
  season: 'Easter' as "Easter" | "Advent" | "Christmas" | "Epiphany" | "Lent" | "HolyWeek" | "Pentecost" | "Saints" | "OrdinaryTime",
  name: 'Sixth Sunday of Easter',
  color: 'Gold'
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
