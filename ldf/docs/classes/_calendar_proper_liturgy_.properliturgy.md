[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/proper-liturgy"](../modules/_calendar_proper_liturgy_.md) › [ProperLiturgy](_calendar_proper_liturgy_.properliturgy.md)

# Class: ProperLiturgy

Holds instructions on how to adapt liturgies given the Proper Liturgies for Special Days
e.g., Ash Wednesday,

## Hierarchy

* **ProperLiturgy**

## Index

### Properties

* [label](_calendar_proper_liturgy_.properliturgy.md#label)
* [language](_calendar_proper_liturgy_.properliturgy.md#language)
* [liturgy](_calendar_proper_liturgy_.properliturgy.md#liturgy)
* [preference](_calendar_proper_liturgy_.properliturgy.md#preference)
* [slug](_calendar_proper_liturgy_.properliturgy.md#slug)

## Properties

###  label

• **label**: *string*

*Defined in [calendar/proper-liturgy.ts:16](https://github.com/gbj/venite/blob/a8a1a2e2/ldf/src/calendar/proper-liturgy.ts#L16)*

A human-readable name; either the name of the whole liturgy, or a label for a piece.

**`example`** 
`'Morning Prayer'`, `'The Apostles’ Creed'`

___

###  language

• **language**: *string*

*Defined in [calendar/proper-liturgy.ts:21](https://github.com/gbj/venite/blob/a8a1a2e2/ldf/src/calendar/proper-liturgy.ts#L21)*

Language code (typically an ISO 639-1 two-letter code)

**`example`** 
`'en'`

___

###  liturgy

• **liturgy**: *string*

*Defined in [calendar/proper-liturgy.ts:11](https://github.com/gbj/venite/blob/a8a1a2e2/ldf/src/calendar/proper-liturgy.ts#L11)*

Chooses a particular liturgy

___

###  preference

• **preference**: *string*

*Defined in [calendar/proper-liturgy.ts:8](https://github.com/gbj/venite/blob/a8a1a2e2/ldf/src/calendar/proper-liturgy.ts#L8)*

Set a particular preference to the value `true` when loading liturgy

___

###  slug

• **slug**: *string*

*Defined in [calendar/proper-liturgy.ts:5](https://github.com/gbj/venite/blob/a8a1a2e2/ldf/src/calendar/proper-liturgy.ts#L5)*

Matches to slug of a LiturgicalDay
