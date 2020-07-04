import { Component, Element, Prop, Event, EventEmitter, h, State } from '@stencil/core';
import { Change, Preference, preferencesToCategories, categoriesToPreferenceTree } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-editable-preference',
  shadow: true
})
export class EditablePreferencesComponent {
  @Element() el: HTMLElement;

  @State() categories : string[];

  @State() tree : { [category: string]: Preference[] };

  @State() localeStrings: { [x: string]: string; };

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() preferences: { [x: string]: Preference };

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.loadLocaleStrings();
    this.buildTree();
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

  buildTree() {
    const categories = preferencesToCategories(this.preferences);
    this.categories = categories;
    this.tree = categoriesToPreferenceTree(categories, this.preferences);
  }

  render() {
    return this.categories.map(category =>
      {this.tree[category].length >= 0 && <fieldset>
        <h3>{category}</h3>
        <ion-list>
          {this.tree[category].map(item =>
            <ion-item>
              <code>{JSON.stringify(item)}</code>
            </ion-item>
          )}
        </ion-list>
      </fieldset>}
    )
  }
}
