import { LiturgicalDay, ClientPreferences } from '.';
import { dateFromYMD, dateFromYMDString } from './calendar/utils';

export class Condition {
  // `only` is only an array of values, any of which makes the condition true
  // `except` is always an array of values, any of which makes the condition false

  // `LiturgicalDay.slug` is...
  day?: {
    except?: string[];
    only?: string[];
  };

  // `LiturgicalDay.season` or `LiturgicalDay.week.season` is...
  season?: {
    except?: string[];
    only?: string[];
  };

  // Day is a feast day or a Sunday
  feastDay?: boolean;

  // Day is a particular day of the week, in English
  // 'Monday', 'Tuesday', 'Wednesday', etc.
  weekday?: {
    except?: string[];
    only?: string[];
  };

  // Day is during a particular week
  week?: {
    except?: string[];
    only?: string[];
  };

  // Day is before or after a certain date (less than, less than or equal, etc.)
  date?: {
    lt?: string; // each stored as 'MM/DD'
    lte?: string;
    gt?: string;
    gte?: string;
  };

  // Day of month = or != a particular value
  day_of_month?: {
    eq?: number;
    neq?: number;
  };

  // The value of the preference `key` is `value`. If `is == false`, true if the preference is *not* that value.
  preference?: {
    key: string;
    value: any;
    is: boolean;
  };

  /** Given a liturgical day and a set of preferences, evaluates whether the condition should be included */
  include(day: LiturgicalDay, prefs: ClientPreferences = {}): boolean {
    let include: boolean = true,
      evaluatedConditions: boolean[] = new Array(include);

    // approach: for every possible condition included, push its truth
    // onto evaluatedConditions — then reduce the array and require each condition given to be true

    // `day`, `season`, and `weekday` each operate on an except/only pattern

    // `day`: is day.slug in the `only` list (and not in the `except` list)?
    this.exceptOnlyFactory('day' as 'day', day.slug, evaluatedConditions);

    // `week`: is day.week.slug in the `only` list (and not in the `except` list)?
    this.exceptOnlyFactory('week' as 'week', day.week?.slug, evaluatedConditions);

    // `weekday`:
    this.exceptOnlyFactory(
      'weekday' as 'weekday',
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
        dateFromYMDString(day.date).getDay()
      ],
      evaluatedConditions,
    );

    // `season`: is day.week.season (the 'base season' for e.g., a saints' day in Lent)
    // or day.season (the actual season being observed) in the `only` list (and not in `except`)?
    if (this.hasOwnProperty('season') && this.season !== undefined) {
      if (this.season.except !== undefined && this.season.except.length > 0) {
        evaluatedConditions.push(!this.season.except.includes(day.season));
        evaluatedConditions.push(!this.season.except.includes(day.week.season));
      }
      if (this.season.only !== undefined && this.season.only.length > 0) {
        evaluatedConditions.push(this.season.only.includes(day.season) || this.season.only.includes(day.week.season));
      }
    }

    // `feastDay`
    if (this.hasOwnProperty('feastDay') && this.feastDay !== undefined) {
      const highestFeastRank: number = Math.max(
          // highest rank of holy days given
          ...(day.holy_days || [])
            .filter((a) => !!a) // exclude any null or undefined from array
            .map((a) => (a && a.type && a.type.rank ? a.type.rank : 3)), // if rank is undefined, holy days default to 3
        ),
        isSunday: boolean = dateFromYMDString(day.date).getDay() == 0,
        isFeast: boolean = new LiturgicalDay(day).isFeast();
      evaluatedConditions.push(isFeast == this.feastDay);
    }

    // `date`
    if (this.hasOwnProperty('date') && this.date !== undefined) {
      const liturgyDate = dateFromYMDString(day.date);

      for (const property in this.date) {
        try {
          const [month, date] = (this.date[property as 'lt' | 'lte' | 'gt' | 'gte'] || '').split('/'),
            conditionDate = new Date(liturgyDate.getFullYear(), parseInt(month) - 1, parseInt(date));

          if (property == 'lt') {
            evaluatedConditions.push(liturgyDate.getTime() < conditionDate.getTime());
          } else if (property == 'lte') {
            evaluatedConditions.push(liturgyDate.getTime() <= conditionDate.getTime());
          } else if (property == 'gt') {
            evaluatedConditions.push(liturgyDate.getTime() > conditionDate.getTime());
          } else if (property == 'gte') {
            evaluatedConditions.push(liturgyDate.getTime() >= conditionDate.getTime());
          }
        } catch (e) {
          throw 'Date is formatted incorrectly (should be MM/DD).';
        }
      }
    }

    // `day_of_month`
    if (this.hasOwnProperty('day_of_month') && this.day_of_month !== undefined) {
      const liturgyDate = dateFromYMDString(day.date),
        liturgyDayOfMonth = liturgyDate.getDate();

      for (const property in this.day_of_month) {
        if (property == 'eq') {
          evaluatedConditions.push(liturgyDayOfMonth == Number(this.day_of_month.eq));
        } else if (property == 'neq') {
          evaluatedConditions.push(liturgyDayOfMonth != Number(this.day_of_month.neq));
        }
      }
    }

    // `preference`
    if (this.hasOwnProperty('preference') && this.preference !== undefined) {
      if (this.preference.is) {
        evaluatedConditions.push(prefs[this.preference.key] == this.preference.value);
      } else {
        evaluatedConditions.push(prefs[this.preference.key] !== this.preference.value);
      }
    }

    return evaluatedConditions.reduce((a, b) => a && b, true);
  }

  exceptOnlyFactory(property: 'day' | 'season' | 'weekday' | 'week', include: string, evaluatedConditions: boolean[]) {
    const obj = this[property];

    if (obj !== undefined) {
      if (obj.except) {
        evaluatedConditions.push(!obj.except.includes(include));
      }
      if (obj.only) {
        evaluatedConditions.push(obj.only.includes(include));
      }
    }
  }

  //** Constructor takes a Javascript object containing the class's properties */
  constructor(data: Partial<Condition> = {}) {
    Object.assign(this, data);
  }
}
