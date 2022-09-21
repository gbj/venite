# ldf-editable-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                 | Type                               | Default     |
| ------------- | ------------- | ----------------------------------------------------------- | ---------------------------------- | ----------- |
| `options`     | --            | Options to include in the list                              | `{ value: any; label: string; }[]` | `undefined` |
| `path`        | `path`        | A JSON Pointer that points to the object being edited       | `string`                           | `undefined` |
| `placeholder` | `placeholder` | Placeholder if value is undefined                           | `string`                           | `undefined` |
| `property`    | `property`    | Property name to edit within the object specified by `path` | `string`                           | `undefined` |
| `value`       | `value`       | Starting value for editing                                  | `any`                              | `undefined` |


## Events

| Event                | Description                              | Type                  |
| -------------------- | ---------------------------------------- | --------------------- |
| `ldfChange`          | Optional callback when it emits a change | `CustomEvent<any>`    |
| `ldfDocShouldChange` |                                          | `CustomEvent<Change>` |


## Dependencies

### Used by

 - [ldf-editable-lookup](../editable-lookup)
 - [ldf-editable-metadata](../editable-metadata)
 - [ldf-editable-metadata-buttons](../editable-metadata-buttons)
 - [ldf-editable-metadata-metadata-fields](../editable-metadata-metadata-fields)

### Depends on

- ion-select
- ion-select-option

### Graph
```mermaid
graph TD;
  ldf-editable-select --> ion-select
  ldf-editable-select --> ion-select-option
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
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-popover --> ion-backdrop
  ion-action-sheet --> ion-backdrop
  ion-action-sheet --> ion-icon
  ion-action-sheet --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ldf-editable-lookup --> ldf-editable-select
  ldf-editable-metadata --> ldf-editable-select
  ldf-editable-metadata-buttons --> ldf-editable-select
  ldf-editable-metadata-metadata-fields --> ldf-editable-select
  style ldf-editable-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
