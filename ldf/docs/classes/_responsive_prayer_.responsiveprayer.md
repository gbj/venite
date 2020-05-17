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

* [api](_responsive_prayer_.responsiveprayer.md#api)
* [category](_responsive_prayer_.responsiveprayer.md#category)
* [citation](_responsive_prayer_.responsiveprayer.md#optional-citation)
* [condition](_responsive_prayer_.responsiveprayer.md#condition)
* [day](_responsive_prayer_.responsiveprayer.md#optional-day)
* [hidden](_responsive_prayer_.responsiveprayer.md#hidden)
* [id](_responsive_prayer_.responsiveprayer.md#optional-id)
* [label](_responsive_prayer_.responsiveprayer.md#label)
* [language](_responsive_prayer_.responsiveprayer.md#language)
* [metadata](_responsive_prayer_.responsiveprayer.md#optional-metadata)
* [revision_log](_responsive_prayer_.responsiveprayer.md#optional-revision_log)
* [sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)
* [slug](_responsive_prayer_.responsiveprayer.md#slug)
* [style](_responsive_prayer_.responsiveprayer.md#style)
* [type](_responsive_prayer_.responsiveprayer.md#type)
* [uid](_responsive_prayer_.responsiveprayer.md#optional-uid)
* [value](_responsive_prayer_.responsiveprayer.md#value)
* [version](_responsive_prayer_.responsiveprayer.md#version)
* [version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)

### Methods

* [availableStyles](_responsive_prayer_.responsiveprayer.md#availablestyles)
* [availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)
* [include](_responsive_prayer_.responsiveprayer.md#include)

## Constructors

###  constructor

\+ **new ResponsivePrayer**(`data`: Partial‹[ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)›): *[ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [responsive-prayer.ts:18](https://github.com/gbj/venite/blob/3d88b83/ldf/src/responsive-prayer.ts#L18)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)› | {} |

**Returns:** *[ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)*

## Properties

###  api

• **api**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#api)*

*Defined in [liturgical-document.ts:41](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L41)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *[Category](_category_.category.md)[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:31](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L31)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | [Citation](_citation_citation_.citation.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:80](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L80)*

Source for the document, either as a string or a `Citation` object.

**`example`** 
`John 1:14`, { source: 'bcp1979', 'citation': 'p. 123' }

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:34](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L34)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:91](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L91)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:102](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L102)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:19](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L19)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:56](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L56)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:68](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L68)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

### `Optional` metadata

• **metadata**? : *undefined | object*

*Overrides [Refrain](_refrain_.refrain.md).[metadata](_refrain_.refrain.md#optional-metadata)*

*Defined in [responsive-prayer.ts:11](https://github.com/gbj/venite/blob/3d88b83/ldf/src/responsive-prayer.ts#L11)*

___

### `Optional` revision_log

• **revision_log**? : *[Change](_editing_change_.change.md)[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[revision_log](_responsive_prayer_.responsiveprayer.md#optional-revision_log)*

*Defined in [liturgical-document.ts:22](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L22)*

Array of changes to arrive at this document state. Important to collaborative editing.

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:44](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L44)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:50](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L50)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

###  style

• **style**: *StyleTuple[number]*

*Overrides [Heading](_heading_.heading.md).[style](_heading_.heading.md#optional-style)*

*Defined in [responsive-prayer.ts:9](https://github.com/gbj/venite/blob/3d88b83/ldf/src/responsive-prayer.ts#L9)*

___

###  type

• **type**: *"responsive"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [responsive-prayer.ts:8](https://github.com/gbj/venite/blob/3d88b83/ldf/src/responsive-prayer.ts#L8)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:86](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L86)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[ResponsivePrayerLine](_responsive_prayer_.responsiveprayerline.md)[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#value)*

*Defined in [responsive-prayer.ts:10](https://github.com/gbj/venite/blob/3d88b83/ldf/src/responsive-prayer.ts#L10)*

___

###  version

• **version**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:74](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L74)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`

___

### `Optional` version_label

• **version_label**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:62](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L62)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Overrides [Heading](_heading_.heading.md).[availableStyles](_heading_.heading.md#availablestyles)*

*Defined in [responsive-prayer.ts:16](https://github.com/gbj/venite/blob/3d88b83/ldf/src/responsive-prayer.ts#L16)*

Returns the list of all possible `style` values.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:129](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L129)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:109](https://github.com/gbj/venite/blob/3d88b83/ldf/src/liturgical-document.ts#L109)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
