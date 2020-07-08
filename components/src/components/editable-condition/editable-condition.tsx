import { Component, Element, Prop, Event, EventEmitter, h, Host, State, Watch } from '@stencil/core';
import { Change, Condition } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-editable-condition',
  shadow: true
})
export class EditableConditionComponent {
  @Element() el: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() currentCondition: {
    mode: 'and' | 'or';
    conditions: Condition[];
  } | undefined;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() condition: {
    mode: 'and' | 'or';
    conditions: Condition[];
  } | undefined;
  @Watch('condition')
  conditionChange() {
    this.currentCondition = this.condition;
  }

  /** Used to pass in the `IonModal` we will dismiss */
  @Prop() modal : any;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.loadLocaleStrings();
    this.currentCondition = this.condition;
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

  toggleCondition(hasCondition : boolean) {
    let change : Change;

    if(hasCondition) {
      this.currentCondition = { mode: "and", conditions: new Array() };
      change = new Change({
        path: this.path,
        op: [ { type: 'set', index: 'condition', value: this.currentCondition } ]
      });
    } else {
      this.currentCondition = undefined;
      change = new Change({
        path: this.path,
        op: [ { type: 'delete', index: 'condition', oldValue: this.currentCondition } ]
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
    if(!Array.isArray(this.currentCondition.conditions)) {
      this.currentCondition.conditions = new Array();
    }
    this.currentCondition = {
      ... this.currentCondition,
      conditions: this.currentCondition.conditions.concat(new Condition())
    }
    console.log('current conditions', this.currentCondition.conditions);
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

