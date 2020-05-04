# ldf-heading



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                | Type                | Default     |
| ---------- | ---------- | -------------------------------------------------------------------------- | ------------------- | ----------- |
| `doc`      | `doc`      | An LDF Heading object. If both `doc` and `json` are passed, `doc` is used. | `Heading \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                                             | `boolean`           | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited                     | `string`            | `undefined` |


## Dependencies

### Used by

 - [ldf-bible-reading](../bible-reading)
 - [ldf-liturgical-document](../liturgical-document)
 - [ldf-psalm](../psalm)
 - [ldf-responsive-prayer](../responsive-prayer)
 - [ldf-text](../text)

### Depends on

- [ldf-editable-text](../editable-text)
- [ldf-label-bar](../label-bar)

### Graph
```mermaid
graph TD;
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-bible-reading --> ldf-heading
  ldf-liturgical-document --> ldf-heading
  ldf-psalm --> ldf-heading
  ldf-responsive-prayer --> ldf-heading
  ldf-text --> ldf-heading
  style ldf-heading fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
