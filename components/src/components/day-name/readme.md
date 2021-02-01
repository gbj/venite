# ldf-day-name



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                     | Type                      | Default     |
| -------- | --------- | ------------------------------- | ------------------------- | ----------- |
| `day`    | `day`     | The day to be rendered as text. | `LiturgicalDay \| string` | `undefined` |


## Dependencies

### Used by

 - [ldf-heading](../heading)

### Depends on

- [ldf-text](../text)

### Graph
```mermaid
graph TD;
  ldf-day-name --> ldf-text
  ldf-text --> ldf-label-bar
  ldf-text --> ldf-heading
  ldf-text --> ldf-editable-text
  ldf-text --> ldf-string
  ldf-heading --> ldf-day-name
  ldf-editable-text --> ion-input
  style ldf-day-name fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
