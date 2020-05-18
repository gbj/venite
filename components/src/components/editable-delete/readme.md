# ldf-editable-delete



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                             | Type                 | Default     |
| -------- | --------- | ----------------------------------------------------------------------- | -------------------- | ----------- |
| `base`   | `base`    | A JSON Pointer that points to the array within which the item is nested | `string`             | `undefined` |
| `index`  | `index`   | The item's index within that array                                      | `number`             | `undefined` |
| `obj`    | --        | The LiturgicalDocument itself                                           | `LiturgicalDocument` | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `ldfDocShouldChange` |             | `CustomEvent<Change>` |


## Dependencies

### Used by

 - [ldf-liturgy](../liturgy)

### Depends on

- ion-alert
- ion-buttons
- ion-button
- ion-icon

### Graph
```mermaid
graph TD;
  ldf-editable-delete --> ion-alert
  ldf-editable-delete --> ion-buttons
  ldf-editable-delete --> ion-button
  ldf-editable-delete --> ion-icon
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-button --> ion-ripple-effect
  ldf-liturgy --> ldf-editable-delete
  style ldf-editable-delete fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
