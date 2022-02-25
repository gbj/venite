# ldf-string



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                | Description                                                        | Type                                 | Default     |
| ----------------------- | ------------------------ | ------------------------------------------------------------------ | ------------------------------------ | ----------- |
| `citation`              | --                       | Citation (used in Share and Favorite APIs)                         | `SelectableCitation`                 | `undefined` |
| `dropcap`               | `dropcap`                | Enable, disable, or force dropcap on the first letter of the text. | `"disabled" \| "enabled" \| "force"` | `'enabled'` |
| `dropcapMinLength`      | `dropcap-min-length`     | Minimum length (in characters) a string must be to have a dropcap. | `number`                             | `180`       |
| `fragment`              | `fragment`               | A URL fragment that can be used to access this string uniquely     | `string`                             | `undefined` |
| `index`                 | `index`                  | String's index within its parent.                                  | `number`                             | `undefined` |
| `replaceTetragrammaton` | `replace-tetragrammaton` | Enable or disable replacement of tetragrammaton.                   | `boolean`                            | `true`      |
| `text`                  | `text`                   | The text to be processed.                                          | `string`                             | `undefined` |


## Events

| Event              | Description                                            | Type                                                                                                   |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `ldfStringClicked` | Emitted when text is clicked (used for Share/Favorite) | `CustomEvent<{ target: HTMLElement; text: string; citation: SelectableCitation; fragment?: string; }>` |


## Dependencies

### Used by

 - [ldf-bible-reading](../bible-reading)
 - [ldf-heading](../heading)
 - [ldf-psalm](../psalm)
 - [ldf-responsive-prayer](../responsive-prayer)
 - [ldf-text](../text)

### Graph
```mermaid
graph TD;
  ldf-bible-reading --> ldf-string
  ldf-heading --> ldf-string
  ldf-psalm --> ldf-string
  ldf-responsive-prayer --> ldf-string
  ldf-text --> ldf-string
  style ldf-string fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
