[@venite/ldf](../README.md) › [Globals](../globals.md) › ["responsive-prayer"](../modules/_responsive_prayer_.md) › [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)

# Class: ResponsivePrayer

Text represents collect or any other short prayer.

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **ResponsivePrayer**

## Index

### Constructors

* [constructor](_responsive_prayer_.responsiveprayer.md#constructor)

### Properties

* [api](_responsive_prayer_.responsiveprayer.md#optional-api)
* [category](_responsive_prayer_.responsiveprayer.md#category)
* [citation](_responsive_prayer_.responsiveprayer.md#optional-citation)
* [condition](_responsive_prayer_.responsiveprayer.md#condition)
* [day](_responsive_prayer_.responsiveprayer.md#optional-day)
* [display_format](_responsive_prayer_.responsiveprayer.md#optional-display_format)
* [hidden](_responsive_prayer_.responsiveprayer.md#hidden)
* [id](_responsive_prayer_.responsiveprayer.md#optional-id)
* [label](_responsive_prayer_.responsiveprayer.md#label)
* [language](_responsive_prayer_.responsiveprayer.md#language)
* [lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)
* [lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)
* [metadata](_responsive_prayer_.responsiveprayer.md#optional-metadata)
* [sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)
* [slug](_responsive_prayer_.responsiveprayer.md#slug)
* [source](_responsive_prayer_.responsiveprayer.md#optional-source)
* [style](_responsive_prayer_.responsiveprayer.md#style)
* [type](_responsive_prayer_.responsiveprayer.md#type)
* [uid](_responsive_prayer_.responsiveprayer.md#optional-uid)
* [value](_responsive_prayer_.responsiveprayer.md#value)
* [version](_responsive_prayer_.responsiveprayer.md#version)
* [version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)

### Methods

* [availableDisplayFormats](_responsive_prayer_.responsiveprayer.md#availabledisplayformats)
* [availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)
* [availableStyles](_responsive_prayer_.responsiveprayer.md#availablestyles)
* [availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)
* [include](_responsive_prayer_.responsiveprayer.md#include)

## Constructors

###  constructor

\+ **new ResponsivePrayer**(`data`: Partial‹[ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)›): *[ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [responsive-prayer.ts:18](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/responsive-prayer.ts#L18)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)› | {} |

**Returns:** *[ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:90](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L90)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:80](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L80)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:131](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L131)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:83](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L83)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:147](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L147)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

### `Optional` display_format

• **display_format**? : *[DisplayFormat](../modules/_index_.md#displayformat)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[display_format](_responsive_prayer_.responsiveprayer.md#optional-display_format)*

*Defined in [liturgical-document.ts:77](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L77)*

Specify how the text should be displayed
Unison: the entire text is a congregational response
Abbreviated: only the beginning and end of the text should be displayed
Responsive: alternating parts (for psalms, by verse)
Antiphonal: alternating parts (for psalms, by half-verse)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:158](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L158)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:63](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L63)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:108](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L108)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:120](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L120)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:96](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L96)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *[Lookup](../modules/_index_.md#lookup)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:170](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L170)*

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

*Defined in [responsive-prayer.ts:11](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/responsive-prayer.ts#L11)*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:93](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L93)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:102](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L102)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:136](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L136)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

###  style

• **style**: *StyleTuple[number]*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[style](_liturgy_liturgy_.liturgy.md#optional-style)*

*Defined in [responsive-prayer.ts:9](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/responsive-prayer.ts#L9)*

___

###  type

• **type**: *"responsive"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [responsive-prayer.ts:8](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/responsive-prayer.ts#L8)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:142](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L142)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[ResponsivePrayerLine](_responsive_prayer_.responsiveprayerline.md)[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [responsive-prayer.ts:10](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/responsive-prayer.ts#L10)*

___

###  version

• **version**: *string | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:126](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L126)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:114](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L114)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableDisplayFormats

▸ **availableDisplayFormats**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableDisplayFormats](_responsive_prayer_.responsiveprayer.md#availabledisplayformats)*

*Defined in [liturgical-document.ts:214](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L214)*

Returns the list of all available `display_format` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:209](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L209)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)*

*Defined in [responsive-prayer.ts:16](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/responsive-prayer.ts#L16)*

Returns the list of all possible `style` values.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:199](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L199)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:177](https://github.com/gbj/venite/blob/f2cee0d/ldf/src/liturgical-document.ts#L177)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
