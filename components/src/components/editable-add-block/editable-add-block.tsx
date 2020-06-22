import { Element, Component, Prop, State, Host, Event, EventEmitter, h } from '@stencil/core';
import { getLocaleComponentStrings } from '../../utils/locale';
import { Change } from '@venite/ldf';
import '@ionic/core';

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

  // Pop up the modal with an Add Block Menu inside it
  /*async expand() {
    const modal = await modalController.create({
      component: 'ldf-editable-add-block-menu',
    })
    modal.componentProps = {
      modal
    };
    modal.swipeToClose = true;

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data) {
      this.add(data);
    }
  }*/

  // Add a block
  /*add(template : LiturgicalDocument[]) {
    this.ldfDocShouldChange.emit(
      new Change({
        path: this.base, 
        op: template.reverse() // list inserts are *before* an index, so if we reverse the array it'll end up in the right order
          .map(value => ({
            type: 'insertAt',
            index: this.index,
            value
          }))
      })
    );
  }*/

  // Render
  render() {
    return (
      <Host>
        <div class='button-container'>
          <button class={{
            add: true,
            hidden: !this.visible,
            visible: this.visible,
            collapsed: true
          }} onClick={() => this.ldfDocShouldAdd.emit({base: this.base, index: this.index})}>
            <label class='visually-hidden'>{ (this.localeStrings || {}).add}</label>
            +
          </button>
        </div>

        <div class={{ underlying: true, hidden: !this.visible, visible: this.visible, collapsed: true }}></div>
      </Host>
    );
  }
}
