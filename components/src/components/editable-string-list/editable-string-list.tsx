import { Component, Element, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { Change } from '@venite/ldf';

import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-editable-string-list',
  styleUrl: 'editable-string-list.scss',
  shadow: true
})
export class EditableStringListComponent {
  @Element() el: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  // initial Prop `value` + anything we've added, optimistically
  @State() optimisticValues : string[] = new Array();

  @State() currentValue : string;

  // Properties
  /** A JSON Pointer that points to the document */
  @Prop({ reflect: true }) path : string;

  /** The property in that document that we're editing */
  @Prop({ reflect: true }) property : string;

  /** Initial categories */
  @Prop() value : string[] = new Array();

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  async componentWillLoad() {
    this.optimisticValues = this.value || new Array();
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
    this.currentValue = (ev.target as HTMLInputElement).value;
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
      path: `${this.path}/${this.property}`,
      op: [{
        type: 'insertAt',
        index: this.value.length - 1,
        value: this.currentValue
      }]
    });

    this.optimisticValues.push(this.currentValue);
    this.currentValue = '';

    console.log('(add) change = ', change);

    this.ldfDocShouldChange.emit(change);
  }

  remove(ii : number) {
    const change = new Change({
      path: `${this.path}/category`,
      op: [{
        type: 'deleteAt',
        index: ii,
        oldValue: this.value[ii]
      }]
    });

    this.optimisticValues.splice(ii, 1);
    this.optimisticValues = [ ... this.optimisticValues ];

    console.log('(remove) change = ', change);

    this.ldfDocShouldChange.emit(change);
  }

  render() {
    const localeStrings = ((this.localeStrings || {})[this.property]) || {};

    return (
      <ion-item lines="none">
        <div class="wrapper">
          <ion-label position="stacked">{localeStrings['list']}</ion-label>
          <ul>
            {this.optimisticValues.map((category, ii) =>
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
              placeholder={localeStrings['add']}
              onIonInput={(ev) => this.onInput(ev)}
              onKeyDown={(ev) => this.onKeyDown(ev)}
              value={this.currentValue}
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
