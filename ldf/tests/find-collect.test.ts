import { LiturgicalDay } from "../src/calendar/liturgical-day";
import { findCollect } from "../src/utils/find-collect";
import { LiturgicalDocument, Text, Liturgy } from "../src";

describe('findCollects', () => {
  it('Sunday collect on a ferial weekday', () => {
    expect(findCollect(COLLECTS, SUNDAY)).toEqual(SUNDAY_COLLECT)
  });

  it('red-letter collect on a feast day', () => {
    expect(findCollect(COLLECTS, BARTHOLOMEW)).toEqual(BART_COLLECT);
  });

  it('black-letter collects to be included on black-letter days', () => {
    expect(findCollect(COLLECTS, DORMITION)).toEqual(new Liturgy({
      "type": "liturgy",
      "value": [
        SUNDAY_COLLECT,
        MARY_COLLECT
      ]
    }))
  });

  it('black-letter collects to be listed first if sundayFirst == false', () => {
    expect(findCollect(COLLECTS, DORMITION, false)).toEqual(new Liturgy({
      "type": "liturgy",
      "value": [
        MARY_COLLECT,
        SUNDAY_COLLECT
      ]
    }));
  });
});

const SUNDAY_COLLECT = new Text({
  "type": "text",
  "style": "prayer",
  "label": "The Collect of the Day",
  "category": [
    "Collect",
    "Collect of the Day"
  ],
  "slug": "tenth-sunday-after-trinity",
  "value": [
    "LET thy merciful ears, O Lord, be open to the prayers of thy humble servants; and that they may obtain their petitions make them to ask such things as shall please thee; through Jesus Christ our Lord."
  ]
});

const BART_COLLECT = new Text({
  "type": "text",
  "style": "prayer",
  "label": "The Collect of the Day",
  "category": [
    "Collect",
    "Collect of the Day"
  ],
  "slug": "st-bartholomew",
  "value": [
    "O ALMIGHTY and everlasting God, who didst give to thine Apostle Bartholomew grace truly to believe and to preach thy Word: Grant, we beseech thee, unto thy Church, to love that Word which he believed, and both to preach and receive the same; through Jesus Christ our Lord."
  ]
});

const MARY_COLLECT = new Text({
  "type": "text",
  "style": "prayer",
  "label": "The Collect of the Day",
  "category": [
    "Collect",
    "Collect of the Day"
  ],
  "slug": "Mary",
  "value": [
    "O GOD Most High, who didst endue with wonderful virtue and grace the Blessed Virgin Mary, the Mother of our Lord: Grant that we, who now call her blessed, may be made very members of the heavenly family of him who was pleased to be called the first-born among many brethren; who liveth and reigneth with thee and the Holy Spirit, one God, world without end."
  ]
});

const COLLECTS = [
  SUNDAY_COLLECT,
  BART_COLLECT,
  MARY_COLLECT
];

const SUNDAY = new LiturgicalDay({
  "evening": false,
  "date": "2020-8-16",
  "kalendar": "bcp1962",
  "slug": "sunday-tenth-sunday-after-trinity",
  "propers": "sunday-tenth-sunday-after-trinity",
  "week": {
    "cycle": "Easter",
    "week": 27,
    "season": "OrdinaryTime",
    "name": "Tenth Sunday after Trinity",
    "slug": "tenth-sunday-after-trinity"
  },
  "years": {
    "bcp1979_daily_office": 2,
    "bcp1979_daily_psalms": 2,
    "rclsunday": "A"
  },
  "holy_days": [],
  "season": "OrdinaryTime"
});

const DORMITION = new LiturgicalDay({
  "evening": false,
  "date": "2020-8-15",
  "kalendar": "bcp1962",
  "slug": "saturday-ninth-sunday-after-trinity",
  "propers": "saturday-ninth-sunday-after-trinity",
  "week": {
    "cycle": "Easter",
    "week": 26,
    "season": "OrdinaryTime",
    "name": "Ninth Sunday after Trinity",
    "slug": "tenth-sunday-after-trinity"
  },
  "years": {
    "bcp1979_daily_office": 2,
    "bcp1979_daily_psalms": 2,
    "rclsunday": "A"
  },
  "holy_days": [
    {
      "mmdd": "8/15",
      "kalendar": "bcp1962",
      "name": "The Falling Asleep of the Blessed Virgin Mary.",
      "slug": "the-falling-asleep-of-the-blessed-virgin-mary.",
      "type": {
        "name": "Black-Letter",
        "rank": 2
      },
      "season": "Mary",
      "category": ["Mary"]
    }
  ],
  "season": "Mary",
  "holy_day_observed": {
    "mmdd": "8/15",
    "kalendar": "bcp1962",
    "name": "The Falling Asleep of the Blessed Virgin Mary.",
    "slug": "the-falling-asleep-of-the-blessed-virgin-mary.",
    "type": {
      "name": "Black-Letter",
      "rank": 2
    },
    "season": "Mary"
  }
});

const BARTHOLOMEW = new LiturgicalDay({
  "evening": false,
  "date": "2020-8-24",
  "kalendar": "bcp1962",
  "slug": "st-bartholomew",
  "propers": "st-bartholomew",
  "week": {
    "cycle": "Easter",
    "week": 28,
    "season": "OrdinaryTime",
    "name": "Eleventh Sunday after Trinity",
    "slug": "eleventh-sunday-after-trinity"
  },
  "years": {
    "bcp1979_daily_office": 2,
    "bcp1979_daily_psalms": 2,
    "rclsunday": "A"
  },
  "holy_days": [
    {
      "mmdd": "8/24",
      "kalendar": "bcp1962",
      "name": "St Bartholomew the Apostle.",
      "slug": "st-bartholomew",
      "type": {
        "name": "Red-Letter",
        "rank": 3
      },
      "season": "Saints"
    }
  ],
  "season": "Saints",
  "holy_day_observed": {
    "mmdd": "8/24",
    "kalendar": "bcp1962",
    "name": "St Bartholomew the Apostle.",
    "slug": "st-bartholomew",
    "type": {
      "name": "Red-Letter",
      "rank": 3
    },
    "season": "Saints"
  }
});