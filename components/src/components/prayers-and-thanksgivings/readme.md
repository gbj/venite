# ldf-prayers-and-thanksgivings



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                      | Type     | Default     |
| --------- | --------- | -------------------------------------------------------------------------------- | -------- | ----------- |
| `base`    | `base`    | A JSON Pointer that points to the list into which we should insert a prayer      | `string` | `undefined` |
| `index`   | `index`   | A JSON Pointer that points to the index before which we should insert the prayer | `string` | `undefined` |
| `modal`   | `modal`   |                                                                                  | `any`    | `undefined` |
| `options` | --        |                                                                                  | `Text[]` | `undefined` |
| `parent`  | `parent`  |                                                                                  | `any`    | `undefined` |


## Events

| Event                              | Description                                           | Type                   |
| ---------------------------------- | ----------------------------------------------------- | ---------------------- |
| `ldfAskForPrayersAndThanksgivings` | Requests a list of possible Prayers and Thanksgivings | `CustomEvent<boolean>` |


## Methods

### `setOptions(options: Text[]) => Promise<void>`

Set the list of available prayers

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- ion-list
- ion-searchbar
- ion-item
- ion-label
- ion-header
- ion-toolbar
- ion-title
- ion-buttons
- ion-button
- ion-icon
- ion-content

### Graph
```mermaid
graph TD;
  ldf-prayers-and-thanksgivings --> ion-list
  ldf-prayers-and-thanksgivings --> ion-searchbar
  ldf-prayers-and-thanksgivings --> ion-item
  ldf-prayers-and-thanksgivings --> ion-label
  ldf-prayers-and-thanksgivings --> ion-header
  ldf-prayers-and-thanksgivings --> ion-toolbar
  ldf-prayers-and-thanksgivings --> ion-title
  ldf-prayers-and-thanksgivings --> ion-buttons
  ldf-prayers-and-thanksgivings --> ion-button
  ldf-prayers-and-thanksgivings --> ion-icon
  ldf-prayers-and-thanksgivings --> ion-content
  ion-searchbar --> ion-icon
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-button --> ion-ripple-effect
  style ldf-prayers-and-thanksgivings fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
