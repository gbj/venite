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
  ion-item --> ion-note
  ion-toggle --> ion-icon
  ion-datetime --> ion-buttons
  ion-datetime --> ion-button
  ion-datetime --> ion-picker-internal
  ion-datetime --> ion-picker-column-internal
  ion-datetime --> ion-item
  ion-datetime --> ion-label
  ion-datetime --> ion-icon
  ion-datetime --> ion-popover
  ion-button --> ion-ripple-effect
  ion-popover --> ion-backdrop
  ldf-editable-text --> ion-input
  ion-select --> ion-select-popover
  ion-select --> ion-popover
  ion-select --> ion-action-sheet
  ion-select --> ion-alert
  ion-select-popover --> ion-item
  ion-select-popover --> ion-checkbox
  ion-select-popover --> ion-label
  ion-select-popover --> ion-radio-group
  ion-select-popover --> ion-radio
  ion-select-popover --> ion-list
  ion-select-popover --> ion-list-header
  ion-action-sheet --> ion-backdrop
  ion-action-sheet --> ion-icon
  ion-action-sheet --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-chip --> ion-ripple-effect
  ldf-editable-string-list --> ion-item
  ldf-editable-string-list --> ion-label
  ldf-editable-string-list --> ion-chip
  ldf-editable-string-list --> ion-icon
  ldf-editable-string-list --> ion-input
  ldf-editable-string-list --> ion-button
  ldf-editable-condition --> ldf-editable-condition-piece
  style ldf-editable-condition-piece fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
