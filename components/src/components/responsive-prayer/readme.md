# ldf-responsive-prayer



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                     | Type      | Default     |
| ---------- | ---------- | --------------------------------------------------------------- | --------- | ----------- |
| `doc`      | `doc`      | An LDF ResponsivePrayer object.                                 | `any`     | `undefined` |
| `editable` | `editable` | Whether the object is editable                                  | `boolean` | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the ResponsivePrayer being edited | `string`  | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-editable-text](../editable-text)
- [ldf-string](../string)
- [ldf-label-bar](../label-bar)
- [ldf-heading](../heading)

### Graph
```mermaid
graph TD;
  ldf-responsive-prayer --> ldf-editable-text
  ldf-responsive-prayer --> ldf-string
  ldf-responsive-prayer --> ldf-label-bar
  ldf-responsive-prayer --> ldf-heading
  ldf-editable-text --> ion-input
  ldf-heading --> ldf-string
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-heading --> ldf-day-name
  ldf-liturgical-document --> ldf-responsive-prayer
  style ldf-responsive-prayer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
