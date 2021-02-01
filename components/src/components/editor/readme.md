# my-component



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                                      | Type                           | Default     |
| ----------- | ------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `cursors`   | --           | Cursor positions of active users. Drills down to `<ldf-editor-cursors>`                                          | `{ [user: string]: Cursor; }`  | `undefined` |
| `doc`       | `doc`        | An LDF LiturgicalDocument object.                                                                                | `LiturgicalDocument \| string` | `undefined` |
| `listUsers` | `list-users` | Whether to list users who are active in the editing session                                                      | `boolean`                      | `true`      |
| `preview`   | `preview`    | Editors in `preview` mode will show a preview of each document, unless explicitly prompted to edit that document | `boolean`                      | `false`     |
| `uid`       | `uid`        | Unique ID for the user editing in this editor                                                                    | `string`                       | `undefined` |
| `users`     | --           | Users currently active in the document                                                                           | `{ [uid: string]: User; }`     | `undefined` |


## Events

| Event                         | Description                                                                                  | Type                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `editorAskForBibleIntros`     |                                                                                              | `CustomEvent<EventTarget>`                                                                        |
| `editorAskForCanticleOptions` |                                                                                              | `CustomEvent<EventTarget>`                                                                        |
| `editorCursorMoved`           | User's cursor/selection changed                                                              | `CustomEvent<Cursor>`                                                                             |
| `editorDocShouldAdd`          | User is requesting we add a new LiturgicalDocument block at JSON pointer path `base`/`index` | `CustomEvent<{ base: string; index: number; }>`                                                   |
| `editorDocShouldChange`       | User has edited the document                                                                 | `CustomEvent<Change \| Change[]>`                                                                 |
| `editorShouldAddGloriaPatri`  |                                                                                              | `CustomEvent<{ path: string; language: string; version: string; oldValue: LiturgicalDocument; }>` |


## Dependencies

### Depends on

- [ldf-label-bar](../label-bar)
- [ldf-editor-cursors](../editor-cursors)
- [ldf-liturgical-document](../liturgical-document)

### Graph
```mermaid
graph TD;
  ldf-editor --> ldf-label-bar
  ldf-editor --> ldf-editor-cursors
  ldf-editor --> ldf-liturgical-document
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
  ldf-liturgy --> ldf-liturgical-document
  ldf-liturgy --> ldf-editable-add-block
  ldf-editable-add-block --> ion-button
  ldf-editable-add-block --> ion-icon
  ldf-editable-add-block --> ion-label
  ion-button --> ion-ripple-effect
  ldf-heading --> ldf-string
  ldf-heading --> ldf-editable-text
  ldf-heading --> ldf-label-bar
  ldf-heading --> ldf-day-name
  ldf-heading --> ldf-text
  ldf-editable-text --> ion-input
  ldf-day-name --> ldf-text
  ldf-text --> ldf-label-bar
  ldf-text --> ldf-heading
  ldf-text --> ldf-editable-text
  ldf-text --> ldf-string
  ldf-image --> ldf-label-bar
  ldf-image --> ldf-editable-text
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
  ldf-bible-reading --> ldf-label-bar
  ldf-bible-reading --> ion-buttons
  ldf-bible-reading --> ion-button
  ldf-bible-reading --> ion-icon
  ldf-bible-reading --> ion-label
  ldf-bible-reading --> ldf-heading
  ldf-bible-reading --> ldf-editable-text
  ldf-bible-reading --> ldf-liturgical-document
  ldf-bible-reading --> ldf-string
  ldf-psalm --> ldf-refrain
  ldf-psalm --> ldf-liturgical-document
  ldf-psalm --> ldf-heading
  ldf-psalm --> ldf-label-bar
  ldf-psalm --> ion-buttons
  ldf-psalm --> ion-button
  ldf-psalm --> ion-icon
  ldf-psalm --> ion-label
  ldf-psalm --> ldf-editable-text
  ldf-psalm --> ldf-string
  ldf-editable-metadata-buttons --> ion-buttons
  ldf-editable-metadata-buttons --> ion-button
  ldf-editable-metadata-buttons --> ion-label
  ldf-editable-metadata-buttons --> ion-icon
  ldf-editable-metadata-buttons --> ldf-editable-delete
  ldf-editable-delete --> ion-buttons
  ldf-editable-delete --> ion-button
  ldf-editable-delete --> ion-icon
  style ldf-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
