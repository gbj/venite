import { transferredFeast } from '../src/calendar/utils/transferred-feast';
import { dateFromYMD } from '../src/calendar/utils/date-from-ymd';
import { LITURGICAL_DAYS, SPECIAL_DAYS, FEAST_DAYS } from './transferred-feast-data';

const findLiturgicalDay = (d : Date) => Promise.resolve(LITURGICAL_DAYS[`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`]),
      findSpecialDay = (slug : string) => Promise.resolve(SPECIAL_DAYS.find(day => day.slug == slug)),
      findFeastDay = (d : Date) => Promise.resolve(FEAST_DAYS.find(day => day.mmdd == `${d.getMonth()+1}/${d.getDate()}`));

describe('transferredFeast', () => {
    it(('is undefined if there are no feasts'), async () => {
      expect(await transferredFeast(
        findLiturgicalDay,
        findSpecialDay,
        findFeastDay,
        dateFromYMD('2020', '6', '3')
      )).toBeUndefined();
    });

    it(('transfers Visitation to Monday when it overlaps with Pentecost the day before'), async () => {
        expect((await transferredFeast(
          findLiturgicalDay,
          findSpecialDay,
          findFeastDay,
          dateFromYMD('2020', '6', '1')
        ))?.slug).toEqual('the-visitation');
    });

    it(('transfers both St. Joseph and the Annunciation to Monday and Tuesday of Easter 2 when they fall during Holy Week + Easter in 2008'), async () => {
        expect((await transferredFeast(
            findLiturgicalDay,
            findSpecialDay,
            findFeastDay,
            dateFromYMD('2008', '3', '31')
        ))?.slug).toEqual('st-joseph');

        expect((await transferredFeast(
            findLiturgicalDay,
            findSpecialDay,
            findFeastDay,
            dateFromYMD('2008', '4', '1')
            ))?.slug).toEqual('annunciation');
        });
  });