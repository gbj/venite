import { Component, Prop, Event, EventEmitter, h, State, Host, Watch } from '@stencil/core';
import { Lookup, Change } from '@venite/ldf';

const LOCALE_STRINGS = {
  "allowMultiple": "Allow multiple options",
  "lookup": "Look this document up from the database.",
  "type": "Type",
  "lectionary": "Lectionary",
  "canticle": "Canticle",
  "category": "Category",
  "slug": "Slug",
  "collect": "Collect",
  "table": "Table",
  "item": "Item",
  "filter": "Filter",
  "seasonal": "Seasonal",
  "evening": "Evening",
  "day": "Day",
  "rotate": "Rotate",
  "isPreference": "Value stored in preference",
  "preference": "Preference",
  "value": "Value"
};

const DEFAULT_LOOKUP : Lookup = {
  type: 'slug',
};

@Component({
  tag: 'ldf-editable-lookup',
  scoped: true
})
export class EditableLookupComponent {
  @State() currentLookup : Lookup;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() lookup: Lookup;
  @Watch('lookup')
  optionChange() {
    this.currentLookup = this.lookup;
  }

  /** Available lookup types */
  @Prop() types: readonly string[];

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.currentLookup = this.lookup;
  }

  toggle() {
    if(this.currentLookup) {
      this.ldfDocShouldChange.emit(new Change({
        path: this.path,
        op: [{
          type: 'set',
          oldValue: this.currentLookup,
          value: undefined
        }]
      }));
      this.currentLookup = undefined;
    } else {
      this.currentLookup = DEFAULT_LOOKUP;
      this.ldfDocShouldChange.emit(new Change({
        path: this.path,
        op: [{
          type: 'set',
          oldValue: undefined,
          value: DEFAULT_LOOKUP
        }]
      }));
    }
  }

  toggleIsPreference(field : string, checked : boolean) {
    const currentValue = (this.currentLookup || {})[field];
    if(checked) {
      this.currentLookup = {
        ... this.currentLookup,
        [field]: { preference: "" }
      };
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/${field}`,
        op: [{
          type: 'set',
          oldValue: currentValue,
          value: { preference: "" }
        }]
      }))
    } else {
      this.currentLookup = {
        ... this.currentLookup,
        [field]: ""
      };
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/${field}`,
        op: [{
          type: 'set',
          oldValue: currentValue,
          value: ""
        }]
      }))
    }
  }

  render() {
    const PreferenceOrText = ({ label, field, value }) => {
      const isPreference = value && typeof value !== 'string';
      return [
        <ion-item lines="none">
            <ion-label position="stacked">{label}</ion-label><br/>
        </ion-item>,
        <ion-item lines="none">
            <ion-label>{LOCALE_STRINGS.isPreference}</ion-label>
            <ion-checkbox
              slot="end"
              checked={isPreference}
              onIonChange={(e) => this.toggleIsPreference(field, e.detail.checked)}
            ></ion-checkbox>
        </ion-item>,
        <ion-item>
          {isPreference
          ? <ldf-editable-text
            path={`${this.path}/${field}/preference`}
            short={true}
            placeholder={LOCALE_STRINGS.preference}
            text={value?.preference}
          ></ldf-editable-text>
          : <ldf-editable-text
            path={`${this.path}/${field}`}
            placeholder={LOCALE_STRINGS.value}
            short={true}
            text={value}
          ></ldf-editable-text>}
        </ion-item>
      ];
    }

    return (
      <Host>
        <ion-item>
          <ion-label>{LOCALE_STRINGS.lookup}</ion-label>
          <ion-checkbox
            checked={Boolean(this.lookup)}
            onIonChange={() => this.toggle()}
          ></ion-checkbox>
        </ion-item>

        {this.currentLookup && <ion-list>
          <ion-item>
            <ion-label position="stacked">{LOCALE_STRINGS.type}</ion-label>
            <ldf-editable-select
              path={this.path}
              property="type"
              options={new Array({ value: undefined, label: "—"}).concat(
                this.types.map(lookupType => ({
                  value: lookupType,
                  label: LOCALE_STRINGS[lookupType] || lookupType
                }))
              )}
              value={this.currentLookup?.type}
            >
            </ldf-editable-select>
          </ion-item>
          <PreferenceOrText
            label={LOCALE_STRINGS.table}
            field="table"
            value={this.currentLookup?.table}
          />
          <PreferenceOrText
            label={LOCALE_STRINGS.item}
            field="item"
            value={this.currentLookup?.item}
          />
          <ion-item>
            <ion-label position="stacked">{LOCALE_STRINGS.filter}</ion-label>
            <ldf-editable-select
              path={this.path}
              property="filter"
              options={[
                { value: undefined, label: '—'},
                { value: 'seasonal', label: LOCALE_STRINGS.seasonal },
                { value: 'evening', label: LOCALE_STRINGS.evening },
                { value: 'day', label: LOCALE_STRINGS.day }
              ]}
              value={this.currentLookup?.filter}
            >
            </ldf-editable-select>
          </ion-item>
          <ion-item>
            <ion-label>{LOCALE_STRINGS.rotate}</ion-label>
            <ldf-editable-boolean
              slot="end"
              path={this.path}
              property="rotate"
              value={this.currentLookup?.rotate}
            >
            </ldf-editable-boolean>
          </ion-item>
          <ion-item>
            <ion-label>{LOCALE_STRINGS.allowMultiple}</ion-label>
            <ldf-editable-boolean
              slot="end"
              path={this.path}
              property="allow_multiple"
              value={this.currentLookup?.allow_multiple}
            >
            </ldf-editable-boolean>
          </ion-item>
        </ion-list>}
      </Host>
    );
  }
}
