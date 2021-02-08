# ldf-image



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                 | Type              | Default     |
| ---------- | ---------- | ----------------------------------------------------------- | ----------------- | ----------- |
| `doc`      | `doc`      | An LDF Image object.                                        | `Image \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                              | `boolean`         | `undefined` |
| `modal`    | `modal`    | If the image is being shown in a modal, pass the modal here | `any`             | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited      | `string`          | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-label-bar](../label-bar)
- [ldf-editable-text](../editable-text)
- ion-header
- ion-toolbar
- ion-buttons
- ion-button
- ion-label
- ion-icon
- ion-content

### Graph
```mermaid
graph TD;
  ldf-image --> ldf-label-bar
  ldf-image --> ldf-editable-text
  ldf-image --> ion-header
  ldf-image --> ion-toolbar
  ldf-image --> ion-buttons
  ldf-image --> ion-button
  ldf-image --> ion-label
  ldf-image --> ion-icon
  ldf-image --> ion-content
  ldf-editable-text --> ion-input
  ion-button --> ion-ripple-effect
  ldf-liturgical-document --> ldf-image
  style ldf-image fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
