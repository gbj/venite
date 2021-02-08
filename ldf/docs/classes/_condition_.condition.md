[@venite/ldf](../README.md) › [Globals](../globals.md) › ["condition"](../modules/_condition_.md) › [Condition](_condition_.condition.md)

# Class: Condition

## Hierarchy

* **Condition**

## Index

### Constructors

* [constructor](_condition_.condition.md#constructor)

### Properties

* [date](_condition_.condition.md#optional-date)
* [day](_condition_.condition.md#optional-day)
* [feastDay](_condition_.condition.md#optional-feastday)
* [preference](_condition_.condition.md#optional-preference)
* [season](_condition_.condition.md#optional-season)
* [week](_condition_.condition.md#optional-week)
* [weekday](_condition_.condition.md#optional-weekday)

### Methods

* [exceptOnlyFactory](_condition_.condition.md#exceptonlyfactory)
* [include](_condition_.condition.md#include)

## Constructors

###  constructor

\+ **new Condition**(`data`: Partial‹[Condition](_condition_.condition.md)›): *[Condition](_condition_.condition.md)*

*Defined in [condition.ts:148](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L148)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Condition](_condition_.condition.md)› | {} |

**Returns:** *[Condition](_condition_.condition.md)*

## Properties

### `Optional` date

• **date**? : *undefined | object*

*Defined in [condition.ts:37](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L37)*

___

### `Optional` day

• **day**? : *undefined | object*

*Defined in [condition.ts:9](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L9)*

___

### `Optional` feastDay

• **feastDay**? : *undefined | false | true*

*Defined in [condition.ts:21](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L21)*

___

### `Optional` preference

• **preference**? : *undefined | object*

*Defined in [condition.ts:45](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L45)*

___

### `Optional` season

• **season**? : *undefined | object*

*Defined in [condition.ts:15](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L15)*

___

### `Optional` week

• **week**? : *undefined | object*

*Defined in [condition.ts:31](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L31)*

___

### `Optional` weekday

• **weekday**? : *undefined | object*

*Defined in [condition.ts:25](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L25)*

## Methods

###  exceptOnlyFactory

▸ **exceptOnlyFactory**(`property`: "day" | "season" | "weekday" | "week", `include`: string, `evaluatedConditions`: boolean[]): *void*

*Defined in [condition.ts:137](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L137)*

**Parameters:**

Name | Type |
------ | ------ |
`property` | "day" &#124; "season" &#124; "weekday" &#124; "week" |
`include` | string |
`evaluatedConditions` | boolean[] |

**Returns:** *void*

___

###  include

▸ **include**(`day`: [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md), `prefs`: [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md)): *boolean*

*Defined in [condition.ts:52](https://github.com/gbj/venite/blob/cfa2644b/ldf/src/condition.ts#L52)*

Given a liturgical day and a set of preferences, evaluates whether the condition should be included

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
