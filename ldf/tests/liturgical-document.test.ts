import { LiturgicalDocument, Text, Rubric, Condition, Liturgy, LiturgicalDay, ClientPreferences } from '../src';

const ASH_WEDNESDAY = new LiturgicalDay({
  date: '2020-02-26',
  evening: true,
  slug: 'wednesday-last-epiphany',
  propers: 'wednesday-last-epiphany',
  week: {
    week: 0,
    cycle: 'Epiphany',
    slug: 'last-epiphany',
    season: 'OrdinaryTime' as 'OrdinaryTime',
    name: 'Last Sunday after the Epiphany',
    color: {
      name: 'green',
      hex: '#409940'
    }
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

const ASH_THURSDAY = new LiturgicalDay({
  date: '2020-02-27',
  evening: true,
  slug: 'thursday-last-epiphany',
  propers: 'thursday-last-epiphany',
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
      slug: 'thursday-last-epiphany',
      name: 'Thursday after Ash Wednesday',
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

describe('LiturgicalDocument.include()', () => {
  it('should omit Alleluia on Ash Wednesday', () => {
    const ld = new Text();
    ld.value = ['Alleluia.'];

    const condition = new Condition();
    condition.season = {except: ['Lent']};

    ld.condition = { mode: 'and', conditions: [ condition ]};

    expect(ld.include(ASH_WEDNESDAY)).toEqual(false);
  });

  it('should handle AND between multiple conditions', () => {
    const ld = new Rubric();
    ld.value = ['It is customary to use Psalm 95 as the invitatory on Wednesdays and Fridays in Lent.'];

    const condition1 = new Condition();
    condition1.season = {only: ['Lent']};

    const condition2 = new Condition();
    condition2.weekday = {only: ['Wednesday', 'Friday']};

    ld.condition = { mode: 'and', conditions: [ condition1, condition2 ]};

    expect(condition1.include(ASH_WEDNESDAY)).toEqual(true);
    expect(condition1.include(ASH_THURSDAY)).toEqual(true);

    expect(condition2.include(ASH_WEDNESDAY)).toEqual(true);
    expect(condition2.include(ASH_THURSDAY)).toEqual(false);

    expect(ld.include(ASH_WEDNESDAY)).toEqual(true);
    expect(ld.include(ASH_THURSDAY)).toEqual(false);
  });

  it('should handle OR between multiple conditions', () => {
    const ld = new Rubric();
    ld.value = ['It is customary to use Psalm 95 as the invitatory on Wednesdays and Fridays, and on weekdays in Lent.'];

    const condition1 = new Condition();
    condition1.season = {only: ['Lent']};

    const condition2 = new Condition();
    condition2.weekday = {only: ['Wednesday', 'Friday']};

    ld.condition = { mode: 'or', conditions: [ condition1, condition2 ]};

    expect(ld.include(ASH_WEDNESDAY)).toEqual(true);
    expect(ld.include(ASH_THURSDAY)).toEqual(true);
  });
  
  it('should handle seasons', () => {
    const ld = new Text({
      "hidden": false,
      "value": [
        "Preserve us, O Lord, waking, and guard us sleeping, that awake we may watch with Christ, and asleep we may rest in peace."
      ],
      "type": "text",
      "condition": {
        "mode": "or",
        "conditions": [
          new Condition({
            "season": {
              "except": [
                "Easter",
                "Ascension"
              ],
              "only": []
            }
          })
        ]
      }
    });

    expect(ld.include(ASH_WEDNESDAY, {})).toEqual(true);
  })
});
