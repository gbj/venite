[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/utils/transferred-feast"](_calendar_utils_transferred_feast_.md)

# Module: "calendar/utils/transferred-feast"

## Index

### Functions

* [isEmpty](_calendar_utils_transferred_feast_.md#isempty)
* [transferredFeast](_calendar_utils_transferred_feast_.md#transferredfeast)

## Functions

###  isEmpty

▸ **isEmpty**(`forFeast`: [HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined, `isSunday`: boolean, `special`: [HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined, `feast`: [HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined): *boolean*

*Defined in [calendar/utils/transferred-feast.ts:143](https://github.com/gbj/venite/blob/b674975c/ldf/src/calendar/utils/transferred-feast.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`forFeast` | [HolyDay](../classes/_calendar_holy_day_.holyday.md) &#124; undefined |
`isSunday` | boolean |
`special` | [HolyDay](../classes/_calendar_holy_day_.holyday.md) &#124; undefined |
`feast` | [HolyDay](../classes/_calendar_holy_day_.holyday.md) &#124; undefined |

**Returns:** *boolean*

___

###  transferredFeast

▸ **transferredFeast**(`liturgicalDayFinder`: function, `specialDayFinder`: function, `feastDayFinder`: function, `todayDate`: Date, `acc`: [HolyDay](../classes/_calendar_holy_day_.holyday.md)[], `openDays`: [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md)[], `originalDay`: [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md) | undefined): *Promise‹[HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined›*

*Defined in [calendar/utils/transferred-feast.ts:6](https://github.com/gbj/venite/blob/b674975c/ldf/src/calendar/utils/transferred-feast.ts#L6)*

**Parameters:**

▪ **liturgicalDayFinder**: *function*

▸ (`d`: Date): *Promise‹[LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md)›*

**Parameters:**

Name | Type |
------ | ------ |
`d` | Date |

▪ **specialDayFinder**: *function*

▸ (`slug`: string): *Promise‹[HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined›*

**Parameters:**

Name | Type |
------ | ------ |
`slug` | string |

▪ **feastDayFinder**: *function*

▸ (`d`: Date): *Promise‹[HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined›*

**Parameters:**

Name | Type |
------ | ------ |
`d` | Date |

▪ **todayDate**: *Date*

▪`Default value`  **acc**: *[HolyDay](../classes/_calendar_holy_day_.holyday.md)[]*= []

▪`Default value`  **openDays**: *[LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md)[]*= []

▪`Default value`  **originalDay**: *[LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md) | undefined*= undefined

**Returns:** *Promise‹[HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined›*
