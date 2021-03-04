import { Component, Element, Prop, Watch, State, Host, FunctionalComponent, Event, EventEmitter, h } from '@stencil/core';
import { LiturgicalDocument, specificClass, Change } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-metadata.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-editable-metadata',
  styleUrl: 'editable-metadata.scss',
  shadow: true
})
export class EditableMetadataComponent {
  @Element() element : HTMLElement;

  // States
  @State() obj : LiturgicalDocument;
  @State() localeStrings: { [x: string]: string; };
  @State() collapsedState : boolean;
  @State() showAdvanced : boolean = false;

  // Properties
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

  /** A JSON Pointer that points to the LiturgicalDocument being edited */
  @Prop({ reflect: true }) path : string;

  /** If `visible` is true, the controls should appear. */
  @Prop() visible : boolean;

  /** If `collapsed` is false, the full set of editable fields will appear. */
  @Prop() collapsed : boolean;

  /** Used to pass in the `IonModal` we will dismiss */
  @Prop() modal : any;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
    this.collapsedState = this.collapsed;
    this.loadLocaleStrings();
    this.initializeMetadata(); 
  }

  // Private methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  initializeMetadata() {
    if(!this.obj.metadata) {
      this.obj.metadata = {};
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/metadata`,
        op: [ { type: 'set', value: { } } ]
      }))
    }
    if(!this.obj.source) {
      this.obj.source = { api: '', source: '', citation: '' };
      this.ldfDocShouldChange.emit(new Change({
        path: `${this.path}/source`,
        op: [ { type: 'set', value: { api: '', source: '', citation: '' } } ]
      }));
    }
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {},
          availableTypes = this.obj.availableTypes() || [],
          availableStyles = this.obj.availableStyles() || [],
          availableDisplayFormats = this.obj.availableDisplayFormats() || [];

    /** <SelectField/> Functional Component */
    interface SelectFieldProps {
      field: string;
      types: ReadonlyArray<string>;
      onChange?: (value: any) => void;
    }
    const SelectField : FunctionalComponent<SelectFieldProps> = ({ field, types, onChange }) => (
      <ion-item lines='none'>
        <ion-label arial-label={localeStrings[field]} position='stacked'>{localeStrings[field]}</ion-label>
        <ldf-editable-select id={field}
          path={this.path}
          property={field}
          value={this.obj[field]}
          options={types.map(value => ({ value, label: localeStrings[value] || value }))}
          onLdfChange={(ev : CustomEvent) => onChange(ev.detail)}
        >
        </ldf-editable-select>
      </ion-item>
    );

    const TextField : FunctionalComponent<{ name: string; }> = ({ name }) => {
      const bipartiteName = name.includes('/'),
            nameParts = name.split('/'),
            text = bipartiteName ? (this.obj[nameParts[0]] || {})[nameParts[1]] : this.obj[name];
      return (
        <ion-item lines='none'>
          <ion-label aria-label={localeStrings[name]} position='stacked'>{localeStrings[name]}</ion-label>
          <ldf-editable-text id={name}
            short={true}
            path={`${this.path}/${name}`}
            text={text}
            placeholder={localeStrings[name]}>
          </ldf-editable-text>
        </ion-item>
      )
    };

    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title>{ localeStrings.modalTitle }</ion-title>
            <ion-buttons slot="primary">
              <ion-button onClick={() => this.modal.dismiss(null)}>
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          {/* Form to Edit Metadata — display when "Settings" button is toggled */}
          <form class={{ metadata: true, hidden: this.collapsedState, visible: !this.collapsedState }}>
            {/* `metadata` */}
            <ldf-editable-metadata-metadata-fields
              path={this.path}
              doc={this.obj}
            ></ldf-editable-metadata-metadata-fields>
            <ion-card>
              <ion-card-header>
                <ion-card-title>{localeStrings.title}</ion-card-title>
              </ion-card-header>
              <ion-card>
                <ion-grid>
                  <ion-row>
                    {/* Label */}
                    <ion-col><TextField name="label"/></ion-col>
                    {/* Display Format */}
                    <ion-col>
                      {availableDisplayFormats?.length > 0 && <SelectField field='display_format' types={availableDisplayFormats} />}
                    </ion-col>
                  </ion-row>
                  {/* `source` and `citation` */}
                  <ion-row>
                    <ion-col><TextField name="source/source"/></ion-col>
                    <ion-col><TextField name="source/citation"/></ion-col>
                    <ion-col><TextField name="citation"/></ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card>
            </ion-card>
            <ion-card>
              <ion-card-header class="advanced" onClick={() => this.showAdvanced = !this.showAdvanced}>
                <ion-buttons>
                  <ion-button>
                    {!this.showAdvanced && <ion-icon slot="icon-only" name="chevron-forward"></ion-icon>}
                    {this.showAdvanced && <ion-icon slot="icon-only" name="chevron-down"></ion-icon>}
                  </ion-button>
                </ion-buttons>
                <ion-card-title>{localeStrings.advanced}</ion-card-title>
              </ion-card-header>
              {this.showAdvanced && <ion-card-content>
                <ion-grid>
                  {/* `type` and `style` */}
                  <ion-row>
                    <ion-col size="4">
                      <SelectField
                        field='type'
                        types={availableTypes}
                        onChange={(type) => this.obj = specificClass(new LiturgicalDocument({ ... this.obj, type }))}
                      />
                    </ion-col>
                    <ion-col>
                      {availableStyles?.length > 0 && <SelectField field='style' types={availableStyles} />}
                    </ion-col>
                  </ion-row>
                  {/* `tradition`, `language` and `version` */}
                  <ion-row>
                    <ion-col><TextField name="tradition"/></ion-col>               
                    <ion-col><TextField name="language"/></ion-col>
                    <ion-col><TextField name="version"/></ion-col>
                  </ion-row>
                  {/* `label` and `version_label` */}
                  <ion-row>
                    <ion-col><TextField name="version_label"/></ion-col>
                    <ion-col><TextField name="slug"/></ion-col>
                  </ion-row>
                  {/* `category` */}
                  <ion-row>
                    <ion-col size="12">
                      <ldf-editable-string-list
                        path={this.path}
                        property="category"
                        value={this.obj.category}
                      >
                      </ldf-editable-string-list>
                    </ion-col>
                  </ion-row>
                  {/* `lookup` */}
                  <ion-row>
                    <ion-col size="12">
                      <ldf-editable-lookup
                        path={`${this.path}/lookup`}
                        lookup={this.obj?.lookup}
                        types={this.obj?.availableLookupTypes()}
                      >
                      </ldf-editable-lookup>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>}
            </ion-card>
          </form>
        </ion-content>
      </Host>
    );
  }
}
