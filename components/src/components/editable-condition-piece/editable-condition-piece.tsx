import { Component, Element, Prop, Event, EventEmitter, h, Host, State, Watch } from '@stencil/core';
import { Change, Condition, SEASONS, WEEKDAYS } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-condition-piece.i18n.en.json';
const LOCALE = {
  'en': EN
};import { ExceptOnly } from './except-only';
import { ExceptOnlyStrings } from './except-only-strings';

@Component({
  tag: 'ldf-editable-condition-piece',
  styleUrl: 'editable-condition-piece.scss',
  scoped: true
})
export class EditableConditionComponent {
  @Element() element: HTMLElement;

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

  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
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

        {/* Day of Month */}
        <article>
          <ion-item>
            <ion-label>{localeStrings.dayOfMonth}</ion-label>
            <ion-toggle
              checked={this.workingCondition.day_of_month !== undefined}
              onIonChange={(ev) => this.toggleSubcondition('day_of_month', ev.detail.checked, {})}
            ></ion-toggle>
          </ion-item>
          {this.workingCondition.day_of_month !== undefined && <div class="type row">
            <ion-item lines="none">
              <ion-label position="stacked">{localeStrings.dayOfMonthIs}</ion-label>
              <ldf-editable-text
                short={true}
                inputType="number"
                path={`${this.path}/day_of_month/eq`}
                placeholder={localeStrings.dayOfMonth}
                text={this.workingCondition.day_of_month.eq?.toString()}
              ></ldf-editable-text>
            </ion-item>
            <ion-item lines="none">
              <ion-label position="stacked">{localeStrings.dayOfMonthIsNot}</ion-label>
              <ldf-editable-text
                short={true}
                inputType="number"
                path={`${this.path}/day_of_month/neq`}
                placeholder={localeStrings.dayOfMonth}
                text={this.workingCondition.day_of_month.eq?.toString()}
              ></ldf-editable-text>
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
          {this.workingCondition.preference !== undefined && <div class="type row">
              <ldf-editable-text
                short={true}
                inputType="text"
                path={`${this.path}/preference/key`}
                placeholder={localeStrings.preferenceKey}
                text={this.workingCondition.preference.key}
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
                text={this.workingCondition.preference.value}
              ></ldf-editable-text>
          </div>}
        </article>

        {/* Liturgical Day */}
        <ExceptOnlyStrings
          path={this.path}
          field="day"
          localeStrings={localeStrings}
          currentCondition={this.workingCondition.day}
          onToggleSubcondition={(subcondition, active, template) => this.toggleSubcondition(subcondition, active, template)}
        />

        {/* Liturgical Week */}
        <ExceptOnlyStrings
          path={this.path}
          field="week"
          localeStrings={localeStrings}
          currentCondition={this.workingCondition.week}
          onToggleSubcondition={(subcondition, active, template) => this.toggleSubcondition(subcondition, active, template)}
        />
      </Host>
    );
  }
}
