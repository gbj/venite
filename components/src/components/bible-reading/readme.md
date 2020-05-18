# ldf-bible-reading



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                            | Type                     | Default     |
| ---------- | ---------- | ------------------------------------------------------ | ------------------------ | ----------- |
| `doc`      | `doc`      | An LDF BibleReading object.                            | `BibleReading \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                         | `boolean`                | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited | `string`                 | `undefined` |


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
  ldf-liturgy --> ldf-label-bar
  ldf-liturgy --> ldf-editable-delete
  ldf-liturgy --> ldf-liturgical-document
  ldf-liturgy --> ldf-editable-add-block
  ldf-editable-delete --> ion-alert
  ldf-editable-delete --> ion-buttons
  ldf-editable-delete --> ion-button
  ldf-editable-delete --> ion-icon
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-button --> ion-ripple-effect
  ldf-editable-add-block --> ion-modal
  ion-modal --> ion-backdrop
  ldf-meditation --> ion-button
  ldf-meditation --> ion-icon
  ldf-meditation --> ion-label
  ldf-meditation --> ldf-label-bar
  ldf-option --> ion-segment
  ldf-option --> ion-segment-button
  ldf-option --> ion-label
  ldf-option --> ion-select
  ldf-option --> ion-select-option
  ldf-option --> ldf-label-bar
  ldf-option --> ldf-liturgical-document
  ion-segment-button --> ion-ripple-effect
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
