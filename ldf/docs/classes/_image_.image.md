[@venite/ldf](../README.md) › [Globals](../globals.md) › ["image"](../modules/_image_.md) › [Image](_image_.image.md)

# Class: Image

Refrain represents a short text like the Gloria Patri, Hail Mary, or an Antiphon

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **Image**

## Index

### Constructors

* [constructor](_image_.image.md#constructor)

### Properties

* [api](_image_.image.md#optional-api)
* [category](_image_.image.md#category)
* [citation](_image_.image.md#optional-citation)
* [condition](_image_.image.md#condition)
* [date_created](_image_.image.md#optional-date_created)
* [date_modified](_image_.image.md#optional-date_modified)
* [day](_image_.image.md#optional-day)
* [display_format](_image_.image.md#optional-display_format)
* [hidden](_image_.image.md#hidden)
* [id](_image_.image.md#optional-id)
* [label](_image_.image.md#label)
* [language](_image_.image.md#language)
* [lastRevision](_image_.image.md#lastrevision)
* [lookup](_image_.image.md#optional-lookup)
* [metadata](_image_.image.md#metadata)
* [sharing](_image_.image.md#optional-sharing)
* [slug](_image_.image.md#slug)
* [source](_image_.image.md#optional-source)
* [style](_image_.image.md#style)
* [type](_image_.image.md#type)
* [uid](_image_.image.md#optional-uid)
* [value](_image_.image.md#value)
* [version](_image_.image.md#version)
* [version_label](_image_.image.md#optional-version_label)

### Methods

* [availableDisplayFormats](_image_.image.md#availabledisplayformats)
* [availableLookupTypes](_image_.image.md#availablelookuptypes)
* [availableStyles](_image_.image.md#availablestyles)
* [availableTypes](_image_.image.md#availabletypes)
* [include](_image_.image.md#include)

## Constructors

###  constructor

\+ **new Image**(`data`: Partial‹[Image](_image_.image.md)›): *[Image](_image_.image.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [image.ts:25](https://github.com/gbj/venite/blob/7d26fef/ldf/src/image.ts#L25)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Image](_image_.image.md)› | {} |

**Returns:** *[Image](_image_.image.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:97](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L97)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:87](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L87)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:138](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L138)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:90](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L90)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` date_created

• **date_created**? : *any*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[date_created](_responsive_prayer_.responsiveprayer.md#optional-date_created)*

*Defined in [liturgical-document.ts:69](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L69)*

Timestamps for document creation and modification

___

### `Optional` date_modified

• **date_modified**? : *any*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[date_modified](_responsive_prayer_.responsiveprayer.md#optional-date_modified)*

*Defined in [liturgical-document.ts:70](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L70)*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:154](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L154)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

### `Optional` display_format

• **display_format**? : *[DisplayFormat](../modules/_index_.md#displayformat)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[display_format](_responsive_prayer_.responsiveprayer.md#optional-display_format)*

*Defined in [liturgical-document.ts:84](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L84)*

Specify how the text should be displayed
Unison: the entire text is a congregational response
Abbreviated: only the beginning and end of the text should be displayed
Responsive: alternating parts (for psalms, by verse)
Antiphonal: alternating parts (for psalms, by half-verse)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:165](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L165)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:66](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L66)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:115](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L115)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:127](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L127)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:103](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L103)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *[Lookup](../modules/_index_.md#lookup)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:177](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L177)*

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

*Defined in [image.ts:10](https://github.com/gbj/venite/blob/7d26fef/ldf/src/image.ts#L10)*

#### Type declaration:

* **align**: *"left" | "right" | "center"*

* **height**: *number*

* **width**: *number*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:100](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L100)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:109](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L109)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:143](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L143)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

###  style

• **style**: *StyleTuple[number]*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[style](_liturgy_liturgy_.liturgy.md#optional-style)*

*Defined in [image.ts:9](https://github.com/gbj/venite/blob/7d26fef/ldf/src/image.ts#L9)*

___

###  type

• **type**: *"image"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [image.ts:8](https://github.com/gbj/venite/blob/7d26fef/ldf/src/image.ts#L8)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:149](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L149)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *string[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [image.ts:16](https://github.com/gbj/venite/blob/7d26fef/ldf/src/image.ts#L16)*

Array of image URLs, including (possibly) base-64-encoded images

___

###  version

• **version**: *string | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:133](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L133)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:121](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L121)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableDisplayFormats

▸ **availableDisplayFormats**(): *never[]*

*Overrides [Meditation](_meditation_.meditation.md).[availableDisplayFormats](_meditation_.meditation.md#availabledisplayformats)*

*Defined in [image.ts:23](https://github.com/gbj/venite/blob/7d26fef/ldf/src/image.ts#L23)*

**Returns:** *never[]*

___

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:216](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L216)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)*

*Defined in [image.ts:19](https://github.com/gbj/venite/blob/7d26fef/ldf/src/image.ts#L19)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:206](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L206)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:184](https://github.com/gbj/venite/blob/7d26fef/ldf/src/liturgical-document.ts#L184)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
