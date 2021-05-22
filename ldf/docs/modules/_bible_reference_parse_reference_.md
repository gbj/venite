[@venite/ldf](../README.md) › [Globals](../globals.md) › ["bible-reference/parse-reference"](_bible_reference_parse_reference_.md)

# Module: "bible-reference/parse-reference"

## Index

### Type aliases

* [BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery)
* [BibleReferenceRange](_bible_reference_parse_reference_.md#biblereferencerange)

### Functions

* [book_name_to_book](_bible_reference_parse_reference_.md#book_name_to_book)
* [fillOut](_bible_reference_parse_reference_.md#fillout)
* [parseReference](_bible_reference_parse_reference_.md#parsereference)
* [parseSingleReference](_bible_reference_parse_reference_.md#parsesinglereference)
* [queryFromRe](_bible_reference_parse_reference_.md#queryfromre)

## Type aliases

###  BibleReferenceQuery

Ƭ **BibleReferenceQuery**: *object*

*Defined in [bible-reference/parse-reference.ts:5](https://github.com/gbj/venite/blob/0199ee4f/ldf/src/bible-reference/parse-reference.ts#L5)*

#### Type declaration:

* **book**: *[Book](../enums/_bible_reference_book_.book.md) | null*

* **chapter**: *number | null*

* **verse**: *number | null*

___

###  BibleReferenceRange

Ƭ **BibleReferenceRange**: *object*

*Defined in [bible-reference/parse-reference.ts:11](https://github.com/gbj/venite/blob/0199ee4f/ldf/src/bible-reference/parse-reference.ts#L11)*

#### Type declaration:

* **end**: *[BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) | null*

* **start**: *[BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery)*

## Functions

###  book_name_to_book

▸ **book_name_to_book**(`book_name`: string): *[Book](../enums/_bible_reference_book_.book.md) | null*

*Defined in [bible-reference/parse-reference.ts:105](https://github.com/gbj/venite/blob/0199ee4f/ldf/src/bible-reference/parse-reference.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`book_name` | string |

**Returns:** *[Book](../enums/_bible_reference_book_.book.md) | null*

___

###  fillOut

▸ **fillOut**(`query`: [BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) | null, `template`: [BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) | null): *[BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) | null*

*Defined in [bible-reference/parse-reference.ts:93](https://github.com/gbj/venite/blob/0199ee4f/ldf/src/bible-reference/parse-reference.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | [BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) &#124; null |
`template` | [BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) &#124; null |

**Returns:** *[BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) | null*

___

###  parseReference

▸ **parseReference**(`reference`: string): *[BibleReferenceRange](_bible_reference_parse_reference_.md#biblereferencerange)[]*

*Defined in [bible-reference/parse-reference.ts:16](https://github.com/gbj/venite/blob/0199ee4f/ldf/src/bible-reference/parse-reference.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`reference` | string |

**Returns:** *[BibleReferenceRange](_bible_reference_parse_reference_.md#biblereferencerange)[]*

___

###  parseSingleReference

▸ **parseSingleReference**(`reference`: string, `previous`: [BibleReferenceRange](_bible_reference_parse_reference_.md#biblereferencerange) | null): *[BibleReferenceRange](_bible_reference_parse_reference_.md#biblereferencerange)*

*Defined in [bible-reference/parse-reference.ts:27](https://github.com/gbj/venite/blob/0199ee4f/ldf/src/bible-reference/parse-reference.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`reference` | string |
`previous` | [BibleReferenceRange](_bible_reference_parse_reference_.md#biblereferencerange) &#124; null |

**Returns:** *[BibleReferenceRange](_bible_reference_parse_reference_.md#biblereferencerange)*

___

###  queryFromRe

▸ **queryFromRe**(`reference`: string, `re`: RegExp, `partial_structure`: boolean, `template`: [BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) | null): *[BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) | null*

*Defined in [bible-reference/parse-reference.ts:54](https://github.com/gbj/venite/blob/0199ee4f/ldf/src/bible-reference/parse-reference.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`reference` | string |
`re` | RegExp |
`partial_structure` | boolean |
`template` | [BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) &#124; null |

**Returns:** *[BibleReferenceQuery](_bible_reference_parse_reference_.md#biblereferencequery) | null*
