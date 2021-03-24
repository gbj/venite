import { Component, Element, Prop, Event, EventEmitter, State, h, Watch, Method, Host } from '@stencil/core';
import { BibleReadingVerse, docsToOption, LiturgicalDocument } from '@venite/ldf';

import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-filter-documents.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-editable-filter-documents',
  styleUrl: 'editable-filter-documents.scss',
  scoped: true
})
export class EditableFilterDocumentsComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() filteredOptions : LiturgicalDocument[] = [];
  
  // Selected document
  @State() doc : LiturgicalDocument;

  // Selected version; stateful because needs to rerender and refilter list when it changes
  @State() version : string;
  @Watch('version')
  versionChange() {
    this.filter(this.search);
  }

  search : string;

  // Properties
  /** ion-modal */
  @Prop() modal?: any;

  @Prop() type: 'psalm' | 'canticle' | 'collect' | 'reading';

  /** Whether to include a `LiturgicalDocument.version` field with the selection */
  @Prop() versions: Record<string, string> = {};
  @Watch('versions')
  versionsChange() {
    if(!this.version) {
      this.version = Object.keys(this.versions)[0];
    }
    this.filter(this.search);
  }

  /** Options to search through */
  @Prop() options: LiturgicalDocument[] = [];
  @Watch('options')
  optionsChange() {
    this.filter(this.search);
  }

  /* Optional callback on a selection */
  @Prop() changeCallback?: (doc : LiturgicalDocument) => void;

  // Events
  @Event() ldfDocumentSelected : EventEmitter<LiturgicalDocument>;

  // Public Methods

  /** Set the list of liturgy versions */
  @Method()
  async setVersions(versions : Record<string, string>): Promise<void> {
    this.versions = { ... versions };
  }

  /** Set the list of liturgy versions */
  @Method()
  async setOptions(options : LiturgicalDocument[]): Promise<void> {
    this.options = options;
    this.optionsChange();
  }

  // Lifecycle events
  async componentWillLoad() {
    this.loadLocaleStrings();
    this.filteredOptions = this.options || [];
    this.version = (this.versions || [])[0]; // default to first in list
    this.filter(this.search);
  }

  // Methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  filter(search : string) {
    this.search = search;
    this.filteredOptions = this.options?.filter(doc =>
      // version matches this.version, if set
      (this.version ? doc.version == this.version : true)
      // search on label
      && (search ? doc.label?.match(search) : true)
    );
  }

  chooseVersion(version : string) {
    this.version = version;
  }

  chooseDoc(doc : LiturgicalDocument) {
    this.doc = doc;
  }

  choose() {
    if(this.changeCallback) {
      this.changeCallback(this.doc);
    }
    this.ldfDocumentSelected.emit(this.doc);
    if(this.modal) {
      this.modal.dismiss();
    }
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <Host>
        {this.modal && <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button onClick={() => this.modal.dismiss()}>
                <ion-icon name="close" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>}

        <ion-content>
          <form>
            <ion-list>
              {/* Include all options */}
              <ion-button fill="clear" onClick={() => { this.chooseDoc(docsToOption(this.filteredOptions)); this.choose(); }}>
                <ion-label>{localeStrings.includeAll}</ion-label>
              </ion-button>

              {/* Versions, for e.g., psalms */}
              {this.versions && <ion-item>
                <ion-label>{ localeStrings.version }</ion-label>
                <ion-select value={this.version} onIonChange={(ev : CustomEvent) => this.chooseVersion(ev.detail.value)}>
                  {Object.entries(this.versions)
                    .sort((a, b) => a[0] > b[0] ? 1 : -1)
                    .map(([versionKey, versionLabel]) => 
                    <ion-select-option value={versionKey}>{versionLabel}</ion-select-option>
                  )}
                </ion-select>
              </ion-item>}

              {/* Search bar to filter the objects */}
              <ion-searchbar onIonChange={(ev: CustomEvent) => this.filter(ev.detail.value)}></ion-searchbar>

              {/* The objects themselves */}
              {this.filteredOptions && this.filteredOptions.map(doc =>
                <ion-item
                  button
                  onClick={() => { this.chooseDoc(doc); this.choose(); }}
                  color={doc == this.doc ? 'primary' : undefined}
                >
                  {doc.label ?? doc.version_label ?? `${(((doc.value[0] || {}) as BibleReadingVerse).text) ?? doc.value[0] ?? ''}${doc.citation ? ` (${doc.citation})` : ''}`}
                </ion-item>
              )}
            </ion-list>
          </form>
        </ion-content>
      </Host>
    )
  }
}
