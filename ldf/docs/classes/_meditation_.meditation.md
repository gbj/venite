[@venite/ldf](../README.md) › [Globals](../globals.md) › ["meditation"](../modules/_meditation_.md) › [Meditation](_meditation_.meditation.md)

# Class: Meditation

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **Meditation**

## Index

### Constructors

* [constructor](_meditation_.meditation.md#constructor)

### Properties

* [api](_meditation_.meditation.md#api)
* [category](_meditation_.meditation.md#category)
* [citation](_meditation_.meditation.md#optional-citation)
* [condition](_meditation_.meditation.md#condition)
* [day](_meditation_.meditation.md#optional-day)
* [hidden](_meditation_.meditation.md#hidden)
* [id](_meditation_.meditation.md#optional-id)
* [label](_meditation_.meditation.md#label)
* [language](_meditation_.meditation.md#language)
* [lookup](_meditation_.meditation.md#optional-lookup)
* [metadata](_meditation_.meditation.md#metadata)
* [revision_log](_meditation_.meditation.md#optional-revision_log)
* [sharing](_meditation_.meditation.md#optional-sharing)
* [slug](_meditation_.meditation.md#slug)
* [source](_meditation_.meditation.md#optional-source)
* [style](_meditation_.meditation.md#optional-style)
* [type](_meditation_.meditation.md#type)
* [uid](_meditation_.meditation.md#optional-uid)
* [value](_meditation_.meditation.md#value)
* [version](_meditation_.meditation.md#version)
* [version_label](_meditation_.meditation.md#optional-version_label)

### Methods

* [availableStyles](_meditation_.meditation.md#availablestyles)
* [availableTypes](_meditation_.meditation.md#availabletypes)
* [include](_meditation_.meditation.md#include)

## Constructors

###  constructor

\+ **new Meditation**(`data`: Partial‹[Meditation](_meditation_.meditation.md)›): *[Meditation](_meditation_.meditation.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [meditation.ts:13](https://github.com/gbj/venite/blob/42830fa/ldf/src/meditation.ts#L13)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Meditation](_meditation_.meditation.md)› | {} |

**Returns:** *[Meditation](_meditation_.meditation.md)*

## Properties

###  api

• **api**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#api)*

*Defined in [liturgical-document.ts:43](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L43)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:33](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L33)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:81](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L81)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:36](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L36)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:97](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L97)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:108](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L108)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:21](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L21)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:58](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L58)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:70](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L70)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

### `Optional` lookup

• **lookup**? : *undefined | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:120](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L120)*

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

*Defined in [meditation.ts:6](https://github.com/gbj/venite/blob/42830fa/ldf/src/meditation.ts#L6)*

#### Type declaration:

* **delay**: *number*

* **length**: *number*

___

### `Optional` revision_log

• **revision_log**? : *[Change](_editing_change_.change.md)[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[revision_log](_responsive_prayer_.responsiveprayer.md#optional-revision_log)*

*Defined in [liturgical-document.ts:24](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L24)*

Array of changes to arrive at this document state. Important to collaborative editing.

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:46](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L46)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:52](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L52)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:86](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L86)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

### `Optional` style

• **style**? : *string | null*

*Inherited from [Heading](_heading_.heading.md).[style](_heading_.heading.md#optional-style)*

*Defined in [liturgical-document.ts:30](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L30)*

An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style.

___

###  type

• **type**: *"meditation"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [meditation.ts:4](https://github.com/gbj/venite/blob/42830fa/ldf/src/meditation.ts#L4)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:92](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L92)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *string[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [meditation.ts:13](https://github.com/gbj/venite/blob/42830fa/ldf/src/meditation.ts#L13)*

Optionally: a guided meditation or other appropriate text

___

###  version

• **version**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:76](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L76)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:64](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L64)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Inherited from [Heading](_heading_.heading.md).[availableStyles](_heading_.heading.md#availablestyles)*

*Defined in [liturgical-document.ts:156](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L156)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:151](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L151)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:131](https://github.com/gbj/venite/blob/42830fa/ldf/src/liturgical-document.ts#L131)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
