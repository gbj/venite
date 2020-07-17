# ldf-editable-metadata-metadata-fields



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description                                  | Type                           | Default       |
| -------------------- | --------- | -------------------------------------------- | ------------------------------ | ------------- |
| `bibleReadingIntros` | --        | Options for introductions to a Bible reading | `LiturgicalDocument[]`         | `new Array()` |
| `doc`                | `doc`     | An LDF LiturgicalDocument object             | `LiturgicalDocument \| string` | `undefined`   |
| `path`               | `path`    | A JSON Pointer that points to the document   | `string`                       | `undefined`   |


## Events

| Event                  | Description | Type                  |
| ---------------------- | ----------- | --------------------- |
| `ldfAskForBibleIntros` |             | `CustomEvent<void>`   |
| `ldfDocShouldChange`   |             | `CustomEvent<Change>` |


## Methods

### `setBibleReadingIntros(intros: string | LiturgicalDocument[]) => Promise<void>`

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
- ion-card
- ion-card-header
- ion-card-title
- ion-card-content
- ion-grid
- ion-row
- ion-col

### Graph
```mermaid
graph TD;
  ldf-editable-metadata-metadata-fields --> ldf-editable-select
  ldf-editable-metadata-metadata-fields --> ldf-editable-boolean
  ldf-editable-metadata-metadata-fields --> ldf-editable-text
  ldf-editable-metadata-metadata-fields --> ldf-editable-string-list
  ldf-editable-metadata-metadata-fields --> ion-item
  ldf-editable-metadata-metadata-fields --> ion-label
  ldf-editable-metadata-metadata-fields --> ion-card
  ldf-editable-metadata-metadata-fields --> ion-card-header
  ldf-editable-metadata-metadata-fields --> ion-card-title
  ldf-editable-metadata-metadata-fields --> ion-card-content
  ldf-editable-metadata-metadata-fields --> ion-grid
  ldf-editable-metadata-metadata-fields --> ion-row
  ldf-editable-metadata-metadata-fields --> ion-col
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
  ion-card --> ion-ripple-effect
  ldf-editable-metadata --> ldf-editable-metadata-metadata-fields
  style ldf-editable-metadata-metadata-fields fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
