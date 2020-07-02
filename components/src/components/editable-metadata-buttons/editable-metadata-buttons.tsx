import { Component, Element, State, Prop, Event, EventEmitter, h } from '@stencil/core';
import { modalController } from '@ionic/core';
import { LiturgicalDocument } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';
import { AddOptionToDoc } from '../../interfaces/add-option-to-doc';

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

  /** Type of the parent `LiturgicalDocument`, if any */
  @Prop() parentType : 'liturgy' | 'cycle' | 'heading' | 'option' | 'refrain' | 'rubric' | 'text' | 'responsive' | 'bible-reading' | 'psalm' | 'meditation' | null;

  // Events
  @Event() ldfAddOptionToDoc : EventEmitter<AddOptionToDoc>;

  // Lifecycle events
  componentWillLoad() {
    this.loadLocaleStrings();
    console.log('parent type = ', this.parentType)
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
    const modal = await modalController.create({
      component: 'ldf-editable-metadata',
      
    })
    modal.componentProps = {
      modal,
      doc: this.obj,
      path: this.base && this.index ? `${this.base}/${this.index}` : '/',
      visible: true,
      collapsed: false
    }
    // present the modal
    return modal.present();
  }

  /** Emit an event with information about this document’s location in the tree and current state */
  addOption() {
    this.ldfAddOptionToDoc.emit({
      base: this.base,
      index: this.index,
      obj: this.obj
    });
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {},
          hasIndex : boolean = this.index !== undefined && this.index >= 0;

    return (
      <ldf-label-bar class={{ hidden: !this.visible, visible: this.visible }}>
        <ion-buttons slot='end'>
          {/* "Add Option" Button */}
          {/* Don't show "Add Option" button if `obj` is already an `Option` or a child of an `Option`; they have their own interface for this */}
          {this.obj?.type !== 'option' && this.parentType !== 'option' && this.base &&
            <ion-button onClick={() => this.addOption()} aria-role='button' aria-label={localeStrings.addOption}>
              {/*localeStrings.addOption*/}
              <ion-icon slot='icon-only' name='add'></ion-icon>
            </ion-button>
          }

          {/* "Settings" Button */}
          <ion-button onClick={() => this.openSettings()} aria-role='button' aria-label={localeStrings.settings}>
            {/*localeStrings.settings*/}
            <ion-icon slot='icon-only' name='cog'></ion-icon>
          </ion-button>

          {/* "Delete" Button */}
          {/* Only show 'Delete' if there's an index, i.e., if it appears as part of a `Liturgy.value[]` */}
          { hasIndex &&
            <ldf-editable-delete base={this.base} index={this.index} obj={this.obj}></ldf-editable-delete>
          }
        </ion-buttons>
      </ldf-label-bar>
    )
  }
}
