[@venite/ldf](../README.md) › [Globals](../globals.md) › ["citation/citation"](../modules/_citation_citation_.md) › [Citation](_citation_citation_.citation.md)

# Class: Citation

## Hierarchy

* **Citation**

## Index

### Constructors

* [constructor](_citation_citation_.citation.md#constructor)

### Properties

* [api](_citation_citation_.citation.md#api)
* [citation](_citation_citation_.citation.md#citation)
* [source](_citation_citation_.citation.md#source)

### Methods

* [toString](_citation_citation_.citation.md#tostring)

## Constructors

###  constructor

\+ **new Citation**(`data`: Partial‹[Citation](_citation_citation_.citation.md)›): *[Citation](_citation_citation_.citation.md)*

*Defined in [citation/citation.ts:16](https://github.com/gbj/venite/blob/9b895578/ldf/src/citation/citation.ts#L16)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[Citation](_citation_citation_.citation.md)› | {} |

**Returns:** *[Citation](_citation_citation_.citation.md)*

## Properties

###  api

• **api**: *string* = "https://www.venite.app/api"

*Defined in [citation/citation.ts:3](https://github.com/gbj/venite/blob/9b895578/ldf/src/citation/citation.ts#L3)*

The URL (as a string) for the API from which more information about the source can be found

___

###  citation

• **citation**: *string*

*Defined in [citation/citation.ts:11](https://github.com/gbj/venite/blob/9b895578/ldf/src/citation/citation.ts#L11)*

Citation within that source

**`example`** 
`'p. 812'`, `'#126'`, `'10.1.13'`

___

###  source

• **source**: *string*

*Defined in [citation/citation.ts:6](https://github.com/gbj/venite/blob/9b895578/ldf/src/citation/citation.ts#L6)*

A machine-readable unique identifying slug for the source

## Methods

###  toString

▸ **toString**(`suppressSource`: boolean): *string*

*Defined in [citation/citation.ts:14](https://github.com/gbj/venite/blob/9b895578/ldf/src/citation/citation.ts#L14)*

Provides a human-readable string form of the citation

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`suppressSource` | boolean | false |

**Returns:** *string*
