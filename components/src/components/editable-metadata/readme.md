# ldf-editable-metadata



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                       | Type                           | Default     |
| --------- | --------- | ----------------------------------------------------------------- | ------------------------------ | ----------- |
| `doc`     | `doc`     | An LDF LiturgicalDocument object                                  | `LiturgicalDocument \| string` | `undefined` |
| `path`    | `path`    | A JSON Pointer that points to the LiturgicalDocument being edited | `string`                       | `undefined` |
| `visible` | `visible` | If `visible` is true, the controls should appear.                 | `boolean`                      | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgy](../liturgy)

### Depends on

- [ldf-label-bar](../label-bar)
- ion-buttons
- ion-button
- ion-icon
- ion-label
- [ldf-editable-select](../editable-select)
- [ldf-editable-text](../editable-text)

### Graph
```mermaid
graph TD;
  ldf-editable-metadata --> ldf-label-bar
  ldf-editable-metadata --> ion-buttons
  ldf-editable-metadata --> ion-button
  ldf-editable-metadata --> ion-icon
  ldf-editable-metadata --> ion-label
  ldf-editable-metadata --> ldf-editable-select
  ldf-editable-metadata --> ldf-editable-text
  ion-button --> ion-ripple-effect
  ldf-editable-select --> ion-select
  ldf-editable-select --> ion-select-option
  ldf-liturgy --> ldf-editable-metadata
  style ldf-editable-metadata fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
