import { Component, Element, Prop, Listen, Event, EventEmitter, h } from '@stencil/core';
import { Change } from '@venite/ldf';

@Component({
  tag: 'ldf-editable-boolean',
  shadow: true
})
export class EditableBooleanComponent {
  @Element() element: HTMLElement;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Property name to edit within the object specified by `path` */
  @Prop({ reflect: true }) property: string;

  /** Starting value for editing */
  @Prop() value: boolean;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle methods
  componentWillLoad() {
    if(this.value == undefined) {
      this.ldfDocShouldChange.emit(new Change({
        path: this.path,
        op: [{
          type: 'set',
          index: this.property,
          oldValue: undefined,
          value: false
        }]
      }))
    }
  }

  // Listeners
  @Listen('ionChange')
  onChange(ev : CustomEvent) {
    const oldValue = this.value,
          value : boolean = ev.detail.checked;

    if(value !== oldValue) {
      this.ldfDocShouldChange.emit(new Change({
        path: this.path,
        op: [
          { type: 'set', index: this.property, oldValue, value }
        ]
      }));
    }
  }

  render() {
    return (
      <ion-checkbox checked={this.value}></ion-checkbox>
    )
  }
}
