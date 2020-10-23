# ldf-editable-metadata-buttons



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                             | Type                                                                                                                                             | Default     |
| ------------ | ------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `base`       | `base`        | A JSON Pointer that points to the array within which the item is nested | `string`                                                                                                                                         | `undefined` |
| `index`      | `index`       | The item's index within that array                                      | `number`                                                                                                                                         | `undefined` |
| `obj`        | `obj`         | The LiturgicalDocument itself                                           | `any`                                                                                                                                            | `undefined` |
| `parentType` | `parent-type` | Type of the parent `LiturgicalDocument`, if any                         | `"bible-reading" \| "cycle" \| "heading" \| "liturgy" \| "meditation" \| "option" \| "psalm" \| "refrain" \| "responsive" \| "rubric" \| "text"` | `undefined` |
| `visible`    | `visible`     | Whether to show the buttons                                             | `boolean`                                                                                                                                        | `undefined` |


## Events

| Event               | Description | Type                          |
| ------------------- | ----------- | ----------------------------- |
| `ldfAddOptionToDoc` |             | `CustomEvent<AddOptionToDoc>` |


## Dependencies

### Used by

 - [ldf-liturgical-document](../liturgical-document)

### Depends on

- [ldf-label-bar](../label-bar)
- ion-buttons
- ion-button
- ion-icon
- [ldf-editable-delete](../editable-delete)

### Graph
```mermaid
graph TD;
  ldf-editable-metadata-buttons --> ldf-label-bar
  ldf-editable-metadata-buttons --> ion-buttons
  ldf-editable-metadata-buttons --> ion-button
  ldf-editable-metadata-buttons --> ion-icon
  ldf-editable-metadata-buttons --> ldf-editable-delete
  ion-button --> ion-ripple-effect
  ldf-editable-delete --> ion-buttons
  ldf-editable-delete --> ion-button
  ldf-editable-delete --> ion-icon
  ldf-liturgical-document --> ldf-editable-metadata-buttons
  style ldf-editable-metadata-buttons fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
