import { Component, Element, Prop, Event, EventEmitter, State, h, Watch, JSX } from '@stencil/core';
import { Change, TypeTuple, LiturgicalDocument, specificClass } from '@venite/ldf';

import { getLocaleComponentStrings } from '../../utils/locale';

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
  HeadingLevel
}

@Component({
  tag: 'ldf-editable-metadata-metadata-fields',
  //styleUrl: 'editable-add-category.scss',
  shadow: true
})
export class EditableMetadataMetadataFieldsComponent {
  @Element() el: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() fields : FieldDefinition[];

  @State() obj : LiturgicalDocument;

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
    } catch(e) {
      console.warn(e);
      this.obj = new LiturgicalDocument();
    }
  }

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  async componentWillLoad() {
    this.docChanged(this.doc);
    this.loadLocaleStrings();
    this.fields = this.fieldsFromType(this.obj?.type);
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

      // TODO
      case 'psalm':
        return [
          { field: 'number', type: Field.Number },
          { field: 'localname', type: Field.String },
          { field: 'latinname', type: Field.String },
          { field: 'omit_antiphon', type: Field.Bool },
          { field: 'omit_gloria', type: Field.Bool }
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

  render() {
    const localeStrings = this.localeStrings || {};

    return this.fields.map(field => {
      const nodes : JSX.Element[] = new Array(),
            currentValue = (this.obj?.metadata || {})[field.field],
            path = `${this.path}/metadata/${field.field}`,
            placeholder = localeStrings[field.field];
      let wrapInItem = true,
          labelStacked = true;

      switch(field.type) {
        // TODO
        case Field.BibleReadingIntro:
          nodes.push(<code>Bible Reading Intro</code>)
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
          nodes.push(
            <ldf-editable-string-list
              path={path}
              property={field.field}
              value={currentValue}
            >
            </ldf-editable-string-list>
          )
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
        default:
          console.warn('(ldf-editable-metadata-metadata-fields)', field.type, 'is not a recognized FieldType');
          break;
      }

      if(wrapInItem) {
        return (
          <ion-item lines="none">
            {labelStacked
            ? <ion-label position="stacked">{ localeStrings[field.field] }</ion-label>
            : <ion-label>{ localeStrings[field.field] }</ion-label>}
            {nodes}
          </ion-item>
        )
      } else {
        return nodes;
      }
    });
  }
}
