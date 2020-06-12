import { HolyDay } from '../src/calendar/holy-day';
import { LiturgicalDay } from '../src/calendar/liturgical-day';

export const FEAST_DAYS : HolyDay[] = [
    /* For 2008 test */
    {
        slug: "st-joseph",
        type: {
            rank: 3
        },
        mmdd: "3/19"
    },
    {
        slug: "eve-of-the-annunciation",
        type: {
            rank: 3
        },
        mmdd: "3/24",
        eve: true
    },
    {
        slug: "annunciation",
        type: {
            rank: 3
        },
        mmdd: "3/25"
    },
    {
        slug: "john-donne",
        type: {
            rank: 2
        },
        mmdd: "3/31"
    },
    {
        slug: "fd-maurice",
        type: {
            rank: 2
        },
        mmdd: "4/1"
    },
    /* For 2020 test */
    // 5/29 empty
    // 5/30 empty
    {
        slug: "the-visitation",
        type: {
            rank: 3
        },
        mmdd: "5/31"
    }
    // 5/31 also happened to be pentecost
    // 6/1 empty
]

export const SPECIAL_DAYS : HolyDay[] = [
    {
        slug: "monday-holy-week",
        type: {
            rank: 4
        }
    },
    {
        slug: "tuesday-holy-week",
        type: {
            rank: 4
        }
    },
    {
        slug: "wednesday-holy-week",
        type: {
            rank: 4
        }
    },
    {
        slug: "thursday-holy-week",
        type: {
            rank: 4
        }
    },
    {
        slug: "friday-holy-week",
        type: {
            rank: 4
        }
    },
    {
        slug: "saturday-holy-week",
        type: {
            rank: 4
        }
    },
    {
        slug: "monday-easter",
        type: {
            rank: 4
        }
    },
    {
        slug: "tuesday-easter",
        type: {
            rank: 4
        }
    },
    {
        slug: "wednesday-easter",
        type: {
            rank: 4
        }
    },
    {
        slug: "thursday-easter",
        type: {
            rank: 4
        }
    },
    {
        slug: "friday-easter",
        type: {
            rank: 4
        }
    },
    {
        slug: "saturday-easter",
        type: {
            rank: 4
        }
    }
]

