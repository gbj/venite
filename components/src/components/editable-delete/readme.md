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

 - [ldf-editable-metadata-buttons](../editable-metadata-buttons)

### Depends on

- ion-buttons
- ion-button
- ion-icon

### Graph
```mermaid
graph TD;
  ldf-editable-delete --> ion-buttons
  ldf-editable-delete --> ion-button
  ldf-editable-delete --> ion-icon
  ion-button --> ion-ripple-effect
  ldf-editable-metadata-buttons --> ldf-editable-delete
  style ldf-editable-delete fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
