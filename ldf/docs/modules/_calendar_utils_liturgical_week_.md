[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/utils/liturgical-week"](_calendar_utils_liturgical_week_.md)

# Module: "calendar/utils/liturgical-week"

## Index

### Interfaces

* [LiturgicalWeekIndex](../interfaces/_calendar_utils_liturgical_week_.liturgicalweekindex.md)

### Variables

* [ONE_WEEK](_calendar_utils_liturgical_week_.md#const-one_week)

### Functions

* [calculateProper](_calendar_utils_liturgical_week_.md#calculateproper)
* [christmasCycleWeek](_calendar_utils_liturgical_week_.md#christmascycleweek)
* [closerThan](_calendar_utils_liturgical_week_.md#closerthan)
* [easterCycleWeek](_calendar_utils_liturgical_week_.md#eastercycleweek)
* [liturgicalWeek](_calendar_utils_liturgical_week_.md#liturgicalweek)
* [weeksFromEaster](_calendar_utils_liturgical_week_.md#weeksfromeaster)

## Variables

### `Const` ONE_WEEK

• **ONE_WEEK**: *number* = 7*24*60*60*1000

*Defined in [calendar/utils/liturgical-week.ts:8](https://github.com/gbj/venite/blob/e99767c/ldf/src/calendar/utils/liturgical-week.ts#L8)*

## Functions

###  calculateProper

▸ **calculateProper**(`date`: Date): *number | undefined*

*Defined in [calendar/utils/liturgical-week.ts:48](https://github.com/gbj/venite/blob/e99767c/ldf/src/calendar/utils/liturgical-week.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *number | undefined*

___

###  christmasCycleWeek

▸ **christmasCycleWeek**(`d`: Date): *[LiturgicalWeekIndex](../interfaces/_calendar_utils_liturgical_week_.liturgicalweekindex.md)*

*Defined in [calendar/utils/liturgical-week.ts:71](https://github.com/gbj/venite/blob/e99767c/ldf/src/calendar/utils/liturgical-week.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | Date |

**Returns:** *[LiturgicalWeekIndex](../interfaces/_calendar_utils_liturgical_week_.liturgicalweekindex.md)*

___

###  closerThan

▸ **closerThan**(`date`: Date, `mmdd1`: string, `mmdd2`: string): *boolean*

*Defined in [calendar/utils/liturgical-week.ts:60](https://github.com/gbj/venite/blob/e99767c/ldf/src/calendar/utils/liturgical-week.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |
`mmdd1` | string |
`mmdd2` | string |

**Returns:** *boolean*

___

###  easterCycleWeek

▸ **easterCycleWeek**(`date`: Date): *[LiturgicalWeekIndex](../interfaces/_calendar_utils_liturgical_week_.liturgicalweekindex.md)*

*Defined in [calendar/utils/liturgical-week.ts:34](https://github.com/gbj/venite/blob/e99767c/ldf/src/calendar/utils/liturgical-week.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *[LiturgicalWeekIndex](../interfaces/_calendar_utils_liturgical_week_.liturgicalweekindex.md)*

___

###  liturgicalWeek

▸ **liturgicalWeek**(`d`: Date): *[LiturgicalWeekIndex](../interfaces/_calendar_utils_liturgical_week_.liturgicalweekindex.md)*

*Defined in [calendar/utils/liturgical-week.ts:17](https://github.com/gbj/venite/blob/e99767c/ldf/src/calendar/utils/liturgical-week.ts#L17)*

Returns the cycle and week offset that a given `Date` falls in

**Parameters:**

Name | Type |
------ | ------ |
`d` | Date |

**Returns:** *[LiturgicalWeekIndex](../interfaces/_calendar_utils_liturgical_week_.liturgicalweekindex.md)*

___

###  weeksFromEaster

▸ **weeksFromEaster**(`date`: Date): *number*

*Defined in [calendar/utils/liturgical-week.ts:44](https://github.com/gbj/venite/blob/e99767c/ldf/src/calendar/utils/liturgical-week.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *number*
