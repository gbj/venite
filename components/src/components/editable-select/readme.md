# ldf-editable-select



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                 | Type                                            | Default     |
| ---------- | ---------- | ----------------------------------------------------------- | ----------------------------------------------- | ----------- |
| `options`  | --         | Options to include in the list                              | `{ value: string \| number; label: string; }[]` | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the object being edited       | `string`                                        | `undefined` |
| `property` | `property` | Property name to edit within the object specified by `path` | `string`                                        | `undefined` |
| `value`    | `value`    | Starting value for editing                                  | `number \| string`                              | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `ldfDocShouldChange` |             | `CustomEvent<Change>` |


## Dependencies

### Used by

 - [ldf-editable-metadata](../editable-metadata)
 - [ldf-editable-metadata-metadata-fields](../editable-metadata-metadata-fields)

### Depends on

- ion-select
- ion-select-option

### Graph
```mermaid
graph TD;
  ldf-editable-select --> ion-select
  ldf-editable-select --> ion-select-option
  ldf-editable-metadata --> ldf-editable-select
  ldf-editable-metadata-metadata-fields --> ldf-editable-select
  style ldf-editable-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
