import { Component, Element, Prop, Listen, Event, EventEmitter, State, h } from '@stencil/core';
import { alertController } from '@ionic/core';
import { Change } from '@venite/ldf';

import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-delete.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-editable-delete',
  scoped: true
})
export class EditableDeleteComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  // Properties
  /** A JSON Pointer that points to the array or object within which the item is nested*/
  @Prop({ reflect: true }) base: string;

  /** The item's index within that array, or property within that object */
  @Prop({ reflect: true }) index: number | string;

  @Prop() type : 'array' | 'object' = 'array';

  /** The item to be deleted */
  @Prop() obj : any;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Listeners
  @Listen('click')
  async onClick() {
    // show a confirmation alert
    const alert = await alertController.create({
      header: this.localeStrings.confirm_header,
      message: this.localeStrings.confirm_message,
      buttons: [
        {
          text: this.localeStrings.cancel,
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: this.localeStrings.delete,
          role: 'submit',
          cssClass: 'danger',
          handler: () => {
            this.delete();
          }
        }
      ]
    });

    // show the alert
    return alert.present();
  }

  delete() {
    if(this.type === 'array') {
      this.ldfDocShouldChange.emit(new Change({
        path: this.base,
        op: [ { type: 'deleteAt', index: this.index, oldValue: this.obj } ]
      }))
    } else {
      this.ldfDocShouldChange.emit(new Change({
        path: this.base,
        op: [ { type: 'delete', index: this.index, oldValue: this.obj } ]
      }))
    }
  }

  // Lifecycle events
  async componentWillLoad() {
    this.loadLocaleStrings();
  }

  // Methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <ion-buttons>
        <ion-button aria-role='button' aria-label={localeStrings.delete} size='small'>
          <ion-icon name='trash' slot='icon-only'></ion-icon>
        </ion-button>
      </ion-buttons>
    )
  }
}
