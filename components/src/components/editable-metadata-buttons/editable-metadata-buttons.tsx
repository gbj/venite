import { Component, Element, State, Prop, Event, EventEmitter, h, Host, Watch } from '@stencil/core';
import { modalController, ComponentProps, alertController } from '@ionic/core';
import { Change, LiturgicalDocument } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-metadata-buttons.i18n.en.json';
const LOCALE = {
  'en': EN
};import { AddOptionToDoc } from '../../interfaces/add-option-to-doc';

@Component({
  tag: 'ldf-editable-metadata-buttons',
  styleUrl: 'editable-metadata-buttons.scss',
  scoped: true
})
export class EditableMetadataButtonsComponent {
  @Element() element : HTMLElement;

  // States
  @State() localeStrings: { [x: string]: string; };
  @State() collapsedState : boolean;

  @State() modal : HTMLIonModalElement;

  // Properties
  /** Whether to show the buttons */
  @Prop() visible : boolean;

  /** A JSON Pointer that points to the array within which the item is nested */
  @Prop({ reflect: true }) base: string;

  /** The item's index within that array */
  @Prop({ reflect: true }) index: number;

  /** The LiturgicalDocument itself */
  @Prop() obj : LiturgicalDocument;
  @Watch('obj')
  objChange(newObj : LiturgicalDocument) {
    if(this.modal) {
      this.modal.componentProps = { ... this.modal.componentProps, obj: newObj };
    }
  }

  /** Type of the parent `LiturgicalDocument`, if any */
  @Prop() parentType : 'liturgy' | 'cycle' | 'heading' | 'option' | 'refrain' | 'rubric' | 'text' | 'responsive' | 'bible-reading' | 'psalm' | 'meditation' | null;

  /** Documents in `preview` mode will display as if they're not editable, unless the user explicitly chooses to edit them */
  @Prop() preview : boolean = false;

  // Events
  @Event() ldfAddOptionToDoc : EventEmitter<AddOptionToDoc>;

  @Event() ldfTogglePreview : EventEmitter<boolean>;

  @Event() ldfDocShouldMove : EventEmitter<{ base: string; oldIndex: number; diff: number; }>;

  @Event() ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  componentWillLoad() {
    this.loadLocaleStrings();
  }

  // Private methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  /** Display a modal `EditableMetadataComponent` */
  async openSettings() {
    this.modal = await this.openModal('ldf-editable-metadata');
  }

  /** Display a modal `EditableConditionComponent` */
  async openCondition() {
    this.modal = await this.openModal(
      'ldf-editable-condition',
      `${this.base}/${this.index}/condition`,
      { obj: this.obj }
    );
  }

  /** Display a modal `EditablePreferencesComponent` */
  async openPreferences() {
    const path = this.base && this.index ? `${this.base}/${this.index}` : '';
    this.modal = await this.openModal(
      'ldf-editable-preferences',
      `${path}/metadata`,
      {
        obj: this.obj
      },
    );
  }

  async openModal(component: string, componentPath : string = undefined, componentProps : ComponentProps = undefined) {
    const modal = await modalController.create({
      component
    })

    const path = componentPath || (this.base && this.index >= 0 ? `${this.base}/${this.index}` : '/');

    modal.componentProps = {
      ... componentProps,
      modal,
      doc: this.obj,
      path,
      visible: true,
      collapsed: false
    }
  
    // present the modal
    await modal.present();

    return modal;
  }

  /** Emit an event with information about this document’s location in the tree and current state */
  addOption() {
    this.ldfAddOptionToDoc.emit({
      base: this.base,
      index: this.index,
      obj: this.obj
    });
  }

  move(diff : 1 | -1) {
    this.ldfDocShouldMove.emit({
      base: this.base,
      oldIndex: this.index,
      diff
    });
  }

