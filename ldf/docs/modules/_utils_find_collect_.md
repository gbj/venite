[@venite/ldf](../README.md) › [Globals](../globals.md) › ["utils/find-collect"](_utils_find_collect_.md)

# Module: "utils/find-collect"

## Index

### Variables

* [FAKE_SEASONS](_utils_find_collect_.md#const-fake_seasons)

### Functions

* [findCollect](_utils_find_collect_.md#findcollect)
* [processCollectText](_utils_find_collect_.md#processcollecttext)

## Variables

### `Const` FAKE_SEASONS

• **FAKE_SEASONS**: *string[]* = ['Saints', 'Mary']

*Defined in [utils/find-collect.ts:8](https://github.com/gbj/venite/blob/a5a4cc2/ldf/src/utils/find-collect.ts#L8)*

## Functions

###  findCollect

▸ **findCollect**(`collects`: [LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[], `day`: [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md), `sundayFirst`: boolean, `emberDayPrecedesSunday`: boolean): *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md) | null*

*Defined in [utils/find-collect.ts:11](https://github.com/gbj/venite/blob/a5a4cc2/ldf/src/utils/find-collect.ts#L11)*

Given a set of all possible collects and a `LiturgicalDay`, returns a `LiturgicalDocument` of the correct collect or sequence of collects

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collects` | [LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[] | - |
`day` | [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md) | - |
`sundayFirst` | boolean | true |
`emberDayPrecedesSunday` | boolean | false |

**Returns:** *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md) | null*

___

###  processCollectText

▸ **processCollectText**(`collect`: [Text](../classes/_text_.text.md), `day`: [HolyDay](../classes/_calendar_holy_day_.holyday.md)): *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)*

*Defined in [utils/find-collect.ts:75](https://github.com/gbj/venite/blob/a5a4cc2/ldf/src/utils/find-collect.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`collect` | [Text](../classes/_text_.text.md) |
`day` | [HolyDay](../classes/_calendar_holy_day_.holyday.md) |

**Returns:** *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)*
