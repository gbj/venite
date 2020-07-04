import { Component, Element, Prop, Listen, Event, EventEmitter, State, h } from '@stencil/core';
import { alertController } from '@ionic/core';
import { Change } from '@venite/ldf';

import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-editable-delete',
  shadow: true
})
export class EditableDeleteComponent {
  @Element() el: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  // Properties
  /** A JSON Pointer that points to the array within which the item is nested*/
  @Prop({ reflect: true }) base: string;

  /** The item's index within that array */
  @Prop({ reflect: true }) index: number;

  /** The item to be deleted */
  @Prop() obj : any;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Listeners
  @Listen('click')
  async onClick() {
    // make sure locale strings are loaded
    let localeStrings = this.localeStrings;
    if(!localeStrings) {
      localeStrings = await this.getLocaleStrings();
    }

    // show a confirmation alert
    const alert = await alertController.create({
      header: localeStrings.confirm_header,
      message: localeStrings.confirm_message,
      buttons: [
        {
          text: localeStrings.cancel,
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: localeStrings.delete,
          role: 'submit',
          cssClass: 'danger',
          handler: () => {
            console.log('deleting ', this.base, this.index);
            this.ldfDocShouldChange.emit(new Change({
              path: this.base,
              op: [ { type: 'deleteAt' as 'deleteAt', index: this.index, oldValue: this.obj } ]
            }))
          }
        }
      ]
    });

    // show the alert
    return alert.present();
  }

  // Lifecycle events
  async componentWillLoad() {
    this.loadLocaleStrings();
  }

  // Methods
  /** Asynchronously return localization strings */
  async getLocaleStrings() : Promise<{ [x: string]: string; }> {
    if(!this.localeStrings) {
      await this.loadLocaleStrings();
      return this.localeStrings;
    } else {
      return this.localeStrings;
    }
  }

  /** Asynchronously load localization strings */
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = await getLocaleComponentStrings(this.el);
    } catch(e) {
      console.warn(e);
    }
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <ion-buttons>
        <ion-button aria-role='button' aria-label={localeStrings.delete} size='small' color='light'>
          <ion-icon name='close' slot='icon-only'></ion-icon>
        </ion-button>
      </ion-buttons>
    )
  }
}
