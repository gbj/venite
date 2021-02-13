[@venite/ldf](../README.md) › [Globals](../globals.md) › ["editing/change"](../modules/_editing_change_.md) › [Change](_editing_change_.change.md)

# Class: Change

## Hierarchy

* **Change**

## Index

### Constructors

* [constructor](_editing_change_.change.md#constructor)

### Properties

* [op](_editing_change_.change.md#op)
* [path](_editing_change_.change.md#path)
* [user](_editing_change_.change.md#optional-user)

### Methods

* [fullyPathedOp](_editing_change_.change.md#fullypathedop)

## Constructors

###  constructor

\+ **new Change**(`data`: Partial‹[Change](_editing_change_.change.md)›): *[Change](_editing_change_.change.md)*

*Defined in [editing/change.ts:20](https://github.com/gbj/venite/blob/1cc76cd2/ldf/src/editing/change.ts#L20)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Change](_editing_change_.change.md)› | {} |

**Returns:** *[Change](_editing_change_.change.md)*

## Properties

###  op

• **op**: *[Operation](_editing_change_.operation.md)[]*

*Defined in [editing/change.ts:12](https://github.com/gbj/venite/blob/1cc76cd2/ldf/src/editing/change.ts#L12)*

___

###  path

• **path**: *string*

*Defined in [editing/change.ts:11](https://github.com/gbj/venite/blob/1cc76cd2/ldf/src/editing/change.ts#L11)*

___

### `Optional` user

• **user**? : *undefined | string*

*Defined in [editing/change.ts:10](https://github.com/gbj/venite/blob/1cc76cd2/ldf/src/editing/change.ts#L10)*

## Methods

###  fullyPathedOp

▸ **fullyPathedOp**(): *[Operation](_editing_change_.operation.md)[]*

*Defined in [editing/change.ts:14](https://github.com/gbj/venite/blob/1cc76cd2/ldf/src/editing/change.ts#L14)*

**Returns:** *[Operation](_editing_change_.operation.md)[]*
