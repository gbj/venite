[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/liturgical-week"](../modules/_calendar_liturgical_week_.md) › [LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)

# Class: LiturgicalWeek

## Hierarchy

* **LiturgicalWeek**

## Index

### Constructors

* [constructor](_calendar_liturgical_week_.liturgicalweek.md#constructor)

### Properties

* [color](_calendar_liturgical_week_.liturgicalweek.md#color)
* [name](_calendar_liturgical_week_.liturgicalweek.md#name)
* [proper](_calendar_liturgical_week_.liturgicalweek.md#optional-proper)
* [season](_calendar_liturgical_week_.liturgicalweek.md#season)
* [slug](_calendar_liturgical_week_.liturgicalweek.md#slug)
* [week](_calendar_liturgical_week_.liturgicalweek.md#week)

## Constructors

###  constructor

\+ **new LiturgicalWeek**(`data`: Partial‹[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)›): *[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)*

*Defined in [calendar/liturgical-week.ts:40](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/liturgical-week.ts#L40)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)› | {} |

**Returns:** *[LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md)*

## Properties

###  color

• **color**: *[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md)*

*Defined in [calendar/liturgical-week.ts:37](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/liturgical-week.ts#L37)*

The [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) used for the week

___

###  name

• **name**: *string*

*Defined in [calendar/liturgical-week.ts:34](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/liturgical-week.ts#L34)*

A human-readable name for the week, in English

___

### `Optional` proper

• **proper**? : *[Proper](_calendar_proper_.proper.md)*

*Defined in [calendar/liturgical-week.ts:40](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/liturgical-week.ts#L40)*

The [Proper](_calendar_proper_.proper.md) (i.e., for weeks after Pentecost)

___

###  season

• **season**: *"Advent" | "Christmas" | "Epiphany" | "Lent" | "HolyWeek" | "Easter" | "Pentecost" | "Saints" | "OrdinaryTime"*

*Defined in [calendar/liturgical-week.ts:22](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/liturgical-week.ts#L22)*

A machine-readable identifier for the liturgical season

___

###  slug

• **slug**: *string*

*Defined in [calendar/liturgical-week.ts:11](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/liturgical-week.ts#L11)*

An identifying slug that distinguishes this week from all others

**`example`** 
// Week after the First Sunday after the Epiphany
'1st-epiphany'

___

###  week

• **week**: *number*

*Defined in [calendar/liturgical-week.ts:19](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/liturgical-week.ts#L19)*

Index within the seasonal cycle

**`example`** 
// Last Sunday after Pentecost = 0th week of Advent cycle
0
