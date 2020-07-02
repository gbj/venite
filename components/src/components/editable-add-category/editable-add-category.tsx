import { Component, Element, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { Change } from '@venite/ldf';

import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-editable-add-category',
  styleUrl: 'editable-add-category.scss',
  shadow: true
})
export class EditableAddCategoryComponent {
  @Element() el: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  // initial @Prop() categories + anything we've added, optimistically
  @State() optimisticCategories : string[] = new Array();

  @State() currentCategoryValue : string;

  // Properties
  /** A JSON Pointer that points to the document */
  @Prop({ reflect: true }) path : string;

  /** Initial categories */
  @Prop() categories : string[] = new Array();

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  async componentWillLoad() {
    this.optimisticCategories = this.categories || new Array();
    this.loadLocaleStrings();
  }

  // Methods
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

  onInput(ev : CustomEvent<KeyboardEvent>) {
    this.currentCategoryValue = (ev.target as HTMLInputElement).value;
  }

  onKeyDown(ev : KeyboardEvent) {
    // 13 == Enter, 188 == Comma
    if(ev.keyCode == 13 || ev.keyCode == 188) {
      ev.preventDefault();
      this.add();
    }
  }

  add() {
    const change = new Change({
      path: `${this.path}/category`,
      op: [{
        type: 'insertAt',
        index: this.categories.length - 1,
        value: this.currentCategoryValue
      }]
    });

    this.optimisticCategories.push(this.currentCategoryValue);
    this.currentCategoryValue = '';

    console.log('(add) change = ', change);

    this.ldfDocShouldChange.emit(change);
  }

  remove(ii : number) {
    const change = new Change({
      path: `${this.path}/category`,
      op: [{
        type: 'deleteAt',
        index: ii,
        oldValue: this.categories[ii]
      }]
    });

    this.optimisticCategories.splice(ii, 1);
    this.optimisticCategories = [ ... this.optimisticCategories ];

    console.log('(remove) change = ', change);

    this.ldfDocShouldChange.emit(change);
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <ion-item lines="none">
        <div class="wrapper">
          <ion-label position="stacked">{localeStrings.categories}</ion-label>
          <ul>
            {this.optimisticCategories.map((category, ii) =>
              <li>
                <ion-chip>
                  <ion-label>{category}</ion-label>
                  <ion-icon name="close-circle" onClick={() => this.remove(ii)}></ion-icon>
                </ion-chip>
              </li>
            )}
          </ul>
          <div class='controls'>
            <ion-input
              placeholder={localeStrings.addCategory}
              onIonInput={(ev) => this.onInput(ev)}
              onKeyDown={(ev) => this.onKeyDown(ev)}
              value={this.currentCategoryValue}
            ></ion-input>
            <ion-button onClick={() => this.add()}>
              <ion-icon slot="icon-only" name="add"></ion-icon>
            </ion-button>
          </div>
        </div>
      </ion-item>
    )
  }
}
