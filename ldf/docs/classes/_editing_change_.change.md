[@venite/ldf](../README.md) › [Globals](../globals.md) › ["editing/change"](../modules/_editing_change_.md) › [Change](_editing_change_.change.md)

# Class: Change

## Hierarchy

* **Change**

## Index

### Constructors

* [constructor](_editing_change_.change.md#constructor)

### Properties

* [length](_editing_change_.change.md#length)
* [op](_editing_change_.change.md#op)
* [path](_editing_change_.change.md#path)
* [pos](_editing_change_.change.md#pos)
* [user](_editing_change_.change.md#optional-user)
* [value](_editing_change_.change.md#value)

## Constructors

###  constructor

\+ **new Change**(`path`: string, `op`: "insert" | "delete" | "set", `pos`: number, `length`: number, `value`: string): *[Change](_editing_change_.change.md)*

*Defined in [editing/change.ts:7](https://github.com/gbj/venite/blob/f982f6c/ldf/src/editing/change.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`op` | "insert" &#124; "delete" &#124; "set" |
`pos` | number |
`length` | number |
`value` | string |

**Returns:** *[Change](_editing_change_.change.md)*

## Properties

###  length

• **length**: *number*

*Defined in [editing/change.ts:6](https://github.com/gbj/venite/blob/f982f6c/ldf/src/editing/change.ts#L6)*

___

###  op

• **op**: *"insert" | "delete" | "set"*

*Defined in [editing/change.ts:4](https://github.com/gbj/venite/blob/f982f6c/ldf/src/editing/change.ts#L4)*

___

###  path

• **path**: *string*

*Defined in [editing/change.ts:3](https://github.com/gbj/venite/blob/f982f6c/ldf/src/editing/change.ts#L3)*

___

###  pos

• **pos**: *number*

*Defined in [editing/change.ts:5](https://github.com/gbj/venite/blob/f982f6c/ldf/src/editing/change.ts#L5)*

___

### `Optional` user

• **user**? : *undefined | string*

*Defined in [editing/change.ts:2](https://github.com/gbj/venite/blob/f982f6c/ldf/src/editing/change.ts#L2)*

___

###  value

• **value**: *string*

*Defined in [editing/change.ts:7](https://github.com/gbj/venite/blob/f982f6c/ldf/src/editing/change.ts#L7)*
