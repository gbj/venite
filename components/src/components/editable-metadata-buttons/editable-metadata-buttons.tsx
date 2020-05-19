import { Component, Element, State, Prop, h } from '@stencil/core';
import { LiturgicalDocument } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-editable-metadata-buttons',
  styleUrl: 'editable-metadata-buttons.scss',
  shadow: true
})
export class EditableMetadataButtonsComponent {
  @Element() element : HTMLElement;

  // States
  @State() localeStrings: { [x: string]: string; };
  @State() collapsedState : boolean;

  // Properties
  /** Whether to show the buttons */
  @Prop() visible : boolean;

  /** A JSON Pointer that points to the array within which the item is nested */
  @Prop({ reflect: true }) base: string;

  /** The item's index within that array */
  @Prop({ reflect: true }) index: number;

  /** The LiturgicalDocument itself */
  @Prop() obj : LiturgicalDocument;

  // Lifecycle events
  componentWillLoad() {
    this.loadLocaleStrings();
  }

  // Private methods
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
      this.localeStrings = await getLocaleComponentStrings(this.element);
    } catch(e) {
      console.warn(e);
    }
  }

  /** Display a modal `EditableMetadataComponent` */
  async openSettings() {
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'ldf-editable-metadata';
    console.log('doc', this.obj, 'path', this.base);
    modalElement.componentProps = {
      modal: modalElement,
      doc: this.obj,
      path: this.base,
      visible: true,
      collapsed: false
    }
    // present the modal
    document.body.appendChild(modalElement);
    return modalElement.present();
  }


  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <ldf-label-bar class={{ hidden: !this.visible, visible: this.visible }}>
        <ion-buttons slot='end'>
          <ion-button onClick={() => this.openSettings()} aria-role='button' aria-label={localeStrings.settings}>
            <ion-icon slot='icon-only' name='cog'></ion-icon>
          </ion-button>

          {/* Only show 'Delete' if there's an index, i.e., if it appears as part of a `Liturgy.value[]` */}
          {this.index && <ldf-editable-delete base={this.base} index={this.index} obj={this.obj}></ldf-editable-delete>}
        </ion-buttons>
      </ldf-label-bar>
    )
  }
}
