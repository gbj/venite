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

*Defined in [editing/change.ts:33](https://github.com/gbj/venite/blob/2028f78/ldf/src/editing/change.ts#L33)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Change](_editing_change_.change.md)› | {} |

**Returns:** *[Change](_editing_change_.change.md)*

## Properties

###  op

• **op**: *[Operation](_editing_change_.operation.md)[]*

*Defined in [editing/change.ts:23](https://github.com/gbj/venite/blob/2028f78/ldf/src/editing/change.ts#L23)*

___

###  path

• **path**: *string*

*Defined in [editing/change.ts:22](https://github.com/gbj/venite/blob/2028f78/ldf/src/editing/change.ts#L22)*

___

### `Optional` user

• **user**? : *undefined | string*

*Defined in [editing/change.ts:21](https://github.com/gbj/venite/blob/2028f78/ldf/src/editing/change.ts#L21)*

## Methods

###  fullyPathedOp

▸ **fullyPathedOp**(): *[Operation](_editing_change_.operation.md)[]*

*Defined in [editing/change.ts:25](https://github.com/gbj/venite/blob/2028f78/ldf/src/editing/change.ts#L25)*

**Returns:** *[Operation](_editing_change_.operation.md)[]*
