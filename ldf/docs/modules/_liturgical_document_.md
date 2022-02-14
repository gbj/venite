[@venite/ldf](../README.md) › [Globals](../globals.md) › ["liturgical-document"](_liturgical_document_.md)

# Module: "liturgical-document"

## Index

### Enumerations

* [Responsive](../enums/_liturgical_document_.responsive.md)

### Classes

* [LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)

### Type aliases

* [DisplayFormat](_liturgical_document_.md#displayformat)
* [DisplayFormatTuple](_liturgical_document_.md#displayformattuple)
* [Lookup](_liturgical_document_.md#lookup)
* [LookupTypeTuple](_liturgical_document_.md#lookuptypetuple)
* [TypeTuple](_liturgical_document_.md#typetuple)
* [Value](_liturgical_document_.md#value)
* [ValuePiece](_liturgical_document_.md#valuepiece)

### Variables

* [DISPLAY_FORMATS](_liturgical_document_.md#const-display_formats)
* [LOOKUP_TYPES](_liturgical_document_.md#const-lookup_types)
* [TYPES](_liturgical_document_.md#const-types)

## Type aliases

###  DisplayFormat

Ƭ **DisplayFormat**: *DisplayFormatTuple[number]*

*Defined in [liturgical-document.ts:70](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L70)*

___

###  DisplayFormatTuple

Ƭ **DisplayFormatTuple**: *typeof DISPLAY_FORMATS*

*Defined in [liturgical-document.ts:69](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L69)*

___

###  Lookup

Ƭ **Lookup**: *object*

*Defined in [liturgical-document.ts:37](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L37)*

#### Type declaration:

* **allow_multiple**? : *undefined | false | true*

* **filter**? : *"seasonal" | "evening" | "day"*

* **item**? : *string | number | object*

* **random**? : *undefined | false | true*

* **rotate**? : *undefined | false | true*

* **table**? : *string | object*

* **type**: *LookupTypeTuple[number]*

___

###  LookupTypeTuple

Ƭ **LookupTypeTuple**: *typeof LOOKUP_TYPES*

*Defined in [liturgical-document.ts:35](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L35)*

___

###  TypeTuple

Ƭ **TypeTuple**: *typeof TYPES*

*Defined in [liturgical-document.ts:32](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L32)*

___

###  Value

Ƭ **Value**: *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md)[] | [ResponsivePrayerLine](../classes/_responsive_prayer_.responsiveprayerline.md)[] | ([BibleReadingVerse](../classes/_bible_reading_bible_reading_verse_.biblereadingverse.md)‹› | [Heading](../classes/_heading_.heading.md)‹›)[] | [PsalmSection](../classes/_psalm_.psalmsection.md)[] | string[]*

*Defined in [liturgical-document.ts:54](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L54)*

___

###  ValuePiece

Ƭ **ValuePiece**: *[LiturgicalDocument](../classes/_liturgical_document_.liturgicaldocument.md) | [ResponsivePrayerLine](../classes/_responsive_prayer_.responsiveprayerline.md) | [BibleReadingVerse](../classes/_bible_reading_bible_reading_verse_.biblereadingverse.md) | [Heading](../classes/_heading_.heading.md) | [PsalmSection](../classes/_psalm_.psalmsection.md) | string*

*Defined in [liturgical-document.ts:60](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L60)*

## Variables

### `Const` DISPLAY_FORMATS

• **DISPLAY_FORMATS**: *string[]* = ['default', 'omit', 'unison', 'abbreviated', 'force_dropcap']

*Defined in [liturgical-document.ts:68](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L68)*

___

### `Const` LOOKUP_TYPES

• **LOOKUP_TYPES**: *string[]* = ['lectionary', 'canticle', 'category', 'slug', 'collect']

*Defined in [liturgical-document.ts:34](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L34)*

___

### `Const` TYPES

• **TYPES**: *["liturgy", "heading", "option", "refrain", "rubric", "text", "responsive", "bible-reading", "psalm", "meditation", "image", "parallel"]* = [
  'liturgy',
  'heading',
  'option',
  'refrain',
  'rubric',
  'text',
  'responsive',
  'bible-reading',
  'psalm',
  'meditation',
  'image',
  'parallel',
] as const

*Defined in [liturgical-document.ts:18](https://github.com/gbj/venite/blob/53f452a3/ldf/src/liturgical-document.ts#L18)*
