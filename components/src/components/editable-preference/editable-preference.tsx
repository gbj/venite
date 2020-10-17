import { Component, Element, Prop, Event, EventEmitter, h, State, Host, Watch } from '@stencil/core';
import { Change, Preference, PreferenceOption } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-preference.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-editable-preference',
  shadow: true
})
export class EditablePreferenceComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() currentPreference : Preference;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() preference: Preference;
  @Watch('preference')
  optionChange() {
    this.currentPreference = this.preference || new Preference();
  }

  /** Used to pass in the `IonModal` we will dismiss */
  @Prop() modal : any;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.currentPreference = this.preference || new Preference();

    this.loadLocaleStrings();
  }

  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  addOption(index : number) {
    if(!this.currentPreference.options) {
      this.currentPreference.options = new Array();
      this.currentPreference.options.push(new PreferenceOption());
      this.ldfDocShouldChange.emit(new Change({
        path: this.path,
        op: [{
          type: 'set',
          index: 'options',
          value: [new PreferenceOption()]
        }]
      }));
    } else {
      this.currentPreference.options.push(new PreferenceOption());
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/options`,
        op: [{
          type: 'insertAt',
          index,
          value: new PreferenceOption()
        }]
      }));
    }
    this.currentPreference = new Preference({ ... this.currentPreference });
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <Host>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">{localeStrings.label}</ion-label>
            <ldf-editable-text
              path={`${this.path}/label`}
              placeholder={localeStrings.label}
              short={true}
              text={this.currentPreference?.label}
            ></ldf-editable-text>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">{localeStrings.category}</ion-label>
            <ldf-editable-text
              path={`${this.path}/category`}
              placeholder={localeStrings.category}
              short={true}
              text={this.currentPreference?.category}
            ></ldf-editable-text>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">{localeStrings.description}</ion-label>
            <ldf-editable-text
              path={`${this.path}/description`}
              placeholder={localeStrings.description}
              short={true}
              text={this.currentPreference?.description}
            ></ldf-editable-text>
          </ion-item>
          {(this.currentPreference?.options || []).map((option, index) => [
          <ion-toolbar>
            <ion-title slot="start">{localeStrings.option} {index+1}</ion-title>
            <ion-buttons slot="end">
              {/* Delete Button */}
              <ldf-editable-delete slot="end"
                base={`${this.path}/options`}
                index={index}
                obj={option}
              >
              </ldf-editable-delete>
            </ion-buttons>
          </ion-toolbar>, 
          <ldf-editable-preference-option
            path={`${this.path}/options/${index}`}
            option={option}
          ></ldf-editable-preference-option>
          ])}
          <ion-button onClick={() => this.addOption(this.currentPreference?.options?.length)} size="small">
            <ion-icon slot="start" name="add"></ion-icon>
            <ion-label>{localeStrings.add}</ion-label>
          </ion-button>
        </ion-list>
      </Host>
    );
  }
}
