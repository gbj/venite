# ldf-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                               | Type               | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------- | ------------------ | ----------- |
| `doc`      | `doc`      | An LDF Option object. If both `doc` and `json` are passed, `doc` is used. | `Option \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                                            | `boolean`          | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Option being edited                     | `string`           | `undefined` |


## Methods

### `select(index: number) => Promise<void>`

Display the nth option

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- ion-segment
- ion-segment-button
- ion-label
- ion-select
- ion-select-option
- [ldf-label-bar](../label-bar)
- [ldf-liturgical-document](../liturgical-document)

### Graph
```mermaid
graph TD;
  ldf-option --> ion-segment
  ldf-option --> ion-segment-button
  ldf-option --> ion-label
  ldf-option --> ion-select
  ldf-option --> ion-select-option
  ldf-option --> ldf-label-bar
  ldf-option --> ldf-liturgical-document
  ion-segment-button --> ion-ripple-effect
  ldf-liturgical-document --> ldf-option
  ldf-liturgy --> ldf-liturgical-document
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-meditation --> ion-button
  ldf-meditation --> ion-icon
  ldf-meditation --> ion-label
  ldf-meditation --> ldf-label-bar
  ion-button --> ion-ripple-effect
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
  ldf-bible-reading --> ldf-label-bar
  ldf-bible-reading --> ldf-string
  ldf-bible-reading --> ldf-heading
  ldf-bible-reading --> ldf-liturgical-document
  ldf-psalm --> ldf-refrain
  ldf-psalm --> ldf-heading
  ldf-psalm --> ldf-label-bar
  ldf-psalm --> ldf-editable-text
  ldf-psalm --> ldf-string
  ldf-editable-add-block --> ion-modal
  ion-modal --> ion-backdrop
  style ldf-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
