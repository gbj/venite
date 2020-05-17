import { Component, Element, Prop, Watch, State, Host, h } from '@stencil/core';
import { LiturgicalDocument } from '@venite/ldf';
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
  @State() collapsed : boolean = true;

  // Properties
  /**
   * An LDF LiturgicalDocument object
   */
  @Prop() doc : LiturgicalDocument | string;
  @Watch('doc')
  docChanged(newDoc : LiturgicalDocument | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new LiturgicalDocument(JSON.parse(newDoc));
      } else {
        this.obj = new LiturgicalDocument(newDoc);
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

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
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
          availableTypes = this.obj.availableTypes() || [];

    return (
      <Host>
        {/* Settings/Delete controls — Display on hover */}
        <ldf-label-bar class={{ hidden: !this.visible, visible: this.visible }}>
          <div slot='end'>
            <ion-buttons>
              <ion-button onClick={() => this.collapsed = !this.collapsed}>
                <ion-icon name='cog' slot='start'></ion-icon>
                <ion-label>{localeStrings.settings}</ion-label>
              </ion-button>
              <ion-button>
                <ion-icon name='close' slot='start'></ion-icon>
                <ion-label>{localeStrings.delete}</ion-label>
              </ion-button>
            </ion-buttons>
          </div>
        </ldf-label-bar>

        {/* Form to Edit Metadata — display when "Settings" button is toggled */}
        <form class={{ metadata: true, hidden: this.collapsed, visible: !this.collapsed }}>
          {/* `type` */}
          <fieldset>
            <label htmlFor='type'>{localeStrings.type}</label>
            <ldf-editable-select id='type'
              path={this.path}
              property='type'
              value={this.obj.type}
              options={availableTypes.map(value => ({ value, label: localeStrings[value] || value }))}>
            </ldf-editable-select>
          </fieldset>

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
