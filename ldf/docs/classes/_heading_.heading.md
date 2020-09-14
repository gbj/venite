[@venite/ldf](../README.md) › [Globals](../globals.md) › ["heading"](../modules/_heading_.md) › [Heading](_heading_.heading.md)

# Class: Heading

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **Heading**

## Index

### Constructors

* [constructor](_heading_.heading.md#constructor)

### Properties

* [api](_heading_.heading.md#optional-api)
* [category](_heading_.heading.md#category)
* [citation](_heading_.heading.md#optional-citation)
* [condition](_heading_.heading.md#condition)
* [day](_heading_.heading.md#optional-day)
* [hidden](_heading_.heading.md#hidden)
* [id](_heading_.heading.md#optional-id)
* [label](_heading_.heading.md#label)
* [language](_heading_.heading.md#language)
* [lastRevision](_heading_.heading.md#lastrevision)
* [lookup](_heading_.heading.md#optional-lookup)
* [metadata](_heading_.heading.md#metadata)
* [sharing](_heading_.heading.md#optional-sharing)
* [slug](_heading_.heading.md#slug)
* [source](_heading_.heading.md#optional-source)
* [style](_heading_.heading.md#style)
* [type](_heading_.heading.md#type)
* [uid](_heading_.heading.md#optional-uid)
* [value](_heading_.heading.md#value)
* [version](_heading_.heading.md#version)
* [version_label](_heading_.heading.md#optional-version_label)

### Methods

* [availableLookupTypes](_heading_.heading.md#availablelookuptypes)
* [availableStyles](_heading_.heading.md#availablestyles)
* [availableTypes](_heading_.heading.md#availabletypes)
* [include](_heading_.heading.md#include)

## Constructors

###  constructor

\+ **new Heading**(`data`: Partial‹[Heading](_heading_.heading.md)›): *[Heading](_heading_.heading.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [heading.ts:28](https://github.com/gbj/venite/blob/fb377a2/ldf/src/heading.ts#L28)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Heading](_heading_.heading.md)› | {} |

**Returns:** *[Heading](_heading_.heading.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:78](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L78)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:68](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L68)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:119](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L119)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:71](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L71)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:135](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L135)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:146](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L146)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:59](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L59)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:96](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L96)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:108](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L108)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:84](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L84)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *[Lookup](../modules/_index_.md#lookup)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:158](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L158)*

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

*Defined in [heading.ts:16](https://github.com/gbj/venite/blob/fb377a2/ldf/src/heading.ts#L16)*

#### Type declaration:

* **level**? : *undefined | number*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:81](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L81)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:90](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L90)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:124](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L124)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

###  style

• **style**: *StyleTuple[number]*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[style](_liturgy_liturgy_.liturgy.md#optional-style)*

*Defined in [heading.ts:14](https://github.com/gbj/venite/blob/fb377a2/ldf/src/heading.ts#L14)*

What kind of value to display
If `text`, displays plain text stored in `value`
If `day`, displays name of `LiturgicalDay` stored in `day`
If `date`, displays localized version of `Date` determined by `dateFromYMDString(day.date)`

___

###  type

• **type**: *"heading"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [heading.ts:7](https://github.com/gbj/venite/blob/fb377a2/ldf/src/heading.ts#L7)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:130](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L130)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *string[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [heading.ts:23](https://github.com/gbj/venite/blob/fb377a2/ldf/src/heading.ts#L23)*

Contains the text of the heading

___

###  version

• **version**: *string | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:114](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L114)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:102](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L102)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:197](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L197)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)*

*Defined in [heading.ts:26](https://github.com/gbj/venite/blob/fb377a2/ldf/src/heading.ts#L26)*

Returns the list of all possible `style` values.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:187](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L187)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:165](https://github.com/gbj/venite/blob/fb377a2/ldf/src/liturgical-document.ts#L165)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
