import { Component, Element, Prop, Listen, Event, EventEmitter, h } from '@stencil/core';
import { Change } from '@venite/ldf';

@Component({
  tag: 'ldf-editable-select',
  styleUrl: 'editable-select.scss',
  shadow: true
})
export class EditableSelectComponent {
  @Element() el: HTMLElement;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Property name to edit within the object specified by `path` */
  @Prop({ reflect: true }) property: string;

  /** Options to include in the list */
  @Prop() options: { value: string; label: string; }[];

  /** Starting value for editing */
  @Prop() value: string;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Listeners
  @Listen('ionChange')
  onChange(ev : CustomEvent) {
    const oldValue = this.value,
          newValue = ev.detail.value;

    if(newValue !== oldValue) {
      this.ldfDocShouldChange.emit(new Change({
        path: this.path,
        op: [
          { p: [this.property], od: oldValue, oi: newValue }
        ]
      }));
    }
  }

  render() {
    return (
      <ion-select value={this.value}>
        {this.options.map(option =>
          <ion-select-option value={option.value}>{option.label}</ion-select-option>
        )}
      </ion-select>
    )
  }
}