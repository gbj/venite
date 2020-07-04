[@venite/ldf](../README.md) › [Globals](../globals.md) › ["text"](../modules/_text_.md) › [Text](_text_.text.md)

# Class: Text

Text represents collect or any other short prayer.

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **Text**

## Index

### Constructors

* [constructor](_text_.text.md#constructor)

### Properties

* [api](_text_.text.md#optional-api)
* [category](_text_.text.md#category)
* [citation](_text_.text.md#optional-citation)
* [condition](_text_.text.md#condition)
* [day](_text_.text.md#optional-day)
* [hidden](_text_.text.md#hidden)
* [id](_text_.text.md#optional-id)
* [label](_text_.text.md#label)
* [language](_text_.text.md#language)
* [lastRevision](_text_.text.md#lastrevision)
* [lookup](_text_.text.md#optional-lookup)
* [metadata](_text_.text.md#optional-metadata)
* [sharing](_text_.text.md#optional-sharing)
* [slug](_text_.text.md#slug)
* [source](_text_.text.md#optional-source)
* [style](_text_.text.md#style)
* [type](_text_.text.md#type)
* [uid](_text_.text.md#optional-uid)
* [value](_text_.text.md#value)
* [version](_text_.text.md#version)
* [version_label](_text_.text.md#optional-version_label)

### Methods

* [availableLookupTypes](_text_.text.md#availablelookuptypes)
* [availableStyles](_text_.text.md#availablestyles)
* [availableTypes](_text_.text.md#availabletypes)
* [include](_text_.text.md#include)

## Constructors

###  constructor

\+ **new Text**(`data`: Partial‹[Text](_text_.text.md)›): *[Text](_text_.text.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [text.ts:19](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/text.ts#L19)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Text](_text_.text.md)› | {} |

**Returns:** *[Text](_text_.text.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:39](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L39)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:29](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L29)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:80](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L80)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:32](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L32)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:96](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L96)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:107](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L107)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:20](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L20)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:57](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L57)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:69](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L69)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:45](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L45)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *undefined | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:119](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L119)*

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

*Defined in [text.ts:11](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/text.ts#L11)*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:42](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L42)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:51](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L51)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:85](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L85)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

###  style

• **style**: *StyleTuple[number]*

*Overrides [Heading](_heading_.heading.md).[style](_heading_.heading.md#optional-style)*

*Defined in [text.ts:9](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/text.ts#L9)*

___

###  type

• **type**: *"text"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [text.ts:8](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/text.ts#L8)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:91](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L91)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *string[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [text.ts:10](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/text.ts#L10)*

___

###  version

• **version**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:75](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L75)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:63](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L63)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:167](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L167)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Overrides [Heading](_heading_.heading.md).[availableStyles](_heading_.heading.md#availablestyles)*

*Defined in [text.ts:17](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/text.ts#L17)*

Returns the list of all possible `style` values.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:157](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L157)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:137](https://github.com/gbj/venite/blob/2b9f06e/ldf/src/liturgical-document.ts#L137)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
