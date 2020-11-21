import { Component, Element, Prop, Event, EventEmitter, State, h, Watch, JSX, Method } from '@stencil/core';
import { Change, TypeTuple, LiturgicalDocument, specificClass, versionToString } from '@venite/ldf';

import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-metadata-metadata-fields.i18n.en.json';
const LOCALE = {
  'en': EN
};
interface FieldDefinition {
  field: string;
  type: Field;
}

enum Field {
  String,
  Bool,
  Number,
  StringList,
  BibleReadingIntro,
  TimeInSeconds,
  HeadingLevel,
  Gloria,
  Antiphon
}

@Component({
  tag: 'ldf-editable-metadata-metadata-fields',
  shadow: true
})
export class EditableMetadataMetadataFieldsComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() fields : FieldDefinition[];

  @State() obj : LiturgicalDocument;

  @State() currentBibleReadingIntros : LiturgicalDocument[] = new Array();

  // State

  // Properties
  /** A JSON Pointer that points to the document */
  @Prop({ reflect: true }) path : string;

  /**
   * An LDF LiturgicalDocument object
   */
  @Prop() doc : LiturgicalDocument | string;
  @Watch('doc')
  docChanged(newDoc : LiturgicalDocument | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = specificClass(JSON.parse(newDoc));
      } else {
        this.obj = specificClass(newDoc);
      }
      this.fields = this.fieldsFromType(this.obj?.type);

      // if necessary, ask for Bible reading intros
      const hasBibleReadingIntroField : boolean = !!this.fields.find(field => field.type == Field.BibleReadingIntro);
      if(hasBibleReadingIntroField) {
        this.ldfAskForBibleIntros.emit();
      }
    } catch(e) {
      console.warn(e);
      this.obj = new LiturgicalDocument();
    }
  }

  /** Options for introductions to a Bible reading */
  @Prop({ reflect: true }) bibleReadingIntros : LiturgicalDocument[] = new Array();
  @Watch('bibleReadingIntros')
  introsChanged() {
    this.currentBibleReadingIntros = [ ... this.bibleReadingIntros ];
  }

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  @Event({ bubbles: true }) ldfAskForBibleIntros : EventEmitter<void>;

  @Event({ bubbles: true }) ldfShouldAddGloriaPatri : EventEmitter<{ path: string; language: string; version: string; oldValue: LiturgicalDocument | undefined; }>;

  /** Set the list of Bible reading introductions */
  @Method()
  async setBibleReadingIntros(intros : LiturgicalDocument[] | string) : Promise<void> {
    if(typeof intros === 'string') {
      this.currentBibleReadingIntros = JSON.parse(intros);
    } else {
      this.currentBibleReadingIntros = intros;
    }
  }

  // Lifecycle events
  async componentWillLoad() {
    this.docChanged(this.doc);
    this.loadLocaleStrings();
  }

  // Methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  // Given a `type`, returns an array of metadata types
  fieldsFromType(type : TypeTuple[number]) : FieldDefinition[] {
    switch(type) {
      case 'bible-reading':
        return [
          { field: 'response', type: Field.String },
          { field: 'intro', type: Field.BibleReadingIntro }
        ];

      case 'heading':
        return [
          { field: 'level', type: Field.HeadingLevel },
        ];

      case 'liturgy':
        return [
          { field: 'liturgyversions', type: Field.StringList },
          { field: 'supplement', type: Field.Bool },
          { field: 'evening', type: Field.Bool },
        ];

      case 'meditation':
        return [
          { field: 'length', type: Field.TimeInSeconds },
          { field: 'delay', type: Field.TimeInSeconds }
        ];

      case 'psalm':
        return [
          { field: 'number', type: Field.Number },
          { field: 'localname', type: Field.String },
          { field: 'latinname', type: Field.String },
          //{ field: 'omit_antiphon', type: Field.Bool },
          //{ field: 'omit_gloria', type: Field.Bool },
          //{ field: 'insert_seasonal_antiphon', type: Field.Bool },
          { field: 'antiphon', type: Field.Antiphon },
          { field: 'gloria', type: Field.Gloria },
        ]
      
      case 'responsive':
        return [ { field: 'response', type: Field.String } ]

      case 'option':
      case 'refrain':
      case 'rubric':
        return [];

      case 'text':
        return [
          { field: 'response', type: Field.String },
          { field: 'omit_response', type: Field.Bool }
        ];
      default:
        console.warn('(ldf-editable-metadata-metadata-fields)', type, 'is not a recognized type');
    }
  }

  fieldToNodes(field : FieldDefinition, localeStrings: { [x: string]: string }) : JSX.Element[] {
    const nodes : (JSX.Element | { size: number; node: JSX.Element})[] = new Array(),
          currentValue = (this.obj?.metadata || {})[field.field],
          path = `${this.path}/metadata/${field.field}`,
          placeholder = localeStrings[field.field];
    let wrapInItem = true,
      labelStacked = true;

    switch(field.type) {
      case Field.BibleReadingIntro:
        nodes.push(
          <ldf-editable-select
            path={`${this.path}/metadata`}
            property={field.field}
            options={[
              { label: localeStrings.none, value: null },
              ... this.currentBibleReadingIntros.map(intro => ({ label: intro.value[0].toString(), value: intro }))
            ]}
            value={currentValue}
          ></ldf-editable-select>
        )
        break;

      // Done
      case Field.Bool:
        nodes.push(
          <ldf-editable-boolean
            path={`${this.path}/metadata`}
            property={field.field}
            value={currentValue}
          >
          </ldf-editable-boolean>
        )
        labelStacked = false;
        break;
      case Field.Number:
        nodes.push(
          <ldf-editable-text
            short={true}
            inputType="number"
            path={path}
            placeholder={placeholder}
            text={currentValue}
          ></ldf-editable-text>
        );
        break;
      case Field.String:
        nodes.push(
          <ldf-editable-text
            short={true}
            path={path}
            placeholder={placeholder}
            text={currentValue}
          ></ldf-editable-text>
        );
        break;
      case Field.StringList:
        nodes.push({
          node: <ldf-editable-string-list
            path={`${this.path}/metadata`}
            property={field.field}
            value={currentValue}
          >
          </ldf-editable-string-list>,
          size: 12
        })
        wrapInItem = false;
        break;
      case Field.HeadingLevel:
        nodes.push(
          <ldf-editable-select
            path={`${this.path}/metadata`}
            property={field.field}
            options={[
              { label: localeStrings.heading1, value: 1 },
              { label: localeStrings.heading2, value: 2 },
              { label: localeStrings.heading3, value: 3 },
              { label: localeStrings.heading4, value: 4 }
            ]}
            value={currentValue}
          ></ldf-editable-select>
        );
        break;
      case Field.TimeInSeconds:
        nodes.push(
          <ldf-editable-text
            inputType="number"
            short={true}
            path={path}
            placeholder={placeholder}
            text={currentValue}
          ></ldf-editable-text>
        )
        break;
      case Field.Gloria:
        wrapInItem = false;
        nodes.push({
          node: <ion-item lines="none">
              <ion-label>{localeStrings.insert_gloria}</ion-label>
              <ion-checkbox
                checked={Boolean(this.obj?.metadata?.gloria)}
                onIonChange={(e) => {
                  if(e.detail.checked) {
                    this.ldfShouldAddGloriaPatri.emit({
                      path: this.path,
                      language: this.obj?.language,
                      version: versionToString(this.obj?.version),
                      oldValue: this.obj?.metadata?.gloria
                    });
                    if(this.obj?.metadata?.omit_gloria !== false) {
                      this.ldfDocShouldChange.emit(new Change({
                        path: `${this.path}/metadata`,
                        op: [{
                          type: 'set',
                          index: 'omit_gloria',
                          oldValue: this.obj?.metadata?.omit_gloria,
                          value: false
                        }]
                      }));
                    }
                  } else {
                    this.ldfDocShouldChange.emit(new Change({
                      path: `${this.path}/metadata`,
                      op: [{
                        type: 'deleteAt',
                        index: 'gloria',
                        oldValue: this.obj?.metadata?.gloria
                      }]
                    }));
                    if(this.obj?.metadata?.omit_gloria !== true) {
                      this.ldfDocShouldChange.emit(new Change({
                        path: `${this.path}/metadata`,
                        op: [{
                          type: 'set',
                          index: 'omit_gloria',
                          oldValue: this.obj?.metadata?.omit_gloria,
                          value: true
                        }]
                      }));
                    }
                  }
                }}
              ></ion-checkbox>
            </ion-item>,
          size: 12
        })
        break;
      case Field.Antiphon: 
        wrapInItem = false;
        nodes.push({
          node: <ldf-editable-antiphon-field
            path={this.path}
            antiphon={this.obj?.metadata?.antiphon}
            omit_antiphon={this.obj?.metadata?.omit_antiphon}
            insert_antiphon={this.obj?.metadata?.insert_seasonal_antiphon}
          ></ldf-editable-antiphon-field>,
          size: 12
        });
        break;
      default:
        ((type : never) => console.warn('(ldf-editable-metadata-metadata-fields)', type, 'is not a recognized FieldType'))(field.type);
        break;
    }

    if(wrapInItem) {
      return [
        <ion-item lines="none">
          {labelStacked
          ? <ion-label position="stacked">{ localeStrings[field.field] }</ion-label>
          : <ion-label>{ localeStrings[field.field] }</ion-label>}
          {nodes.map(field => field.hasOwnProperty('size') ? 
            <ion-col size={field['size']}>{field['node']}</ion-col> :
            <ion-col size="4">{field}</ion-col>)}
        </ion-item>
      ]
    } else {
      return nodes;
    }
  }

  render() {
    const localeStrings = this.localeStrings || {},
          fieldNodes = this.fields.map(field => this.fieldToNodes(field, localeStrings));

    return (
      fieldNodes?.length > 0 && <ion-card>
        <ion-card-header>
          <ion-card-title>{localeStrings[this.obj.type]} {localeStrings.title}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              {fieldNodes.map((fields : ({node: JSX.Element; size: number;} | JSX.Element)[]) =>
                fields.map(field => {
                  return field.hasOwnProperty('size') ? 
                  <ion-col size={field['size']}>{field['node']}</ion-col> :
                  <ion-col size="4">{field}</ion-col>
                })
              )}
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    );
  }
}
