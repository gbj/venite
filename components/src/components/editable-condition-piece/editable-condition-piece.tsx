import { Component, Element, Prop, Event, EventEmitter, h, Host, State, Watch } from '@stencil/core';
import { Change, Condition, SEASONS, WEEKDAYS } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';
import { ExceptOnly } from './except-only';
import { ExceptOnlyStrings } from './except-only-strings';

@Component({
  tag: 'ldf-editable-condition-piece',
  styleUrl: 'editable-condition-piece.scss',
  shadow: true
})
export class EditableConditionComponent {
  @Element() el: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() workingCondition : Condition;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() condition: Condition;
  @Watch('condition')
  conditionChange() {
    this.workingCondition = this.condition;
  }

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.loadLocaleStrings();
    this.workingCondition = this.condition;
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

  // Sets or clears one of the `Condition.___` fields (`season`, `day`, etc.)
  toggleSubcondition(subcondition : string, active : boolean, template : any) {
    if(active && this.workingCondition[subcondition] == undefined) {
      this.workingCondition = new Condition({
        ... this.workingCondition,
        [subcondition]: template
      });
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/${subcondition}`,
        op: [{
          type: 'set',
          value: template
        }]
      }));
    } else {
      const oldValue = this.workingCondition[subcondition];
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/${subcondition}`,
        op: [{
          type: 'delete',
          oldValue
        }]
      }));
      this.workingCondition[subcondition] = undefined;
      this.workingCondition = new Condition(this.workingCondition);
    }
  }

  toggleExceptOnly(field : string, subfield : string, value : string) {
    const list = this.workingCondition[field][subfield],
          index = list.indexOf(value);
    if(index == -1) {
      list.push(value);
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/${field}/${subfield}`,
        op: [{
          type: 'insertAt',
          index: list.length,
          value
        }]
      }));
    } else {
      const index = list.indexOf(value);
      list.splice(index, 1);
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/${field}/${subfield}`,
        op: [{
          type: 'deleteAt',
          index,
          oldValue: value
        }]
      }));
    }

    this.workingCondition = new Condition({ ... this.workingCondition });
  }

  setDateField(field : 'gt' | 'gte' | 'lt' | 'lte', dateString : string) {
    const date = new Date(Date.parse(dateString)),
          m = date.getMonth()+1,
          d = date.getDate(),
          value = `${m}/${d}`,
          oldValue = this.workingCondition?.date[field];
    this.ldfDocShouldChange.emit(new Change({
      path: `${this.path}/date/${field}`,
      op: [{
        type: 'set',
        value,
        oldValue
      }]
    }));
  }

  preferenceIs(value : boolean) {
    const oldValue = this.workingCondition?.preference?.is;

    this.workingCondition = new Condition({
      ... this.workingCondition,
      preference: {
        ... this.workingCondition.preference,
        is: value
      }
    });
    this.ldfDocShouldChange.emit(new Change({
      path: `${this.path}/preference`,
      op: [{
        type: 'set',
        index: 'is',
        value,
        oldValue
      }]
    }));
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <Host>
        {/* Feast Day */}
        <ion-item>
          <ion-label>{localeStrings.feastDay}</ion-label>
          <ion-toggle
            checked={this.workingCondition.feastDay !== undefined}
            onIonChange={(ev) => this.toggleSubcondition('feastDay', ev.detail.checked, ev.detail.checked)}
          ></ion-toggle>
        </ion-item>

        {/* Season */}
        <ExceptOnly
          field="season"
          localeStrings={localeStrings}
          options={SEASONS}
          currentCondition={this.workingCondition?.season}
          onToggleSubcondition={(subcondition, active, template) => this.toggleSubcondition(subcondition, active, template)}
          onToggleValue={(field, subfield, value) => this.toggleExceptOnly(field, subfield, value)}
        ></ExceptOnly>

        {/* Weekday */}
        <ExceptOnly
          field="weekday"
          localeStrings={localeStrings}
          options={WEEKDAYS}
          currentCondition={this.workingCondition?.weekday}
          onToggleSubcondition={(subcondition, active, template) => this.toggleSubcondition(subcondition, active, template)}
          onToggleValue={(field, subfield, value) => this.toggleExceptOnly(field, subfield, value)}
        ></ExceptOnly>

        {/* Date */}
        <article>
          <ion-item>
            <ion-label>{localeStrings.date}</ion-label>
            <ion-toggle
              checked={this.workingCondition.date !== undefined}
              onIonChange={(ev) => this.toggleSubcondition('date', ev.detail.checked, {})}
            ></ion-toggle>
          </ion-item>
          {this.workingCondition.date !== undefined && <div class="type">
            <ion-item lines="none">
              <ion-label position="stacked">{localeStrings.lte}</ion-label>
              <ion-datetime
                displayFormat="MMMM D"
                onIonChange={(ev) => this.setDateField('lte', ev.detail.value)}
              ></ion-datetime>
            </ion-item>
            <ion-item lines="none">
              <ion-label position="stacked">{localeStrings.lt}</ion-label>
              <ion-datetime
                displayFormat="MMMM D"
                onIonChange={(ev) => this.setDateField('lt', ev.detail.value)}
              ></ion-datetime>
            </ion-item>
            <ion-item lines="none">
              <ion-label position="stacked">{localeStrings.gte}</ion-label>
              <ion-datetime
                displayFormat="MMMM D"
                onIonChange={(ev) => this.setDateField('gte', ev.detail.value)}
              ></ion-datetime>
            </ion-item>
            <ion-item lines="none">
              <ion-label position="stacked">{localeStrings.gt}</ion-label>
              <ion-datetime
                displayFormat="MMMM D"
                onIonChange={(ev) => this.setDateField('gt', ev.detail.value)}
              ></ion-datetime>
            </ion-item>
          </div>}
        </article>

        {/* Preference */}
        <article>
          <ion-item>
            <ion-label>{localeStrings.preference}</ion-label>
            <ion-toggle
              checked={this.workingCondition.preference !== undefined}
              onIonChange={(ev) => this.toggleSubcondition('preference', ev.detail.checked, {
                key: '', is: true, value: ''
              })}
            ></ion-toggle>
          </ion-item>
          {this.workingCondition.preference !== undefined && <div class="type">
            <ion-item lines="none">
              <ldf-editable-text
                short={true}
                inputType="text"
                path={`${this.path}/preference/key`}
                placeholder={localeStrings.preferenceKey}
              ></ldf-editable-text>
              <ion-select
                value={this.workingCondition.preference.is}
                onIonChange={(ev) => this.preferenceIs(ev.detail.value)}
              >
                <ion-select-option value={true}>{localeStrings.preferenceIs}</ion-select-option>
                <ion-select-option value={false}>{localeStrings.preferenceIsNot}</ion-select-option>
              </ion-select>
              <ldf-editable-text
                short={true}
                inputType="text"
                path={`${this.path}/preference/value`}
                placeholder={localeStrings.preferenceValue}
              ></ldf-editable-text>
            </ion-item>
          </div>}
        </article>

        {/* Liturgical Day */}
        <ExceptOnlyStrings
          field="day"
          localeStrings={localeStrings}
          currentCondition={this.workingCondition.day}
          onToggleSubcondition={(subcondition, active, template) => this.toggleSubcondition(subcondition, active, template)}
        />

        {/* Liturgical Week */}
        <ExceptOnlyStrings
          field="week"
          localeStrings={localeStrings}
          currentCondition={this.workingCondition.week}
          onToggleSubcondition={(subcondition, active, template) => this.toggleSubcondition(subcondition, active, template)}
        />
      </Host>
    );
  }
}
