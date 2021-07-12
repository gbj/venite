import { Component, Element, Prop, Listen, Event, EventEmitter, h } from '@stencil/core';
import { Change } from '@venite/ldf';

@Component({
  tag: 'ldf-editable-select',
  styleUrl: 'editable-select.scss',
  scoped: true
})
export class EditableSelectComponent {
  @Element() element: HTMLElement;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Property name to edit within the object specified by `path` */
  @Prop({ reflect: true }) property: string;

  /** Options to include in the list */
  @Prop() options: { value: any; label: string; }[];

  /** Starting value for editing */
  @Prop() value: any;

  /** Placeholder if value is undefined */
  @Prop() placeholder: string;

  /** Optional callback when it emits a change */
  @Event() ldfChange: any; 

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Listeners
  @Listen('ionChange')
  onChange(ev : CustomEvent) {
    const oldValue = this.value,
          value = ev.detail.value;

    if(value !== oldValue) {
      this.ldfDocShouldChange.emit(new Change({
        path: this.path,
        op: [
          { type: 'set' as 'set', index: this.property, oldValue, value }
        ]
      }));

      this.ldfChange.emit(value);
    }
  }

  render() {
    return (
      <ion-select value={this.value} placeholder={this.placeholder}>
        {this.options.map(option =>
          <ion-select-option value={option.value}>{option.label}</ion-select-option>
        )}
      </ion-select>
    )
  }
}
