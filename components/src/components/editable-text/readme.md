# ldf-editable-text



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                            | Type      | Default     |
| ------------- | ------------- | ------------------------------------------------------ | --------- | ----------- |
| `path`        | `path`        | A JSON Pointer that points to the Collect being edited | `string`  | `undefined` |
| `placeholder` | `placeholder` | Displays if text is falsy or an empty string           | `string`  | `undefined` |
| `short`       | `short`       | Whether to display as a short, single-line input       | `boolean` | `undefined` |
| `text`        | `text`        | Starting text for editing                              | `string`  | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `ldfCursorMoved`     |             | `CustomEvent<Cursor>` |
| `ldfDocShouldChange` |             | `CustomEvent<Change>` |


## Methods

### `registerCursor() => Promise<Cursor>`

Sets private cursor field to a Cursor instance and sends it as a `cursor` event

#### Returns

Type: `Promise<Cursor>`




## Dependencies

### Used by

 - [ldf-editable-metadata](../editable-metadata)
 - [ldf-heading](../heading)
 - [ldf-psalm](../psalm)
 - [ldf-refrain](../refrain)
 - [ldf-responsive-prayer](../responsive-prayer)
 - [ldf-rubric](../rubric)
 - [ldf-text](../text)

### Depends on

- ion-input

### Graph
```mermaid
graph TD;
  ldf-editable-text --> ion-input
  ldf-editable-metadata --> ldf-editable-text
  ldf-heading --> ldf-editable-text
  ldf-psalm --> ldf-editable-text
  ldf-refrain --> ldf-editable-text
  ldf-responsive-prayer --> ldf-editable-text
  ldf-rubric --> ldf-editable-text
  ldf-text --> ldf-editable-text
  style ldf-editable-text fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
