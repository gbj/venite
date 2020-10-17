# ldf-image



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                            | Type              | Default     |
| ---------- | ---------- | ------------------------------------------------------ | ----------------- | ----------- |
| `doc`      | `doc`      | An LDF Image object.                                   | `Image \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                         | `boolean`         | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited | `string`          | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-label-bar](../label-bar)
- [ldf-editable-text](../editable-text)

### Graph
```mermaid
graph TD;
  ldf-image --> ldf-label-bar
  ldf-image --> ldf-editable-text
  ldf-editable-text --> ion-input
  ldf-liturgical-document --> ldf-image
  style ldf-image fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*