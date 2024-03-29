# ldf-responsive-prayer



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                     | Type                         | Default     |
| ---------- | ---------- | --------------------------------------------------------------- | ---------------------------- | ----------- |
| `doc`      | `doc`      | An LDF ResponsivePrayer object.                                 | `ResponsivePrayer \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                                  | `boolean`                    | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the ResponsivePrayer being edited | `string`                     | `undefined` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-editable-text](../editable-text)
- [ldf-string](../string)
- [ldf-label-bar](../label-bar)
- [ldf-heading](../heading)
- [ldf-editable-boolean](../editable-boolean)

### Graph
```mermaid
graph TD;
  ldf-responsive-prayer --> ldf-editable-text
  ldf-responsive-prayer --> ldf-string
  ldf-responsive-prayer --> ldf-label-bar
  ldf-responsive-prayer --> ldf-heading
  ldf-responsive-prayer --> ldf-editable-boolean
  ldf-editable-text --> ion-input
  ldf-heading --> ldf-string
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-heading --> ldf-day-name
  ldf-heading --> ldf-text
  ldf-day-name --> ldf-text
  ldf-text --> ldf-label-bar
  ldf-text --> ion-button
  ldf-text --> ldf-heading
  ldf-text --> ldf-editable-text
  ldf-text --> ldf-string
  ion-button --> ion-ripple-effect
  ldf-editable-boolean --> ion-checkbox
  ldf-liturgical-document --> ldf-responsive-prayer
  style ldf-responsive-prayer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
