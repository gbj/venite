# ldf-heading



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                            | Type                | Default     |
| ---------- | ---------- | ------------------------------------------------------ | ------------------- | ----------- |
| `doc`      | `doc`      | An LDF Heading object.                                 | `Heading \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                         | `boolean`           | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited | `string`            | `undefined` |


## Dependencies

### Used by

 - [ldf-bible-reading](../bible-reading)
 - [ldf-liturgical-document](../liturgical-document)
 - [ldf-psalm](../psalm)
 - [ldf-responsive-prayer](../responsive-prayer)
 - [ldf-text](../text)

### Depends on

- [ldf-string](../string)
- [ldf-editable-text](../editable-text)
- [ldf-label-bar](../label-bar)
- [ldf-day-name](../day-name)
- [ldf-text](../text)

### Graph
```mermaid
graph TD;
  ldf-heading --> ldf-string
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-heading --> ldf-day-name
  ldf-heading --> ldf-text
  ldf-editable-text --> ion-input
  ldf-day-name --> ldf-text
  ldf-text --> ldf-heading
  ion-button --> ion-ripple-effect
  ldf-bible-reading --> ldf-heading
  ldf-liturgical-document --> ldf-heading
  ldf-psalm --> ldf-heading
  ldf-responsive-prayer --> ldf-heading
  style ldf-heading fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
