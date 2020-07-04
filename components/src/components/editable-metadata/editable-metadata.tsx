import { Component, Element, Prop, Watch, State, Host, FunctionalComponent, h } from '@stencil/core';
import { LiturgicalDocument, specificClass } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';

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

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
    this.collapsedState = this.collapsed;
    this.loadLocaleStrings();
  }

  // Private methods
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
      this.localeStrings = await getLocaleComponentStrings(this.element);
    } catch(e) {
      console.warn(e);
    }
  }


  // Render
  render() {
    const localeStrings = this.localeStrings || {},
          availableTypes = this.obj.availableTypes() || [],
          availableStyles = this.obj.availableStyles() || [];

    /** <SelectField/> Functional Component */
    interface SelectFieldProps {
      field: string;
      types: ReadonlyArray<string>
    }
    const SelectField : FunctionalComponent<SelectFieldProps> = ({ field, types }) => (
      <ion-item lines='none'>
        <ion-label arial-label={localeStrings[field]} position='stacked'>{localeStrings[field]}</ion-label>
        <ldf-editable-select id={field}
          path={this.path}
          property={field}
          value={this.obj[field]}
          options={types.map(value => ({ value, label: localeStrings[value] || value }))}>
        </ldf-editable-select>
      </ion-item>
    );

    const TextField : FunctionalComponent<{ name }> = ({ name }) => (
      <ion-item lines='none'>
        <ion-label aria-label={localeStrings[name]} position='stacked'>{localeStrings[name]}</ion-label>
        <ldf-editable-text id={name}
          short={true}
          path={`${this.path}/${name}`}
          text={this.obj[name]}
          placeholder={localeStrings[name]}>
        </ldf-editable-text>
      </ion-item>
    )

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
            <ion-list>

              {/* `type` and `style` */}
              <fieldset>
                <SelectField field='type' types={availableTypes} />

                {availableStyles && availableStyles.length > 0 && <SelectField field='style' types={availableStyles} />}
              </fieldset>

              {/* `metadata` */}
              <fieldset>
                <ldf-editable-metadata-metadata-fields
                  path={this.path}
                  doc={this.obj}
                ></ldf-editable-metadata-metadata-fields>
              </fieldset>

              {/* `tradition`, `language` and `version` */}
              <fieldset>
                <TextField name="tradition"/>
                <TextField name="language"/>
                <TextField name="version"/>
              </fieldset>

              {/* `label` and `version_label` */}
              <fieldset>
                <TextField name="label"/>
                <TextField name="version_label"/>
              </fieldset>

              {/* `category` */}
              <fieldset>
                <ldf-editable-string-list
                  path={this.path}
                  property="category"
                  value={this.obj.category}
                >
                </ldf-editable-string-list>
              </fieldset>

              {/* `condition` */}
              <fieldset>
                <ldf-editable-condition
                  path={`${this.path}/condition`}
                  condition={this.obj.condition}
                >
                </ldf-editable-condition>
              </fieldset>

              {/* `source` and `citation` */}
              <fieldset>
                <ion-item><p>Source...</p></ion-item>
                <TextField name="citation"/>
              </fieldset>
            </ion-list>
          </form>
        </ion-content>
      </Host>
    );
  }
}
