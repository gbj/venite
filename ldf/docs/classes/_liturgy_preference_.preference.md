[@venite/ldf](../README.md) › [Globals](../globals.md) › ["liturgy/preference"](../modules/_liturgy_preference_.md) › [Preference](_liturgy_preference_.preference.md)

# Class: Preference

`Preference` represents a single preference in any given liturgy

## Hierarchy

* **Preference**

## Index

### Constructors

* [constructor](_liturgy_preference_.preference.md#constructor)

### Properties

* [category](_liturgy_preference_.preference.md#optional-category)
* [description](_liturgy_preference_.preference.md#optional-description)
* [descriptionOnlyIfValue](_liturgy_preference_.preference.md#optional-descriptiononlyifvalue)
* [index](_liturgy_preference_.preference.md#optional-index)
* [key](_liturgy_preference_.preference.md#optional-key)
* [label](_liturgy_preference_.preference.md#label)
* [options](_liturgy_preference_.preference.md#options)

### Methods

* [getDefaultPref](_liturgy_preference_.preference.md#getdefaultpref)
* [getPreferenceOption](_liturgy_preference_.preference.md#getpreferenceoption)

## Constructors

###  constructor

\+ **new Preference**(`data`: Partial‹[Preference](_liturgy_preference_.preference.md)›): *[Preference](_liturgy_preference_.preference.md)*

*Defined in [liturgy/preference.ts:38](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L38)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Preference](_liturgy_preference_.preference.md)› | {} |

**Returns:** *[Preference](_liturgy_preference_.preference.md)*

## Properties

### `Optional` category

• **category**? : *undefined | string*

*Defined in [liturgy/preference.ts:13](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L13)*

Optional: Category to which a preference belongs, if any.

**`example`** 
// groups together preferences referring to supplemental devotions
category: 'supplement'

___

### `Optional` description

• **description**? : *undefined | string*

*Defined in [liturgy/preference.ts:16](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L16)*

Optional: Additional descriptive text. Can include HTML.

___

### `Optional` descriptionOnlyIfValue

• **descriptionOnlyIfValue**? : *undefined | string*

*Defined in [liturgy/preference.ts:19](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L19)*

Optional: Only show description (if any) if the given value is selected

___

### `Optional` index

• **index**? : *undefined | number*

*Defined in [liturgy/preference.ts:26](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L26)*

Index for ordering within a set of preferences in the UI. (If not present, defaults to alphabet order.)

___

### `Optional` key

• **key**? : *undefined | string*

*Defined in [liturgy/preference.ts:4](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L4)*

Key of this preference within the parent `Liturgy`’s `preferences`

___

###  label

• **label**: *string*

*Defined in [liturgy/preference.ts:7](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L7)*

Human-readable label for the preference

___

###  options

• **options**: *[PreferenceOption](_liturgy_preference_.preferenceoption.md)[]*

*Defined in [liturgy/preference.ts:23](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L23)*

Array of options for this preference, in order they will be displayed.
Defaults to first in array if `PreferenceOption.default` is not set.

## Methods

###  getDefaultPref

▸ **getDefaultPref**(): *string*

*Defined in [liturgy/preference.ts:34](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L34)*

Returns the default value for the preference

**Returns:** *string*

___

###  getPreferenceOption

▸ **getPreferenceOption**(`value`: string): *[PreferenceOption](_liturgy_preference_.preferenceoption.md) | undefined*

*Defined in [liturgy/preference.ts:29](https://github.com/gbj/venite/blob/0c59dbe7/ldf/src/liturgy/preference.ts#L29)*

Given a `value` for the preference, returns the full option

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *[PreferenceOption](_liturgy_preference_.preferenceoption.md) | undefined*
