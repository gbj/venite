[@venite/ldf](../README.md) › [Globals](../globals.md) › ["utils/find-collect"](_utils_find_collect_.md)

# Module: "utils/find-collect"

## Index

### Functions

* [findCollect](_utils_find_collect_.md#findcollect)
* [processCollectText](_utils_find_collect_.md#processcollecttext)

## Functions

###  findCollect

▸ **findCollect**(`collects`: [LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[], `day`: [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md), `sundayFirst`: boolean): *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md) | null*

*Defined in [utils/find-collect.ts:9](https://github.com/gbj/venite/blob/390b340/ldf/src/utils/find-collect.ts#L9)*

Given a set of all possible collects and a `LiturgicalDay`, returns a `LiturgicalDocument` of the correct collect or sequence of collects

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`collects` | [LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[] | - |
`day` | [LiturgicalDay](../classes/_calendar_liturgical_day_.liturgicalday.md) | - |
`sundayFirst` | boolean | true |

**Returns:** *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md) | null*

___

###  processCollectText

▸ **processCollectText**(`collect`: [Text](../classes/_text_.text.md), `day`: [HolyDay](../classes/_calendar_holy_day_.holyday.md)): *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)*

*Defined in [utils/find-collect.ts:50](https://github.com/gbj/venite/blob/390b340/ldf/src/utils/find-collect.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`collect` | [Text](../classes/_text_.text.md) |
`day` | [HolyDay](../classes/_calendar_holy_day_.holyday.md) |

**Returns:** *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)*
