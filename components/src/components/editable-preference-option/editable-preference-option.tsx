import { Component, Element, Prop, Event, EventEmitter, h, State, Host, Watch } from '@stencil/core';
import { Change, PreferenceOption } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-preference-option.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-editable-preference-option',
  scoped: true
})
export class EditablePreferenceOptionComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() currentOption : PreferenceOption;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() option: PreferenceOption;
  @Watch('option')
  optionChange() {
    this.currentOption = this.option || new PreferenceOption();
  }

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.currentOption = this.option || new PreferenceOption();

    if(!this.currentOption?.metadata) {
      this.currentOption.metadata = {};
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/metadata`,
        op: [{
          type: 'set',
          value: {}
        }]
      }));
    }

    this.loadLocaleStrings();
  }

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
      <Host>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">{localeStrings.value}</ion-label>
            <ldf-editable-text
              path={`${this.path}/value`}
              placeholder={localeStrings.value}
              short={true}
              text={this.currentOption?.value}
            ></ldf-editable-text>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">{localeStrings.label}</ion-label>
            <ldf-editable-text
              path={`${this.path}/label`}
              placeholder={localeStrings.label}
              short={true}
              text={this.currentOption?.label}
            ></ldf-editable-text>
          </ion-item>
          <ion-item>
            <ion-label>{localeStrings.default}</ion-label>
            <ldf-editable-boolean
              path={this.path}
              property="default"
              value={this.currentOption?.default}
            ></ldf-editable-boolean>
          </ion-item>
          <ion-list-header>{localeStrings.additional}</ion-list-header>
          <ion-item>
            <ion-label>{localeStrings.alternateYear}</ion-label>
            <ldf-editable-boolean
              path={`${this.path}/metadata`}
              property="alternateYear"
              value={this.currentOption?.metadata?.alternateYear}
            ></ldf-editable-boolean>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">{localeStrings.fallback}</ion-label>
            <ldf-editable-text
              path={`${this.path}/metadata/fallback`}
              placeholder={localeStrings.fallback}
              short={true}
              text={this.currentOption?.metadata?.fallback}
            ></ldf-editable-text>
          </ion-item>
        </ion-list>
      </Host>
    );
  }
}
