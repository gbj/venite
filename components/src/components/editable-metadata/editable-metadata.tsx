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
      <fieldset>
        <label htmlFor={field}>{localeStrings[field]}</label>
        <ldf-editable-select id={field}
          path={this.path}
          property={field}
          value={this.obj[field]}
          options={types.map(value => ({ value, label: localeStrings[value] || value }))}>
        </ldf-editable-select>
      </fieldset>
    );

    return (
      <Host>
        {/* Form to Edit Metadata — display when "Settings" button is toggled */}
        <form class={{ metadata: true, hidden: this.collapsedState, visible: !this.collapsedState }}>
          {/* `type` */}
          <SelectField field='type' types={availableTypes} />

          {/* `style` */}
          { availableStyles && availableStyles.length > 0 && <SelectField field='style' types={availableStyles} />}

          {/* `label` */}
          <fieldset>
            <label htmlFor='label'>{localeStrings.label}</label>
            <ldf-editable-text id='label'
              short={true}
              path={`${this.path}/label`}
              text={this.obj.label}
              placeholder={localeStrings.label}>
            </ldf-editable-text>
          </fieldset>
        </form>
      </Host>
    );
  }
}
