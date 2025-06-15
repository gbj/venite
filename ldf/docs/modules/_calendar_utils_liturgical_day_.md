[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/utils/liturgical-day"](_calendar_utils_liturgical_day_.md)

# Module: "calendar/utils/liturgical-day"

## Index

### Variables

* [WEEKDAYS](_calendar_utils_liturgical_day_.md#const-weekdays)

### Functions

* [buildDaySlug](_calendar_utils_liturgical_day_.md#builddayslug)
* [liturgicalDay](_calendar_utils_liturgical_day_.md#liturgicalday)

## Variables

### `Const` WEEKDAYS

• **WEEKDAYS**: *string[]* = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

*Defined in [calendar/utils/liturgical-day.ts:7](https://github.com/gbj/venite/blob/8f2e173a/ldf/src/calendar/utils/liturgical-day.ts#L7)*

## Functions

###  buildDaySlug

▸ **buildDaySlug**(`date`: Date, `slug`: string): *string*

*Defined in [calendar/utils/liturgical-day.ts:37](https://github.com/gbj/venite/blob/8f2e173a/ldf/src/calendar/utils/liturgical-day.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |
`slug` | string |

**Returns:** *string*

___

###  liturgicalDay

▸ **liturgicalDay**(`date`: Date, `kalendar`: string, `evening`: boolean, `week`: [LiturgicalWeek](../classes/_calendar_liturgical_week_.liturgicalweek.md)): *[LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md)*

*Defined in [calendar/utils/liturgical-day.ts:10](https://github.com/gbj/venite/blob/8f2e173a/ldf/src/calendar/utils/liturgical-day.ts#L10)*

Returns the `LiturgicalDay` that a given `Date` falls on

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`date` | Date | - |
`kalendar` | string | - |
`evening` | boolean | false |
`week` | [LiturgicalWeek](../classes/_calendar_liturgical_week_.liturgicalweek.md) | - |

**Returns:** *[LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md)*
