import { easterInYear } from '../src/calendar/utils/easter-in-year';
import { sundayBefore } from '../src/calendar/utils/sunday-before';
import { ISeasonService } from '../src/calendar/services/season-service.interface';
import { IHolyDayService } from '../src/calendar/services/holy-day-service.interface';
import { liturgicalWeek } from '../src/calendar/utils/liturgical-week';
import { liturgicalDay } from '../src/calendar/utils/liturgical-day';
import { HolyDay } from '../src/calendar/holy-day';

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
  it('should consume the service it is passed to find a week', () => {
    expect(liturgicalWeek(new Date(), SEASON_SERVICE)).toEqual(TEST_WEEK);
  });
});

describe('liturgicalDay', () => {
  it('should build a date from the appropriate week', () => {
    // Thursday, May 21 2020
    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(4);
    date.setDate(21);
    expect(liturgicalDay(date, false, false, SEASON_SERVICE, HOLY_DAY_SERVICE_1)).toEqual({
      date: '2020-5-21',
      slug: 'thursday-6th-easter',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Easter',
      holy_days: [],
      color: {
        name: 'gold',
        hex: '#a8943f'
      },
      propers: 'thursday-6th-easter'
    });
  });

  it('should handle vigils', () => {
    // Thursday, May 21 2020
    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(4);
    date.setDate(21);
    expect(liturgicalDay(date, false, true, SEASON_SERVICE, HOLY_DAY_SERVICE_1)).toEqual({
      date: '2020-5-21',
      slug: 'friday-6th-easter',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Easter',
      holy_days: [],
      color: {
        name: 'gold',
        hex: '#a8943f'
      },
      propers: 'friday-6th-easter'
    });
  });

  it('should be overridden by a feast day', () => {
    // Thursday, May 21 2020
    const date = new Date();
    date.setFullYear(2020);
    date.setMonth(4);
    date.setDate(21);
    expect(liturgicalDay(date, false, false, SEASON_SERVICE, HOLY_DAY_SERVICE_2)).toEqual({
      date: '2020-5-21',
      slug: 'st-bilbo',
      evening: false,
      week: TEST_WEEK,
      years: {
        "bcp1979_daily_office": 2,
        "bcp1979_daily_psalms": 2,
        "rclsunday": 'A'
      },
      season: 'Saints',
      holy_days: [ST_BILBO],
      color: {
        name: 'gold',
        hex: '#a8943f'
      },
      propers: 'st-bilbo'
    });
  });
});

const TEST_WEEK = {
  slug: '6th-easter',
  week: 6,
  season: 'Easter' as "Easter" | "Advent" | "Christmas" | "Epiphany" | "Lent" | "HolyWeek" | "Pentecost" | "Saints" | "OrdinaryTime",
  name: 'Sixth Sunday of Easter',
  color: {
    name: 'gold',
    hex: '#a8943f'
  }
}
const SEASON_SERVICE : SeasonService = {
  easterCycle: (index : number) => TEST_WEEK,
  adventCycle: (index : number) => TEST_WEEK,
  christmasCycle: (index : number) => TEST_WEEK,
  epiphanyCycle: (index : number) => TEST_WEEK,
  color: (name : string) => ({ name: 'gold', hex: '#a8943f' }),
  christmasCycleWeek: (date : Date) => TEST_WEEK,
  easterCycleWeek: (date : Date) => TEST_WEEK
}
const HOLY_DAY_SERVICE_1 : HolyDayService = {
  getHolyDays: (slug : string, date : Date) => [],
  specialDay: (slug : string) => [],
  feastDate: (date : Date) => []
}
const ST_BILBO : HolyDay = {
  slug: 'st-bilbo',
  type: {
    name: 'Feast Day',
    rank: 3
  },
  mmdd: '5/21',
  name: 'St. Bilbo’s Day',
  season: 'Saints'
}
const HOLY_DAY_SERVICE_2 : HolyDayService = {
  getHolyDays: (slug : string, date : Date) => [ST_BILBO],
  specialDay: (slug : string) => [ST_BILBO],
  feastDate: (date : Date) => [ST_BILBO]
}
