[@venite/ldf](../README.md) › [Globals](../globals.md) › ["liturgical-document"](../modules/_liturgical_document_.md) › [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

# Class: LiturgicalDocument

Represents a liturgy of any scope and concreteness, from a complete bullletin to a single prayer.

## Hierarchy

* **LiturgicalDocument**

  ↳ [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)

  ↳ [Heading](_heading_.heading.md)

  ↳ [Refrain](_refrain_.refrain.md)

  ↳ [Psalm](_psalm_.psalm.md)

  ↳ [Liturgy](_liturgy_liturgy_.liturgy.md)

  ↳ [Meditation](_meditation_.meditation.md)

  ↳ [Option](_option_.option.md)

  ↳ [Rubric](_rubric_.rubric.md)

  ↳ [Text](_text_.text.md)

  ↳ [BibleReading](_bible_reading_bible_reading_.biblereading.md)

## Index

### Constructors

* [constructor](_liturgical_document_.liturgicaldocument.md#constructor)

### Properties

* [api](_liturgical_document_.liturgicaldocument.md#optional-api)
* [category](_liturgical_document_.liturgicaldocument.md#category)
* [citation](_liturgical_document_.liturgicaldocument.md#optional-citation)
* [condition](_liturgical_document_.liturgicaldocument.md#condition)
* [day](_liturgical_document_.liturgicaldocument.md#optional-day)
* [hidden](_liturgical_document_.liturgicaldocument.md#hidden)
* [id](_liturgical_document_.liturgicaldocument.md#optional-id)
* [label](_liturgical_document_.liturgicaldocument.md#label)
* [language](_liturgical_document_.liturgicaldocument.md#language)
* [lastRevision](_liturgical_document_.liturgicaldocument.md#lastrevision)
* [lookup](_liturgical_document_.liturgicaldocument.md#optional-lookup)
* [metadata](_liturgical_document_.liturgicaldocument.md#optional-metadata)
* [sharing](_liturgical_document_.liturgicaldocument.md#optional-sharing)
* [slug](_liturgical_document_.liturgicaldocument.md#slug)
* [source](_liturgical_document_.liturgicaldocument.md#optional-source)
* [style](_liturgical_document_.liturgicaldocument.md#optional-style)
* [type](_liturgical_document_.liturgicaldocument.md#type)
* [uid](_liturgical_document_.liturgicaldocument.md#optional-uid)
* [value](_liturgical_document_.liturgicaldocument.md#optional-value)
* [version](_liturgical_document_.liturgicaldocument.md#version)
* [version_label](_liturgical_document_.liturgicaldocument.md#optional-version_label)

### Methods

* [availableLookupTypes](_liturgical_document_.liturgicaldocument.md#availablelookuptypes)
* [availableStyles](_liturgical_document_.liturgicaldocument.md#availablestyles)
* [availableTypes](_liturgical_document_.liturgicaldocument.md#availabletypes)
* [include](_liturgical_document_.liturgicaldocument.md#include)

## Constructors

###  constructor

\+ **new LiturgicalDocument**(`data`: Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)›): *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)*

*Defined in [liturgical-document.ts:197](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L197)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)› | {} |

**Returns:** *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Defined in [liturgical-document.ts:65](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L65)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Defined in [liturgical-document.ts:55](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L55)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Defined in [liturgical-document.ts:106](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L106)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Defined in [liturgical-document.ts:58](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L58)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Defined in [liturgical-document.ts:122](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L122)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Defined in [liturgical-document.ts:133](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L133)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Defined in [liturgical-document.ts:46](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L46)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Defined in [liturgical-document.ts:83](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L83)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Defined in [liturgical-document.ts:95](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L95)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Defined in [liturgical-document.ts:71](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L71)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *undefined | object*

*Defined in [liturgical-document.ts:145](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L145)*

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

• **metadata**? : *any*

*Defined in [liturgical-document.ts:128](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L128)*

Optional: Child classes can store any additional properties they need within the `metadata` object.

**`example`** 
{ response: 'Thanks be to God.' }

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Defined in [liturgical-document.ts:68](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L68)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Defined in [liturgical-document.ts:77](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L77)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Defined in [liturgical-document.ts:111](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L111)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

### `Optional` style

• **style**? : *string | null*

*Defined in [liturgical-document.ts:52](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L52)*

An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style.

___

###  type

• **type**: *TypeTuple[number]*

*Defined in [liturgical-document.ts:49](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L49)*

Indicates the type of document

___

### `Optional` uid

• **uid**? : *undefined | string*

*Defined in [liturgical-document.ts:117](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L117)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

### `Optional` value

• **value**? : *[Value](../modules/_liturgical_document_.md#value)*

*Defined in [liturgical-document.ts:159](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L159)*

The content of the document.

___

###  version

• **version**: *string | object*

*Defined in [liturgical-document.ts:101](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L101)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Defined in [liturgical-document.ts:89](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L89)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:195](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L195)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:190](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L190)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:185](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L185)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Defined in [liturgical-document.ts:163](https://github.com/gbj/venite/blob/3f1ddc3/ldf/src/liturgical-document.ts#L163)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
