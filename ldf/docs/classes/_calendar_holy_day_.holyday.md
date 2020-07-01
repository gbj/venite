[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/holy-day"](../modules/_calendar_holy_day_.md) › [HolyDay](_calendar_holy_day_.holyday.md)

# Class: HolyDay

## Hierarchy

* **HolyDay**

## Index

### Constructors

* [constructor](_calendar_holy_day_.holyday.md#constructor)

### Properties

* [color](_calendar_holy_day_.holyday.md#optional-color)
* [eve](_calendar_holy_day_.holyday.md#optional-eve)
* [evening](_calendar_holy_day_.holyday.md#optional-evening)
* [kalendar](_calendar_holy_day_.holyday.md#optional-kalendar)
* [mmdd](_calendar_holy_day_.holyday.md#optional-mmdd)
* [morning](_calendar_holy_day_.holyday.md#optional-morning)
* [name](_calendar_holy_day_.holyday.md#optional-name)
* [readings](_calendar_holy_day_.holyday.md#optional-readings)
* [season](_calendar_holy_day_.holyday.md#optional-season)
* [slug](_calendar_holy_day_.holyday.md#optional-slug)
* [stops_at_sunday](_calendar_holy_day_.holyday.md#optional-stops_at_sunday)
* [type](_calendar_holy_day_.holyday.md#optional-type)

## Constructors

###  constructor

\+ **new HolyDay**(`data`: Partial‹[HolyDay](_calendar_holy_day_.holyday.md)›): *[HolyDay](_calendar_holy_day_.holyday.md)*

*Defined in [calendar/holy-day.ts:59](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L59)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[HolyDay](_calendar_holy_day_.holyday.md)› | {} |

**Returns:** *[HolyDay](_calendar_holy_day_.holyday.md)*

## Properties

### `Optional` color

• **color**? : *[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) | string*

*Defined in [calendar/holy-day.ts:50](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L50)*

The [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) used for the day, or an identifying slug for the color that can be used to look it up

___

### `Optional` eve

• **eve**? : *undefined | false | true*

*Defined in [calendar/holy-day.ts:47](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L47)*

Optional: Identifies whether it is the Eve of ___

___

### `Optional` evening

• **evening**? : *[HolyDay](_calendar_holy_day_.holyday.md)*

*Defined in [calendar/holy-day.ts:59](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L59)*

Allows inclusion of alternate holy days for morning and evening. Used for transition from Christmas season to Epiphany on 1/5

___

### `Optional` kalendar

• **kalendar**? : *undefined | string*

*Defined in [calendar/holy-day.ts:13](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L13)*

Overarching calendar this is a part of

___

### `Optional` mmdd

• **mmdd**? : *undefined | string*

*Defined in [calendar/holy-day.ts:26](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L26)*

Optional: Identifies the month/date of the feast

**`example`** 
// Feb. 2, The Presentation
`'2/2'`

___

### `Optional` morning

• **morning**? : *[HolyDay](_calendar_holy_day_.holyday.md)*

*Defined in [calendar/holy-day.ts:56](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L56)*

Allows inclusion of alternate holy days for morning and evening. Used for transition from Christmas season to Epiphany on 1/5

___

### `Optional` name

• **name**? : *undefined | string*

*Defined in [calendar/holy-day.ts:32](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L32)*

Optional: Human-readable name of the feast

___

### `Optional` readings

• **readings**? : *undefined | string*

*Defined in [calendar/holy-day.ts:29](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L29)*

Optional: Slug used to find readings in the API, if different from `slug` property

___

### `Optional` season

• **season**? : *"Advent" | "Christmas" | "Epiphany" | "Lent" | "HolyWeek" | "Easter" | "Pentecost" | "Saints" | "OrdinaryTime"*

*Defined in [calendar/holy-day.ts:35](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L35)*

A machine-readable identifier for the liturgical season

___

### `Optional` slug

• **slug**? : *undefined | string*

*Defined in [calendar/holy-day.ts:10](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L10)*

An identifying slug for the day.

**`optional`** 
Not required for days that don't have their own propers.

**`example`** 
// Feb. 2, The Presentation
`'the-presentation'`

___

### `Optional` stops_at_sunday

• **stops_at_sunday**? : *undefined | string*

*Defined in [calendar/holy-day.ts:53](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L53)*

Slug of a [LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md) after which this is no longer observed. Used for weekdays after Epiphany.

___

### `Optional` type

• **type**? : *undefined | object*

*Defined in [calendar/holy-day.ts:16](https://github.com/gbj/venite/blob/e24bd0e/ldf/src/calendar/holy-day.ts#L16)*

Used to determine feast precedence in conflicts, from 1 (ferial weekday) to 5 (Feast of Our Lord)
