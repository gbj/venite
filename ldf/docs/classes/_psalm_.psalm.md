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
* [audio](_psalm_.psalm.md#optional-audio)
* [category](_psalm_.psalm.md#category)
* [citation](_psalm_.psalm.md#optional-citation)
* [compile_hidden](_psalm_.psalm.md#optional-compile_hidden)
* [condition](_psalm_.psalm.md#condition)
* [date_created](_psalm_.psalm.md#optional-date_created)
* [date_modified](_psalm_.psalm.md#optional-date_modified)
* [day](_psalm_.psalm.md#optional-day)
* [display_format](_psalm_.psalm.md#optional-display_format)
* [display_settings](_psalm_.psalm.md#optional-display_settings)
* [hidden](_psalm_.psalm.md#optional-hidden)
* [id](_psalm_.psalm.md#optional-id)
* [label](_psalm_.psalm.md#label)
* [language](_psalm_.psalm.md#language)
* [lastRevision](_psalm_.psalm.md#lastrevision)
* [lookup](_psalm_.psalm.md#optional-lookup)
* [metadata](_psalm_.psalm.md#optional-metadata)
* [responsive](_psalm_.psalm.md#optional-responsive)
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

*Defined in [psalm.ts:159](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L159)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Psalm](_psalm_.psalm.md)› | {} |

**Returns:** *[Psalm](_psalm_.psalm.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[api](_responsive_prayer_.responsiveprayer.md#optional-api)*

*Defined in [liturgical-document.ts:109](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L109)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

### `Optional` audio

• **audio**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[audio](_responsive_prayer_.responsiveprayer.md#optional-audio)*

*Defined in [liturgical-document.ts:203](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L203)*

URL of an audio file associated with the document.

___

###  category

• **category**: *string[]*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[category](_responsive_prayer_.responsiveprayer.md#category)*

*Defined in [liturgical-document.ts:99](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L99)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[citation](_responsive_prayer_.responsiveprayer.md#optional-citation)*

*Defined in [liturgical-document.ts:150](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L150)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

### `Optional` compile_hidden

• **compile_hidden**? : *undefined | false | true*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[compile_hidden](_responsive_prayer_.responsiveprayer.md#optional-compile_hidden)*

*Defined in [liturgical-document.ts:181](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L181)*

Marks a piece of a document that should be hidden after the document is compiled.
This can be used for e.g., explanatory rubrics that become redundant once a reading or psalm has been inserted.

___

###  condition

• **condition**: *object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[condition](_responsive_prayer_.responsiveprayer.md#condition)*

*Defined in [liturgical-document.ts:102](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L102)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` date_created

• **date_created**? : *any*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[date_created](_responsive_prayer_.responsiveprayer.md#optional-date_created)*

*Defined in [liturgical-document.ts:78](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L78)*

Timestamps for document creation and modification

___

### `Optional` date_modified

• **date_modified**? : *any*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[date_modified](_responsive_prayer_.responsiveprayer.md#optional-date_modified)*

*Defined in [liturgical-document.ts:79](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L79)*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[day](_responsive_prayer_.responsiveprayer.md#optional-day)*

*Defined in [liturgical-document.ts:166](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L166)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

### `Optional` display_format

• **display_format**? : *[DisplayFormat](../modules/_index_.md#displayformat)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[display_format](_responsive_prayer_.responsiveprayer.md#optional-display_format)*

*Defined in [liturgical-document.ts:93](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L93)*

Specify how the text should be displayed
Unison: the entire text is a congregational response
Abbreviated: only the beginning and end of the text should be displayed
Responsive: alternating parts (for psalms, by verse)
Antiphonal: alternating parts (for psalms, by half-verse)

___

### `Optional` display_settings

• **display_settings**? : *[DisplaySettings](_display_settings_.displaysettings.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[display_settings](_responsive_prayer_.responsiveprayer.md#optional-display_settings)*

*Defined in [liturgical-document.ts:96](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L96)*

Display Settings (font, etc.) to be applied to the document as a whole

___

### `Optional` hidden

• **hidden**? : *undefined | false | true*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[hidden](_responsive_prayer_.responsiveprayer.md#optional-hidden)*

*Defined in [liturgical-document.ts:177](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L177)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *number | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[id](_responsive_prayer_.responsiveprayer.md#optional-id)*

*Defined in [liturgical-document.ts:75](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L75)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[label](_responsive_prayer_.responsiveprayer.md#label)*

*Defined in [liturgical-document.ts:127](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L127)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[language](_responsive_prayer_.responsiveprayer.md#language)*

*Defined in [liturgical-document.ts:139](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L139)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lastRevision](_responsive_prayer_.responsiveprayer.md#lastrevision)*

*Defined in [liturgical-document.ts:115](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L115)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *[Lookup](../modules/_index_.md#lookup)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[lookup](_responsive_prayer_.responsiveprayer.md#optional-lookup)*

*Defined in [liturgical-document.ts:193](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L193)*

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

*Defined in [psalm.ts:12](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L12)*

___

### `Optional` responsive

• **responsive**? : *[Responsive](../enums/_liturgical_document_.responsive.md) | undefined*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[responsive](_responsive_prayer_.responsiveprayer.md#optional-responsive)*

*Defined in [liturgical-document.ts:197](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L197)*

Documents can be set to show only on mobile or only on larger-than-mobile
e.g., a hymn could show only the scanned image on tablet, and only the text on mobile

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[sharing](_responsive_prayer_.responsiveprayer.md#optional-sharing)*

*Defined in [liturgical-document.ts:112](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L112)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[slug](_responsive_prayer_.responsiveprayer.md#slug)*

*Defined in [liturgical-document.ts:121](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L121)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[source](_responsive_prayer_.responsiveprayer.md#optional-source)*

*Defined in [liturgical-document.ts:155](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L155)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

###  style

• **style**: *StyleTuple[number]*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[style](_liturgy_liturgy_.liturgy.md#optional-style)*

*Defined in [psalm.ts:11](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L11)*

___

###  type

• **type**: *"psalm"*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[type](_liturgical_document_.liturgicaldocument.md#type)*

*Defined in [psalm.ts:10](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L10)*

___

### `Optional` uid

• **uid**? : *undefined | string*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[uid](_responsive_prayer_.responsiveprayer.md#optional-uid)*

*Defined in [liturgical-document.ts:161](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L161)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

###  value

• **value**: *[PsalmSection](_psalm_.psalmsection.md)[]*

*Overrides [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md).[value](_liturgical_document_.liturgicaldocument.md#optional-value)*

*Defined in [psalm.ts:27](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L27)*

___

###  version

• **version**: *string | object*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version](_responsive_prayer_.responsiveprayer.md#version)*

*Defined in [liturgical-document.ts:145](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L145)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[version_label](_responsive_prayer_.responsiveprayer.md#optional-version_label)*

*Defined in [liturgical-document.ts:133](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L133)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableDisplayFormats

▸ **availableDisplayFormats**(): *ReadonlyArray‹string›*

*Overrides [Meditation](_meditation_.meditation.md).[availableDisplayFormats](_meditation_.meditation.md#availabledisplayformats)*

*Defined in [psalm.ts:157](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L157)*

Returns the list ofall possible `display_format` values.

**Returns:** *ReadonlyArray‹string›*

___

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableLookupTypes](_responsive_prayer_.responsiveprayer.md#availablelookuptypes)*

*Defined in [liturgical-document.ts:239](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L239)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Overrides [Liturgy](_liturgy_liturgy_.liturgy.md).[availableStyles](_liturgy_liturgy_.liturgy.md#availablestyles)*

*Defined in [psalm.ts:152](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L152)*

Returns the list of all possible `style` values.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[availableTypes](_responsive_prayer_.responsiveprayer.md#availabletypes)*

*Defined in [liturgical-document.ts:229](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L229)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  filteredVerses

▸ **filteredVerses**(): *[PsalmSection](_psalm_.psalmsection.md)[]*

*Defined in [psalm.ts:30](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L30)*

Returns a filtered list of verses based on citation

**Returns:** *[PsalmSection](_psalm_.psalmsection.md)[]*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Inherited from [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md).[include](_responsive_prayer_.responsiveprayer.md#include)*

*Defined in [liturgical-document.ts:207](https://github.com/gbj/venite/blob/80526ac2/ldf/src/liturgical-document.ts#L207)*

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

*Defined in [psalm.ts:127](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L127)*

Whether the antiphon should be included

**Returns:** *boolean*

___

###  repeatAntiphon

▸ **repeatAntiphon**(`setIndex`: number, `filteredValueLength`: number): *boolean*

*Defined in [psalm.ts:136](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L136)*

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

*Defined in [psalm.ts:74](https://github.com/gbj/venite/blob/80526ac2/ldf/src/psalm.ts#L74)*

Transforms an ordinary citation into a list of included verse numbers

**`example`** 
// returns ['1', '2', '3', '6', '7', '11']
versesInCitation('Psalm 100:1-3,6-7, 11a')

**Parameters:**

Name | Type |
------ | ------ |
`citation` | string |

**Returns:** *string[]*
