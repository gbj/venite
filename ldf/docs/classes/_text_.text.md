[@venite/ldf](../README.md) › [Globals](../globals.md) › ["text"](../modules/_text_.md) › [Text](_text_.text.md)

# Class: Text

Text represents collect or any other short prayer.

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **Text**

## Index

### Constructors

* [constructor](_text_.text.md#constructor)

### Properties

* [api](_text_.text.md#api)
* [category](_text_.text.md#category)
* [citation](_text_.text.md#optional-citation)
* [condition](_text_.text.md#condition)
* [day](_text_.text.md#optional-day)
* [hidden](_text_.text.md#hidden)
* [id](_text_.text.md#optional-id)
* [label](_text_.text.md#label)
* [language](_text_.text.md#language)
* [metadata](_text_.text.md#optional-metadata)
* [sharing](_text_.text.md#optional-sharing)
* [slug](_text_.text.md#slug)
* [style](_text_.text.md#style)
* [type](_text_.text.md#type)
* [uid](_text_.text.md#optional-uid)
* [value](_text_.text.md#value)
* [version](_text_.text.md#version)
* [version_label](_text_.text.md#optional-version_label)

### Methods

* [include](_text_.text.md#include)

## Constructors

###  constructor

\+ **new Text**(`data`: Partial‹[Text](_text_.text.md)›): *[Text](_text_.text.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [text.ts:10](https://github.com/gbj/venite/blob/f982f6c/ldf/src/text.ts#L10)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Text](_text_.text.md)› | {} |

**Returns:** *[Text](_text_.text.md)*

## Properties

###  api

• **api**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#api)*

*Defined in [liturgical-document.ts:34](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L34)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *[Category](_category_.category.md)[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:24](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L24)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | [Citation](_citation_citation_.citation.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:73](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L73)*

Source for the document, either as a string or a `Citation` object.

**`example`** 
`John 1:14`, { source: 'bcp1979', 'citation': 'p. 123' }

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:27](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L27)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:84](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L84)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:95](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L95)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:15](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L15)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:49](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L49)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:61](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L61)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

### `Optional` metadata

• **metadata**? : *undefined | object*

*Overrides [Refrain](_refrain_.refrain.md).[metadata](_refrain_.refrain.md#optional-metadata)*

*Defined in [text.ts:8](https://github.com/gbj/venite/blob/f982f6c/ldf/src/text.ts#L8)*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:37](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L37)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:43](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L43)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

###  style

• **style**: *"text" | "prayer"*

*Overrides [Heading](_heading_.heading.md).[style](_heading_.heading.md#optional-style)*

*Defined in [text.ts:6](https://github.com/gbj/venite/blob/f982f6c/ldf/src/text.ts#L6)*

___

###  type

• **type**: *"text"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [text.ts:5](https://github.com/gbj/venite/blob/f982f6c/ldf/src/text.ts#L5)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:79](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L79)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *string[]*

*Overrides [Heading](_heading_.heading.md).[value](_heading_.heading.md#value)*

*Defined in [text.ts:7](https://github.com/gbj/venite/blob/f982f6c/ldf/src/text.ts#L7)*

___

###  version

• **version**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:67](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L67)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`

___

### `Optional` version_label

• **version_label**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:55](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L55)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:102](https://github.com/gbj/venite/blob/f982f6c/ldf/src/liturgical-document.ts#L102)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
