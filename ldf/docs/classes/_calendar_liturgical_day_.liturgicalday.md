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
* [holy_days](_calendar_liturgical_day_.liturgicalday.md#optional-holy_days)
* [proper](_calendar_liturgical_day_.liturgicalday.md#optional-proper)
* [propers](_calendar_liturgical_day_.liturgicalday.md#optional-propers)
* [season](_calendar_liturgical_day_.liturgicalday.md#season)
* [slug](_calendar_liturgical_day_.liturgicalday.md#slug)
* [week](_calendar_liturgical_day_.liturgicalday.md#week)
* [years](_calendar_liturgical_day_.liturgicalday.md#years)

### Methods

* [getDate](_calendar_liturgical_day_.liturgicalday.md#getdate)

## Constructors

###  constructor

\+ **new LiturgicalDay**(`data`: Partial‹[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)›): *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Defined in [calendar/liturgical-day.ts:90](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L90)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)› | {} |

**Returns:** *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

## Properties

### `Optional` color

• **color**? : *[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md)*

*Defined in [calendar/liturgical-day.ts:62](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L62)*

The [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) used for the day

___

###  date

• **date**: *string*

*Defined in [calendar/liturgical-day.ts:19](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L19)*

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

*Defined in [calendar/liturgical-day.ts:30](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L30)*

True if this moment is the evening. Used to indicate the eve of feasts.

___

### `Optional` holy_days

• **holy_days**? : *[HolyDay](_calendar_holy_day_.holyday.md)[]*

*Defined in [calendar/liturgical-day.ts:59](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L59)*

An array of possible [HolyDay](_calendar_holy_day_.holyday.md)s that fall at this moment. It’s up to the consumer
to determine precedence.

___

### `Optional` proper

• **proper**? : *[Proper](_calendar_proper_.proper.md)*

*Defined in [calendar/liturgical-day.ts:65](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L65)*

The [Proper](_calendar_proper_.proper.md) (i.e., for days after Pentecost)

___

### `Optional` propers

• **propers**? : *undefined | string*

*Defined in [calendar/liturgical-day.ts:76](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L76)*

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

• **season**: *"Advent" | "Christmas" | "Epiphany" | "Lent" | "HolyWeek" | "Easter" | "Pentecost" | "Saints" | "OrdinaryTime"*

*Defined in [calendar/liturgical-day.ts:44](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L44)*

A machine-readable identifier for the liturgical season

___

###  slug

• **slug**: *string*

*Defined in [calendar/liturgical-day.ts:27](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L27)*

An identifying slug that distinguishes this day from all others

**`example`** 
// Wednesday after the First Sunday after the Epiphany
'wednesday-1st-epiphany'

___

###  week

• **week**: *[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)*

*Defined in [calendar/liturgical-day.ts:33](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L33)*

The [LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md) during which this moment takes place.

___

###  years

• **years**: *object*

*Defined in [calendar/liturgical-day.ts:41](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L41)*

Stores information about where a date falls in various lectionary cycles

**`example`** 
// April 19, 2020
{ "bcp1979_daily_office": 2, "bcp1979_daily_psalms": 2, "rclsunday": "A" }

#### Type declaration:

* \[ **x**: *string*\]: any

## Methods

###  getDate

▸ **getDate**(): *Date*

*Defined in [calendar/liturgical-day.ts:79](https://github.com/gbj/venite/blob/3d88b83/ldf/src/calendar/liturgical-day.ts#L79)*

Returns a native Date from the day's date string

**Returns:** *Date*
