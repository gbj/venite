[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/liturgical-day"](../modules/_calendar_liturgical_day_.md) › [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

# Class: LiturgicalDay

LiturgicalDay represents a particular moment in the liturgical calendar,
like "Monday in Holy Week" or "The Eve of the Epiphany."

## Hierarchy

* **LiturgicalDay**

## Index

### Constructors

* [constructor](_calendar_liturgical_day_.liturgicalday.md#constructor)

### Properties

* [color](_calendar_liturgical_day_.liturgicalday.md#optional-color)
* [date](_calendar_liturgical_day_.liturgicalday.md#date)
* [evening](_calendar_liturgical_day_.liturgicalday.md#evening)
* [holy_day_observed](_calendar_liturgical_day_.liturgicalday.md#optional-holy_day_observed)
* [holy_days](_calendar_liturgical_day_.liturgicalday.md#optional-holy_days)
* [kalendar](_calendar_liturgical_day_.liturgicalday.md#kalendar)
* [propers](_calendar_liturgical_day_.liturgicalday.md#optional-propers)
* [season](_calendar_liturgical_day_.liturgicalday.md#season)
* [slug](_calendar_liturgical_day_.liturgicalday.md#slug)
* [week](_calendar_liturgical_day_.liturgicalday.md#week)
* [years](_calendar_liturgical_day_.liturgicalday.md#years)

### Methods

* [addHolyDays](_calendar_liturgical_day_.liturgicalday.md#addholydays)
* [getDate](_calendar_liturgical_day_.liturgicalday.md#getdate)
* [isFeast](_calendar_liturgical_day_.liturgicalday.md#isfeast)
* [observedDay](_calendar_liturgical_day_.liturgicalday.md#observedday)

## Constructors

###  constructor

\+ **new LiturgicalDay**(`data`: Partial‹[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)›): *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Defined in [calendar/liturgical-day.ts:171](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L171)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)› | {} |

**Returns:** *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

## Properties

### `Optional` color

• **color**? : *string | [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md)*

*Defined in [calendar/liturgical-day.ts:67](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L67)*

The [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) used for the day

___

###  date

• **date**: *string*

*Defined in [calendar/liturgical-day.ts:29](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L29)*

Dates are always stored as YYYY-MM-DD. No time or timezone information is helpful.
 Date math can be done using a library like js-joda.

**`example`** 
const day = new LiturgicalDay();
day.date = '2020-06-25';
const [y, m, d] = day.date.split('-');
const dayDate : LocalDate = LocalDate.of(y, m, d)

___

###  evening

• **evening**: *boolean* = false

*Defined in [calendar/liturgical-day.ts:43](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L43)*

True if this moment is the evening. Used to indicate the eve of feasts.

___

### `Optional` holy_day_observed

• **holy_day_observed**? : *[HolyDay](_calendar_holy_day_.holyday.md)*

*Defined in [calendar/liturgical-day.ts:64](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L64)*

exists if one the listed `HolyDay`s is being observed

___

### `Optional` holy_days

• **holy_days**? : *[HolyDay](_calendar_holy_day_.holyday.md)[]*

*Defined in [calendar/liturgical-day.ts:61](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L61)*

An array of possible [HolyDay](_calendar_holy_day_.holyday.md)s that fall at this moment. It’s up to the consumer
to determine precedence.

___

###  kalendar

• **kalendar**: *string*

*Defined in [calendar/liturgical-day.ts:32](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L32)*

Overarching calendar this is a part of

___

### `Optional` propers

• **propers**? : *undefined | string*

*Defined in [calendar/liturgical-day.ts:78](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L78)*

Optionally `slug` as an identifier for readings and collects

**`example`** 
// June 25, 2020
{
  ...,
  "slug":"thursday-3rd-pentecost"
  "propers": "thursday-proper-7"
}

___

###  season

• **season**: *Seasons[number]*

*Defined in [calendar/liturgical-day.ts:57](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L57)*

A machine-readable identifier for the liturgical season

___

###  slug

• **slug**: *string*

*Defined in [calendar/liturgical-day.ts:40](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L40)*

An identifying slug that distinguishes this day from all others

**`example`** 
// Wednesday after the First Sunday after the Epiphany
'wednesday-1st-epiphany'

___

###  week

• **week**: *[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)*

*Defined in [calendar/liturgical-day.ts:46](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L46)*

The [LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md) during which this moment takes place.

___

###  years

• **years**: *object*

*Defined in [calendar/liturgical-day.ts:54](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L54)*

Stores information about where a date falls in various lectionary cycles

**`example`** 
// April 19, 2020
{ "bcp1979_daily_office": 2, "bcp1979_daily_psalms": 2, "rclsunday": "A" }

#### Type declaration:

* \[ **x**: *string*\]: any

## Methods

###  addHolyDays

▸ **addHolyDays**(`holydays`: [HolyDay](_calendar_holy_day_.holyday.md)[]): *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Defined in [calendar/liturgical-day.ts:86](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L86)*

Given a LiturgicalDay, returns a new LiturgicalDay that includes the feasts passed

**Parameters:**

Name | Type |
------ | ------ |
`holydays` | [HolyDay](_calendar_holy_day_.holyday.md)[] |

**Returns:** *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

___

###  getDate

▸ **getDate**(): *Date*

*Defined in [calendar/liturgical-day.ts:81](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L81)*

Returns a native Date from the day's date string

**Returns:** *Date*

___

###  isFeast

▸ **isFeast**(): *boolean*

*Defined in [calendar/liturgical-day.ts:169](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L169)*

**Returns:** *boolean*

___

###  observedDay

▸ **observedDay**(`day`: [ObservedInterface](../interfaces/_calendar_liturgical_day_.observedinterface.md), `holydays`: [ObservedInterface](../interfaces/_calendar_liturgical_day_.observedinterface.md)[]): *[ObservedInterface](../interfaces/_calendar_liturgical_day_.observedinterface.md)*

*Defined in [calendar/liturgical-day.ts:138](https://github.com/gbj/venite/blob/f73713a/ldf/src/calendar/liturgical-day.ts#L138)*

Given a `LiturgicalDay` and a set of `HolyDay`s, it returns whichever option takes precedence

**Parameters:**

Name | Type |
------ | ------ |
`day` | [ObservedInterface](../interfaces/_calendar_liturgical_day_.observedinterface.md) |
`holydays` | [ObservedInterface](../interfaces/_calendar_liturgical_day_.observedinterface.md)[] |

**Returns:** *[ObservedInterface](../interfaces/_calendar_liturgical_day_.observedinterface.md)*
