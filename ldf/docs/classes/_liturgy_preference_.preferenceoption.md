[@venite/ldf](../README.md) › [Globals](../globals.md) › ["liturgy/preference"](../modules/_liturgy_preference_.md) › [PreferenceOption](_liturgy_preference_.preferenceoption.md)

# Class: PreferenceOption

## Hierarchy

* **PreferenceOption**

## Index

### Properties

* [default](_liturgy_preference_.preferenceoption.md#optional-default)
* [label](_liturgy_preference_.preferenceoption.md#label)
* [metadata](_liturgy_preference_.preferenceoption.md#optional-metadata)
* [value](_liturgy_preference_.preferenceoption.md#value)

## Properties

### `Optional` default

• **default**? : *undefined | false | true*

*Defined in [liturgy/preference.ts:52](https://github.com/gbj/venite/blob/c54ff8d/ldf/src/liturgy/preference.ts#L52)*

Default value for this preference.

___

###  label

• **label**: *string*

*Defined in [liturgy/preference.ts:49](https://github.com/gbj/venite/blob/c54ff8d/ldf/src/liturgy/preference.ts#L49)*

Human-readable label for the

**`example`** 
'30-Day Psalm Cycle'

___

### `Optional` metadata

• **metadata**? : *undefined | object*

*Defined in [liturgy/preference.ts:55](https://github.com/gbj/venite/blob/c54ff8d/ldf/src/liturgy/preference.ts#L55)*

Can be used to pass additional data that the liturgy compiler will use.

___

###  value

• **value**: *string*

*Defined in [liturgy/preference.ts:44](https://github.com/gbj/venite/blob/c54ff8d/ldf/src/liturgy/preference.ts#L44)*

Machine-readable value, which will probably be used in a `Piece.condition`

**`example`** 
'bcp1979_30day_psalter'
