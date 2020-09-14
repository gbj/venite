import { Component, Element, Prop, Event, EventEmitter, h, State, Host, Watch } from '@stencil/core';
import { alertController } from '@ionic/core';
import { Change, Preference, preferencesToCategories, categoriesToPreferenceTree } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';
import { PreferenceTree } from './preference-tree';

@Component({
  tag: 'ldf-editable-preferences',
  styleUrl: 'editable-preferences.scss',
  shadow: true
})
export class EditablePreferencesComponent {
  @Element() el: HTMLElement;

  @State() tree : { [category: string]: Preference[] };
  @State() specialTree : { [category: string]: Preference[] };

  @State() localeStrings: { [x: string]: string; };

  @State() currentPreferences : { [x: string]: Preference };
  @State() currentSpecialPreferences : { [x: string]: Preference };

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() preferences: { [x: string]: Preference };
  @Watch('preferences')
  preferencesChange() {
    this.currentPreferences = this.preferences || {};
    this.tree = this.buildTree(this.currentPreferences);
  }

  /** Starting value for editing */
  @Prop() special_preferences: { [x: string]: Preference };
  @Watch('special_preferences')
  specialPreferencesChange() {
    this.currentSpecialPreferences = this.special_preferences || {};
    this.specialTree = this.buildTree(this.currentSpecialPreferences);
  }

  /** Used to pass in the `IonModal` we will dismiss */
  @Prop() modal : any;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.currentPreferences = this.preferences || {};
    this.currentSpecialPreferences = this.special_preferences || {};
    this.tree = this.buildTree(this.currentPreferences);
    this.specialTree = this.buildTree(this.currentSpecialPreferences);

    if(!this.preferences) {
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/preferences`,
        op: [{
          type: 'set',
          value: {}
        }]
      }));
    }
    if(!this.special_preferences) {
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/special_preferences`,
        op: [{
          type: 'set',
          value: {}
        }]
      }));
    }

    this.loadLocaleStrings();
  }

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

  buildTree(preferences : { [x: string]: Preference; }) : { [category: string]: Preference[]; } {
    const categories = preferencesToCategories(preferences);
    return categoriesToPreferenceTree(categories, preferences);
  }

  async addPreference() {
    const { key, label } = await this.grabKeyFromAlert();
    this.currentPreferences = { ... this.currentPreferences, [key]: new Preference({ key, label }) };
    this.tree = this.buildTree(this.currentPreferences);
    this.emit(this.preferences, 'preferences', key, this.currentPreferences[key]);
  }

  async addSpecialPreference() {
    const { key, label } = await this.grabKeyFromAlert();
    this.currentSpecialPreferences = { ... this.currentSpecialPreferences, [key]: new Preference({ key, label }) };
    this.specialTree = this.buildTree(this.currentSpecialPreferences);
    this.emit(this.special_preferences, 'special_preferences', key, this.currentSpecialPreferences[key]);
  }

  async grabKeyFromAlert() : Promise<{ key: string; label: string; }> {
    const localeStrings = this.localeStrings || {};
    const alert = await alertController.create({
      header: localeStrings.new_preference,
      inputs: [
        {
          name: 'label',
          type: 'text',
          placeholder: localeStrings.label
        },
      ],
      buttons: [
        {
          text: localeStrings.cancel || 'Cancel',
          role: 'cancel',
          cssClass: 'danger'
        }, {
          text: localeStrings.ok || 'OK'
        }
      ]
    });

    await alert.present();

    const data = await alert.onDidDismiss(),
          label = data?.data?.values?.label,
          // key is camelCase'd
          key = label.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()).replace(/\s+/g, '')

    return { key, label };
  }

  emit(input : {[x: string]: Preference}, tree: 'preferences' | 'special_preferences', key : string, value: any) {
    const path = `${this.path}/${tree}`;
    if(input == undefined) {
      this.ldfDocShouldChange.emit(new Change({
        path,
        op: [{
          type: 'set',
          value: { [key]: value }
        }]
      }))
    } else {
      this.ldfDocShouldChange.emit(new Change({
        path: `${path}/${key}`,
        op: [{
          type: 'set',
          value
        }]
      }));
    }
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title>{ localeStrings.preferences }</ion-title>
            <ion-buttons slot="primary">
              <ion-button onClick={() => this.modal.dismiss(null)}>
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          {/* Regular Preferences */}
          <PreferenceTree
            path={`${this.path}/preferences`}
            tree={this.tree}
            label={localeStrings.preferences}
            newCallback={() => this.addPreference()}
            localeStrings={localeStrings}
          />

          {/* Special Preferences */}
          <PreferenceTree
            path={`${this.path}/special_preferences`}
            tree={this.specialTree}
            label={localeStrings.special_preferences}
            desc={localeStrings.special_preferences_desc}
            newCallback={() => this.addSpecialPreference()}
            localeStrings={localeStrings}
          />
        </ion-content>
      </Host>
    );
  }
}
