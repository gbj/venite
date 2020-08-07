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

*Defined in [calendar/holy-day.ts:51](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L51)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[HolyDay](_calendar_holy_day_.holyday.md)› | {} |

**Returns:** *[HolyDay](_calendar_holy_day_.holyday.md)*

## Properties

### `Optional` color

• **color**? : *[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) | string*

*Defined in [calendar/holy-day.ts:42](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L42)*

The [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) used for the day, or an identifying slug for the color that can be used to look it up

___

### `Optional` eve

• **eve**? : *undefined | false | true*

*Defined in [calendar/holy-day.ts:39](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L39)*

Optional: Identifies whether it is the Eve of ___

___

### `Optional` evening

• **evening**? : *[HolyDay](_calendar_holy_day_.holyday.md)*

*Defined in [calendar/holy-day.ts:51](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L51)*

Allows inclusion of alternate holy days for morning and evening. Used for transition from Christmas season to Epiphany on 1/5

___

### `Optional` kalendar

• **kalendar**? : *undefined | string*

*Defined in [calendar/holy-day.ts:14](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L14)*

Overarching calendar this is a part of

___

### `Optional` mmdd

• **mmdd**? : *undefined | string*

*Defined in [calendar/holy-day.ts:27](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L27)*

Optional: Identifies the month/date of the feast

**`example`** 
// Feb. 2, The Presentation
`'2/2'`

___

### `Optional` morning

• **morning**? : *[HolyDay](_calendar_holy_day_.holyday.md)*

*Defined in [calendar/holy-day.ts:48](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L48)*

Allows inclusion of alternate holy days for morning and evening. Used for transition from Christmas season to Epiphany on 1/5

___

### `Optional` name

• **name**? : *undefined | string*

*Defined in [calendar/holy-day.ts:33](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L33)*

Optional: Human-readable name of the feast

___

### `Optional` readings

• **readings**? : *undefined | string*

*Defined in [calendar/holy-day.ts:30](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L30)*

Optional: Slug used to find readings in the API, if different from `slug` property

___

### `Optional` season

• **season**? : *Seasons[number]*

*Defined in [calendar/holy-day.ts:36](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L36)*

A machine-readable identifier for the liturgical season

___

### `Optional` slug

• **slug**? : *undefined | string*

*Defined in [calendar/holy-day.ts:11](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L11)*

An identifying slug for the day.

**`optional`** 
Not required for days that don't have their own propers.

**`example`** 
// Feb. 2, The Presentation
`'the-presentation'`

___

### `Optional` stops_at_sunday

• **stops_at_sunday**? : *undefined | string*

*Defined in [calendar/holy-day.ts:45](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L45)*

Slug of a [LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md) after which this is no longer observed. Used for weekdays after Epiphany.

___

### `Optional` type

• **type**? : *undefined | object*

*Defined in [calendar/holy-day.ts:17](https://github.com/gbj/venite/blob/204eab7/ldf/src/calendar/holy-day.ts#L17)*

Used to determine feast precedence in conflicts, from 1 (ferial weekday) to 5 (Feast of Our Lord)
