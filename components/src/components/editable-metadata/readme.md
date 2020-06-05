# ldf-editable-metadata



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                           | Type                           | Default     |
| ----------- | ----------- | --------------------------------------------------------------------- | ------------------------------ | ----------- |
| `collapsed` | `collapsed` | If `collapsed` is false, the full set of editable fields will appear. | `boolean`                      | `undefined` |
| `doc`       | `doc`       | An LDF LiturgicalDocument object                                      | `LiturgicalDocument \| string` | `undefined` |
| `modal`     | `modal`     | Used to pass in the `IonModal` we will dismiss                        | `any`                          | `undefined` |
| `path`      | `path`      | A JSON Pointer that points to the LiturgicalDocument being edited     | `string`                       | `undefined` |
| `visible`   | `visible`   | If `visible` is true, the controls should appear.                     | `boolean`                      | `undefined` |


## Dependencies

### Depends on

- ion-item
- ion-label
- [ldf-editable-select](../editable-select)
- [ldf-editable-text](../editable-text)
- ion-header
- ion-toolbar
- ion-title
- ion-buttons
- ion-button
- ion-icon
- ion-content

### Graph
```mermaid
graph TD;
  ldf-editable-metadata --> ion-item
  ldf-editable-metadata --> ion-label
  ldf-editable-metadata --> ldf-editable-select
  ldf-editable-metadata --> ldf-editable-text
  ldf-editable-metadata --> ion-header
  ldf-editable-metadata --> ion-toolbar
  ldf-editable-metadata --> ion-title
  ldf-editable-metadata --> ion-buttons
  ldf-editable-metadata --> ion-button
  ldf-editable-metadata --> ion-icon
  ldf-editable-metadata --> ion-content
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ldf-editable-select --> ion-select
  ldf-editable-select --> ion-select-option
  ldf-editable-text --> ion-input
  ion-button --> ion-ripple-effect
  style ldf-editable-metadata fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
