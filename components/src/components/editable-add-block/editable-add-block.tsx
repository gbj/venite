import { Element, Component, Prop, State, Host, Event, EventEmitter, JSX, h } from '@stencil/core';
import { getLocaleComponentStrings } from '../../utils/locale';
import { LiturgicalDocument, Change } from '@venite/ldf';
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

  /**  A JSON Pointer that points to the LiturgicalDocument being edited */
  @Prop({ reflect: true }) path : string;

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

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

  // Build the `(+)` Button
  plusButtonNode() : JSX.Element {
    const classes = {
      add: true,
      hidden: !this.visible,
      visible: this.visible,
      collapsed: true
    };
    return (
      <button class={classes} onClick={() => this.expand()}>
        <label class='visually-hidden'>{ (this.localeStrings || {}).add}</label>
        +
      </button>);
  }

  async expand() {
    const modal = document.createElement('ion-modal');
    modal.component = 'ldf-editable-add-block-menu';
    modal.componentProps = {
      'modal': modal
    };
    modal.swipeToClose = true;
    document.body.appendChild(modal);
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data) {
      this.add(data);
    }
  }

  // Add a block
  add(template : LiturgicalDocument[]) {
    const p = this.path.split('/').filter(part => part !== '');
    this.ldfDocShouldChange.emit(
      new Change({
        path: null, // null path, because we're passing the path in the `p` of the json0 op below
        op: template.reverse() // list inserts are *before* an index, so if we reverse the array it'll end up in the right order
          .map(doc => ({ p, li: doc }))
      })
    );
  }

  // Render
  render() {
    return (
      <Host>
        <div class='button-container'>
          {this.plusButtonNode()}
        </div>

        <div class={{ underlying: true, hidden: !this.visible, visible: this.visible, collapsed: true }}></div>
      </Host>
    );
  }
}
