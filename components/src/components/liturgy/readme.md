# ldf-liturgy



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                | Type                | Default     |
| ---------- | ---------- | -------------------------------------------------------------------------- | ------------------- | ----------- |
| `doc`      | `doc`      | An LDF Liturgy object. If both `doc` and `json` are passed, `doc` is used. | `Liturgy \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                                             | `boolean`           | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Liturgy being edited                     | `string`            | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-liturgical-document](../liturgical-document)

### Graph
```mermaid
graph TD;
  ldf-liturgy --> ldf-liturgical-document
  ldf-liturgical-document --> ldf-liturgy
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
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
  ldf-bible-reading --> ldf-label-bar
  ldf-bible-reading --> ldf-string
  ldf-bible-reading --> ldf-heading
  ldf-bible-reading --> ldf-liturgical-document
  ldf-psalm --> ldf-refrain
  ldf-psalm --> ldf-heading
  ldf-psalm --> ldf-label-bar
  ldf-psalm --> ldf-editable-text
  ldf-psalm --> ldf-string
  style ldf-liturgy fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
