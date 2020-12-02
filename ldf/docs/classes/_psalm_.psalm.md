[@venite/ldf](../README.md) › [Globals](../globals.md) › ["psalm"](../modules/_psalm_.md) › [Psalm](_psalm_.psalm.md)

# Class: Psalm

Psalm represents liturgical instructions.

## Hierarchy

* [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

  ↳ **Psalm**

## Index

### Constructors

* [constructor](_psalm_.psalm.md#constructor)

### Properties

* [api](_psalm_.psalm.md#optional-api)
* [category](_psalm_.psalm.md#category)
* [citation](_psalm_.psalm.md#optional-citation)
* [condition](_psalm_.psalm.md#condition)
* [date_created](_psalm_.psalm.md#optional-date_created)
* [date_modified](_psalm_.psalm.md#optional-date_modified)
* [day](_psalm_.psalm.md#optional-day)
* [display_format](_psalm_.psalm.md#optional-display_format)
* [display_settings](_psalm_.psalm.md#optional-display_settings)
* [hidden](_psalm_.psalm.md#hidden)
* [id](_psalm_.psalm.md#optional-id)
* [label](_psalm_.psalm.md#label)
* [language](_psalm_.psalm.md#language)
* [lastRevision](_psalm_.psalm.md#lastrevision)
* [lookup](_psalm_.psalm.md#optional-lookup)
* [metadata](_psalm_.psalm.md#optional-metadata)
* [sharing](_psalm_.psalm.md#optional-sharing)
* [slug](_psalm_.psalm.md#slug)
* [source](_psalm_.psalm.md#optional-source)
* [style](_psalm_.psalm.md#style)
* [type](_psalm_.psalm.md#type)
* [uid](_psalm_.psalm.md#optional-uid)
* [value](_psalm_.psalm.md#value)
* [version](_psalm_.psalm.md#version)
* [version_label](_psalm_.psalm.md#optional-version_label)

### Methods

* [availableDisplayFormats](_psalm_.psalm.md#availabledisplayformats)
* [availableLookupTypes](_psalm_.psalm.md#availablelookuptypes)
* [availableStyles](_psalm_.psalm.md#availablestyles)
* [availableTypes](_psalm_.psalm.md#availabletypes)
* [filteredVerses](_psalm_.psalm.md#filteredverses)
* [include](_psalm_.psalm.md#include)
* [includeAntiphon](_psalm_.psalm.md#includeantiphon)
* [repeatAntiphon](_psalm_.psalm.md#repeatantiphon)
* [versesInCitation](_psalm_.psalm.md#versesincitation)

## Constructors

###  constructor

\+ **new Psalm**(`data`: Partial‹[Psalm](_psalm_.psalm.md)›): *[Psalm](_psalm_.psalm.md)*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[constructor](_liturgy_liturgy_.liturgy.md#constructor)*

*Defined in [psalm.ts:123](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L123)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Psalm](_psalm_.psalm.md)› | {} |

**Returns:** *[Psalm](_psalm_.psalm.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:101](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L101)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:91](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L91)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:142](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L142)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:94](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L94)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` date_created

• **date_created**? : *any*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[date_created](_responsive_prayer_.responsiveprayer.md#optional-date_created)*

*Defined in [liturgical-document.ts:70](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L70)*

Timestamps for document creation and modification

___

### `Optional` date_modified

• **date_modified**? : *any*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[date_modified](_responsive_prayer_.responsiveprayer.md#optional-date_modified)*

*Defined in [liturgical-document.ts:71](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L71)*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:158](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L158)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

### `Optional` display_format

• **display_format**? : *[DisplayFormat](../modules/_index_.md#displayformat)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[display_format](_responsive_prayer_.responsiveprayer.md#optional-display_format)*

*Defined in [liturgical-document.ts:85](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L85)*

Specify how the text should be displayed
Unison: the entire text is a congregational response
Abbreviated: only the beginning and end of the text should be displayed
Responsive: alternating parts (for psalms, by verse)
Antiphonal: alternating parts (for psalms, by half-verse)

___

### `Optional` display_settings

• **display_settings**? : *[DisplaySettings](_display_settings_.displaysettings.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[display_settings](_responsive_prayer_.responsiveprayer.md#optional-display_settings)*

*Defined in [liturgical-document.ts:88](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L88)*

Display Settings (font, etc.) to be applied to the document as a whole

___

###  hidden

• **hidden**: *boolean* = false

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#hidden)*

*Defined in [liturgical-document.ts:169](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L169)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *number | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:67](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L67)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:119](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L119)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:131](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L131)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:107](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L107)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *[Lookup](../modules/_index_.md#lookup)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:181](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L181)*

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

*Overrides [Rubric](_rubric_.rubric.md).[metadata](_rubric_.rubric.md#optional-metadata)*

*Defined in [psalm.ts:12](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L12)*

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:104](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L104)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:113](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L113)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:147](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L147)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

###  style

• **style**: *StyleTuple[number]*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[style](_liturgy_liturgy_.liturgy.md#optional-style)*

*Defined in [psalm.ts:11](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L11)*

___

###  type

• **type**: *"psalm"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [psalm.ts:10](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L10)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:153](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L153)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[PsalmSection](_psalm_.psalmsection.md)[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [psalm.ts:27](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L27)*

___

###  version

• **version**: *string | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:137](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L137)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:125](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L125)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableDisplayFormats

▸ **availableDisplayFormats**(): *ReadonlyArray‹string›*

*Overrides [Meditation](_meditation_.meditation.md).[availableDisplayFormats](_meditation_.meditation.md#availabledisplayformats)*

*Defined in [psalm.ts:121](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L121)*

Returns the list ofall possible `display_format` values.

**Returns:** *ReadonlyArray‹string›*

___

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:220](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L220)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)*

*Defined in [psalm.ts:116](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L116)*

Returns the list of all possible `style` values.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:210](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L210)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  filteredVerses

▸ **filteredVerses**(): *[PsalmSection](_psalm_.psalmsection.md)[]*

*Defined in [psalm.ts:30](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L30)*

Returns a filtered list of verses based on citation

**Returns:** *[PsalmSection](_psalm_.psalmsection.md)[]*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:188](https://github.com/gbj/venite/blob/0f21d50/ldf/src/liturgical-document.ts#L188)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*

___

###  includeAntiphon

▸ **includeAntiphon**(): *boolean*

*Defined in [psalm.ts:90](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L90)*

Whether the antiphon should be included

**Returns:** *boolean*

___

###  repeatAntiphon

▸ **repeatAntiphon**(`setIndex`: number, `filteredValueLength`: number): *boolean*

*Defined in [psalm.ts:99](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L99)*

Whether the antiphon should be repeated after a section of the given index

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`setIndex` | number | - |
`filteredValueLength` | number | 0 |

**Returns:** *boolean*

___

###  versesInCitation

▸ **versesInCitation**(`citation`: string): *string[]*

*Defined in [psalm.ts:65](https://github.com/gbj/venite/blob/0f21d50/ldf/src/psalm.ts#L65)*

Transforms an ordinary citation into a list of included verse numbers

**`example`** 
// returns ['1', '2', '3', '6', '7', '11']
versesInCitation('Psalm 100:1-3,6-7, 11a')

**Parameters:**

Name | Type |
------ | ------ |
`citation` | string |

**Returns:** *string[]*
