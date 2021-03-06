[@venite/ldf](../README.md) › [Globals](../globals.md) › ["liturgy/liturgy"](../modules/_liturgy_liturgy_.md) › [Liturgy](_liturgy_liturgy_.liturgy.md)

# Class: Liturgy

Represents the "recipe" to compile a liturgy

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **Liturgy**

## Index

### Constructors

* [constructor](_liturgy_liturgy_.liturgy.md#constructor)

### Properties

* [api](_liturgy_liturgy_.liturgy.md#optional-api)
* [category](_liturgy_liturgy_.liturgy.md#category)
* [citation](_liturgy_liturgy_.liturgy.md#optional-citation)
* [condition](_liturgy_liturgy_.liturgy.md#condition)
* [date_created](_liturgy_liturgy_.liturgy.md#optional-date_created)
* [date_modified](_liturgy_liturgy_.liturgy.md#optional-date_modified)
* [day](_liturgy_liturgy_.liturgy.md#optional-day)
* [display_format](_liturgy_liturgy_.liturgy.md#optional-display_format)
* [display_settings](_liturgy_liturgy_.liturgy.md#optional-display_settings)
* [hidden](_liturgy_liturgy_.liturgy.md#hidden)
* [id](_liturgy_liturgy_.liturgy.md#optional-id)
* [label](_liturgy_liturgy_.liturgy.md#label)
* [language](_liturgy_liturgy_.liturgy.md#language)
* [lastRevision](_liturgy_liturgy_.liturgy.md#lastrevision)
* [lookup](_liturgy_liturgy_.liturgy.md#optional-lookup)
* [metadata](_liturgy_liturgy_.liturgy.md#metadata)
* [sharing](_liturgy_liturgy_.liturgy.md#optional-sharing)
* [slug](_liturgy_liturgy_.liturgy.md#slug)
* [source](_liturgy_liturgy_.liturgy.md#optional-source)
* [style](_liturgy_liturgy_.liturgy.md#optional-style)
* [type](_liturgy_liturgy_.liturgy.md#type)
* [uid](_liturgy_liturgy_.liturgy.md#optional-uid)
* [value](_liturgy_liturgy_.liturgy.md#value)
* [version](_liturgy_liturgy_.liturgy.md#version)
* [version_label](_liturgy_liturgy_.liturgy.md#optional-version_label)

### Methods

* [availableDisplayFormats](_liturgy_liturgy_.liturgy.md#availabledisplayformats)
* [availableLookupTypes](_liturgy_liturgy_.liturgy.md#availablelookuptypes)
* [availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)
* [availableTypes](_liturgy_liturgy_.liturgy.md#availabletypes)
* [include](_liturgy_liturgy_.liturgy.md#include)

## Constructors

###  constructor

\+ **new Liturgy**(`data`: Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)›): *[Liturgy](_liturgy_liturgy_.liturgy.md)*

*Inherited from [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [liturgical-document.ts:229](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L229)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)› | {} |

**Returns:** *[Liturgy](_liturgy_liturgy_.liturgy.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:103](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L103)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:93](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L93)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:144](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L144)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:96](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L96)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` date_created

• **date_created**? : *any*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[date_created](_responsive_prayer_.responsiveprayer.md#optional-date_created)*

*Defined in [liturgical-document.ts:72](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L72)*

Timestamps for document creation and modification

___

### `Optional` date_modified

• **date_modified**? : *any*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[date_modified](_responsive_prayer_.responsiveprayer.md#optional-date_modified)*

*Defined in [liturgical-document.ts:73](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L73)*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:160](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L160)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

### `Optional` display_format

• **display_format**? : *[DisplayFormat](../modules/_index_.md#displayformat)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[display_format](_responsive_prayer_.responsiveprayer.md#optional-display_format)*

*Defined in [liturgical-document.ts:87](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L87)*

Specify how the text should be displayed
Unison: the entire text is a congregational response
Abbreviated: only the beginning and end of the text should be displayed
Responsive: alternating parts (for psalms, by verse)
Antiphonal: alternating parts (for psalms, by half-verse)

___

### `Optional` display_settings

• **display_settings**? : *[DisplaySettings](_display_settings_.displaysettings.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[display_settings](_responsive_prayer_.responsiveprayer.md#optional-display_settings)*

*Defined in [liturgical-document.ts:90](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L90)*

Display Settings (font, etc.) to be applied to the document as a whole

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:171](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L171)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *number | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:69](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L69)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:121](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L121)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:133](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L133)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:109](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L109)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *[Lookup](../modules/_index_.md#lookup)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:183](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L183)*

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

*Overrides [Rubric](_rubric_.rubric.md).[metadata](_rubric_.rubric.md#optional-metadata)*

*Defined in [liturgy/liturgy.ts:9](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgy/liturgy.ts#L9)*

#### Type declaration:

* **color**? : *string | [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md)*

* **evening**: *boolean*

* **font**? : *string | undefined*

* **liturgyversions**? : *string[]*

* **preferences**(): *object*

* **special_preferences**(): *object*

* **supplement**? : *undefined | false | true*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:106](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L106)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:115](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L115)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:149](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L149)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

### `Optional` style

• **style**? : *string | null*

*Inherited from [Liturgy](_liturgy_liturgy_.liturgy.md).[style](_liturgy_liturgy_.liturgy.md#optional-style)*

*Defined in [liturgical-document.ts:79](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L79)*

An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style.

___

###  type

• **type**: *"liturgy"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [liturgy/liturgy.ts:7](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgy/liturgy.ts#L7)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:155](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L155)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [liturgy/liturgy.ts:49](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgy/liturgy.ts#L49)*

Value is an array of any kind of LiturgicalDocument, including child classes

___

###  version

• **version**: *string | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:139](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L139)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:127](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L127)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableDisplayFormats

▸ **availableDisplayFormats**(): *never[]*

*Overrides [Meditation](_meditation_.meditation.md).[availableDisplayFormats](_meditation_.meditation.md#availabledisplayformats)*

*Defined in [liturgy/liturgy.ts:52](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgy/liturgy.ts#L52)*

No meaningful differences in display format for liturgies

**Returns:** *never[]*

___

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:222](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L222)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Inherited from [Liturgy](_liturgy_liturgy_.liturgy.md).[availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)*

*Defined in [liturgical-document.ts:217](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L217)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:212](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L212)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:190](https://github.com/gbj/venite/blob/f52da2b3/ldf/src/liturgical-document.ts#L190)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
