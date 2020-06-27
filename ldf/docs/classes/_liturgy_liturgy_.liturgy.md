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

* [api](_liturgy_liturgy_.liturgy.md#api)
* [category](_liturgy_liturgy_.liturgy.md#category)
* [citation](_liturgy_liturgy_.liturgy.md#optional-citation)
* [condition](_liturgy_liturgy_.liturgy.md#condition)
* [day](_liturgy_liturgy_.liturgy.md#optional-day)
* [hidden](_liturgy_liturgy_.liturgy.md#hidden)
* [id](_liturgy_liturgy_.liturgy.md#optional-id)
* [label](_liturgy_liturgy_.liturgy.md#label)
* [language](_liturgy_liturgy_.liturgy.md#language)
* [lookup](_liturgy_liturgy_.liturgy.md#optional-lookup)
* [metadata](_liturgy_liturgy_.liturgy.md#metadata)
* [revision_log](_liturgy_liturgy_.liturgy.md#optional-revision_log)
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

* [availableLookupTypes](_liturgy_liturgy_.liturgy.md#availablelookuptypes)
* [availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)
* [availableTypes](_liturgy_liturgy_.liturgy.md#availabletypes)
* [include](_liturgy_liturgy_.liturgy.md#include)

## Constructors

###  constructor

\+ **new Liturgy**(`data`: Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)›): *[Liturgy](_liturgy_liturgy_.liturgy.md)*

*Inherited from [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [liturgical-document.ts:169](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L169)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)› | {} |

**Returns:** *[Liturgy](_liturgy_liturgy_.liturgy.md)*

## Properties

###  api

• **api**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#api)*

*Defined in [liturgical-document.ts:42](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L42)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:32](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L32)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:80](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L80)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:35](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L35)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:96](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L96)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:107](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L107)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *undefined | number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:20](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L20)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:57](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L57)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:69](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L69)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

### `Optional` lookup

• **lookup**? : *undefined | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:119](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L119)*

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

*Defined in [liturgy/liturgy.ts:8](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgy/liturgy.ts#L8)*

#### Type declaration:

* **evening**: *boolean*

* **liturgyversions**? : *string[]*

* **preferences**(): *object*

* **special_preferences**(): *object*

* **supplement**? : *undefined | false | true*

___

### `Optional` revision_log

• **revision_log**? : *[Change](_editing_change_.change.md)[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[revision_log](_responsive_prayer_.responsiveprayer.md#optional-revision_log)*

*Defined in [liturgical-document.ts:23](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L23)*

Array of changes to arrive at this document state. Important to collaborative editing.

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:45](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L45)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:51](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L51)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:85](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L85)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

### `Optional` style

• **style**? : *string | null*

*Inherited from [Heading](_heading_.heading.md).[style](_heading_.heading.md#optional-style)*

*Defined in [liturgical-document.ts:29](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L29)*

An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style.

___

###  type

• **type**: *"liturgy"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [liturgy/liturgy.ts:6](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgy/liturgy.ts#L6)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:91](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L91)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [liturgy/liturgy.ts:41](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgy/liturgy.ts#L41)*

Value is an array of any kind of LiturgicalDocument, including child classes

___

###  version

• **version**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:75](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L75)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:63](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L63)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:167](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L167)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Inherited from [Heading](_heading_.heading.md).[availableStyles](_heading_.heading.md#availablestyles)*

*Defined in [liturgical-document.ts:162](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L162)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:157](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L157)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:137](https://github.com/gbj/venite/blob/d9ef528/ldf/src/liturgical-document.ts#L137)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
