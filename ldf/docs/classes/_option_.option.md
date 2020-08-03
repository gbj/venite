[@venite/ldf](../README.md) › [Globals](../globals.md) › ["option"](../modules/_option_.md) › [Option](_option_.option.md)

# Class: Option

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **Option**

## Index

### Constructors

* [constructor](_option_.option.md#constructor)

### Properties

* [api](_option_.option.md#optional-api)
* [category](_option_.option.md#category)
* [citation](_option_.option.md#optional-citation)
* [condition](_option_.option.md#condition)
* [day](_option_.option.md#optional-day)
* [hidden](_option_.option.md#hidden)
* [id](_option_.option.md#optional-id)
* [label](_option_.option.md#label)
* [language](_option_.option.md#language)
* [lastRevision](_option_.option.md#lastrevision)
* [lookup](_option_.option.md#optional-lookup)
* [metadata](_option_.option.md#metadata)
* [sharing](_option_.option.md#optional-sharing)
* [slug](_option_.option.md#slug)
* [source](_option_.option.md#optional-source)
* [style](_option_.option.md#optional-style)
* [type](_option_.option.md#type)
* [uid](_option_.option.md#optional-uid)
* [value](_option_.option.md#value)
* [version](_option_.option.md#version)
* [version_label](_option_.option.md#optional-version_label)

### Methods

* [availableLookupTypes](_option_.option.md#availablelookuptypes)
* [availableStyles](_option_.option.md#availablestyles)
* [availableTypes](_option_.option.md#availabletypes)
* [getVersionLabel](_option_.option.md#getversionlabel)
* [include](_option_.option.md#include)
* [uniqueCitations](_option_.option.md#uniquecitations)
* [uniqueLabels](_option_.option.md#uniquelabels)
* [uniqueVersions](_option_.option.md#uniqueversions)

## Constructors

###  constructor

\+ **new Option**(`data`: Partial‹[Option](_option_.option.md)›): *[Option](_option_.option.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [option.ts:22](https://github.com/gbj/venite/blob/ba3869d/ldf/src/option.ts#L22)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Option](_option_.option.md)› | {} |

**Returns:** *[Option](_option_.option.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:51](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L51)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:41](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L41)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:92](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L92)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:44](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L44)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:108](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L108)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:119](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L119)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:32](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L32)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:69](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L69)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:81](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L81)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:57](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L57)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *undefined | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:131](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L131)*

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

###  metadata

• **metadata**: *object*

*Overrides [Refrain](_refrain_.refrain.md).[metadata](_refrain_.refrain.md#optional-metadata)*

*Defined in [option.ts:17](https://github.com/gbj/venite/blob/ba3869d/ldf/src/option.ts#L17)*

#### Type declaration:

* **selected**: *number*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:54](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L54)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:63](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L63)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:97](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L97)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

### `Optional` style

• **style**? : *string | null*

*Inherited from [Liturgy](_liturgy_liturgy_.liturgy.md).[style](_liturgy_liturgy_.liturgy.md#optional-style)*

*Defined in [liturgical-document.ts:38](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L38)*

An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style.

___

###  type

• **type**: *"option"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [option.ts:15](https://github.com/gbj/venite/blob/ba3869d/ldf/src/option.ts#L15)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:103](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L103)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [option.ts:22](https://github.com/gbj/venite/blob/ba3869d/ldf/src/option.ts#L22)*

___

###  version

• **version**: *string | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:87](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L87)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:75](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L75)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:181](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L181)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Inherited from [Liturgy](_liturgy_liturgy_.liturgy.md).[availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)*

*Defined in [liturgical-document.ts:176](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L176)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:171](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L171)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  getVersionLabel

▸ **getVersionLabel**(`option`: [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md), `maxLength`: number): *string*

*Defined in [option.ts:49](https://github.com/gbj/venite/blob/ba3869d/ldf/src/option.ts#L49)*

Gives an appropriate version label for the document given

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`option` | [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md) | - |
`maxLength` | number | 50 |

**Returns:** *string*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:149](https://github.com/gbj/venite/blob/ba3869d/ldf/src/liturgical-document.ts#L149)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*

___

###  uniqueCitations

▸ **uniqueCitations**(): *number*

*Defined in [option.ts:41](https://github.com/gbj/venite/blob/ba3869d/ldf/src/option.ts#L41)*

**Returns:** *number*

___

###  uniqueLabels

▸ **uniqueLabels**(): *number*

*Defined in [option.ts:35](https://github.com/gbj/venite/blob/ba3869d/ldf/src/option.ts#L35)*

**Returns:** *number*

___

###  uniqueVersions

▸ **uniqueVersions**(): *number*

*Defined in [option.ts:29](https://github.com/gbj/venite/blob/ba3869d/ldf/src/option.ts#L29)*

**Returns:** *number*
