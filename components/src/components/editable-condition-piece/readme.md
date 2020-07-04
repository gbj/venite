# ldf-editable-condition-piece



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description                                           | Type        | Default     |
| ----------- | --------- | ----------------------------------------------------- | ----------- | ----------- |
| `condition` | --        | Starting value for editing                            | `Condition` | `undefined` |
| `path`      | `path`    | A JSON Pointer that points to the object being edited | `string`    | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `ldfDocShouldChange` |             | `CustomEvent<Change>` |


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
- [ldf-editable-string-list](../editable-string-list)
- ion-chip

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
  ldf-editable-condition-piece --> ldf-editable-string-list
  ldf-editable-condition-piece --> ion-chip
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ldf-editable-text --> ion-input
  ldf-editable-string-list --> ion-item
  ldf-editable-string-list --> ion-label
  ldf-editable-string-list --> ion-chip
  ldf-editable-string-list --> ion-icon
  ldf-editable-string-list --> ion-input
  ldf-editable-string-list --> ion-button
  ion-chip --> ion-ripple-effect
  ion-button --> ion-ripple-effect
  ldf-editable-condition --> ldf-editable-condition-piece
  style ldf-editable-condition-piece fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
