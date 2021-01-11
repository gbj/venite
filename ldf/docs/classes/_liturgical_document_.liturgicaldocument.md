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
* [condition](_liturgical_document_.liturgicaldocument.md#condition)
* [date_created](_liturgical_document_.liturgicaldocument.md#optional-date_created)
* [date_modified](_liturgical_document_.liturgicaldocument.md#optional-date_modified)
* [day](_liturgical_document_.liturgicaldocument.md#optional-day)
* [display_format](_liturgical_document_.liturgicaldocument.md#optional-display_format)
* [display_settings](_liturgical_document_.liturgicaldocument.md#optional-display_settings)
* [hidden](_liturgical_document_.liturgicaldocument.md#hidden)
* [id](_liturgical_document_.liturgicaldocument.md#optional-id)
* [label](_liturgical_document_.liturgicaldocument.md#label)
* [language](_liturgical_document_.liturgicaldocument.md#language)
* [lastRevision](_liturgical_document_.liturgicaldocument.md#lastrevision)
* [lookup](_liturgical_document_.liturgicaldocument.md#optional-lookup)
* [metadata](_liturgical_document_.liturgicaldocument.md#optional-metadata)
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

*Defined in [liturgical-document.ts:227](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L227)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)› | {} |

**Returns:** *[LiturgicalDocument](_liturgical_document_.liturgicaldocument.md)*

## Properties

### `Optional` api

• **api**? : *undefined | string*

*Defined in [liturgical-document.ts:101](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L101)*

The URL (as a string) for the API that provided the document, or against which it can be compiled.

___

###  category

• **category**: *string[]*

*Defined in [liturgical-document.ts:91](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L91)*

Category tags allow searches for things like 'Psalm', 'Canticle', 'Confession', 'Eucharist'.

___

### `Optional` citation

• **citation**? : *string | null*

*Defined in [liturgical-document.ts:142](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L142)*

Biblical or other citation for the document.

**`example`** 
`John 1:14`

___

###  condition

• **condition**: *object*

*Defined in [liturgical-document.ts:94](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L94)*

An array of `Conditions`s determining whether the document should be displayed, given its day.

#### Type declaration:

* **conditions**: *[Condition](_condition_.condition.md)[]*

* **mode**: *"and" | "or"*

___

### `Optional` date_created

• **date_created**? : *any*

*Defined in [liturgical-document.ts:70](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L70)*

Timestamps for document creation and modification

___

### `Optional` date_modified

• **date_modified**? : *any*

*Defined in [liturgical-document.ts:71](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L71)*

___

### `Optional` day

• **day**? : *[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)*

*Defined in [liturgical-document.ts:158](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L158)*

Optional: The liturgical day against which to compile the value, or against which a liturgy has been compiled.
[LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md)

___

### `Optional` display_format

• **display_format**? : *[DisplayFormat](../modules/_liturgical_document_.md#displayformat)*

*Defined in [liturgical-document.ts:85](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L85)*

Specify how the text should be displayed
Unison: the entire text is a congregational response
Abbreviated: only the beginning and end of the text should be displayed
Responsive: alternating parts (for psalms, by verse)
Antiphonal: alternating parts (for psalms, by half-verse)

___

### `Optional` display_settings

• **display_settings**? : *[DisplaySettings](_display_settings_.displaysettings.md)*

*Defined in [liturgical-document.ts:88](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L88)*

Display Settings (font, etc.) to be applied to the document as a whole

___

###  hidden

• **hidden**: *boolean* = false

*Defined in [liturgical-document.ts:169](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L169)*

Marks a document hidden, so it will not display but will not be deleted
Typically used to a hide a subdocument within a larger liturgy without removing it entirely from the structure,
making it easier to restore or toggle on and off

___

### `Optional` id

• **id**? : *number | string*

*Defined in [liturgical-document.ts:67](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L67)*

If provided from a database, `id` is unique identifier/DB primary key

___

###  label

• **label**: *string*

*Defined in [liturgical-document.ts:119](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L119)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Defined in [liturgical-document.ts:131](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L131)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  lastRevision

• **lastRevision**: *number*

*Defined in [liturgical-document.ts:107](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L107)*

Version number of the document

___

### `Optional` lookup

• **lookup**? : *[Lookup](../modules/_liturgical_document_.md#lookup)*

*Defined in [liturgical-document.ts:181](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L181)*

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

*Defined in [liturgical-document.ts:164](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L164)*

Optional: Child classes can store any additional properties they need within the `metadata` object.

**`example`** 
{ response: 'Thanks be to God.' }

___

### `Optional` sharing

• **sharing**? : *[Sharing](_sharing_sharing_.sharing.md)*

*Defined in [liturgical-document.ts:104](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L104)*

Permissions for this document: whether it's public, shared with particular individuals, etc.

___

###  slug

• **slug**: *string*

*Defined in [liturgical-document.ts:113](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L113)*

An identifying slug. Given the `slug`, the API should be able to identify this document.

**`example`** 
`'morning_prayer'`, `'lords_prayer'`

___

### `Optional` source

• **source**? : *[Citation](_citation_citation_.citation.md) | null*

*Defined in [liturgical-document.ts:147](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L147)*

Source for the physical resource within which the document can be found

**`example`** 
{ source: 'bcp1979', 'citation': 'p. 123' }

___

### `Optional` style

• **style**? : *string | null*

*Defined in [liturgical-document.ts:77](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L77)*

An optional string that clarifies the variety; for example, a `Text` could be of the `prayer` style.

___

###  type

• **type**: *TypeTuple[number]*

*Defined in [liturgical-document.ts:74](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L74)*

Indicates the type of document

___

### `Optional` uid

• **uid**? : *undefined | string*

*Defined in [liturgical-document.ts:153](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L153)*

Optional: A unique identifying string based on the slug, for compiled liturgies with multiple instances of the same prayer.

**`example`** 
`'gloria_patri_0'`, `'gloria_patri_1'`

___

### `Optional` value

• **value**? : *[Value](../modules/_liturgical_document_.md#value)*

*Defined in [liturgical-document.ts:184](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L184)*

The content of the document.

___

###  version

• **version**: *string | object*

*Defined in [liturgical-document.ts:137](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L137)*

Identifying code for the version of a liturgy, prayer, psalm, or Bible reading.

**`example`** 
`'Rite-II'`, `'bcp1979'`, `'coverdale'`, `'NRSV'`, `{ preference: "bibleVersion" }`

___

### `Optional` version_label

• **version_label**? : *string | null*

*Defined in [liturgical-document.ts:125](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L125)*

Optional: A human-readable name for this particular version of a larger category of prayer or liturgy.

**`example`** 
`'Lord’s Prayer (Traditional)'`

## Methods

###  availableDisplayFormats

▸ **availableDisplayFormats**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:225](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L225)*

Returns the list of all available `display_format` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableLookupTypes

▸ **availableLookupTypes**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:220](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L220)*

Returns the list of all possible `lookup.type` values

**Returns:** *ReadonlyArray‹string›*

___

###  availableStyles

▸ **availableStyles**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:215](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L215)*

Returns the list of all possible `style` values. Child classes should override if they have styles available.

**Returns:** *ReadonlyArray‹string›*

___

###  availableTypes

▸ **availableTypes**(): *ReadonlyArray‹string›*

*Defined in [liturgical-document.ts:210](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L210)*

Returns the list of all possible `type` values

**Returns:** *ReadonlyArray‹string›*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Defined in [liturgical-document.ts:188](https://github.com/gbj/venite/blob/119e0d6/ldf/src/liturgical-document.ts#L188)*

Evaluates the full set of conditions attached to the document and returns a boolean of whether it should be included
given the day and assigned preferences

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
