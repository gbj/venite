import { Component, Element, Prop, Event, EventEmitter, State, h, Watch } from '@stencil/core';
import { LiturgicalDocument } from '@venite/ldf';

import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-editable-filter-documents',
  styleUrl: 'editable-filter-documents.scss',
  shadow: true
})
export class EditableFilterDocumentsComponent {
  @Element() el: HTMLElement;

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
  @Prop() type: 'psalm' | 'collect' | 'reading';

  /** Whether to include a `LiturgicalDocument.version` field with the selection */
  @Prop() versions: {[key: string]: string} = {};
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

  // Events
  @Event() ldfDocumentSelected : EventEmitter<LiturgicalDocument>;

  // Lifecycle events
  async componentWillLoad() {
    this.loadLocaleStrings();
    this.filteredOptions = this.options || [];
    this.version = (this.versions || [])[0]; // default to first in list
    this.filter(this.search);
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
    this.ldfDocumentSelected.emit(this.doc);
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <form>
        <ion-list>
          {/* Versions, for e.g., psalms */}
          {this.versions && <ion-item>
            <ion-label>{ localeStrings.version }</ion-label>
            <ion-select value={this.version} onIonChange={(ev : CustomEvent) => this.chooseVersion(ev.detail.value)}>
              {Object.entries(this.versions).map(([versionKey, versionLabel]) => 
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
              {doc.label}
            </ion-item>
          )}
        </ion-list>
      </form>
    )
  }
}
