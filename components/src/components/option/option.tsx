import { Component, Prop, Watch, State, Listen, Method, Host, JSX, Event, EventEmitter, Element, h } from '@stencil/core';
import { Option, LiturgicalDocument } from '@venite/ldf';
import { AddOptionToDoc } from '../../interfaces/add-option-to-doc';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-option',
//  styleUrl: 'option.scss',
  shadow: true
})
export class OptionComponent {
  @Element() el : HTMLElement;
  
  // States
  @State() obj : Option;
  @State() localeStrings: { [x: string]: string; };
  @State() selectedDoc : LiturgicalDocument;
  @State() filteredOptions : LiturgicalDocument[];

  // Properties
  /**
   * An LDF Option object.
   */
  @Prop() doc : Option | string;
  @Watch('doc')
  docChanged(newDoc : Option | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Option(JSON.parse(newDoc));
      } else {
        this.obj = new Option(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new Option();
    }
  }

  /**
   * A JSON Pointer that points to the Option being edited
   */
  @Prop({ reflect: true }) path : string;

  /**
   * Whether the object is editable
   */
  @Prop() editable : boolean;

  // Events
  @Event({ bubbles: true }) ldfAddOptionToDoc : EventEmitter<AddOptionToDoc>;

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
    this.loadLocaleStrings();

    const selected : number = this.obj.metadata && this.obj.metadata.selected ? this.obj.metadata.selected : 0;
    this.select(selected || 0);

    if(!this.obj?.value || !this.obj.value[selected] || !this.obj.value[selected].value) {
      this.selectFirstDefined();
    }
    this.filterOptions();
  }

  /** Asynchronously load localization strings */
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = await getLocaleComponentStrings(this.el);
    } catch(e) {
      console.warn(e);
    }
  }

  /** Display the nth option */
  @Method()
  async select(index : number | 'add') {
    if(Number(index) >= 0) {
      this.selectedDoc = this.obj.value[index];
      // sets metadata.selected to new index, and creates objects along the way if undefined
      // without overriding any other metadata fields
      Object.assign(this.obj, { metadata: { ...this.obj.metadata, selected: index }});
    } else {
      console.log('adding another option to Option', this.path, this.obj?.value?.length, this.obj)
      this.ldfAddOptionToDoc.emit({
        base: this.path,
        index: this.obj?.value?.length,
        obj: this.obj
      })
    }
  }

  // Listener for Ionic Select and Segment change events
  @Listen('ionChange')
  onIonChange(ev) {
    this.select(ev.detail.value);
  }

  // Private methods
  onSelectChange(ev : Event) {
    const target : HTMLSelectElement = ev.target as HTMLSelectElement,
          value : number = parseInt(target.value);
    this.select(value);
  }

  selectFirstDefined() {
    const first = this.obj.value.find(opt => opt?.value !== undefined),
          index = this.obj.value.indexOf(first);
    this.select(index);
  }

  filterOptions() {
    this.filteredOptions = this.obj.value.filter(opt => opt?.value !== undefined);
  }

  // Render helpers
  /** Return an Ionic Select or Segment element if available, otherwise a vanilla HTML Select Element */
  selectNode() : JSX.Element {
    const currentlySelected : number = this.obj.metadata.selected;

    if(this.filteredOptions?.length > 1) {
      // Ionic available and
      if(customElements && !!customElements.get('ion-select')) {
        const optionsAreLong : boolean = this.filteredOptions?.map((option, optionIndex) => this.versionLabel(option, optionIndex).length > 15)
            .reduce((a, b) => a || b);

        // <= 2, short options
        if(!optionsAreLong && this.filteredOptions.length <= 2) {
          return (
            <ion-segment color="primary" value={currentlySelected.toString()}>
              {this.filteredOptions.map((option, optionIndex) =>
                <ion-segment-button value={optionIndex.toString()}>
                  <ion-label>{this.versionLabel(option, optionIndex)}</ion-label>
                </ion-segment-button>
              )}
              {/* Add Button if editable */}
              { this.editable && <ion-segment-button value='add' class='add'>
                  <ion-label>+</ion-label>
                </ion-segment-button> }
            </ion-segment>
          );
        }
        // >2 options, or options are longish
        else {
          return (
            <ion-toolbar>
              <ion-select value={currentlySelected} slot={this.editable ? 'start' : 'end'}>
                {this.filteredOptions.map((option, optionIndex) =>
                  <ion-select-option value={optionIndex}>
                    <ion-label>{this.versionLabel(option, optionIndex)}</ion-label>
                  </ion-select-option>
                )}
              </ion-select>
              {this.editable && <ion-buttons slot='end'>
                <ion-button onClick={() => this.select('add')}>
                  <ion-icon slot='icon-only' name='add'></ion-icon>
                </ion-button>
              </ion-buttons>}
            </ion-toolbar>
          );
        }
      }
      // Ionic not availabe
      else {
        return (
          <ldf-label-bar>
            <select onInput={ev => this.onSelectChange(ev)} slot={this.editable ? 'start' : 'end'}>
              {this.filteredOptions.map((option, optionIndex) =>
                <option
                  value={optionIndex}
                  selected={optionIndex == currentlySelected}
                >{this.versionLabel(option, optionIndex)}</option>
              )}
            </select>
          {this.editable && <button slot='end' onClick={() => this.select('add')}>+</button>}
          </ldf-label-bar>
        );
      }
    } else {
      return [];
    }
  }

  versionLabel(option : LiturgicalDocument, index : number) {
    try {
      return this.obj.getVersionLabel(option);
    } catch(e) {
      console.warn(e);
      return `${(this.localeStrings || {}).option} ${index + 1}`
    }
  }

  // Render
  render() {
    console.log('current option values = ', this.obj.value);

    return (
      <Host lang={this.obj.language}>
        <ldf-label-bar>
          {/* Can be overwritten by apps that use Ionic or other frameworks */}
          <slot slot='end' name='controls'>{this.selectNode()}</slot>
        </ldf-label-bar>
        <ldf-liturgical-document
          doc={this.selectedDoc}
          path={`${this.path}/value/${this.obj.metadata.selected}`}
          base={`${this.path}/value`}
          index={this.obj.metadata.selected}
          editable={this.editable}
          parentType='option'
        >
        </ldf-liturgical-document>
      </Host>
    );
  }
}
