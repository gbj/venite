# ldf-psalm



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                            | Type              | Default     |
| ---------- | ---------- | ------------------------------------------------------ | ----------------- | ----------- |
| `doc`      | `doc`      | An LDF Psalm object.                                   | `Psalm \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                         | `boolean`         | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited | `string`          | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-refrain](../refrain)
- [ldf-heading](../heading)
- [ldf-label-bar](../label-bar)
- [ldf-editable-text](../editable-text)
- [ldf-string](../string)

### Graph
```mermaid
graph TD;
  ldf-psalm --> ldf-refrain
  ldf-psalm --> ldf-heading
  ldf-psalm --> ldf-label-bar
  ldf-psalm --> ldf-editable-text
  ldf-psalm --> ldf-string
  ldf-refrain --> ldf-label-bar
  ldf-refrain --> ldf-editable-text
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-liturgical-document --> ldf-psalm
  style ldf-psalm fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
