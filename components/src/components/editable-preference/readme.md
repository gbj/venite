# ldf-editable-preference



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description                                           | Type         | Default     |
| ------------ | --------- | ----------------------------------------------------- | ------------ | ----------- |
| `modal`      | `modal`   | Used to pass in the `IonModal` we will dismiss        | `any`        | `undefined` |
| `path`       | `path`    | A JSON Pointer that points to the object being edited | `string`     | `undefined` |
| `preference` | --        | Starting value for editing                            | `Preference` | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `ldfDocShouldChange` |             | `CustomEvent<Change>` |


## Dependencies

### Used by

 - [ldf-editable-preferences](../editable-preferences)

### Depends on

- ion-list
- ion-item
- ion-label
- [ldf-editable-text](../editable-text)
- ion-toolbar
- ion-title
- ion-buttons
- [ldf-editable-delete](../editable-delete)
- [ldf-editable-preference-option](../editable-preference-option)
- ion-button
- ion-icon

### Graph
```mermaid
graph TD;
  ldf-editable-preference --> ion-list
  ldf-editable-preference --> ion-item
  ldf-editable-preference --> ion-label
  ldf-editable-preference --> ldf-editable-text
  ldf-editable-preference --> ion-toolbar
  ldf-editable-preference --> ion-title
  ldf-editable-preference --> ion-buttons
  ldf-editable-preference --> ldf-editable-delete
  ldf-editable-preference --> ldf-editable-preference-option
  ldf-editable-preference --> ion-button
  ldf-editable-preference --> ion-icon
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ldf-editable-text --> ion-input
  ldf-editable-delete --> ion-buttons
  ldf-editable-delete --> ion-button
  ldf-editable-delete --> ion-icon
  ion-button --> ion-ripple-effect
  ldf-editable-preference-option --> ion-list
  ldf-editable-preference-option --> ion-item
  ldf-editable-preference-option --> ion-label
  ldf-editable-preference-option --> ldf-editable-text
  ldf-editable-preference-option --> ldf-editable-boolean
  ldf-editable-preference-option --> ion-list-header
  ldf-editable-boolean --> ion-checkbox
  ldf-editable-preferences --> ldf-editable-preference
  style ldf-editable-preference fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
