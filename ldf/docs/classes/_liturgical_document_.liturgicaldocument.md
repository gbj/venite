[@venite/ldf](../README.md) › [Globals](../globals.md) › ["liturgical-document"](../modules/_liturgical_document_.md) › [LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)

# Class: LiturgicalDocument

Represents a liturgy of any scope and concreteness, from a complete bullletin to a single prayer.

## Hierarchy

* **LiturgicalDocument**

  ↳ [ResponsivePrayer](_responsive_prayer_.responsiveprayer.md)

  ↳ [Heading](_heading_.heading.md)

  ↳ [Refrain](_refrain_.refrain.md)

  ↳ [Psalm](_psalm_.psalm.md)

  ↳ [Image](_image_.image.md)

  ↳ [Liturgy](_liturgy_liturgy_.liturgy.md)

  ↳ [Meditation](_meditation_.meditation.md)

  ↳ [Option](_option_.option.md)

  ↳ [Parallel](_parallel_.parallel.md)

  ↳ [Rubric](_rubric_.rubric.md)

  ↳ [Text](_text_.text.md)

  ↳ [BibleReading](_bible_reading_bible_reading_.biblereading.md)

## Index

### Constructors

* [constructor](_liturgical_document_.liturgicaldocument.md#constructor)

### Properties

* [api](_liturgical_document_.liturgicaldocument.md#optional-api)
* [category](_liturgical_document_.liturgicaldocument.md#category)
* [citation](_liturgical_document_.liturgicaldocument.md#optional-citation)
* [compile_hidden](_liturgical_document_.liturgicaldocument.md#optional-compile_hidden)
* [condition](_liturgical_document_.liturgicaldocument.md#condition)
* [date_created](_liturgical_document_.liturgicaldocument.md#optional-date_created)
* [date_modified](_liturgical_document_.liturgicaldocument.md#optional-date_modified)
* [day](_liturgical_document_.liturgicaldocument.md#optional-day)
* [display_format](_liturgical_document_.liturgicaldocument.md#optional-display_format)
* [display_settings](_liturgical_document_.liturgicaldocument.md#optional-display_settings)
* [hidden](_liturgical_document_.liturgicaldocument.md#optional-hidden)
* [id](_liturgical_document_.liturgicaldocument.md#optional-id)
* [label](_liturgical_document_.liturgicaldocument.md#label)
* [language](_liturgical_document_.liturgicaldocument.md#language)
* [lastRevision](_liturgical_document_.liturgicaldocument.md#lastrevision)
* [lookup](_liturgical_document_.liturgicaldocument.md#optional-lookup)
* [metadata](_liturgical_document_.liturgicaldocument.md#optional-metadata)
* [responsive](_liturgical_document_.liturgicaldocument.md#optional-responsive)
* [sharing](_liturgical_document_.liturgicaldocument.md#optional-sharing)
* [slug](_liturgical_document_.liturgicaldocument.md#slug)
* [source](_liturgical_document_.liturgicaldocument.md#optional-source)
* [style](_liturgical_document_.liturgicaldocument.md#optional-style)
* [type](_liturgical_document_.liturgicaldocument.md#type)
* [uid](_liturgical_document_.liturgicaldocument.md#optional-uid)
* [value](_liturgical_document_.liturgicaldocument.md#optional-value)
* [version](_liturgical_document_.liturgicaldocument.md#version)
* [version_label](_liturgical_document_.liturgicaldocument.md#optional-version_label)

### Methods

* [availableDisplayFormats](_liturgical_document_.liturgicaldocument.md#availabledisplayformats)
* [availableLookupTypes](_liturgical_document_.liturgicaldocument.md#availablelookuptypes)
* [availableStyles](_liturgical_document_.liturgicaldocument.md#availablestyles)
* [availableTypes](_liturgical_document_.liturgicaldocument.md#availabletypes)
* [include](_liturgical_document_.liturgicaldocument.md#include)

## Constructors

###  constructor

\+ **new LiturgicalDocument**(`data`: Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)›): *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)*

*Defined in [liturgical-document.ts:243](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L243)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)› | {} |

**Returns:** *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Defined in [liturgical-document.ts:109](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L109)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Defined in [liturgical-document.ts:99](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L99)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Defined in [liturgical-document.ts:150](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L150)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

### `Optional` compile_hidden

• **compile_hidden**? : *undefined | false | true*

*Defined in [liturgical-document.ts:181](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L181)*

Marks a piece of a document that should be hidden after the document is compiled.
This can be used for e.g., explanatory rubrics that become redundant once a reading or psalm has been inserted.

___

###  condition

• **condition**: *object*

*Defined in [liturgical-document.ts:102](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L102)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` date_created

• **date_created**? : *any*

*Defined in [liturgical-document.ts:78](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L78)*

Timestamps for document creation and modification

___

### `Optional` date_modified

• **date_modified**? : *any*

*Defined in [liturgical-document.ts:79](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L79)*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Defined in [liturgical-document.ts:166](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L166)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

### `Optional` display_format

• **display_format**? : *[DisplayFormat](../modules/_liturgical_document_.md#displayformat)*

*Defined in [liturgical-document.ts:93](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L93)*

Specify how the text should be displayed
Unison: the entire text is a congregational response
Abbreviated: only the beginning and end of the text should be displayed
Responsive: alternating parts (for psalms, by verse)
Antiphonal: alternating parts (for psalms, by half-verse)

___

### `Optional` display_settings

• **display_settings**? : *[DisplaySettings](_display_settings_.displaysettings.md)*

*Defined in [liturgical-document.ts:96](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L96)*

Display Settings (font, etc.) to be applied to the document as a whole

___

### `Optional` hidden

• **hidden**? : *undefined | false | true*

*Defined in [liturgical-document.ts:177](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L177)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *number | string*

*Defined in [liturgical-document.ts:75](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L75)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Defined in [liturgical-document.ts:127](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L127)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Defined in [liturgical-document.ts:139](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L139)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Defined in [liturgical-document.ts:115](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L115)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *[Lookup](../modules/_liturgical_document_.md#lookup)*

*Defined in [liturgical-document.ts:193](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L193)*

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

• **metadata**? : *any*

*Defined in [liturgical-document.ts:172](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L172)*

Optional: Child classes can store any additional properties they need within the `metadata` object.

**`example`** 
{ response: 'Thanks be to God.' }

___

### `Optional` responsive

• **responsive**? : *[Responsive](../enums/_liturgical_document_.responsive.md) | undefined*

*Defined in [liturgical-document.ts:197](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L197)*

Documents can be set to show only on mobile or only on larger-than-mobile
e.g., a hymn could show only the scanned image on tablet, and only the text on mobile

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Defined in [liturgical-document.ts:112](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L112)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Defined in [liturgical-document.ts:121](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L121)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Defined in [liturgical-document.ts:155](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L155)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

### `Optional` style

• **style**? : *string | null*

*Defined in [liturgical-document.ts:85](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L85)*

An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style.

___

###  type

• **type**: *TypeTuple[number]*

*Defined in [liturgical-document.ts:82](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L82)*

Indicates the type of document

___

### `Optional` uid

• **uid**? : *undefined | string*

*Defined in [liturgical-document.ts:161](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L161)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

### `Optional` value

• **value**? : *[Value](../modules/_liturgical_document_.md#value)*

*Defined in [liturgical-document.ts:200](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L200)*

The content of the document.

___

###  version

• **version**: *string | object*

*Defined in [liturgical-document.ts:145](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L145)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Defined in [liturgical-document.ts:133](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L133)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableDisplayFormats

▸ **availableDisplayFormats**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:241](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L241)*

Returns the list of all available `display_format` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:236](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L236)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:231](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L231)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:226](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L226)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Defined in [liturgical-document.ts:204](https://github.com/gbj/venite/blob/4c7ddca2/ldf/src/liturgical-document.ts#L204)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
