# ldf-editable-metadata-metadata-fields



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description                                  | Type                           | Default       |
| -------------------- | --------- | -------------------------------------------- | ------------------------------ | ------------- |
| `bibleReadingIntros` | --        | Options for introductions to a Bible reading | `LiturgicalDocument[]`         | `new Array()` |
| `doc`                | `doc`     | An LDF LiturgicalDocument object             | `LiturgicalDocument \| string` | `undefined`   |
| `path`               | `path`    | A JSON Pointer that points to the document   | `string`                       | `undefined`   |


## Events

| Event                     | Description | Type                                                                                              |
| ------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `ldfAskForBibleIntros`    |             | `CustomEvent<void>`                                                                               |
| `ldfDocShouldChange`      |             | `CustomEvent<Change>`                                                                             |
| `ldfShouldAddGloriaPatri` |             | `CustomEvent<{ path: string; language: string; version: string; oldValue: LiturgicalDocument; }>` |


## Methods

### `setBibleReadingIntros(intros: LiturgicalDocument[] | string) => Promise<void>`

Set the list of Bible reading introductions

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [ldf-editable-metadata](../editable-metadata)

### Depends on

- [ldf-editable-select](../editable-select)
- [ldf-editable-boolean](../editable-boolean)
- [ldf-editable-text](../editable-text)
- [ldf-editable-string-list](../editable-string-list)
- ion-item
- ion-label
- ion-checkbox
- [ldf-editable-antiphon-field](../editable-antiphon-field)
- ion-col
- ion-card
- ion-card-header
- ion-card-title
- ion-card-content

### Graph
```mermaid
graph TD;
  ldf-editable-metadata-metadata-fields --> ldf-editable-select
  ldf-editable-metadata-metadata-fields --> ldf-editable-boolean
  ldf-editable-metadata-metadata-fields --> ldf-editable-text
  ldf-editable-metadata-metadata-fields --> ldf-editable-string-list
  ldf-editable-metadata-metadata-fields --> ion-item
  ldf-editable-metadata-metadata-fields --> ion-label
  ldf-editable-metadata-metadata-fields --> ion-checkbox
  ldf-editable-metadata-metadata-fields --> ldf-editable-antiphon-field
  ldf-editable-metadata-metadata-fields --> ion-col
  ldf-editable-metadata-metadata-fields --> ion-card
  ldf-editable-metadata-metadata-fields --> ion-card-header
  ldf-editable-metadata-metadata-fields --> ion-card-title
  ldf-editable-metadata-metadata-fields --> ion-card-content
  ldf-editable-select --> ion-select
  ldf-editable-select --> ion-select-option
  ldf-editable-boolean --> ion-checkbox
  ldf-editable-text --> ion-input
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
  ldf-editable-antiphon-field --> ion-radio-group
  ldf-editable-antiphon-field --> ion-list-header
  ldf-editable-antiphon-field --> ion-label
  ldf-editable-antiphon-field --> ion-item
  ldf-editable-antiphon-field --> ion-radio
  ldf-editable-antiphon-field --> ion-grid
  ldf-editable-antiphon-field --> ion-row
  ldf-editable-antiphon-field --> ion-col
  ldf-editable-antiphon-field --> ion-buttons
  ldf-editable-antiphon-field --> ion-button
  ldf-editable-antiphon-field --> ion-icon
  ldf-editable-antiphon-field --> ion-toolbar
  ldf-editable-antiphon-field --> ldf-editable-text
  ldf-editable-antiphon-field --> ldf-liturgical-document
  ldf-liturgical-document --> ion-skeleton-text
  ldf-liturgical-document --> ldf-liturgy
  ldf-liturgical-document --> ldf-heading
  ldf-liturgical-document --> ldf-image
  ldf-liturgical-document --> ldf-meditation
  ldf-liturgical-document --> ldf-option
  ldf-liturgical-document --> ldf-refrain
  ldf-liturgical-document --> ldf-rubric
  ldf-liturgical-document --> ldf-text
  ldf-liturgical-document --> ldf-responsive-prayer
  ldf-liturgical-document --> ldf-bible-reading
  ldf-liturgical-document --> ldf-psalm
  ldf-liturgical-document --> ldf-editable-metadata-buttons
  ldf-liturgical-document --> ion-chip
  ldf-liturgical-document --> ion-icon
  ldf-liturgical-document --> ion-label
  ldf-liturgy --> ldf-editable-add-block
  ldf-liturgy --> ldf-liturgical-document
  ldf-editable-add-block --> ion-button
  ldf-editable-add-block --> ion-icon
  ldf-editable-add-block --> ion-label
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
  ldf-image --> ldf-label-bar
  ldf-image --> ldf-editable-text
  ldf-image --> ion-header
  ldf-image --> ion-toolbar
  ldf-image --> ion-buttons
  ldf-image --> ion-button
  ldf-image --> ion-label
  ldf-image --> ion-icon
  ldf-image --> ion-content
  ldf-meditation --> ion-button
  ldf-meditation --> ion-icon
  ldf-meditation --> ion-label
  ldf-meditation --> ldf-editable-text
  ldf-option --> ion-segment
  ldf-option --> ion-segment-button
  ldf-option --> ion-label
  ldf-option --> ion-toolbar
  ldf-option --> ion-select
  ldf-option --> ion-select-option
  ldf-option --> ion-buttons
  ldf-option --> ion-button
  ldf-option --> ion-icon
  ldf-option --> ldf-label-bar
  ldf-option --> ldf-liturgical-document
  ion-segment-button --> ion-ripple-effect
  ldf-refrain --> ldf-label-bar
  ldf-refrain --> ldf-editable-text
  ldf-rubric --> ldf-label-bar
  ldf-rubric --> ldf-editable-text
  ldf-responsive-prayer --> ldf-editable-text
  ldf-responsive-prayer --> ldf-string
  ldf-responsive-prayer --> ldf-label-bar
  ldf-responsive-prayer --> ldf-heading
  ldf-responsive-prayer --> ldf-editable-boolean
  ldf-bible-reading --> ldf-label-bar
  ldf-bible-reading --> ion-buttons
  ldf-bible-reading --> ion-button
  ldf-bible-reading --> ion-icon
  ldf-bible-reading --> ion-label
  ldf-bible-reading --> ldf-editable-text
  ldf-bible-reading --> ldf-liturgical-document
  ldf-bible-reading --> ldf-heading
  ldf-bible-reading --> ldf-string
  ldf-psalm --> ldf-refrain
  ldf-psalm --> ldf-liturgical-document
  ldf-psalm --> ldf-label-bar
  ldf-psalm --> ldf-editable-text
  ldf-psalm --> ldf-heading
  ldf-psalm --> ion-buttons
  ldf-psalm --> ion-button
  ldf-psalm --> ion-icon
  ldf-psalm --> ion-label
  ldf-psalm --> ldf-string
  ldf-editable-metadata-buttons --> ion-buttons
  ldf-editable-metadata-buttons --> ion-button
  ldf-editable-metadata-buttons --> ion-label
  ldf-editable-metadata-buttons --> ion-icon
  ldf-editable-metadata-buttons --> ldf-editable-select
  ldf-editable-metadata-buttons --> ldf-editable-delete
  ldf-editable-delete --> ion-buttons
  ldf-editable-delete --> ion-button
  ldf-editable-delete --> ion-icon
  ion-card --> ion-ripple-effect
  ldf-editable-metadata --> ldf-editable-metadata-metadata-fields
  style ldf-editable-metadata-metadata-fields fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
