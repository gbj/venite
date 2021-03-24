import { Component, Element, Prop, Event, EventEmitter, h, Host, State, Watch } from '@stencil/core';
import { Change, Condition, LiturgicalDocument } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-condition.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-editable-condition',
  scoped: true
})
export class EditableConditionComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() currentCondition: {
    mode: 'and' | 'or';
    conditions: Condition[];
  } | undefined;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() obj: LiturgicalDocument;
  @Watch('obj')
  objChange() {
    this.currentCondition = this.obj?.condition;
  }

  /** Used to pass in the `IonModal` we will dismiss */
  @Prop() modal : any;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.loadLocaleStrings();
    this.currentCondition = this.obj?.condition;
  }

  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  toggleCondition(hasCondition : boolean) {
    let change : Change;

    if(hasCondition) {
      this.currentCondition = { mode: "and", conditions: new Array() };
      change = new Change({
        path: this.path,
        op: [ { type: 'set', value: this.currentCondition } ]
      });
    } else {
      this.currentCondition = undefined;
      change = new Change({
        path: this.path,
        op: [ { type: 'delete', oldValue: this.currentCondition } ]
      });
    }

    this.ldfDocShouldChange.emit(change);
  }

  setAndOr(value : 'and' | 'or') {
    this.currentCondition.mode = value;
    this.ldfDocShouldChange.emit(new Change({
      path: `${this.path}`,
      op: [ { type: 'set', index: 'mode', value: value, oldValue: this.currentCondition.mode } ]
    }));
  }

  addCondition() {
    // create array if not in existence
    if(!Array.isArray(this.currentCondition.conditions)) {
      this.currentCondition.conditions = new Array();
      this.ldfDocShouldChange.emit(new Change({
        path: this.path,
        op: [ { type: 'set', index: 'conditions', value: new Array() } ]
      }));
    }

    // add to the array
    this.currentCondition = {
      ... this.currentCondition,
      conditions: this.currentCondition.conditions.concat(new Condition())
    }
    this.ldfDocShouldChange.emit(new Change({
      path: `${this.path}/conditions`,
      op: [ { type: 'insertAt', index: this.currentCondition.conditions.length, value: new Condition() } ]
    }));
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title>{ localeStrings.condition }</ion-title>
            <ion-buttons slot="primary">
              <ion-button onClick={() => this.modal.dismiss(null)}>
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            {/* Include any condition? */}
            <ion-item lines="none">
              <ion-label>{localeStrings.hasCondition}</ion-label>
              <ion-checkbox
                checked={!!this.currentCondition}
                onIonChange={(ev : CustomEvent) => this.toggleCondition(ev.detail.checked)}
              ></ion-checkbox>
            </ion-item>

            {/* `and` or `or`? */}
            {this.currentCondition &&
              <ion-radio-group
                value={this.currentCondition?.mode}
                onIonChange={(ev : CustomEvent) => this.setAndOr(ev.detail.value)}
              >
                <ion-item lines="none">
                  <ion-label>{localeStrings.and}</ion-label>
                  <ion-radio value="and"></ion-radio>
                </ion-item>
                <ion-item lines="none">
                  <ion-label>{localeStrings.or}</ion-label>
                  <ion-radio value="or"></ion-radio>
                </ion-item>
              </ion-radio-group>
            }

            {this.currentCondition?.conditions?.map((condition, ii) => [
                <ion-toolbar>
                  <ion-title slot="start">{localeStrings.condition} {ii+1}</ion-title>
                  <ion-buttons slot="end">
                    {/* Delete Button */}
                    <ldf-editable-delete slot="end"
                      base={`${this.path}/conditions`}
                      index={ii}
                      obj={condition}
                    >
                    </ldf-editable-delete>
                  </ion-buttons>
                </ion-toolbar>,
                (<ldf-editable-condition-piece
                  path={`${this.path}/conditions/${ii}`}
                  condition={condition}
                ></ldf-editable-condition-piece>)                   
              ])
            }
            {/* Add Button */}
            {this.currentCondition?.conditions && <ion-item lines="none">
              <ion-button onClick={() => this.addCondition()}>
                {localeStrings.addCondition}
              </ion-button>
            </ion-item>}
          </ion-list>
        </ion-content>
      </Host>
    );
  }
}

