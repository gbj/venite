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
* [display_format](_option_.option.md#optional-display_format)
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

* [availableDisplayFormats](_option_.option.md#availabledisplayformats)
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

*Defined in [option.ts:26](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/option.ts#L26)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Option](_option_.option.md)› | {} |

**Returns:** *[Option](_option_.option.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:93](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L93)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:83](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L83)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:134](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L134)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:86](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L86)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:150](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L150)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

### `Optional` display_format

• **display_format**? : *[DisplayFormat](../modules/_index_.md#displayformat)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[display_format](_responsive_prayer_.responsiveprayer.md#optional-display_format)*

*Defined in [liturgical-document.ts:80](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L80)*

Specify how the text should be displayed
Unison: the entire text is a congregational response
Abbreviated: only the beginning and end of the text should be displayed
Responsive: alternating parts (for psalms, by verse)
Antiphonal: alternating parts (for psalms, by half-verse)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:161](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L161)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:66](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L66)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:111](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L111)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:123](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L123)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:99](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L99)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *[Lookup](../modules/_index_.md#lookup)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:173](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L173)*

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

*Defined in [option.ts:17](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/option.ts#L17)*

#### Type declaration:

* **editor_selected**? : *undefined | number*

* **selected**: *number*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:96](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L96)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:105](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L105)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:139](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L139)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

### `Optional` style

• **style**? : *string | null*

*Inherited from [Liturgy](_liturgy_liturgy_.liturgy.md).[style](_liturgy_liturgy_.liturgy.md#optional-style)*

*Defined in [liturgical-document.ts:72](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L72)*

An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style.

___

###  type

• **type**: *"option"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [option.ts:15](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/option.ts#L15)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:145](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L145)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [option.ts:26](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/option.ts#L26)*

___

###  version

• **version**: *string | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:129](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L129)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:117](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L117)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableDisplayFormats

▸ **availableDisplayFormats**(): *never[]*

*Overrides [Meditation](_meditation_.meditation.md).[availableDisplayFormats](_meditation_.meditation.md#availabledisplayformats)*

*Defined in [option.ts:33](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/option.ts#L33)*

**Returns:** *never[]*

___

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:212](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L212)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Inherited from [Liturgy](_liturgy_liturgy_.liturgy.md).[availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)*

*Defined in [liturgical-document.ts:207](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L207)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:202](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L202)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  getVersionLabel

▸ **getVersionLabel**(`option`: [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md), `maxLength`: number): *string*

*Defined in [option.ts:57](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/option.ts#L57)*

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

*Defined in [liturgical-document.ts:180](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/liturgical-document.ts#L180)*

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

*Defined in [option.ts:49](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/option.ts#L49)*

**Returns:** *number*

___

###  uniqueLabels

▸ **uniqueLabels**(): *number*

*Defined in [option.ts:43](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/option.ts#L43)*

**Returns:** *number*

___

###  uniqueVersions

▸ **uniqueVersions**(): *number*

*Defined in [option.ts:37](https://github.com/gbj/venite/blob/3ee4ad9/ldf/src/option.ts#L37)*

**Returns:** *number*
