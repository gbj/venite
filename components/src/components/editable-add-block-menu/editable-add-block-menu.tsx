import { Element, Component, Host, Listen, State, Event, EventEmitter, h } from '@stencil/core';
import { MENU } from './menu-options';
import { MenuOption } from '../../interfaces/menu-option';

import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-add-block-menu.i18n.en.json';
const LOCALE = {
  'en': EN
};

@Component({
  tag: 'ldf-editable-add-block-menu',
  styleUrl: 'editable-add-block-menu.scss',
  shadow: true
})
export class EditableAddBlockMenuComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };
  @State() menu = [ ... MENU ];

  //@Prop() modal : any;

  @Event() ldfShouldAddBlock : EventEmitter<MenuOption | null>;

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

  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  add(item : MenuOption) {
    this.ldfShouldAddBlock.emit(item);
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
        <ion-toolbar>
          <ion-searchbar slot="end"></ion-searchbar>
        </ion-toolbar>
        {sections.map(section =>
          <ion-card class='ion-padding'>
            <ion-card-header>
              <ion-card-subtitle>{localeStrings[section] || section}</ion-card-subtitle>
            </ion-card-header>
            <ul>
            {this.menu.filter(item => item.section.includes(section) && !item.hidden).map(item =>
              <li>
                <button onClick={() => this.add(item)} class='block'>
                  { (item.icon)() }
                  <label>{ localeStrings[item.label] }</label>
                </button>
              </li>
            )}
            </ul>
          </ion-card>
        )}
      </Host>
    )
  }
}

