# ldf-editable-add-block



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                       | Type      | Default     |
| --------- | --------- | ----------------------------------------------------------------- | --------- | ----------- |
| `path`    | `path`    | A JSON Pointer that points to the LiturgicalDocument being edited | `string`  | `undefined` |
| `visible` | `visible` | If `visible` is true, the button should appear.                   | `boolean` | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `ldfDocShouldChange` |             | `CustomEvent<Change>` |


## Dependencies

### Used by

 - [ldf-liturgy](../liturgy)

### Depends on

- ion-modal

### Graph
```mermaid
graph TD;
  ldf-editable-add-block --> ion-modal
  ion-modal --> ion-backdrop
  ldf-liturgy --> ldf-editable-add-block
  style ldf-editable-add-block fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*