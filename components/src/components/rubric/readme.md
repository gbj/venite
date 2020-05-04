# ldf-rubric



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                               | Type               | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------- | ------------------ | ----------- |
| `doc`      | `doc`      | An LDF Rubric object. If both `doc` and `json` are passed, `doc` is used. | `Rubric \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                                            | `boolean`          | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited                    | `string`           | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-label-bar](../label-bar)
- [ldf-editable-text](../editable-text)

### Graph
```mermaid
graph TD;
  ldf-rubric --> ldf-label-bar
  ldf-rubric --> ldf-editable-text
  ldf-liturgical-document --> ldf-rubric
  style ldf-rubric fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
