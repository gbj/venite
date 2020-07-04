# ldf-editable-string-list



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                      | Type       | Default       |
| ---------- | ---------- | ------------------------------------------------ | ---------- | ------------- |
| `path`     | `path`     | A JSON Pointer that points to the document       | `string`   | `undefined`   |
| `property` | `property` | The property in that document that we're editing | `string`   | `undefined`   |
| `value`    | --         | Initial categories                               | `string[]` | `new Array()` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `ldfDocShouldChange` |             | `CustomEvent<Change>` |


## Dependencies

### Used by

 - [ldf-editable-condition-piece](../editable-condition-piece)
 - [ldf-editable-metadata](../editable-metadata)
 - [ldf-editable-metadata-metadata-fields](../editable-metadata-metadata-fields)

### Depends on

- ion-item
- ion-label
- ion-chip
- ion-icon
- ion-input
- ion-button

### Graph
```mermaid
graph TD;
  ldf-editable-string-list --> ion-item
  ldf-editable-string-list --> ion-label
  ldf-editable-string-list --> ion-chip
  ldf-editable-string-list --> ion-icon
  ldf-editable-string-list --> ion-input
  ldf-editable-string-list --> ion-button
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-chip --> ion-ripple-effect
  ion-button --> ion-ripple-effect
  ldf-editable-condition-piece --> ldf-editable-string-list
  ldf-editable-metadata --> ldf-editable-string-list
  ldf-editable-metadata-metadata-fields --> ldf-editable-string-list
  style ldf-editable-string-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
