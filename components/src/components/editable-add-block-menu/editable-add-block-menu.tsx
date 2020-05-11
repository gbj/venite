import { Element, Component, Prop, Host, State, h } from '@stencil/core';
import { LiturgicalDocument } from '@venite/ldf';

import { getLocaleComponentStrings } from '../../utils/locale';
import { MENU } from './menu-options';

@Component({
  tag: 'ldf-editable-add-block-menu',
  styleUrl: 'editable-add-block-menu.scss',
  shadow: true
})
export class EditableAddBlockMenuComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @Prop() modal : any;

  async componentWillLoad() {
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
      this.localeStrings = await getLocaleComponentStrings(this.element);
    } catch(e) {
      console.warn(e);
    }
  }

  add(template : LiturgicalDocument[]) {
    this.modal.dismiss(template);
  }

  render() {
    const localeStrings = this.localeStrings || {};

    // list of unique section tags
    const sections = Array.from(new Set(MENU.map(item => item.section).flat()));

    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title>{ localeStrings.title }</ion-title>
            <ion-buttons slot="primary">
              <ion-button onClick={() => this.modal.dismiss(null)}>
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          {sections.map(section =>
            <ion-list>
              <ion-list-header>{localeStrings[section] || section}</ion-list-header>
              <ul>
              {MENU.filter(item => item.section.includes(section) && !item.hidden).map(item =>
                <li>
                  <button onClick={() => this.add(item.template)} class='block'>
                    { (item.icon)() }
                    <label>{ localeStrings[item.label] }</label>
                  </button>
                </li>
              )}
              </ul>
            </ion-list>
          )}
        </ion-content>
      </Host>
    )
  }
}
