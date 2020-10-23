# ldf-collect



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                         | Type      | Default     |
| ---------- | ---------- | --------------------------------------------------- | --------- | ----------- |
| `doc`      | `doc`      | An LDF Text object.                                 | `any`     | `undefined` |
| `editable` | `editable` | Whether the object is editable                      | `boolean` | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Text being edited | `string`  | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-label-bar](../label-bar)
- [ldf-heading](../heading)
- [ldf-editable-text](../editable-text)
- [ldf-string](../string)

### Graph
```mermaid
graph TD;
  ldf-text --> ldf-label-bar
  ldf-text --> ldf-heading
  ldf-text --> ldf-editable-text
  ldf-text --> ldf-string
  ldf-heading --> ldf-string
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-heading --> ldf-day-name
  ldf-editable-text --> ion-input
  ldf-liturgical-document --> ldf-text
  style ldf-text fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
