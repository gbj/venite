[@venite/ldf](../README.md) › [Globals](../globals.md) › ["bible-reading/bible-reading"](../modules/_bible_reading_bible_reading_.md) › [BibleReading](_bible_reading_bible_reading_.biblereading.md)

# Class: BibleReading

BibleReading represents liturgical instructions.

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **BibleReading**

## Index

### Constructors

* [constructor](_bible_reading_bible_reading_.biblereading.md#constructor)

### Properties

* [api](_bible_reading_bible_reading_.biblereading.md#optional-api)
* [category](_bible_reading_bible_reading_.biblereading.md#category)
* [citation](_bible_reading_bible_reading_.biblereading.md#citation)
* [condition](_bible_reading_bible_reading_.biblereading.md#condition)
* [day](_bible_reading_bible_reading_.biblereading.md#optional-day)
* [hidden](_bible_reading_bible_reading_.biblereading.md#hidden)
* [id](_bible_reading_bible_reading_.biblereading.md#optional-id)
* [label](_bible_reading_bible_reading_.biblereading.md#label)
* [language](_bible_reading_bible_reading_.biblereading.md#language)
* [lastRevision](_bible_reading_bible_reading_.biblereading.md#lastrevision)
* [lookup](_bible_reading_bible_reading_.biblereading.md#optional-lookup)
* [metadata](_bible_reading_bible_reading_.biblereading.md#optional-metadata)
* [sharing](_bible_reading_bible_reading_.biblereading.md#optional-sharing)
* [slug](_bible_reading_bible_reading_.biblereading.md#slug)
* [source](_bible_reading_bible_reading_.biblereading.md#optional-source)
* [style](_bible_reading_bible_reading_.biblereading.md#style)
* [type](_bible_reading_bible_reading_.biblereading.md#type)
* [uid](_bible_reading_bible_reading_.biblereading.md#optional-uid)
* [value](_bible_reading_bible_reading_.biblereading.md#value)
* [version](_bible_reading_bible_reading_.biblereading.md#version)
* [version_label](_bible_reading_bible_reading_.biblereading.md#optional-version_label)

### Methods

* [abbrevFromCitation](_bible_reading_bible_reading_.biblereading.md#abbrevfromcitation)
* [availableLookupTypes](_bible_reading_bible_reading_.biblereading.md#availablelookuptypes)
* [availableStyles](_bible_reading_bible_reading_.biblereading.md#availablestyles)
* [availableTypes](_bible_reading_bible_reading_.biblereading.md#availabletypes)
* [bookCodeFromAbbrev](_bible_reading_bible_reading_.biblereading.md#bookcodefromabbrev)
* [compileIntro](_bible_reading_bible_reading_.biblereading.md#compileintro)
* [include](_bible_reading_bible_reading_.biblereading.md#include)
* [longNameFromBookCode](_bible_reading_bible_reading_.biblereading.md#longnamefrombookcode)
* [shortNameFromBookCode](_bible_reading_bible_reading_.biblereading.md#shortnamefrombookcode)

## Constructors

###  constructor

\+ **new BibleReading**(`data`: Partial‹[BibleReading](_bible_reading_bible_reading_.biblereading.md)›): *[BibleReading](_bible_reading_bible_reading_.biblereading.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [bible-reading/bible-reading.ts:113](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L113)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[BibleReading](_bible_reading_bible_reading_.biblereading.md)› | {} |

**Returns:** *[BibleReading](_bible_reading_bible_reading_.biblereading.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:51](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L51)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:41](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L41)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

###  citation

• **citation**: *string*

*Overrides [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [bible-reading/bible-reading.ts:14](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L14)*

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:44](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L44)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:108](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L108)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:119](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L119)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:32](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L32)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:69](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L69)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:81](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L81)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:57](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L57)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *undefined | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:131](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L131)*

Instructs the client to look up more information from the server

**`example`** 
// the 1st canticle in the 1979 BCP table for the current `LiturgicalDay`
{ type: 'psalm', style: 'canticle', lookup: { table: 'bcp1979', item: 1 }}

**`example`** 
// the morning psalms in the 30-day BCP cycle
{ type: 'psalm', style: 'canticle', lookup: { table: 'bcp_30day_psalter', item: 'morning_psalms' }}

**`example`** 
// the gospel reading in the Revised Common Lectionary
{ type: 'bible-reading', style: 'long', lookup: { table: 'rcl', item: 'gospel' }}

___

### `Optional` metadata

• **metadata**? : *undefined | object*

*Overrides [Refrain](_refrain_.refrain.md).[metadata](_refrain_.refrain.md#optional-metadata)*

*Defined in [bible-reading/bible-reading.ts:15](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L15)*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:54](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L54)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:63](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L63)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:97](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L97)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

###  style

• **style**: *StyleTuple[number]*

*Overrides [Heading](_heading_.heading.md).[style](_heading_.heading.md#optional-style)*

*Defined in [bible-reading/bible-reading.ts:13](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L13)*

___

###  type

• **type**: *"bible-reading"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [bible-reading/bible-reading.ts:12](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L12)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:103](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L103)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[BibleReadingVerse](_bible_reading_bible_reading_verse_.biblereadingverse.md)‹› | [Heading](_heading_.heading.md)‹›[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [bible-reading/bible-reading.ts:20](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L20)*

___

###  version

• **version**: *string | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:87](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L87)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:75](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L75)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  abbrevFromCitation

▸ **abbrevFromCitation**(): *string*

*Defined in [bible-reading/bible-reading.ts:67](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L67)*

Generates an abbreviated book name from citation

**`example`** 
// returns 'Genesis'
this.citation = 'Gen. 3:4'
this.abbrevFromCitation()

**Returns:** *string*

___

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:179](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L179)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Overrides [Heading](_heading_.heading.md).[availableStyles](_heading_.heading.md#availablestyles)*

*Defined in [bible-reading/bible-reading.ts:111](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L111)*

Returns the list of all possible `style` values.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:169](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L169)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  bookCodeFromAbbrev

▸ **bookCodeFromAbbrev**(`a`: string): *string*

*Defined in [bible-reading/bible-reading.ts:82](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L82)*

Given an abbreviated book name, returns the name of the book

**`example`** 
// returns 'Genesis'
this.bookCodeFromAbbrev('Gen')

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |

**Returns:** *string*

___

###  compileIntro

▸ **compileIntro**(): *void*

*Defined in [bible-reading/bible-reading.ts:23](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L23)*

Replaces ${longName} or ${shortName} in LD passed as intro with appropriate value

**Returns:** *void*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:149](https://github.com/gbj/venite/blob/944535b/ldf/src/liturgical-document.ts#L149)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*

___

###  longNameFromBookCode

▸ **longNameFromBookCode**(`bookName`: string, `lang`: string): *string*

*Defined in [bible-reading/bible-reading.ts:94](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L94)*

Given a book name, returns the full name in the language passed; if not found, returns book name given

**`example`** 
// returns 'The Book of Genesis'
this.longNameFromBookCode('Genesis')

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bookName` | string | - |
`lang` | string | "en" |

**Returns:** *string*

___

###  shortNameFromBookCode

▸ **shortNameFromBookCode**(`bookName`: string, `lang`: string): *string*

*Defined in [bible-reading/bible-reading.ts:104](https://github.com/gbj/venite/blob/944535b/ldf/src/bible-reading/bible-reading.ts#L104)*

Given a book name, returns the short name in the language passed; if not found, returns book name given

**`example`** 
// returns 'Genesis'
this.shortNameFromBookCode('Genesis')

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bookName` | string | - |
`lang` | string | "en" |

**Returns:** *string*