export const LITURGICAL_DAYS : { [ yyyymmdd : string ] : LiturgicalDay } = {
    '2020/5/29': new LiturgicalDay({
        "evening": false,
        "date": "2020-5-29",
        "kalendar": "bcp1979",
        "slug": "friday-7th-easter",
        "propers": "friday-7th-easter",
        "week": {
          "slug": "7th-easter",
          "cycle": "Easter",
          "color": "Gold",
          "kalendar": "bcp1979",
          "season": "Ascension" as "Ascension",
          "name": "Seventh Sunday of Easter",
          "week": 13
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [],
        "season": "Ascension",
        "color": "Gold"
      }),
    '2020/5/30': new LiturgicalDay({
        "evening": false,
        "date": "2020-5-30",
        "kalendar": "bcp1979",
        "slug": "eve-of-the-visitation",
        "propers": "eve-of-the-visitation",
        "week": {
          "slug": "7th-easter",
          "cycle": "Easter",
          "color": "Gold",
          "kalendar": "bcp1979",
          "season": "Ascension",
          "name": "Seventh Sunday of Easter",
          "week": 13
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "Eve of the Visitation of the Blessed Virgin Mary",
            "mmdd": "5/30",
            "color": "Blue",
            "slug": "eve-of-the-visitation",
            "type": {
              "name": "Holy Days",
              "rank": 3
            },
            "kalendar": "bcp1979",
            "eve": true,
          },
          {
            "eve": true,
            "readings": "eve-of-pentecost",
            "name": "Eve of Pentecost",
            "slug": "saturday-7th-easter",
            "color": "Red",
            "kalendar": "bcp1979",
            "season": "Pentecost"
          }
        ],
        "season": "Ascension",
        "color": "Blue",
        "holy_day_observed": {
          "name": "Eve of the Visitation of the Blessed Virgin Mary",
          "mmdd": "5/30",
          "color": "Blue",
          "slug": "eve-of-the-visitation",
          "type": {
            "name": "Holy Days",
            "rank": 3
          },
          "kalendar": "bcp1979",
          "eve": true,
        }
      }),
    '2020/5/31': new LiturgicalDay({
        "evening": false,
        "date": "2020-5-31",
        "kalendar": "bcp1979",
        "slug": "sunday-pentecost",
        "propers": "sunday-proper-4",
        "week": {
          "omit_the": true,
          "name": "Pentecost",
          "week": 14,
          "cycle": "Easter",
          "color": "Green",
          "slug": "pentecost",
          "kalendar": "bcp1979",
          "season": "OrdinaryTime",
          "proper": 4,
          "propers": "proper-4"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "The Visitation of the Blessed Virgin Mary",
            "mmdd": "5/31",
            "slug": "the-visitation",
            "color": "Blue",
            "type": {
              "name": "Holy Days",
              "rank": 3
            },
            "kalendar": "bcp1979"
          },
          {
            "color": "Red",
            "slug": "sunday-pentecost",
            "type": {
              "name": "Principal Feast",
              "rank": 5
            },
            "kalendar": "bcp1979",
            "season": "Pentecost"
          }
        ],
        "season": "Pentecost",
        "color": "Red"
      }),
    '2020/6/1': new LiturgicalDay({
        "evening": false,
        "date": "2020-6-1",
        "kalendar": "bcp1979",
        "slug": "monday-pentecost",
        "propers": "monday-proper-4",
        "week": {
          "omit_the": true,
          "name": "Pentecost",
          "week": 14,
          "cycle": "Easter",
          "color": "Green",
          "slug": "pentecost",
          "kalendar": "bcp1979",
          "season": "OrdinaryTime",
          "proper": 4,
          "propers": "proper-4"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "Justin, Martyr at Rome, c. 167",
            "mmdd": "6/1",
            "type": {
              "rank": 2,
              "name": "Black Letter"
            },
            "kalendar": "bcp1979"
          }
        ],
        "season": "OrdinaryTime",
        "color": "Green"
      }),
    '2020/6/2': new LiturgicalDay({
        "evening": false,
        "date": "2020-6-2",
        "kalendar": "bcp1979",
        "slug": "tuesday-pentecost",
        "propers": "tuesday-proper-4",
        "week": {
          "omit_the": true,
          "name": "Pentecost",
          "week": 14,
          "cycle": "Easter",
          "color": "Green",
          "slug": "pentecost",
          "kalendar": "bcp1979",
          "season": "OrdinaryTime",
          "proper": 4,
          "propers": "proper-4"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "The Martyrs of Lyons, 177",
            "mmdd": "6/2",
            "type": {
              "rank": 2,
              "name": "Black Letter"
            },
            "kalendar": "bcp1979"
          }
        ],
        "season": "OrdinaryTime",
        "color": "Green"
      }),
    '2020/6/3': new LiturgicalDay({
        "evening": false,
        "date": "2020-6-3",
        "kalendar": "bcp1979",
        "slug": "wednesday-pentecost",
        "propers": "wednesday-proper-4",
        "week": {
          "omit_the": true,
          "name": "Pentecost",
          "week": 14,
          "cycle": "Easter",
          "color": "Green",
          "slug": "pentecost",
          "kalendar": "bcp1979",
          "season": "OrdinaryTime",
          "proper": 4,
          "propers": "proper-4"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "The Martyrs of Uganda, 1886",
            "type": {
              "name": "Black Letter",
              "rank": 2
            },
            "kalendar": "bcp1979",
            "mmdd": "6/3"
          }
        ],
        "season": "OrdinaryTime",
        "color": "Green"
      }),
    '2008/3/13': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-13",
        "kalendar": "bcp1979",
        "slug": "thursday-5th-lent",
        "propers": "thursday-5th-lent",
        "week": {
          "color": "Purple",
          "week": 5,
          "cycle": "Easter",
          "name": "Fifth Sunday in Lent",
          "slug": "5th-lent",
          "season": "Lent",
          "kalendar": "bcp1979"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [],
        "season": "Lent",
        "color": "Purple"
      }),
    '2008/3/14': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-14",
        "kalendar": "bcp1979",
        "slug": "friday-5th-lent",
        "propers": "friday-5th-lent",
        "week": {
          "color": "Purple",
          "week": 5,
          "cycle": "Easter",
          "name": "Fifth Sunday in Lent",
          "slug": "5th-lent",
          "season": "Lent",
          "kalendar": "bcp1979"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [],
        "season": "Lent",
        "color": "Purple"
      }),
    '2008/3/15': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-15",
        "kalendar": "bcp1979",
        "slug": "saturday-5th-lent",
        "propers": "saturday-5th-lent",
        "week": {
          "color": "Purple",
          "week": 5,
          "cycle": "Easter",
          "name": "Fifth Sunday in Lent",
          "slug": "5th-lent",
          "season": "Lent",
          "kalendar": "bcp1979"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [],
        "season": "Lent",
        "color": "Purple"
      }),
    '2008/3/16': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-16",
        "kalendar": "bcp1979",
        "slug": "sunday-holy-week",
        "propers": "sunday-holy-week",
        "week": {
          "week": 6,
          "name": "Palm Sunday",
          "omit_the": true,
          "color": "Red",
          "cycle": "Easter",
          "slug": "holy-week",
          "kalendar": "bcp1979",
          "season": "HolyWeek" as "HolyWeek"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "Palm Sunday",
            "kalendar": "bcp1979",
            "type": {
              "name": "Sunday",
              "rank": 5
            },
            "slug": "sunday-holy-week",
            "color": "Red",
            "season": "HolyWeek" as "HolyWeek"
          }
        ],
        "season": "HolyWeek",
        "color": "Red"
      }),
    '2008/3/17': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-17",
        "kalendar": "bcp1979",
        "slug": "monday-holy-week",
        "propers": "monday-holy-week",
        "week": {
          "week": 6,
          "name": "Palm Sunday",
          "omit_the": true,
          "color": "Red",
          "cycle": "Easter",
          "slug": "holy-week",
          "kalendar": "bcp1979",
          "season": "HolyWeek"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "mmdd": "3/17",
            "name": "Patrick, Bishop and Missionary of Ireland, 461",
            "type": {
              "name": "Black Letter",
              "rank": 2
            },
            "kalendar": "bcp1979"
          },
          {
            "slug": "monday-holy-week",
            "type": {
              "rank": 4,
              "name": "Holy Week"
            },
            "kalendar": "bcp1979",
            "name": "Monday in Holy Week",
            "season": "HolyWeek"
          }
        ],
        "season": "HolyWeek",
        "color": "Red"
      }),
    '2008/3/18': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-18",
        "kalendar": "bcp1979",
        "slug": "tuesday-holy-week",
        "propers": "tuesday-holy-week",
        "week": {
          "week": 6,
          "name": "Palm Sunday",
          "omit_the": true,
          "color": "Red",
          "cycle": "Easter",
          "slug": "holy-week",
          "kalendar": "bcp1979",
          "season": "HolyWeek"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "Cyril, Bishop of Jerusalem, 386",
            "mmdd": "3/18",
            "kalendar": "bcp1979",
            "type": {
              "name": "Black Letter",
              "rank": 2
            }
          },
          {
            "type": {
              "name": "Holy Week",
              "rank": 4
            },
            "slug": "tuesday-holy-week",
            "kalendar": "bcp1979",
            "season": "HolyWeek",
            "name": "Tuesday in Holy Week"
          }
        ],
        "season": "HolyWeek",
        "color": "Red"
      }),
    '2008/3/19': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-19",
        "kalendar": "bcp1979",
        "slug": "wednesday-holy-week",
        "propers": "wednesday-holy-week",
        "week": {
          "week": 6,
          "name": "Palm Sunday",
          "omit_the": true,
          "color": "Red",
          "cycle": "Easter",
          "slug": "holy-week",
          "kalendar": "bcp1979",
          "season": "HolyWeek"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "kalendar": "bcp1979",
            "color": "White",
            "mmdd": "3/19",
            "season": "Saints",
            "type": {
              "rank": 3,
              "name": "Holy Days"
            },
            "name": "St. Joseph",
            "slug": "st-joseph"
          },
          {
            "name": "Wednesday in Holy Week",
            "type": {
              "name": "Holy Week",
              "rank": 4
            },
            "slug": "wednesday-holy-week",
            "kalendar": "bcp1979",
            "season": "HolyWeek"
          }
        ],
        "season": "HolyWeek",
        "color": "Red"
      }),
    '2008/3/20': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-20",
        "kalendar": "bcp1979",
        "slug": "thursday-holy-week",
        "propers": "thursday-holy-week",
        "week": {
          "week": 6,
          "name": "Palm Sunday",
          "omit_the": true,
          "color": "Red",
          "cycle": "Easter",
          "slug": "holy-week",
          "kalendar": "bcp1979",
          "season": "HolyWeek"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "mmdd": "3/20",
            "kalendar": "bcp1979",
            "name": "Cuthbert, Bishop of Lindisfarne, 687",
            "type": {
              "rank": 2,
              "name": "Black Letter"
            }
          },
          {
            "name": "Maundy Thursday",
            "type": {
              "name": "Triduum",
              "rank": 4
            },
            "color": "Red",
            "slug": "thursday-holy-week",
            "kalendar": "bcp1979",
            "season": "HolyWeek" as "HolyWeek"
          }
        ],
        "season": "HolyWeek",
        "color": "Red"
      }),
    '2008/3/21': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-21",
        "kalendar": "bcp1979",
        "slug": "friday-holy-week",
        "propers": "friday-holy-week",
        "week": {
          "week": 6,
          "name": "Palm Sunday",
          "omit_the": true,
          "color": "Red",
          "cycle": "Easter",
          "slug": "holy-week",
          "kalendar": "bcp1979",
          "season": "HolyWeek"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "kalendar": "bcp1979",
            "name": "Thomas Ken, Bishop of Bath and Wells, 1711",
            "mmdd": "3/21",
            "type": {
              "name": "Black Letter",
              "rank": 2
            }
          },
          {
            "kalendar": "bcp1979",
            "season": "HolyWeek" as "HolyWeek",
            "name": "Good Friday",
            "type": {
              "rank": 4,
              "name": "Triduum"
            },
            "slug": "friday-holy-week",
            "color": "Red"
          }
        ],
        "season": "HolyWeek",
        "color": "Red"
      }),
    '2008/3/22': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-22",
        "kalendar": "bcp1979",
        "slug": "saturday-holy-week",
        "propers": "saturday-holy-week",
        "week": {
          "week": 6,
          "name": "Palm Sunday",
          "omit_the": true,
          "color": "Red",
          "cycle": "Easter",
          "slug": "holy-week",
          "kalendar": "bcp1979",
          "season": "HolyWeek"
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "James De Koven, Priest, 1879",
            "kalendar": "bcp1979",
            "type": {
              "name": "Black Letter",
              "rank": 2
            },
            "mmdd": "3/22"
          },
          {
            "name": "Holy Saturday",
            "type": {
              "name": "Triduum",
              "rank": 4
            },
            "slug": "saturday-holy-week",
            "color": "Red",
            "kalendar": "bcp1979",
            "season": "HolyWeek"
          }
        ],
        "season": "HolyWeek",
        "color": "Red"
      }),
    '2008/3/23': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-23",
        "kalendar": "bcp1979",
        "slug": "sunday-easter",
        "propers": "sunday-easter",
        "week": {
          "name": "Easter Day",
          "week": 7,
          "cycle": "Easter",
          "season": "Easter",
          "color": "Gold",
          "kalendar": "bcp1979",
          "slug": "easter",
          "omit_the": true
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "mmdd": "3/23",
            "type": {
              "rank": 2,
              "name": "Black Letter"
            },
            "kalendar": "bcp1979",
            "name": "Gregory the Illuminator, Bishop and Missionary of Armenia, c. 332"
          }
        ],
        "season": "Easter",
        "color": "Gold"
      }),
    '2008/3/24': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-24",
        "kalendar": "bcp1979",
        "slug": "eve-of-the-annunciation",
        "propers": "eve-of-the-annunciation",
        "week": {
          "name": "Easter Day",
          "week": 7,
          "cycle": "Easter",
          "season": "Easter",
          "color": "Gold",
          "kalendar": "bcp1979",
          "slug": "easter",
          "omit_the": true
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "type": {
              "rank": 3,
              "name": "Holy Days"
            },
            "color": "Blue",
            "kalendar": "bcp1979",
            "name": "Eve of the Annunciation of Our Lord Jesus Christ to the Blessed Virgin Mary",
            "slug": "eve-of-the-annunciation",
            "eve": true,
            "season": "Saints" as "Saints",
            "mmdd": "3/24"
          },
          {
            "type": {
              "rank": 2,
              "name": "Weekday"
            },
            "season": "Easter",
            "name": "Monday in Easter Week",
            "slug": "monday-easter",
            "kalendar": "bcp1979"
          }
        ],
        "season": "Saints",
        "color": "Blue",
        "holy_day_observed": {
          "type": {
            "rank": 3,
            "name": "Holy Days"
          },
          "color": "Blue",
          "kalendar": "bcp1979",
          "name": "Eve of the Annunciation of Our Lord Jesus Christ to the Blessed Virgin Mary",
          "slug": "eve-of-the-annunciation",
          "eve": true,
          "season": "Saints",
          "mmdd": "3/24"
        }
      }),
    '2008/3/25': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-25",
        "kalendar": "bcp1979",
        "slug": "annunciation",
        "propers": "annunciation",
        "week": {
          "name": "Easter Day",
          "week": 7,
          "cycle": "Easter",
          "season": "Easter",
          "color": "Gold",
          "kalendar": "bcp1979",
          "slug": "easter",
          "omit_the": true
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "slug": "annunciation",
            "season": "Saints" as "Saints",
            "color": "Blue",
            "mmdd": "3/25",
            "name": "The Annunciation of Our Lord Jesus Christ to the Blessed Virgin Mary",
            "type": {
              "name": "Holy Days",
              "rank": 3
            },
            "kalendar": "bcp1979",
          },
          {
            "slug": "tuesday-easter",
            "type": {
              "rank": 2,
              "name": "Weekday"
            },
            "kalendar": "bcp1979",
            "season": "Easter",
            "name": "Tuesday in Easter Week"
          }
        ],
        "season": "Saints",
        "color": "Blue",
        "holy_day_observed": {
          "slug": "annunciation",
          "season": "Saints",
          "color": "Blue",
          "mmdd": "3/25",
          "name": "The Annunciation of Our Lord Jesus Christ to the Blessed Virgin Mary",
          "type": {
            "name": "Holy Days",
            "rank": 3
          },
          "kalendar": "bcp1979",
        }
      }),
    '2008/3/26': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-26",
        "kalendar": "bcp1979",
        "slug": "wednesday-easter",
        "propers": "wednesday-easter",
        "week": {
          "name": "Easter Day",
          "week": 7,
          "cycle": "Easter",
          "season": "Easter",
          "color": "Gold",
          "kalendar": "bcp1979",
          "slug": "easter",
          "omit_the": true
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "Wednesday in Easter Week",
            "season": "Easter",
            "slug": "wednesday-easter",
            "kalendar": "bcp1979",
            "type": {
              "rank": 2,
              "name": "Weekday"
            }
          }
        ],
        "season": "Easter",
        "color": "Gold"
      }),
    '2008/3/27': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-27",
        "kalendar": "bcp1979",
        "slug": "thursday-easter",
        "propers": "thursday-easter",
        "week": {
          "name": "Easter Day",
          "week": 7,
          "cycle": "Easter",
          "season": "Easter",
          "color": "Gold",
          "kalendar": "bcp1979",
          "slug": "easter",
          "omit_the": true
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "name": "Charles Henry Brent, Bishop of the Philippines, and of Western New York, 1929",
            "type": {
              "name": "Black Letter",
              "rank": 2
            },
            "kalendar": "bcp1979",
            "mmdd": "3/27"
          },
          {
            "kalendar": "bcp1979",
            "type": {
              "name": "Weekday",
              "rank": 2
            },
            "season": "Easter",
            "name": "Thursday in Easter Week",
            "slug": "thursday-easter"
          }
        ],
        "season": "Easter",
        "color": "Gold"
      }),
    '2008/3/28': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-28",
        "kalendar": "bcp1979",
        "slug": "friday-easter",
        "propers": "friday-easter",
        "week": {
          "name": "Easter Day",
          "week": 7,
          "cycle": "Easter",
          "season": "Easter",
          "color": "Gold",
          "kalendar": "bcp1979",
          "slug": "easter",
          "omit_the": true
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "slug": "friday-easter",
            "season": "Easter",
            "type": {
              "rank": 2,
              "name": "Weekday"
            },
            "name": "Friday in Easter Week",
            "kalendar": "bcp1979"
          }
        ],
        "season": "Easter",
        "color": "Gold"
      }),
    '2008/3/29': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-29",
        "kalendar": "bcp1979",
        "slug": "saturday-easter",
        "propers": "saturday-easter",
        "week": {
          "name": "Easter Day",
          "week": 7,
          "cycle": "Easter",
          "season": "Easter",
          "color": "Gold",
          "kalendar": "bcp1979",
          "slug": "easter",
          "omit_the": true
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "type": {
              "rank": 2,
              "name": "Black Letter"
            },
            "kalendar": "bcp1979",
            "mmdd": "3/29",
            "name": "John Keble, Priest, 1866"
          },
          {
            "name": "Saturday in Easter Week",
            "slug": "saturday-easter",
            "type": {
              "name": "Weekday",
              "rank": 2
            },
            "season": "Easter",
            "kalendar": "bcp1979"
          }
        ],
        "season": "Easter",
        "color": "Gold"
      }),
    '2008/3/30': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-30",
        "kalendar": "bcp1979",
        "slug": "sunday-2nd-easter",
        "propers": "sunday-2nd-easter",
        "week": {
          "color": "Gold",
          "slug": "2nd-easter",
          "season": "Easter",
          "name": "Second Sunday of Easter",
          "cycle": "Easter",
          "kalendar": "bcp1979",
          "week": 8
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [],
        "season": "Easter",
        "color": "Gold"
      }),
    '2008/3/31': new LiturgicalDay({
        "evening": false,
        "date": "2008-3-31",
        "kalendar": "bcp1979",
        "slug": "monday-2nd-easter",
        "propers": "monday-2nd-easter",
        "week": {
          "color": "Gold",
          "slug": "2nd-easter",
          "season": "Easter",
          "name": "Second Sunday of Easter",
          "cycle": "Easter",
          "kalendar": "bcp1979",
          "week": 8
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "kalendar": "bcp1979",
            "name": "John Donne, Priest, 1631",
            "mmdd": "3/31",
            "type": {
              "name": "Black Letter",
              "rank": 2
            }
          }
        ],
        "season": "Easter",
        "color": "Gold"
      }),
    '2008/4/1': new LiturgicalDay({
        "evening": false,
        "date": "2008-4-1",
        "kalendar": "bcp1979",
        "slug": "tuesday-2nd-easter",
        "propers": "tuesday-2nd-easter",
        "week": {
          "color": "Gold",
          "slug": "2nd-easter",
          "season": "Easter",
          "name": "Second Sunday of Easter",
          "cycle": "Easter",
          "kalendar": "bcp1979",
          "week": 8
        },
        "years": {
          "bcp1979_daily_office": 2,
          "bcp1979_daily_psalms": 2,
          "rclsunday": "A"
        },
        "holy_days": [
          {
            "mmdd": "4/1",
            "kalendar": "bcp1979",
            "name": "Frederick Denison Maurice, Priest, 1872",
            "type": {
              "rank": 2,
              "name": "Black Letter"
            }
          }
        ],
        "season": "Easter",
        "color": "Gold"
      }),
}