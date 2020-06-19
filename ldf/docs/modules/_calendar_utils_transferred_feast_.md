[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/utils/transferred-feast"](_calendar_utils_transferred_feast_.md)

# Module: "calendar/utils/transferred-feast"

## Index

### Functions

* [isEmpty](_calendar_utils_transferred_feast_.md#isempty)
* [transferredFeast](_calendar_utils_transferred_feast_.md#transferredfeast)

## Functions

###  isEmpty

▸ **isEmpty**(`isSunday`: boolean, `special`: [HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined, `feast`: [HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined): *boolean*

*Defined in [calendar/utils/transferred-feast.ts:104](https://github.com/gbj/venite/blob/461bbe8/ldf/src/calendar/utils/transferred-feast.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`isSunday` | boolean |
`special` | [HolyDay](../classes/_calendar_holy_day_.holyday.md) &#124; undefined |
`feast` | [HolyDay](../classes/_calendar_holy_day_.holyday.md) &#124; undefined |

**Returns:** *boolean*

___

###  transferredFeast

▸ **transferredFeast**(`liturgicalDayFinder`: function, `specialDayFinder`: function, `feastDayFinder`: function, `todayDate`: Date, `acc`: [HolyDay](../classes/_calendar_holy_day_.holyday.md)[], `openDays`: [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md)[], `originalDay`: [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md) | undefined): *[HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined*

*Defined in [calendar/utils/transferred-feast.ts:6](https://github.com/gbj/venite/blob/461bbe8/ldf/src/calendar/utils/transferred-feast.ts#L6)*

**Parameters:**

▪ **liturgicalDayFinder**: *function*

▸ (`d`: Date): *[LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | Date |

▪ **specialDayFinder**: *function*

▸ (`slug`: string): *[HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`slug` | string |

▪ **feastDayFinder**: *function*

▸ (`d`: Date): *[HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`d` | Date |

▪ **todayDate**: *Date*

▪`Default value`  **acc**: *[HolyDay](../classes/_calendar_holy_day_.holyday.md)[]*= []

▪`Default value`  **openDays**: *[LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md)[]*= []

▪`Default value`  **originalDay**: *[LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md) | undefined*= undefined

**Returns:** *[HolyDay](../classes/_calendar_holy_day_.holyday.md) | undefined*
