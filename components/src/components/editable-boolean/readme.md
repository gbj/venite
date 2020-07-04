# ldf-editable-boolean



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                 | Type      | Default     |
| ---------- | ---------- | ----------------------------------------------------------- | --------- | ----------- |
| `path`     | `path`     | A JSON Pointer that points to the object being edited       | `string`  | `undefined` |
| `property` | `property` | Property name to edit within the object specified by `path` | `string`  | `undefined` |
| `value`    | `value`    | Starting value for editing                                  | `boolean` | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `ldfDocShouldChange` |             | `CustomEvent<Change>` |


## Dependencies

### Used by

 - [ldf-editable-metadata-metadata-fields](../editable-metadata-metadata-fields)

### Depends on

- ion-checkbox

### Graph
```mermaid
graph TD;
  ldf-editable-boolean --> ion-checkbox
  ldf-editable-metadata-metadata-fields --> ldf-editable-boolean
  style ldf-editable-boolean fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
