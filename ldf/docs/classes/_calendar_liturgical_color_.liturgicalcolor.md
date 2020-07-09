[@venite/ldf](../README.md) › [Globals](../globals.md) › ["calendar/liturgical-color"](../modules/_calendar_liturgical_color_.md) › [LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md)

# Class: LiturgicalColor

## Hierarchy

* **LiturgicalColor**

## Index

### Constructors

* [constructor](_calendar_liturgical_color_.liturgicalcolor.md#constructor)

### Properties

* [hex](_calendar_liturgical_color_.liturgicalcolor.md#hex)
* [image](_calendar_liturgical_color_.liturgicalcolor.md#optional-image)
* [imageUrl](_calendar_liturgical_color_.liturgicalcolor.md#optional-imageurl)
* [name](_calendar_liturgical_color_.liturgicalcolor.md#name)

## Constructors

###  constructor

\+ **new LiturgicalColor**(`data`: Partial‹[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md)›): *[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md)*

*Defined in [calendar/liturgical-color.ts:16](https://github.com/gbj/venite/blob/3dc0c1d/ldf/src/calendar/liturgical-color.ts#L16)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | Partial‹[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md)› | {} |

**Returns:** *[LiturgicalColor](_calendar_liturgical_color_.liturgicalcolor.md)*

## Properties

###  hex

• **hex**: *string*

*Defined in [calendar/liturgical-color.ts:10](https://github.com/gbj/venite/blob/3dc0c1d/ldf/src/calendar/liturgical-color.ts#L10)*

Hex code (including #) or other CSS-compliant color code

**`example`** 
`'#ff0000'`

___

### `Optional` image

• **image**? : *undefined | string*

*Defined in [calendar/liturgical-color.ts:13](https://github.com/gbj/venite/blob/3dc0c1d/ldf/src/calendar/liturgical-color.ts#L13)*

URL for icon to be used for this color

___

### `Optional` imageUrl

• **imageUrl**? : *undefined | string*

*Defined in [calendar/liturgical-color.ts:16](https://github.com/gbj/venite/blob/3dc0c1d/ldf/src/calendar/liturgical-color.ts#L16)*

Citation URL for the image

___

###  name

• **name**: *string*

*Defined in [calendar/liturgical-color.ts:5](https://github.com/gbj/venite/blob/3dc0c1d/ldf/src/calendar/liturgical-color.ts#L5)*

Unique, identifying name

**`example`** 
`'Red'`
