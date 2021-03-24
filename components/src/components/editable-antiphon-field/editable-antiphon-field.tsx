import { alertController } from '@ionic/core';
import { Component, Element, Prop, Event, EventEmitter, h, Host, State, Watch } from '@stencil/core';
import { Change, Refrain } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-antiphon-field.i18n.en.json';
const LOCALE = {
  'en': EN
};
type Mode = 'default' | 'string' | 'refrain' | 'table';

type EditableStringOrAntiphonProps = {
  mode: Mode;
  path: string;
  value: string | Refrain;
}
const EditableStringOrAntiphon = ({ mode, path, value } : EditableStringOrAntiphonProps) => <ion-item lines="none">
  {/* 'String' Mode */}
  {mode === 'string' && <ldf-editable-text
    path={path}
    short={true}
    text={value.toString()}
  ></ldf-editable-text>}

  {/* 'Refrain' mode */}
  {mode === 'refrain' && <ldf-liturgical-document
    path={path}
    doc={value as Refrain}
    editable={true}
  ></ldf-liturgical-document>}
</ion-item>

@Component({
  tag: 'ldf-editable-antiphon-field',
  styleUrl: 'ldf-editable-antiphon-field.scss',
  scoped: true
})
export class EditableAntiphonFieldComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() currentAntiphon: undefined | string | Refrain | { [x: string]: string | Refrain };

  @State() currentOmitAntiphon: undefined | boolean;

  @State() currentInsertAntiphon: undefined | boolean;

  @State() mode : Mode = 'default';

  // Properties

  /** A JSON Pointer that points to the document being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() antiphon: undefined | string | Refrain | { [x: string]: string | Refrain };
  @Watch('antiphon')
  antiphonChange() {
    this.currentAntiphon = this.antiphon;
    this.setMode();
  }

  @Prop() omit_antiphon : boolean | undefined;
  @Watch('omit_antiphon')
  omitAntiphonChange() {
    this.currentOmitAntiphon = this.omit_antiphon;
  }

  @Prop() insert_antiphon : boolean | undefined;
  @Watch('insert_antiphon')
  insertAntiphonChange() {
    this.currentInsertAntiphon = this.insert_antiphon;
  }

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.loadLocaleStrings();
    this.currentAntiphon = this.antiphon;
    this.currentOmitAntiphon = this.omit_antiphon;
    this.currentInsertAntiphon = this.insert_antiphon;
    this.setMode();
  }

  setMode() {
    if(this.currentAntiphon == undefined) {
      this.mode = 'default';
    } else if(typeof this.currentAntiphon === 'string') {
      this.mode = 'string';
    } else if(this.currentAntiphon?.type === 'refrain') {
      this.mode = 'refrain';
    } else if(typeof this.currentAntiphon === 'object') {
      this.mode = 'table';
    } else {
      console.warn(`[ldf-editable-antiphon-field] invalid antiphon field at path ${this.path}/metadata/antiphon: ${JSON.stringify(this.currentAntiphon)}`);
    }
  }

  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  setValue(newValue : undefined | string | Refrain | Record<string, string | Refrain>, omit : boolean, insert : boolean) {
    this.ldfDocShouldChange.emit(new Change({
      path: `${this.path}/metadata/antiphon`,
      op: [{
        type: 'set',
        oldValue: this.currentAntiphon,
        value: newValue
      }]
    }));
    this.currentAntiphon = newValue;
    this.setMode();

    if(this.currentOmitAntiphon !== omit) {
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/metadata/omit_antiphon`,
        op: [{
          type: 'set',
          oldValue: this.currentOmitAntiphon,
          value: omit
        }]
      }));
      this.currentOmitAntiphon = omit;
    }

    if(this.currentInsertAntiphon !== insert) {
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/metadata/insert_antiphon`,
        op: [{
          type: 'set',
          oldValue: this.currentInsertAntiphon,
          value: insert
        }]
      }));
      this.currentInsertAntiphon = insert;
    }
  }

  async addTableValue() {
    const alert = await alertController.create({
      header: this.localeStrings.add_table_value_header,
      message: this.localeStrings.add_table_value_message,
      inputs: [
        {
          name: 'mmdd',
          type: 'text',
          placeholder: 'MM/DD'
        }
      ],
      buttons: [
        {
          text: this.localeStrings.cancel,
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: this.localeStrings.ok,
          handler: ({mmdd}) => {
            if(typeof this.currentAntiphon === 'object') {
              const oldValue = this.currentAntiphon[mmdd];
              this.currentAntiphon[mmdd] = '';
              this.ldfDocShouldChange.emit(new Change({
                path: `${this.path}/metadata/antiphon`,
                op: [{
                  type: 'set',
                  index: mmdd,
                  oldValue,
                  value: ''
                }]
              }));
              this.currentAntiphon = {
                ... this.currentAntiphon
              } as Record<string, string | Refrain>;

              this.ldfDocShouldChange.emit(new Change({
                path: `${this.path}/metadata/omit_antiphon`,
                op: [{
                  type: 'set',
                  oldValue: this.currentOmitAntiphon,
                  value: false
                }]
              }));
              this.currentOmitAntiphon = false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async removeTableValue(mmdd : string) {
    if(typeof this.currentAntiphon === 'object') {
      this.currentAntiphon[mmdd] = undefined;
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/metadata/antiphon`,
        op: [{
          type: 'deleteAt',
          index: mmdd,
          oldValue: this.currentAntiphon[mmdd],
        }]
      }));
      this.currentAntiphon = {
        ... this.currentAntiphon
      } as Record<string, string | Refrain>;
    }
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <Host>
        {/* Select Mode */}
        <ion-radio-group value={this.mode} onIonChange={(e) => {
          switch(e.detail.value) {
            case 'omit':
              this.setValue(undefined, true, false);
              break;
            case 'insert':
              this.setValue(undefined, false, true);
              break;
            case 'string':
              this.setValue('', false, false);
            case 'refrain':
              this.setValue(new Refrain({ type: 'refrain', style: 'antiphon', value: ['']}), false, false)
              break;
            case 'table':
              this.setValue({}, false, false);
              break;
          }
        }}>
          <ion-list-header>
            <ion-label>{localeStrings.antiphon}</ion-label>
          </ion-list-header>
          <ion-item lines="none">
            <ion-label>{localeStrings.omit}</ion-label>
            <ion-radio slot="end" value="omit"></ion-radio>
          </ion-item>
          <ion-item lines="none">
            <ion-label>{localeStrings.insert}</ion-label>
            <ion-radio slot="end" value="insert"></ion-radio>
          </ion-item>
          <ion-item lines="none">
            <ion-label>{localeStrings.text}</ion-label>
            <ion-radio slot="end" value="refrain"></ion-radio>
          </ion-item>
          <ion-item lines="none">
            <ion-label>{localeStrings.table}</ion-label>
            <ion-radio slot="end" value="table"></ion-radio>
          </ion-item>
        </ion-radio-group>

        {(typeof this.currentAntiphon !== 'object' || this.currentAntiphon.type === 'refrain') && <EditableStringOrAntiphon
          mode={this.mode}
          path={`${this.path}/metadata/antiphon`}
          value={this.currentAntiphon as undefined | string | Refrain}
        />}
        {typeof this.currentAntiphon === 'object' && !Boolean(this.currentAntiphon.type) && <ion-item lines="none">
          <ion-grid>
            {Object.keys(this.currentAntiphon).map(mmdd => <ion-row key={mmdd}>
              {/* TODO
                * Alert to get MM/DD (don't have an editable-text for MM/DD because it's an Object property)
                * Delete at end of each row */}
              <ion-col size="4">
                {mmdd}
              </ion-col>
              <ion-col>
                <EditableStringOrAntiphon
                  mode={typeof this.currentAntiphon[mmdd] === 'string' ? 'string' : 'refrain'}
                  path={`${this.path}/metadata/antiphon/${mmdd}`}
                  value={this.currentAntiphon[mmdd]}
                />
              </ion-col>
              <ion-col size="1">
                <ion-buttons>
                  <ion-button fill="clear" onClick={() => this.removeTableValue(mmdd)}>
                    <ion-label>
                      <ion-icon slot="icon-only" name="trash"></ion-icon>
                    </ion-label>
                  </ion-button>
                </ion-buttons>
              </ion-col>
            </ion-row>)}
            <ion-row>
              <ion-toolbar>
                <ion-buttons slot="end">
                  <ion-button onClick={() => this.addTableValue()}>
                    <ion-label>
                      <ion-icon slot="icon-only" name="add"></ion-icon>
                    </ion-label>
                  </ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-row>
          </ion-grid>
        </ion-item>}
      </Host>
    );
  }
}

