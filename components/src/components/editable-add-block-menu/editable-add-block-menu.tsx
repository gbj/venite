import { Element, Component, Prop, Host, Listen, State, h } from '@stencil/core';
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
  @State() menu = [ ... MENU ];

  @Prop() modal : any;

  // Listener to capture searchbar changes
  @Listen('ionChange')
  onIonChange(ev : CustomEvent) {
    const search = ev.detail.value;
    this.filter(search);
  }

  async componentWillLoad() {
    this.loadLocaleStrings();
    this.filter('');
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

  /** Mark each item in menu as hidden or not
    * depending on whether its label or the localized version includes
    * the search */
  filter(search: string) {
    this.menu = [
      ... this.menu.map(entry => {
        const label = (entry.label || '').toLowerCase(),
              localeLabel = ((this.localeStrings || {})[entry.label] || '').toLowerCase(),
              s = search.toLowerCase();
        console.log(label, localeLabel, s, label.includes(s), localeLabel.includes(s) );
        return {
          ... entry,
          hidden: !(label.includes(s) || localeLabel.includes(s))
        }
      })
    ];
  }

  render() {
    const localeStrings = this.localeStrings || {};

    // list of unique section tags
    const sections = Array.from(
      new Set(
        this.menu
          .filter(item => !item.hidden)
          .map(item => item.section).flat()
      )
    );

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
          <ion-toolbar>
            <ion-searchbar slot="end"></ion-searchbar>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          {sections.map(section =>
            <ion-list>
              <ion-list-header>{localeStrings[section] || section}</ion-list-header>
              <ul>
              {this.menu.filter(item => item.section.includes(section) && !item.hidden).map(item =>
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