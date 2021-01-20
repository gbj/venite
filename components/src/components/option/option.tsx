import { Component, Prop, Watch, State, Method, Host, JSX, Event, EventEmitter, Element, h } from '@stencil/core';
import { Option, LiturgicalDocument, Change } from '@venite/ldf';
import { AddOptionToDoc } from '../../interfaces/add-option-to-doc';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './option.i18n.en.json';
const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-option',
  styleUrl: 'option.scss',
  shadow: true
})
export class OptionComponent {
  @Element() el : HTMLElement;
  
  // States
  @State() obj : Option;
  @State() localeStrings: { [x: string]: string; };
  //@State() selectedDoc : LiturgicalDocument;
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

    const selected : number = this.editable
      ? this.obj?.metadata?.editor_selected ?? this.obj?.metadata?.selected ?? 0
      : this.obj?.metadata?.selected ?? 0;
    this.select(selected);

    if(!this.obj?.value || !this.obj.value[selected] || !this.obj.value[selected].value) {
            this.selectFirstDefined();
    }
    this.filterOptions();
  }

  /**
   * A JSON Pointer that points to the Option being edited
   */
  @Prop({ reflect: true }) path : string;

  /**
   * Whether the object is editable
   */
  @Prop() editable : boolean;

  /**
   * Whether the object is in preview mode
   */
  @Prop() preview : boolean;

  // Events
  @Event({ bubbles: true }) ldfAddOptionToDoc : EventEmitter<AddOptionToDoc>;
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
    this.loadLocaleStrings();
  }

  /** Asynchronously load localization strings */
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.el)];
    } catch(e) {
      console.warn(e);
    }
  }

  /** Display the nth option */
  @Method()
  async select(index : number | 'add', resultedFromUserAction : boolean = false) {
    console.log('select ', index);
    const hadMetadata = Boolean(this.obj?.metadata),
      oldValue = this.obj?.metadata?.editor_selected;
  
    
    if(Number(index) >= 0) {
      //this.selectedDoc = this.obj.value.filter(child => Boolean(child))[index];
      if(this.obj?.metadata) {
        this.obj.metadata.selected = Number(index);
        this.obj.metadata.editor_selected = Number(index);
      } else {
        this.obj.metadata = { selected: Number(index), editor_selected: Number(index) }
      }
      this.obj = new Option({...this.obj});

      // only change the selection at this point if it's not editable
      // if it's editable, the editor will control when it changes
      if(resultedFromUserAction && !this.editable) {
        this.ldfDocShouldChange.emit(new Change({
          path: `${this.path}/metadata`,
          op: [{
            type: 'set',
            index: 'selected',
            oldValue,
            value: Number(index)
          }]
        }));
      }

      if(this.editable) {
        if(hadMetadata && index !== oldValue) {
          this.ldfDocShouldChange.emit(new Change({
            path: `${this.path}/metadata`,
            op: [{
              type: 'set',
              index: 'editor_selected',
              oldValue,
              value: Number(index)
            }]
          }));
        } else if(!hadMetadata && index !== oldValue) {
          this.ldfDocShouldChange.emit(new Change({
            path: `${this.path}`,
            op: [{
              type: 'set',
              index: 'metadata',
              value: { editor_selected: Number(index) }
            }]
          }));
        }
      }

      // sets metadata.selected to new index, and creates objects along the way if undefined
      // without overriding any other metadata fields
      Object.assign(this.obj, { metadata: { ...this.obj.metadata, selected: index }});
      Object.assign(this.obj, { metadata: { ...this.obj.metadata, editor_selected: index }});
    } else if(index === 'add') {
      this.ldfAddOptionToDoc.emit({
        base: this.path,
        index: this.obj?.value?.length,
        obj: this.obj
      });
    }
  }

  // Private methods
  onSelectChange(ev : Event) {
    const target : HTMLSelectElement = ev.target as HTMLSelectElement,
          value : number = parseInt(target.value);
    this.select(value, true);
  }

  selectFirstDefined() {
    const first = this.obj.value.find(opt => opt?.value !== undefined),
          index = this.obj.value.filter(child => Boolean(child)).indexOf(first);
        this.select(index);
  }

  filterOptions() {
    if(this.obj) {
      this.obj = new Option({
        ... this.obj,
        value: (this.obj?.value || []).filter(entry => {
                    return this.editable || (Boolean(entry) && (Boolean(entry.value) || Boolean(entry?.type === "bible-reading" && entry.citation)));
        })
      });
    }
  }

  // Render helpers
  /** Return an Ionic Select or Segment element if available, otherwise a vanilla HTML Select Element */
  selectNode() : JSX.Element {
    const currentlySelected : number = this.editable ? this.obj?.metadata?.editor_selected ?? this.obj?.metadata?.selected ?? 0 : this.obj?.metadata?.selected ?? 0;

    if(this.obj?.value?.length > 1 || this.editable) {
      // Ionic available and
      if(customElements && !!customElements.get('ion-select')) {
        const optionsAreLong : boolean = (this.obj?.value || [])
            .map((option, optionIndex) => this.versionLabel(option, optionIndex)?.length > 25)
            .reduce((a, b) => a || b, false);

        // <= 3, short options
        if(!optionsAreLong && this.obj?.value.length <= 3) {
          return (
            <ion-segment color="primary" value={currentlySelected.toString()}>
              {this.obj?.value.map((option, optionIndex) =>
                <ion-segment-button value={optionIndex.toString()} onClick={() => this.select(optionIndex, true)}>
                  <ion-label>{this.versionLabel(option, optionIndex)}</ion-label>
                </ion-segment-button>
              )}
              {/* Add Button if editable */}
              { this.editable && <ion-segment-button value='add' class='add' onClick={() => this.select('add', true)}>
                  <ion-label>+</ion-label>
                </ion-segment-button> }
            </ion-segment>
          );
        }
        // >2 options, or options are longish
        else {
          console.log('>2 or longish');

          return (
            <ion-toolbar>
              <ion-select value={currentlySelected} slot={this.editable ? 'start' : 'end'} onIonChange={e => this.select(Number(e.detail.value), true)}>
                {this.obj?.value.map((option, optionIndex) =>
                  <ion-select-option value={optionIndex}>
                    <ion-label>{this.versionLabel(option, optionIndex)}</ion-label>
                  </ion-select-option>
                )}
              </ion-select>
              {this.editable && <ion-buttons slot='end'>
                <ion-button onClick={() => this.select('add', true)}>
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
              {this.obj?.value.map((option, optionIndex) =>
                <option
                  value={optionIndex}
                  selected={optionIndex == currentlySelected}
                >{this.versionLabel(option, optionIndex)}</option>
              )}
            </select>
          {this.editable && <button slot='end' onClick={() => this.select('add', true)}>+</button>}
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
    //console.log('ldf-option (render) ', this.obj?.metadata.selected, this.obj.value, this.selectedDoc)
    const selectedIndex = this.editable ? this.obj.metadata.editor_selected ?? this.obj.metadata.selected : this.obj.metadata.selected;

    return (
      <Host lang={this.obj.language}>
        <div class='select-control'>
          <ldf-label-bar>
            {/* Can be overwritten by apps that use Ionic or other frameworks */}
            <slot slot='end' name='controls'>{this.selectNode()}</slot>
          </ldf-label-bar>
        </div>
        
        {(this.obj.value || this.editable) && <ldf-liturgical-document
          doc={this.obj.value[selectedIndex]}
          path={`${this.path}/value/${this.obj.metadata.selected}`}
          base={`${this.path}/value`}
          index={selectedIndex}
          editable={this.editable}
          parentType='option'
        >
        </ldf-liturgical-document>}
      </Host>
    );
  }
}
