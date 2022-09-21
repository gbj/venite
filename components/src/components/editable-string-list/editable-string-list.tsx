import { IonInputCustomEvent } from '@ionic/core';
import { Component, Element, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { Change } from '@venite/ldf';

import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-string-list.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-editable-string-list',
  styleUrl: 'editable-string-list.scss',
  scoped: true
})
export class EditableStringListComponent {
  @Element() element: HTMLElement;

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
  @Prop() value : string[];

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  async componentWillLoad() {
    this.optimisticValues = this.value || new Array();
    this.loadLocaleStrings();

    if(!this.value || !Array.isArray(this.value)) {
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/${this.property}`,
        op: [{
          type: 'set',
          value: new Array()
        }]
      }));
    }
  }

  // Methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  onInput(ev : IonInputCustomEvent<InputEvent>) {
    this.currentValue = (ev.target as HTMLIonInputElement).value?.toString();
  }

  onKeyDown(ev : KeyboardEvent) {
    // 13 == Enter, 188 == Comma
    if(ev.keyCode == 13 || ev.keyCode == 188) {
      ev.preventDefault();
      this.add();
    }
  }

  add() {
    let change : Change;
    if(this.optimisticValues) {
      change = new Change({
        path: `${this.path}/${this.property}`,
        op: [{
          type: 'insertAt',
          index: this.optimisticValues.length,
          value: this.currentValue
        }]
      });
    } else {
      change = new Change({
        path: `${this.path}/${this.property}`,
        op: [{
          type: 'set',
          value: new Array(this.currentValue)
        }]
      });
    }

    this.optimisticValues.push(this.currentValue);
    this.currentValue = '';

    this.ldfDocShouldChange.emit(change);
  }

  remove(ii : number) {
    const oldValue = this.optimisticValues[ii];

    this.optimisticValues.splice(ii, 1);
    this.optimisticValues = [ ... this.optimisticValues ];
  
    const change = this.optimisticValues.length > 0
      ? new Change({
        path: `${this.path}/${this.property}`,
        op: [{
          type: 'deleteAt',
          index: ii,
          oldValue
        }]
      })
      : new Change({
        path: `${this.path}/${this.property}`,
        op: [{
          type: 'set',
          value: [],
          oldValue: [oldValue]
        }]
      });

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
