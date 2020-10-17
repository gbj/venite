import { Element, Component, Prop, State, Host, Event, EventEmitter, h } from '@stencil/core';
import { Change } from '@venite/ldf';
import '@ionic/core';

import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './editable-add-block.i18n.en.json';
const LOCALE = {
  'en': EN
};


@Component({
  tag: 'ldf-editable-add-block',
  styleUrl: 'editable-add-block.scss',
  shadow: true
})
export class EditableAddBlockComponent {
  @Element() element: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  // Properties
  /** If `visible` is true, the button should appear. */
  @Prop() visible : boolean;

  /** A JSON Pointer that points to the array within which the item to be inserted will be nested */
  @Prop({ reflect: true }) base: string;

  /** The item's index within that array */
  @Prop({ reflect: true }) index: number;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  /** Gives a path to the point in the document at which a new LiturgicalDocument should be added */
  @Event({ bubbles: true }) ldfDocShouldAdd : EventEmitter<{ base: string; index: number }>;

  // Lifecycle events
  async componentWillLoad() {
    this.loadLocaleStrings();
  }

  // Methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};
    return (
      <Host>
        <ion-button aria-role="button" fill="outline"
          class={{
            add: true,
            hidden: !this.visible,
            visible: this.visible,
            collapsed: true
          }}
          onClick={() => this.ldfDocShouldAdd.emit({base: this.base, index: this.index})}
        >
          <ion-icon name="add" slot="icon-only"></ion-icon>
          <ion-label class="visually-hidden">{localeStrings.add}</ion-label>
        </ion-button>
      </Host>
    );
  }
}
