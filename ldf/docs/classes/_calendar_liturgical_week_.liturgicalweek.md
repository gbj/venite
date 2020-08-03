[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/liturgical-week"](../modules/_calendar_liturgical_week_.md) › [LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)

# Class: LiturgicalWeek

## Hierarchy

* **LiturgicalWeek**

## Index

### Constructors

* [constructor](_calendar_liturgical_week_.liturgicalweek.md#constructor)

### Properties

* [color](_calendar_liturgical_week_.liturgicalweek.md#color)
* [cycle](_calendar_liturgical_week_.liturgicalweek.md#cycle)
* [kalendar](_calendar_liturgical_week_.liturgicalweek.md#optional-kalendar)
* [name](_calendar_liturgical_week_.liturgicalweek.md#name)
* [omit_the](_calendar_liturgical_week_.liturgicalweek.md#optional-omit_the)
* [proper](_calendar_liturgical_week_.liturgicalweek.md#optional-proper)
* [propers](_calendar_liturgical_week_.liturgicalweek.md#optional-propers)
* [season](_calendar_liturgical_week_.liturgicalweek.md#season)
* [slug](_calendar_liturgical_week_.liturgicalweek.md#slug)
* [week](_calendar_liturgical_week_.liturgicalweek.md#week)

## Constructors

###  constructor

\+ **new LiturgicalWeek**(`data`: Partial‹[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)›): *[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)*

*Defined in [calendar/liturgical-week.ts:56](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L56)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)› | {} |

**Returns:** *[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)*

## Properties

###  color

• **color**: *[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) | string*

*Defined in [calendar/liturgical-week.ts:50](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L50)*

The [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) used for the week

___

###  cycle

• **cycle**: *"Advent" | "Christmas" | "Epiphany" | "Easter"*

*Defined in [calendar/liturgical-week.ts:30](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L30)*

Seasonal cycle within which it falls

___

### `Optional` kalendar

• **kalendar**? : *undefined | string*

*Defined in [calendar/liturgical-week.ts:27](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L27)*

Overarching calendar this is a part of

___

###  name

• **name**: *string*

*Defined in [calendar/liturgical-week.ts:42](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L42)*

A human-readable name for the week, in English

___

### `Optional` omit_the

• **omit_the**? : *undefined | false | true* = false

*Defined in [calendar/liturgical-week.ts:47](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L47)*

Used for English-language formatting, generally when "week" name is the proper name of a Sunday.

**`example`** 
// "Thursday after Pentecost", not "Thursday after the Pentecost"

___

### `Optional` proper

• **proper**? : *undefined | number*

*Defined in [calendar/liturgical-week.ts:53](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L53)*

The proper (i.e., for weeks after Pentecost)

___

### `Optional` propers

• **propers**? : *undefined | string*

*Defined in [calendar/liturgical-week.ts:56](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L56)*

Optionally `slug` as an identifier for readings and collects

___

###  season

• **season**: *Seasons[number]*

*Defined in [calendar/liturgical-week.ts:39](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L39)*

A machine-readable identifier for the liturgical season

___

###  slug

• **slug**: *string*

*Defined in [calendar/liturgical-week.ts:24](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L24)*

An identifying slug that distinguishes this week from all others

**`example`** 
// Week after the First Sunday after the Epiphany
'1st-epiphany'

___

###  week

• **week**: *number*

*Defined in [calendar/liturgical-week.ts:36](https://github.com/gbj/venite/blob/ba3869d/ldf/src/calendar/liturgical-week.ts#L36)*

Index within the seasonal cycle

**`example`** 
// Last Sunday after Pentecost = 0th week of Advent cycle
0
