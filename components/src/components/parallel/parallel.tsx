import { Component, Prop, Watch, State, Host, Event, EventEmitter, Element, h } from '@stencil/core';
import { Parallel, LiturgicalDocument, Change } from '@venite/ldf';
import { AddOptionToDoc } from '../../interfaces/add-option-to-doc';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './parallel.i18n.en.json';

const LOCALE = {
  'en': EN
};
@Component({
  tag: 'ldf-parallel',
  styleUrl: 'parallel.scss',
  scoped: true
})
export class ParallelComponent {
  @Element() el : HTMLElement;
  
  // States
  @State() obj : Parallel;
  @State() localeStrings: { [x: string]: string; };
  //@State() selectedDoc : LiturgicalDocument;
  @State() filteredOptions : LiturgicalDocument[];

  // Properties
  /**
   * An LDF Option object.
   */
  @Prop() doc : Parallel | string;
  @Watch('doc')
  docChanged(newDoc : Parallel | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Parallel(JSON.parse(newDoc));
      } else {
        this.obj = new Parallel(newDoc);
      }
    } catch(e) {
      console.warn(e);
      this.obj = new Parallel();
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

  /**
   * Whether the object is in preview mode
   */
  @Prop() preview : boolean;

  // Events
  @Event({ bubbles: true }) ldfAddOptionToDoc : EventEmitter<AddOptionToDoc>;
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;
  @Event({ bubbles: true }) ldfOptionAskForStoredSelection : EventEmitter<{ el: HTMLElement }>;
  @Event({ bubbles: true }) ldfOptionMakeSelection : EventEmitter<{ slug: string; index: number; }>;

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
    this.loadLocaleStrings();
    this.ldfOptionAskForStoredSelection.emit({ el: this.el });
  }

  /** Asynchronously load localization strings */
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.el)];
    } catch(e) {
      console.warn(e);
    }
  }

  // Render
  render() {
    return (
      <Host lang={this.obj.language}>
        <tr>
          {(this.obj?.value || []).map((obj, ii) => <td><ldf-liturgical-document
            doc={obj}
            path={`${this.path}/value/${ii}`}
            base={`${this.path}/value`}
            index={ii}
            editable={this.editable}
            parentType='option'
          >
          </ldf-liturgical-document></td>)}
        </tr>
      </Host>
    );
  }
}
