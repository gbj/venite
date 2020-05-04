# ldf-bible-reading



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                     | Type                     | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------- | ------------------------ | ----------- |
| `doc`      | `doc`      | An LDF BibleReading object. If both `doc` and `json` are passed, `doc` is used. | `BibleReading \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                                                  | `boolean`                | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited                          | `string`                 | `undefined` |


## Methods

### `getLocaleStrings() => Promise<{ [x: string]: string; }>`

Asynchronously return localization strings

#### Returns

Type: `Promise<{ [x: string]: string; }>`



### `loadCitation(citation?: string, version?: string) => Promise<void>`

Load and render a particular Bible passage given by citation from the API

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-label-bar](../label-bar)
- [ldf-string](../string)
- [ldf-heading](../heading)
- [ldf-liturgical-document](../liturgical-document)

### Graph
```mermaid
graph TD;
  ldf-bible-reading --> ldf-label-bar
  ldf-bible-reading --> ldf-string
  ldf-bible-reading --> ldf-heading
  ldf-bible-reading --> ldf-liturgical-document
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-liturgical-document --> ldf-bible-reading
  ldf-option --> ldf-label-bar
  ldf-option --> ldf-liturgical-document
  ldf-refrain --> ldf-label-bar
  ldf-refrain --> ldf-editable-text
  ldf-rubric --> ldf-label-bar
  ldf-rubric --> ldf-editable-text
  ldf-text --> ldf-label-bar
  ldf-text --> ldf-heading
  ldf-text --> ldf-editable-text
  ldf-text --> ldf-string
  ldf-responsive-prayer --> ldf-editable-text
  ldf-responsive-prayer --> ldf-string
  ldf-responsive-prayer --> ldf-label-bar
  ldf-responsive-prayer --> ldf-heading
  ldf-psalm --> ldf-refrain
  ldf-psalm --> ldf-heading
  ldf-psalm --> ldf-label-bar
  ldf-psalm --> ldf-editable-text
  ldf-psalm --> ldf-string
  style ldf-bible-reading fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
