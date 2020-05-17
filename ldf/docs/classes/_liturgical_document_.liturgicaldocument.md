[@venite/ldf](../README.md) › [Globals](../globals.md) › ["liturgical-document"](../modules/_liturgical_document_.md) › [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

# Class: LiturgicalDocument

Represents a liturgy of any scope and concreteness, from a complete bullletin to a single prayer.

## Hierarchy

* **LiturgicalDocument**

  ↳ [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)

  ↳ [Heading](_heading_.heading.md)

  ↳ [Liturgy](_liturgy_liturgy_.liturgy.md)

  ↳ [Meditation](_meditation_.meditation.md)

  ↳ [Option](_option_.option.md)

  ↳ [Refrain](_refrain_.refrain.md)

  ↳ [Rubric](_rubric_.rubric.md)

  ↳ [Text](_text_.text.md)

  ↳ [Psalm](_psalm_.psalm.md)

  ↳ [BibleReading](_bible_reading_bible_reading_.biblereading.md)

## Index

### Constructors

* [constructor](_liturgical_document_.liturgicaldocument.md#constructor)

### Properties

* [api](_liturgical_document_.liturgicaldocument.md#api)
* [category](_liturgical_document_.liturgicaldocument.md#category)
* [citation](_liturgical_document_.liturgicaldocument.md#optional-citation)
* [condition](_liturgical_document_.liturgicaldocument.md#condition)
* [day](_liturgical_document_.liturgicaldocument.md#optional-day)
* [hidden](_liturgical_document_.liturgicaldocument.md#hidden)
* [id](_liturgical_document_.liturgicaldocument.md#optional-id)
* [label](_liturgical_document_.liturgicaldocument.md#label)
* [language](_liturgical_document_.liturgicaldocument.md#language)
* [metadata](_liturgical_document_.liturgicaldocument.md#optional-metadata)
* [revision_log](_liturgical_document_.liturgicaldocument.md#optional-revision_log)
* [sharing](_liturgical_document_.liturgicaldocument.md#optional-sharing)
* [slug](_liturgical_document_.liturgicaldocument.md#slug)
* [style](_liturgical_document_.liturgicaldocument.md#optional-style)
* [type](_liturgical_document_.liturgicaldocument.md#type)
* [uid](_liturgical_document_.liturgicaldocument.md#optional-uid)
* [value](_liturgical_document_.liturgicaldocument.md#value)
* [version](_liturgical_document_.liturgicaldocument.md#version)
* [version_label](_liturgical_document_.liturgicaldocument.md#optional-version_label)

### Methods

* [availableStyles](_liturgical_document_.liturgicaldocument.md#availablestyles)
* [availableTypes](_liturgical_document_.liturgicaldocument.md#availabletypes)
* [include](_liturgical_document_.liturgicaldocument.md#include)

## Constructors

###  constructor

\+ **new LiturgicalDocument**(`data`: Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)›): *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)*

*Defined in [liturgical-document.ts:136](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L136)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)› | {} |

**Returns:** *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)*

## Properties

###  api

• **api**: *string*

*Defined in [liturgical-document.ts:41](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L41)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *[Category](_category_.category.md)[]*

*Defined in [liturgical-document.ts:31](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L31)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | [Citation](_citation_citation_.citation.md)*

*Defined in [liturgical-document.ts:80](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L80)*

Source for the document, either as a string or a `Citation` object.

**`example`** 
`John 1:14`, { source: 'bcp1979', 'citation': 'p. 123' }

___

###  condition

• **condition**: *object*

*Defined in [liturgical-document.ts:34](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L34)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Defined in [liturgical-document.ts:91](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L91)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Defined in [liturgical-document.ts:102](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L102)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Defined in [liturgical-document.ts:19](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L19)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Defined in [liturgical-document.ts:56](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L56)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Defined in [liturgical-document.ts:68](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L68)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

### `Optional` metadata

• **metadata**? : *any*

*Defined in [liturgical-document.ts:97](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L97)*

Optional: Child classes can store any additional properties they need within the `metadata` object.

**`example`** 
{ response: 'Thanks be to God.' }

___

### `Optional` revision_log

• **revision_log**? : *[Change](_editing_change_.change.md)[]*

*Defined in [liturgical-document.ts:22](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L22)*

Array of changes to arrive at this document state. Important to collaborative editing.

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Defined in [liturgical-document.ts:44](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L44)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Defined in [liturgical-document.ts:50](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L50)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` style

• **style**? : *undefined | string*

*Defined in [liturgical-document.ts:28](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L28)*

An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style.

___

###  type

• **type**: *TypeTuple[number]*

*Defined in [liturgical-document.ts:25](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L25)*

Indicates the type of document

___

### `Optional` uid

• **uid**? : *undefined | string*

*Defined in [liturgical-document.ts:86](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L86)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)[] | [ResponsivePrayerLine](_responsive_prayer_.responsiveprayerline.md)[] | [BibleReadingVerse](_bible_reading_bible_reading_verse_.biblereadingverse.md)[] | [Heading](_heading_.heading.md)‹› | [PsalmVerse](_psalm_.psalmverse.md)‹›[][] | string[]*

*Defined in [liturgical-document.ts:105](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L105)*

The content of the document.

___

###  version

• **version**: *string*

*Defined in [liturgical-document.ts:74](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L74)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`

___

### `Optional` version_label

• **version_label**? : *undefined | string*

*Defined in [liturgical-document.ts:62](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L62)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:134](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L134)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:129](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L129)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Defined in [liturgical-document.ts:109](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L109)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
