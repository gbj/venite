[@venite/ldf](../README.md) › [Globals](../globals.md) › ["display-settings"](../modules/_display_settings_.md) › [DisplaySettings](_display_settings_.displaysettings.md)

# Class: DisplaySettings

## Hierarchy

* **DisplaySettings**

## Index

### Constructors

* [constructor](_display_settings_.displaysettings.md#constructor)

### Properties

* [bibleVerses](_display_settings_.displaysettings.md#bibleverses)
* [bolded](_display_settings_.displaysettings.md#bolded)
* [darkmode](_display_settings_.displaysettings.md#darkmode)
* [dropcaps](_display_settings_.displaysettings.md#dropcaps)
* [font](_display_settings_.displaysettings.md#font)
* [fontscale](_display_settings_.displaysettings.md#fontscale)
* [meditationBell](_display_settings_.displaysettings.md#meditationbell)
* [psalmPause](_display_settings_.displaysettings.md#psalmpause)
* [psalmVerses](_display_settings_.displaysettings.md#psalmverses)
* [repeatAntiphon](_display_settings_.displaysettings.md#repeatantiphon)
* [response](_display_settings_.displaysettings.md#response)
* [voiceBackground](_display_settings_.displaysettings.md#voicebackground)
* [voiceBackgroundVolume](_display_settings_.displaysettings.md#voicebackgroundvolume)
* [voiceChoice](_display_settings_.displaysettings.md#voicechoice)
* [voiceRate](_display_settings_.displaysettings.md#voicerate)

## Constructors

###  constructor

\+ **new DisplaySettings**(`dropcaps`: "decorated" | "plain" | "none", `response`: "bold" | "italics", `repeatAntiphon`: "bracket" | "repeat" | "none", `fontscale`: "s" | "m" | "l" | "xl" | "xxl", `font`: "garamond" | "gill-sans", `voiceChoice`: string, `voiceRate`: number, `voiceBackground`: "silence" | "seashore" | "garden" | "night" | "silence-short", `voiceBackgroundVolume`: number, `psalmVerses`: boolean, `bibleVerses`: boolean, `meditationBell`: "silence" | "singing-bowl", `darkmode`: "auto" | "dark" | "light" | "ecru", `bolded`: "both" | "unison" | "response" | "none", `psalmPause`: number): *[DisplaySettings](_display_settings_.displaysettings.md)*

*Defined in [display-settings.ts:1](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L1)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`dropcaps` | "decorated" &#124; "plain" &#124; "none" | "plain" |
`response` | "bold" &#124; "italics" | "bold" |
`repeatAntiphon` | "bracket" &#124; "repeat" &#124; "none" | "bracket" |
`fontscale` | "s" &#124; "m" &#124; "l" &#124; "xl" &#124; "xxl" | "m" |
`font` | "garamond" &#124; "gill-sans" | "garamond" |
`voiceChoice` | string | "" |
`voiceRate` | number | 0.85 |
`voiceBackground` | "silence" &#124; "seashore" &#124; "garden" &#124; "night" &#124; "silence-short" | "silence" |
`voiceBackgroundVolume` | number | 0.5 |
`psalmVerses` | boolean | false |
`bibleVerses` | boolean | false |
`meditationBell` | "silence" &#124; "singing-bowl" | "singing-bowl" |
`darkmode` | "auto" &#124; "dark" &#124; "light" &#124; "ecru" | "auto" |
`bolded` | "both" &#124; "unison" &#124; "response" &#124; "none" | "both" |
`psalmPause` | number | 1000 |

**Returns:** *[DisplaySettings](_display_settings_.displaysettings.md)*

## Properties

###  bibleVerses

• **bibleVerses**: *boolean*

*Defined in [display-settings.ts:13](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L13)*

___

###  bolded

• **bolded**: *"both" | "unison" | "response" | "none"*

*Defined in [display-settings.ts:16](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L16)*

___

###  darkmode

• **darkmode**: *"auto" | "dark" | "light" | "ecru"*

*Defined in [display-settings.ts:15](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L15)*

___

###  dropcaps

• **dropcaps**: *"decorated" | "plain" | "none"*

*Defined in [display-settings.ts:3](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L3)*

___

###  font

• **font**: *"garamond" | "gill-sans"*

*Defined in [display-settings.ts:7](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L7)*

___

###  fontscale

• **fontscale**: *"s" | "m" | "l" | "xl" | "xxl"*

*Defined in [display-settings.ts:6](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L6)*

___

###  meditationBell

• **meditationBell**: *"silence" | "singing-bowl"*

*Defined in [display-settings.ts:14](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L14)*

___

###  psalmPause

• **psalmPause**: *number*

*Defined in [display-settings.ts:17](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L17)*

___

###  psalmVerses

• **psalmVerses**: *boolean*

*Defined in [display-settings.ts:12](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L12)*

___

###  repeatAntiphon

• **repeatAntiphon**: *"bracket" | "repeat" | "none"*

*Defined in [display-settings.ts:5](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L5)*

___

###  response

• **response**: *"bold" | "italics"*

*Defined in [display-settings.ts:4](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L4)*

___

###  voiceBackground

• **voiceBackground**: *"silence" | "seashore" | "garden" | "night" | "silence-short"*

*Defined in [display-settings.ts:10](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L10)*

___

###  voiceBackgroundVolume

• **voiceBackgroundVolume**: *number*

*Defined in [display-settings.ts:11](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L11)*

___

###  voiceChoice

• **voiceChoice**: *string*

*Defined in [display-settings.ts:8](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L8)*

___

###  voiceRate

• **voiceRate**: *number*

*Defined in [display-settings.ts:9](https://github.com/gbj/venite/blob/d0aafc2f/ldf/src/display-settings.ts#L9)*
