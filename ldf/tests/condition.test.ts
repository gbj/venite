import { Condition, Liturgy, LiturgicalDay, ClientPreferences } from '../src';

const day = new LiturgicalDay({
  date: '2020-02-26',
  evening: true,
  slug: 'wednesday-last-epiphany',
  propers: 'wednesday-last-epiphany',
  week: {
    week: 0,
    slug: 'last-epiphany',
    season: 'OrdinaryTime' as 'OrdinaryTime',
    name: 'Last Sunday after the Epiphany',
    color: {
      name: 'green',
      hex: '#409940'
    },
    cycle: 'Epiphany'
  },
  years: {
    bcp1979_daily_office: 2,
    bcp1979_daily_psalms: 2,
    rclsunday: 'A'
  },
  holy_days: [
    {
      slug: 'wednesday-last-epiphany',
      name: 'Ash Wednesday',
      season: 'Lent' as 'Lent',
      type: {
        name: 'Fast',
        rank: 3
      },
      color: {
        name: 'purple',
        hex: '#800080'
      }
    }
  ],
  season: 'Lent' as 'Lent',
  color: {
    name: 'purple',
    hex: '#800080'
  }
});

const annunciation = new LiturgicalDay({
  date: '2020-03-25',
  evening: false,
  slug: 'annunciation',
  propers: 'annunciation',

  week: {
    week: 4,
    slug: '4th-lent',
    season: 'Lent' as 'Lent',
    name: 'Fourth Sunday in Lent',
    color: {
      name: 'purple',
      hex: '#800080'
    },
    cycle: 'Easter'
  },
  years: {
    bcp1979_daily_office: 2,
    bcp1979_daily_psalms: 2,
    rclsunday: 'A'
  },
  holy_days: [
    {
      mmdd: '3/25',
      slug: 'annunciation',
      name: 'The Annunciation of Our Lord Jesus Christ to the Blessed Virgin Mary',
      season: 'Saints' as 'Saints',
      type: {
        name: 'Holy Days',
        rank: 3
      },
      color: {
        name: 'blue',
        hex: '#213a5e'
      }
    }
  ],
  season: 'Saints' as 'Saints',
  color: {
    name: 'blue',
    hex: '#213a5e'
  }
});

describe('Condition', () => {
  it('should match day slugs', () => {
    const condition = new Condition();

    condition.day = {only: ['wednesday-last-epiphany']};
    let include : boolean = condition.include(day, new ClientPreferences());
    expect(include).toEqual(true);

    condition.day = {except: ['wednesday-last-epiphany']};
    include = condition.include(day, new ClientPreferences());
    expect(include).toEqual(false);
  });

  it('should match weeks', () => {
    const condition = new Condition();

    condition.week = {only: ['4th-lent']};
    let include : boolean = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(true);

    condition.week = {except: ['4th-lent']};
    include = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(false);
  });

  it('should match weekdays', () => {
    const condition = new Condition();

    condition.weekday = {only: ['Wednesday']};
    let include : boolean = condition.include(day, new ClientPreferences());
    expect(include).toEqual(true);

    condition.weekday = {except: ['Wednesday']};
    include = condition.include(day, new ClientPreferences());
    expect(include).toEqual(false);
  });

  it('should identify Ash Wednesday as being in Lent', () => {
    const condition = new Condition();

    condition.season = { only: ['Lent'] };
    let include : boolean = condition.include(day, new ClientPreferences());
    expect(include).toEqual(true);

    condition.season = {except: ['Lent']};
    include = condition.include(day, new ClientPreferences());
    expect(include).toEqual(false);

    const condition2 = new Condition({
        "season": {
          "only": ["Advent", "Lent", "HolyWeek", "Ember", "Rogation"]
        }
      });
    expect(condition2.include(day, {})).toEqual(true);
  });

  it('should handle multiple seasons', () => {
    const condition = new Condition({ season: { except: [ 'Easter', 'Ascension' ], only: [] }});
    expect(condition.include(day, new ClientPreferences())).toEqual(true);
  });

  it('should recognize feast days', () => {
    const condition = new Condition();

    condition.feastDay = true;
    let include : boolean = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(true);

    condition.feastDay = false;
    include = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(false);

  });

  it('should still exclude Alleluias on saints’ days in Lent', () => {
    const condition = new Condition();

    condition.season = { only: ['Saints'] };
    let include : boolean = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(true);

    condition.season = { only: ['Lent'] };
    include = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(true);

    condition.season = {except: ['Lent']};
    include = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(false);
  });

  it('should handle date <, >, <=, >=', () => {
    const condition = new Condition();

    condition.date = { lt: '3/26'};
    let include : boolean = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(true);

    condition.date = { gt: '3/26'};
    include = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(false);

    condition.date = { gte: '3/25'};
    include = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(true);

    condition.date = { lt: '4/1', gt: '3/1'};
    include = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(true);

    condition.date = { lt: '3/1', gt: '2/1 '};
    include = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(false);
  });

  it('should return false for inappropriate dates', () => {
    const condition = new Condition();

    condition.date = { lt: '3as/'};
    let include : boolean = condition.include(annunciation, new ClientPreferences());
    expect(include).toEqual(false);
  });

  it('should match preference', () => {
    const condition = new Condition();

    condition.preference = {
      key: 'angelus',
      value: 'before',
      is: true
    };
    let include : boolean = condition.include(annunciation, {'angelus': 'before'});
    expect(include).toEqual(true);
  });

  it('should match !preference', () => {
    const condition = new Condition();

    condition.preference = {
      key: 'angelus',
      value: 'before',
      is: false
    };
    let include : boolean = condition.include(annunciation, {'angelus': 'before'});
    expect(include).toEqual(false);
  });
});
