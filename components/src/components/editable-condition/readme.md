# ldf-editable-condition



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description                                           | Type                                          | Default     |
| ----------- | --------- | ----------------------------------------------------- | --------------------------------------------- | ----------- |
| `condition` | --        | Starting value for editing                            | `{ mode: "and" \| "or"; conditions: any[]; }` | `undefined` |
| `modal`     | `modal`   | Used to pass in the `IonModal` we will dismiss        | `any`                                         | `undefined` |
| `path`      | `path`    | A JSON Pointer that points to the object being edited | `string`                                      | `undefined` |


## Events

| Event                | Description | Type               |
| -------------------- | ----------- | ------------------ |
| `ldfDocShouldChange` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- ion-header
- ion-toolbar
- ion-title
- ion-buttons
- ion-button
- ion-icon
- ion-content
- ion-list
- ion-item
- ion-label
- ion-checkbox
- ion-radio-group
- ion-radio
- [ldf-editable-delete](../editable-delete)
- [ldf-editable-condition-piece](../editable-condition-piece)

### Graph
```mermaid
graph TD;
  ldf-editable-condition --> ion-header
  ldf-editable-condition --> ion-toolbar
  ldf-editable-condition --> ion-title
  ldf-editable-condition --> ion-buttons
  ldf-editable-condition --> ion-button
  ldf-editable-condition --> ion-icon
  ldf-editable-condition --> ion-content
  ldf-editable-condition --> ion-list
  ldf-editable-condition --> ion-item
  ldf-editable-condition --> ion-label
  ldf-editable-condition --> ion-checkbox
  ldf-editable-condition --> ion-radio-group
  ldf-editable-condition --> ion-radio
  ldf-editable-condition --> ldf-editable-delete
  ldf-editable-condition --> ldf-editable-condition-piece
  ion-button --> ion-ripple-effect
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ldf-editable-delete --> ion-buttons
  ldf-editable-delete --> ion-button
  ldf-editable-delete --> ion-icon
  ldf-editable-condition-piece --> ion-item
  ldf-editable-condition-piece --> ion-label
  ldf-editable-condition-piece --> ion-toggle
  ldf-editable-condition-piece --> ion-datetime
  ldf-editable-condition-piece --> ldf-editable-text
  ldf-editable-condition-piece --> ion-select
  ldf-editable-condition-piece --> ion-select-option
  ldf-editable-condition-piece --> ion-chip
  ldf-editable-condition-piece --> ldf-editable-string-list
  ldf-editable-text --> ion-input
  ion-chip --> ion-ripple-effect
  ldf-editable-string-list --> ion-item
  ldf-editable-string-list --> ion-label
  ldf-editable-string-list --> ion-chip
  ldf-editable-string-list --> ion-icon
  ldf-editable-string-list --> ion-input
  ldf-editable-string-list --> ion-button
  style ldf-editable-condition fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
