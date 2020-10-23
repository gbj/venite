# ldf-editable-condition-piece



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                           | Type     | Default     |
| ----------- | ----------- | ----------------------------------------------------- | -------- | ----------- |
| `condition` | `condition` | Starting value for editing                            | `any`    | `undefined` |
| `path`      | `path`      | A JSON Pointer that points to the object being edited | `string` | `undefined` |


## Events

| Event                | Description | Type               |
| -------------------- | ----------- | ------------------ |
| `ldfDocShouldChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [ldf-editable-condition](../editable-condition)

### Depends on

- ion-item
- ion-label
- ion-toggle
- ion-datetime
- [ldf-editable-text](../editable-text)
- ion-select
- ion-select-option
- ion-chip
- [ldf-editable-string-list](../editable-string-list)

### Graph
```mermaid
graph TD;
  ldf-editable-condition-piece --> ion-item
  ldf-editable-condition-piece --> ion-label
  ldf-editable-condition-piece --> ion-toggle
  ldf-editable-condition-piece --> ion-datetime
  ldf-editable-condition-piece --> ldf-editable-text
  ldf-editable-condition-piece --> ion-select
  ldf-editable-condition-piece --> ion-select-option
  ldf-editable-condition-piece --> ion-chip
  ldf-editable-condition-piece --> ldf-editable-string-list
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ldf-editable-text --> ion-input
  ion-chip --> ion-ripple-effect
  ldf-editable-string-list --> ion-item
  ldf-editable-string-list --> ion-label
  ldf-editable-string-list --> ion-chip
  ldf-editable-string-list --> ion-icon
  ldf-editable-string-list --> ion-input
  ldf-editable-string-list --> ion-button
  ion-button --> ion-ripple-effect
  ldf-editable-condition --> ldf-editable-condition-piece
  style ldf-editable-condition-piece fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
