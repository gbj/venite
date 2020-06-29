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
* [label](_liturgy_preference_.preference.md#label)
* [options](_liturgy_preference_.preference.md#options)

### Methods

* [getDefaultPref](_liturgy_preference_.preference.md#getdefaultpref)
* [getPreferenceOption](_liturgy_preference_.preference.md#getpreferenceoption)

## Constructors

###  constructor

\+ **new Preference**(`data`: Partial‹[Preference](_liturgy_preference_.preference.md)›): *[Preference](_liturgy_preference_.preference.md)*

*Defined in [liturgy/preference.ts:29](https://github.com/gbj/venite/blob/87a9139/ldf/src/liturgy/preference.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Preference](_liturgy_preference_.preference.md)› | {} |

**Returns:** *[Preference](_liturgy_preference_.preference.md)*

## Properties

### `Optional` category

• **category**? : *undefined | string*

*Defined in [liturgy/preference.ts:10](https://github.com/gbj/venite/blob/87a9139/ldf/src/liturgy/preference.ts#L10)*

Optional: Category to which a preference belongs, if any.

**`example`** 
// groups together preferences referring to supplemental devotions
category: 'supplement'

___

### `Optional` description

• **description**? : *undefined | string*

*Defined in [liturgy/preference.ts:13](https://github.com/gbj/venite/blob/87a9139/ldf/src/liturgy/preference.ts#L13)*

Optional: Additional descriptive text. Can include HTML.

___

###  label

• **label**: *string*

*Defined in [liturgy/preference.ts:4](https://github.com/gbj/venite/blob/87a9139/ldf/src/liturgy/preference.ts#L4)*

Human-readable label for the preference

___

###  options

• **options**: *[PreferenceOption](_liturgy_preference_.preferenceoption.md)[]*

*Defined in [liturgy/preference.ts:17](https://github.com/gbj/venite/blob/87a9139/ldf/src/liturgy/preference.ts#L17)*

Array of options for this preference, in order they will be displayed.
Defaults to first in array if `PreferenceOption.default` is not set.

## Methods

###  getDefaultPref

▸ **getDefaultPref**(): *string*

*Defined in [liturgy/preference.ts:25](https://github.com/gbj/venite/blob/87a9139/ldf/src/liturgy/preference.ts#L25)*

Returns the default value for the preference

**Returns:** *string*

___

###  getPreferenceOption

▸ **getPreferenceOption**(`value`: string): *[PreferenceOption](_liturgy_preference_.preferenceoption.md) | undefined*

*Defined in [liturgy/preference.ts:20](https://github.com/gbj/venite/blob/87a9139/ldf/src/liturgy/preference.ts#L20)*

Given a `value` for the preference, returns the full option

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *[PreferenceOption](_liturgy_preference_.preferenceoption.md) | undefined*
