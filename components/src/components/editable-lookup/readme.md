# ldf-editable-lookup



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                           | Type                | Default     |
| -------- | --------- | ----------------------------------------------------- | ------------------- | ----------- |
| `lookup` | `lookup`  | Starting value for editing                            | `any`               | `undefined` |
| `path`   | `path`    | A JSON Pointer that points to the object being edited | `string`            | `undefined` |
| `types`  | --        | Available lookup types                                | `readonly string[]` | `undefined` |


## Events

| Event                | Description | Type               |
| -------------------- | ----------- | ------------------ |
| `ldfDocShouldChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [ldf-editable-metadata](../editable-metadata)

### Depends on

- ion-item
- ion-label
- ion-checkbox
- [ldf-editable-text](../editable-text)
- ion-list
- [ldf-editable-select](../editable-select)
- [ldf-editable-boolean](../editable-boolean)

### Graph
```mermaid
graph TD;
  ldf-editable-lookup --> ion-item
  ldf-editable-lookup --> ion-label
  ldf-editable-lookup --> ion-checkbox
  ldf-editable-lookup --> ldf-editable-text
  ldf-editable-lookup --> ion-list
  ldf-editable-lookup --> ldf-editable-select
  ldf-editable-lookup --> ldf-editable-boolean
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ldf-editable-text --> ion-input
  ldf-editable-select --> ion-select
  ldf-editable-select --> ion-select-option
  ldf-editable-boolean --> ion-checkbox
  ldf-editable-metadata --> ldf-editable-lookup
  style ldf-editable-lookup fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
