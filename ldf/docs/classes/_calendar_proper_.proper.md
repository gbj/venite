[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/proper"](../modules/_calendar_proper_.md) › [Proper](_calendar_proper_.proper.md)

# Class: Proper

## Hierarchy

* **Proper**

## Index

### Constructors

* [constructor](_calendar_proper_.proper.md#constructor)

### Properties

* [label](_calendar_proper_.proper.md#label)
* [proper](_calendar_proper_.proper.md#proper)
* [slug](_calendar_proper_.proper.md#slug)

## Constructors

###  constructor

\+ **new Proper**(`data`: Partial‹[Proper](_calendar_proper_.proper.md)›): *[Proper](_calendar_proper_.proper.md)*

*Defined in [calendar/proper.ts:9](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/proper.ts#L9)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Proper](_calendar_proper_.proper.md)› | {} |

**Returns:** *[Proper](_calendar_proper_.proper.md)*

## Properties

###  label

• **label**: *string*

*Defined in [calendar/proper.ts:9](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/proper.ts#L9)*

A human-readable label for the week, e.g., "Proper 7"

___

###  proper

• **proper**: *number*

*Defined in [calendar/proper.ts:3](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/proper.ts#L3)*

The number of the proper, e.g., 7 for Proper 7

___

###  slug

• **slug**: *string*

*Defined in [calendar/proper.ts:6](https://github.com/gbj/venite/blob/f982f6c/ldf/src/calendar/proper.ts#L6)*

A unique slug used to compose LiturgicalDay slugs, e.g., "proper-7"
