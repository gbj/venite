# ldf-editable-filter-documents



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute | Description                                                                | Type                                | Default     |
| ---------- | --------- | -------------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `options`  | --        | Options to search through                                                  | `LiturgicalDocument[]`              | `[]`        |
| `type`     | `type`    |                                                                            | `"collect" \| "psalm" \| "reading"` | `undefined` |
| `versions` | --        | Whether to include a `LiturgicalDocument.version` field with the selection | `string[]`                          | `undefined` |


## Events

| Event                 | Description | Type                              |
| --------------------- | ----------- | --------------------------------- |
| `ldfDocumentSelected` |             | `CustomEvent<LiturgicalDocument>` |


## Dependencies

### Depends on

- ion-list
- ion-item
- ion-label
- ion-select
- ion-select-option
- ion-searchbar

### Graph
```mermaid
graph TD;
  ldf-editable-filter-documents --> ion-list
  ldf-editable-filter-documents --> ion-item
  ldf-editable-filter-documents --> ion-label
  ldf-editable-filter-documents --> ion-select
  ldf-editable-filter-documents --> ion-select-option
  ldf-editable-filter-documents --> ion-searchbar
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-searchbar --> ion-icon
  style ldf-editable-filter-documents fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