  async headingLevel() {
    const alert = await alertController.create({
      header: this.localeStrings?.heading,
      inputs: [
        {
          name: 'level',
          type: 'radio',
          value: 1,
          label: this.localeStrings?.heading1
        },
        {
          name: 'level',
          type: 'radio',
          value: 2,
          label: this.localeStrings?.heading2
        },
        {
          name: 'level',
          type: 'radio',
          value: 3,
          label: this.localeStrings?.heading3
        },
        {
          name: 'level',
          type: 'radio',
          value: 4,
          label: this.localeStrings?.heading4
        },
      ],
      buttons: [
        {
          text: this.localeStrings?.cancel,
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: this.localeStrings?.ok,
        }
      ]
    });
    await alert.present();
    const { data } = await alert.onDidDismiss(),
      { values } = data;
    if(this.obj?.metadata) {
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.base}/${this.index}/metadata/level`,
        op: [{
          type: 'set',
          value: values,
          oldValue: this.obj?.metadata?.level
        }]
      }));
    } else {
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.base}/${this.index}/metadata`,
        op: [{
          type: 'set',
          value: { level: values }
        }]
      }));
    }
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {},
          hasIndex : boolean = this.index !== undefined && this.index >= 0;

    return <Host>
     {/* Preview Buttons */}
      <div class={{ buttons: true, hidden: !this.visible || !this.preview }}>
        {/* Preview Buttons */}
        {<ion-buttons slot="end" >
          <ion-button onClick={() => this.ldfTogglePreview.emit(false)}>
            <ion-label class="sm-hidden">{this.localeStrings?.edit}</ion-label>
            <ion-icon slot="end" name="create"></ion-icon>
          </ion-button>
        </ion-buttons>}
      </div>
      <div class={{ buttons: true, hidden: !this.visible || this.preview }}>
        {/* Editable Buttons */}
        {<ion-buttons slot='end'>
          <ion-button onClick={() => this.ldfTogglePreview.emit(true)}>
            <ion-label class="sm-hidden">{this.localeStrings?.preview}</ion-label>
            <ion-icon slot="end" name="eye"></ion-icon>
          </ion-button>

          {/* "Add Option" Button */}
          {/* Don't show "Add Option" button if `obj` is already an `Option` or a child of an `Option`; they have their own interface for this */}
          {this.obj?.type !== 'option' && this.parentType !== 'option' && this.base &&
            <ion-button onClick={() => this.addOption()} aria-role='button' aria-label={localeStrings.addOption}>
              <ion-icon slot='icon-only' name='add'></ion-icon>
            </ion-button>
          }

          {/* "Preferences" Button */}
          {this.obj?.type == 'liturgy' && <ion-button onClick={() => this.openPreferences()} aria-role='button' aria-label={localeStrings.preferences}>
            <ion-icon slot='icon-only' name='list'></ion-icon>
          </ion-button>}

          {/* for headings -- level */}
          {this.obj?.type == 'heading' && <ion-button onClick={() => this.headingLevel()}>
            <ion-label>{localeStrings[`heading${this.obj?.metadata?.level || 3}`] || 'Heading'}</ion-label>
          </ion-button>}

          {/* "Settings" Button */}
          <ion-button onClick={() => this.openSettings()} aria-role='button' aria-label={localeStrings.settings}>
            <ion-icon slot='icon-only' name='cog'></ion-icon>
          </ion-button>

          {/* "Condition" Button */}
          {(this.base && hasIndex || this.obj?.type !== 'liturgy') && <ion-button onClick={() => this.openCondition()} aria-role='button' aria-label={localeStrings.condition}>
            <ion-icon slot='icon-only' name='calendar'></ion-icon>
          </ion-button>}

          {/* "Move" Buttons — Move and item up or down */}
          {(this.base && hasIndex && this.index > 0) && <ion-button onClick={() => this.move(-1)} aria-role='button' aria-label={localeStrings.move_up}>
            <ion-icon slot='icon-only' name='arrow-up'></ion-icon>
          </ion-button>}
          {(this.base && hasIndex) && <ion-button onClick={() => this.move(1)} aria-role='button' aria-label={localeStrings.move_down}>
            <ion-icon slot='icon-only' name='arrow-down'></ion-icon>
          </ion-button>}

          {/* "Delete" Button */}
          {/* Only show 'Delete' if there's an index, i.e., if it appears as part of a `Liturgy.value[]` */}
          { hasIndex &&
            <ldf-editable-delete base={this.base} index={this.index} obj={this.obj}></ldf-editable-delete>
          }
        </ion-buttons>}
      </div>
    </Host>
  }
}
