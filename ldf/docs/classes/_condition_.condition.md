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

*Defined in [condition.ts:145](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L145)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Condition](_condition_.condition.md)› | {} |

**Returns:** *[Condition](_condition_.condition.md)*

## Properties

### `Optional` date

• **date**? : *undefined | object*

*Defined in [condition.ts:36](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L36)*

___

### `Optional` day

• **day**? : *undefined | object*

*Defined in [condition.ts:8](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L8)*

___

### `Optional` feastDay

• **feastDay**? : *undefined | false | true*

*Defined in [condition.ts:20](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L20)*

___

### `Optional` preference

• **preference**? : *undefined | object*

*Defined in [condition.ts:44](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L44)*

___

### `Optional` season

• **season**? : *undefined | object*

*Defined in [condition.ts:14](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L14)*

___

### `Optional` week

• **week**? : *undefined | object*

*Defined in [condition.ts:30](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L30)*

___

### `Optional` weekday

• **weekday**? : *undefined | object*

*Defined in [condition.ts:24](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L24)*

## Methods

###  exceptOnlyFactory

▸ **exceptOnlyFactory**(`property`: "day" | "season" | "weekday" | "week", `include`: string, `evaluatedConditions`: boolean[]): *void*

*Defined in [condition.ts:134](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L134)*

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

*Defined in [condition.ts:51](https://github.com/gbj/venite/blob/8cf9e9f/ldf/src/condition.ts#L51)*

Given a liturgical day and a set of preferences, evaluates whether the condition should be included

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`day` | [LiturgicalDay](_calendar_liturgical_day_.liturgicalday.md) | - |
`prefs` | [ClientPreferences](_liturgy_client_preferences_.clientpreferences.md) | {} |

**Returns:** *boolean*
