# ldf-editable-filter-documents



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute | Description                                                                | Type                                              | Default     |
| ---------------- | --------- | -------------------------------------------------------------------------- | ------------------------------------------------- | ----------- |
| `changeCallback` | --        |                                                                            | `(doc: LiturgicalDocument) => void`               | `undefined` |
| `modal`          | `modal`   | ion-modal                                                                  | `any`                                             | `undefined` |
| `options`        | --        | Options to search through                                                  | `LiturgicalDocument[]`                            | `[]`        |
| `type`           | `type`    |                                                                            | `"canticle" \| "collect" \| "psalm" \| "reading"` | `undefined` |
| `versions`       | --        | Whether to include a `LiturgicalDocument.version` field with the selection | `{ [x: string]: string; }`                        | `{}`        |


## Events

| Event                 | Description | Type                              |
| --------------------- | ----------- | --------------------------------- |
| `ldfDocumentSelected` |             | `CustomEvent<LiturgicalDocument>` |


## Methods

### `setOptions(options: LiturgicalDocument[]) => Promise<void>`

Set the list of liturgy versions

#### Returns

Type: `Promise<void>`



### `setVersion(version: string) => Promise<void>`

Sets the selected version.

#### Returns

Type: `Promise<void>`



### `setVersions(versions: Record<string, string>) => Promise<void>`

Set the list of liturgy versions

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- ion-header
- ion-toolbar
- ion-buttons
- ion-button
- ion-icon
- ion-content
- ion-list
- ion-label
- ion-item
- ion-select
- ion-select-option
- ion-searchbar

### Graph
```mermaid
graph TD;
  ldf-editable-filter-documents --> ion-header
  ldf-editable-filter-documents --> ion-toolbar
  ldf-editable-filter-documents --> ion-buttons
  ldf-editable-filter-documents --> ion-button
  ldf-editable-filter-documents --> ion-icon
  ldf-editable-filter-documents --> ion-content
  ldf-editable-filter-documents --> ion-list
  ldf-editable-filter-documents --> ion-label
  ldf-editable-filter-documents --> ion-item
  ldf-editable-filter-documents --> ion-select
  ldf-editable-filter-documents --> ion-select-option
  ldf-editable-filter-documents --> ion-searchbar
  ion-button --> ion-ripple-effect
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-select --> ion-select-popover
  ion-select --> ion-popover
  ion-select --> ion-action-sheet
  ion-select --> ion-alert
  ion-select-popover --> ion-item
  ion-select-popover --> ion-checkbox
  ion-select-popover --> ion-label
  ion-select-popover --> ion-radio-group
  ion-select-popover --> ion-radio
  ion-select-popover --> ion-list
  ion-select-popover --> ion-list-header
  ion-popover --> ion-backdrop
  ion-action-sheet --> ion-backdrop
  ion-action-sheet --> ion-icon
  ion-action-sheet --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-searchbar --> ion-icon
  style ldf-editable-filter-documents fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
