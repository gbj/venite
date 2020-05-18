# ldf-liturgical-document



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                       | Type                           | Default     |
| ---------- | ---------- | ----------------------------------------------------------------- | ------------------------------ | ----------- |
| `doc`      | `doc`      | An LDF LiturgicalDocument object.                                 | `LiturgicalDocument \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                                    | `boolean`                      | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the LiturgicalDocument being edited | `string`                       | `undefined` |


## Events

| Event       | Description | Type                              |
| ----------- | ----------- | --------------------------------- |
| `focusObj`  |             | `CustomEvent<LiturgicalDocument>` |
| `focusPath` |             | `CustomEvent<string>`             |


## Dependencies

### Used by

 - [ldf-bible-reading](../bible-reading)
 - [ldf-editor](../editor)
 - [ldf-liturgy](../liturgy)
 - [ldf-option](../option)

### Depends on

- [ldf-liturgy](../liturgy)
- [ldf-heading](../heading)
- [ldf-meditation](../meditation)
- [ldf-option](../option)
- [ldf-refrain](../refrain)
- [ldf-rubric](../rubric)
- [ldf-text](../text)
- [ldf-responsive-prayer](../responsive-prayer)
- [ldf-bible-reading](../bible-reading)
- [ldf-psalm](../psalm)

### Graph
```mermaid
graph TD;
  ldf-liturgical-document --> ldf-liturgy
  ldf-liturgical-document --> ldf-heading
  ldf-liturgical-document --> ldf-meditation
  ldf-liturgical-document --> ldf-option
  ldf-liturgical-document --> ldf-refrain
  ldf-liturgical-document --> ldf-rubric
  ldf-liturgical-document --> ldf-text
  ldf-liturgical-document --> ldf-responsive-prayer
  ldf-liturgical-document --> ldf-bible-reading
  ldf-liturgical-document --> ldf-psalm
  ldf-liturgy --> ldf-liturgical-document
  ldf-editable-delete --> ion-alert
  ldf-editable-delete --> ion-buttons
  ldf-editable-delete --> ion-button
  ldf-editable-delete --> ion-icon
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-button --> ion-ripple-effect
  ldf-editable-add-block --> ion-modal
  ion-modal --> ion-backdrop
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-meditation --> ion-button
  ldf-meditation --> ion-icon
  ldf-meditation --> ion-label
  ldf-meditation --> ldf-label-bar
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
  ldf-bible-reading --> ldf-liturgical-document
  ldf-psalm --> ldf-refrain
  ldf-psalm --> ldf-heading
  ldf-psalm --> ldf-label-bar
  ldf-psalm --> ldf-editable-text
  ldf-psalm --> ldf-string
  ldf-editor --> ldf-liturgical-document
  style ldf-liturgical-document fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
