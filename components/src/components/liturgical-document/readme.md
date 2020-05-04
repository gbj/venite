# ldf-liturgical-document



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                           | Type                           | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `doc`      | `doc`      | An LDF LiturgicalDocument object. If both `doc` and `json` are passed, `doc` is used. | `LiturgicalDocument \| string` | `undefined` |
| `editable` | `editable` | Whether the object is editable                                                        | `boolean`                      | `undefined` |
| `path`     | `path`     | A JSON Pointer that points to the Collect being edited                                | `string`                       | `undefined` |


## Dependencies

### Used by

 - [ldf-bible-reading](../bible-reading)
 - [ldf-liturgy](../liturgy)
 - [ldf-option](../option)

### Depends on

- [ldf-heading](../heading)
- [ldf-option](../option)
- [ldf-refrain](../refrain)
- [ldf-rubric](../rubric)
- [ldf-text](../text)
- [ldf-responsive-prayer](../responsive-prayer)
- [ldf-bible-reading](../bible-reading)
- [ldf-psalm](../psalm)

### Graph
```mermaid
graph TD;
  ldf-liturgical-document --> ldf-heading
  ldf-liturgical-document --> ldf-option
  ldf-liturgical-document --> ldf-refrain
  ldf-liturgical-document --> ldf-rubric
  ldf-liturgical-document --> ldf-text
  ldf-liturgical-document --> ldf-responsive-prayer
  ldf-liturgical-document --> ldf-bible-reading
  ldf-liturgical-document --> ldf-psalm
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-option --> ldf-liturgical-document
  ldf-refrain --> ldf-label-bar
  ldf-refrain --> ldf-editable-text
  ldf-rubric --> ldf-label-bar
  ldf-rubric --> ldf-editable-text
  ldf-text --> ldf-label-bar
  ldf-text --> ldf-heading
  ldf-text --> ldf-editable-text
  ldf-text --> ldf-string
  ldf-responsive-prayer --> ldf-editable-text
  ldf-responsive-prayer --> ldf-string
  ldf-responsive-prayer --> ldf-label-bar
  ldf-responsive-prayer --> ldf-heading
  ldf-bible-reading --> ldf-liturgical-document
  ldf-psalm --> ldf-refrain
  ldf-psalm --> ldf-heading
  ldf-psalm --> ldf-label-bar
  ldf-psalm --> ldf-editable-text
  ldf-psalm --> ldf-string
  ldf-liturgy --> ldf-liturgical-document
  style ldf-liturgical-document fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
