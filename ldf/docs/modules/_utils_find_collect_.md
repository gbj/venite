[@venite/ldf](../README.md) › [Globals](../globals.md) › ["utils/find-collect"](_utils_find_collect_.md)

# Module: "utils/find-collect"

## Index

### Variables

* [FAKE_SEASONS](_utils_find_collect_.md#const-fake_seasons)

### Functions

* [filterMultiple](_utils_find_collect_.md#filtermultiple)
* [findCollect](_utils_find_collect_.md#findcollect)
* [processCollectText](_utils_find_collect_.md#processcollecttext)

## Variables

### `Const` FAKE_SEASONS

• **FAKE_SEASONS**: *string[]* = ['Saints', 'Mary']

*Defined in [utils/find-collect.ts:9](https://github.com/gbj/venite/blob/8fe09e24/ldf/src/utils/find-collect.ts#L9)*

## Functions

###  filterMultiple

▸ **filterMultiple**(`collects`: [LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[], `allowMultiple`: boolean): *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[]*

*Defined in [utils/find-collect.ts:100](https://github.com/gbj/venite/blob/8fe09e24/ldf/src/utils/find-collect.ts#L100)*

**Parameters:**

Name | Type |
------ | ------ |
`collects` | [LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[] |
`allowMultiple` | boolean |

**Returns:** *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[]*

___

###  findCollect

▸ **findCollect**(`collects`: [LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[], `day`: [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md), `sundayFirst`: boolean, `emberDayPrecedesSunday`: boolean, `allSaintsSuppressesCollectOfTheDayUnlessSunday`: boolean, `allSaintsOctaveSuppressesCollectOfTheDayUnlessSunday`: boolean, `allowMultiple`: boolean): *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md) | null*

*Defined in [utils/find-collect.ts:12](https://github.com/gbj/venite/blob/8fe09e24/ldf/src/utils/find-collect.ts#L12)*

Given a set of all possible collects and a `LiturgicalDay`, returns a `LiturgicalDocument` of the correct collect or sequence of collects

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collects` | [LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[] | - |
`day` | [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md) | - |
`sundayFirst` | boolean | true |
`emberDayPrecedesSunday` | boolean | false |
`allSaintsSuppressesCollectOfTheDayUnlessSunday` | boolean | false |
`allSaintsOctaveSuppressesCollectOfTheDayUnlessSunday` | boolean | false |
`allowMultiple` | boolean | true |

**Returns:** *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md) | null*

___

###  processCollectText

▸ **processCollectText**(`collect`: [Text](../classes/_text_.text.md), `day`: [HolyDay](../classes/_calendar_holy_day_.holyday.md)): *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)*

*Defined in [utils/find-collect.ts:108](https://github.com/gbj/venite/blob/8fe09e24/ldf/src/utils/find-collect.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`collect` | [Text](../classes/_text_.text.md) |
`day` | [HolyDay](../classes/_calendar_holy_day_.holyday.md) |

**Returns:** *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)*
