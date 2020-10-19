# ldf-refrain



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                            | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------ | --------- | ----------- |
| `doc`      | `doc`      | An LDF Refrain object.                                 | `any`     | `undefined` |
| `editable` | `editable` | Whether the object is editable                         | `boolean` | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited | `string`  | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-label-bar](../label-bar)
- [ldf-editable-text](../editable-text)

### Graph
```mermaid
graph TD;
  ldf-refrain --> ldf-label-bar
  ldf-refrain --> ldf-editable-text
  ldf-editable-text --> ion-input
  ldf-liturgical-document --> ldf-refrain
  style ldf-refrain fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
