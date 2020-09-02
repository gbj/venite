# ldf-editable-preference-option



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                           | Type               | Default     |
| -------- | --------- | ----------------------------------------------------- | ------------------ | ----------- |
| `option` | --        | Starting value for editing                            | `PreferenceOption` | `undefined` |
| `path`   | `path`    | A JSON Pointer that points to the object being edited | `string`           | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `ldfDocShouldChange` |             | `CustomEvent<Change>` |


## Dependencies

### Used by

 - [ldf-editable-preference](../editable-preference)

### Depends on

- ion-list
- ion-item
- ion-label
- [ldf-editable-text](../editable-text)
- ion-list-header
- [ldf-editable-boolean](../editable-boolean)

### Graph
```mermaid
graph TD;
  ldf-editable-preference-option --> ion-list
  ldf-editable-preference-option --> ion-item
  ldf-editable-preference-option --> ion-label
  ldf-editable-preference-option --> ldf-editable-text
  ldf-editable-preference-option --> ion-list-header
  ldf-editable-preference-option --> ldf-editable-boolean
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ldf-editable-text --> ion-input
  ldf-editable-boolean --> ion-checkbox
  ldf-editable-preference --> ldf-editable-preference-option
  style ldf-editable-preference-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
