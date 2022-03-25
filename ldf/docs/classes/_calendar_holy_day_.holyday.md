[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/holy-day"](../modules/_calendar_holy_day_.md) › [HolyDay](_calendar_holy_day_.holyday.md)

# Class: HolyDay

## Hierarchy

* **HolyDay**

## Index

### Constructors

* [constructor](_calendar_holy_day_.holyday.md#constructor)

### Properties

* [bio](_calendar_holy_day_.holyday.md#optional-bio)
* [category](_calendar_holy_day_.holyday.md#optional-category)
* [collect](_calendar_holy_day_.holyday.md#optional-collect)
* [color](_calendar_holy_day_.holyday.md#optional-color)
* [eve](_calendar_holy_day_.holyday.md#optional-eve)
* [evening](_calendar_holy_day_.holyday.md#optional-evening)
* [image](_calendar_holy_day_.holyday.md#optional-image)
* [imageURL](_calendar_holy_day_.holyday.md#optional-imageurl)
* [kalendar](_calendar_holy_day_.holyday.md#optional-kalendar)
* [mmdd](_calendar_holy_day_.holyday.md#optional-mmdd)
* [morning](_calendar_holy_day_.holyday.md#optional-morning)
* [name](_calendar_holy_day_.holyday.md#optional-name)
* [octave](_calendar_holy_day_.holyday.md#optional-octave)
* [readings](_calendar_holy_day_.holyday.md#optional-readings)
* [season](_calendar_holy_day_.holyday.md#optional-season)
* [slug](_calendar_holy_day_.holyday.md#optional-slug)
* [stops_at_sunday](_calendar_holy_day_.holyday.md#optional-stops_at_sunday)
* [subtitle](_calendar_holy_day_.holyday.md#optional-subtitle)
* [type](_calendar_holy_day_.holyday.md#optional-type)

## Constructors

###  constructor

\+ **new HolyDay**(`data`: Partial‹[HolyDay](_calendar_holy_day_.holyday.md)›): *[HolyDay](_calendar_holy_day_.holyday.md)*

*Defined in [calendar/holy-day.ts:75](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L75)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[HolyDay](_calendar_holy_day_.holyday.md)› | {} |

**Returns:** *[HolyDay](_calendar_holy_day_.holyday.md)*

## Properties

### `Optional` bio

• **bio**? : *string[]*

*Defined in [calendar/holy-day.ts:14](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L14)*

Optional hagiography

___

### `Optional` category

• **category**? : *string[]*

*Defined in [calendar/holy-day.ts:54](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L54)*

Categories for this feast that are not liturgical seasons

**`example`** 
["Bishop", "Martyr"]

___

### `Optional` collect

• **collect**? : *undefined | string*

*Defined in [calendar/holy-day.ts:36](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L36)*

Optional: Slug used to find collect in the API, if different from `slug` property

___

### `Optional` color

• **color**? : *[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) | string*

*Defined in [calendar/holy-day.ts:60](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L60)*

The [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md) used for the day, or an identifying slug for the color that can be used to look it up

___

### `Optional` eve

• **eve**? : *undefined | false | true*

*Defined in [calendar/holy-day.ts:57](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L57)*

Optional: Identifies whether it is the Eve of ___

___

### `Optional` evening

• **evening**? : *[HolyDay](_calendar_holy_day_.holyday.md)*

*Defined in [calendar/holy-day.ts:69](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L69)*

Allows inclusion of alternate holy days for morning and evening. Used for transition from Christmas season to Epiphany on 1/5

___

### `Optional` image

• **image**? : *undefined | string*

*Defined in [calendar/holy-day.ts:72](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L72)*

URL for an image of an icon for the day

___

### `Optional` imageURL

• **imageURL**? : *undefined | string*

*Defined in [calendar/holy-day.ts:75](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L75)*

Citation URL for an image

___

### `Optional` kalendar

• **kalendar**? : *undefined | string*

*Defined in [calendar/holy-day.ts:17](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L17)*

Overarching calendar this is a part of

___

### `Optional` mmdd

• **mmdd**? : *undefined | string*

*Defined in [calendar/holy-day.ts:30](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L30)*

Optional: Identifies the month/date of the feast

**`example`** 
// Feb. 2, The Presentation
`'2/2'`

___

### `Optional` morning

• **morning**? : *[HolyDay](_calendar_holy_day_.holyday.md)*

*Defined in [calendar/holy-day.ts:66](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L66)*

Allows inclusion of alternate holy days for morning and evening. Used for transition from Christmas season to Epiphany on 1/5

___

### `Optional` name

• **name**? : *undefined | string*

*Defined in [calendar/holy-day.ts:39](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L39)*

Optional: Human-readable name of the feast

___

### `Optional` octave

• **octave**? : *string | undefined*

*Defined in [calendar/holy-day.ts:48](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L48)*

A machine-readable identifier day within the octave of which a day falls

___

### `Optional` readings

• **readings**? : *undefined | string*

*Defined in [calendar/holy-day.ts:33](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L33)*

Optional: Slug used to find readings in the API, if different from `slug` property

___

### `Optional` season

• **season**? : *Seasons[number]*

*Defined in [calendar/holy-day.ts:45](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L45)*

A machine-readable identifier for the liturgical season

___

### `Optional` slug

• **slug**? : *undefined | string*

*Defined in [calendar/holy-day.ts:11](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L11)*

An identifying slug for the day.

**`optional`** 
Not required for days that don't have their own propers.

**`example`** 
// Feb. 2, The Presentation
`'the-presentation'`

___

### `Optional` stops_at_sunday

• **stops_at_sunday**? : *undefined | string*

*Defined in [calendar/holy-day.ts:63](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L63)*

Slug of a [LiturgicalWeek](_calendar_liturgical_week_.liturgicalweek.md) after which this is no longer observed. Used for weekdays after Epiphany.

___

### `Optional` subtitle

• **subtitle**? : *undefined | string*

*Defined in [calendar/holy-day.ts:42](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L42)*

Optional: Human-readable subtitle of the feast

___

### `Optional` type

• **type**? : *undefined | object*

*Defined in [calendar/holy-day.ts:20](https://github.com/gbj/venite/blob/9b89f1d2/ldf/src/calendar/holy-day.ts#L20)*

Used to determine feast precedence in conflicts, from 1 (ferial weekday) to 5 (Feast of Our Lord)
