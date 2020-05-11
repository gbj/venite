import { Element, Component, Prop, State, Host, Event, EventEmitter, JSX, h } from '@stencil/core';
import { getLocaleComponentStrings } from '../../utils/locale';
import { LiturgicalDocument, Change } from '@venite/ldf';

@Component({
  tag: 'ldf-editable-add-block',
  styleUrls: [
    'editable-add-block.scss',
    '../../assets/fontawesome/css/all.css' // Font Awesome
  ],
  shadow: true
})
export class EditableAddBlockComponent {
  @Element() element: HTMLElement;

  /** If `collapsed` is `true`, the button may be visible but the menu is not shown. */
  @State() collapsed : boolean = true;
  @State() localeStrings: { [x: string]: string; };

  // Properties
  /** If `visible` is true, the button should appear. */
  @Prop() visible : boolean;

  /**  A JSON Pointer that points to the LiturgicalDocument being edited */
  @Prop({ reflect: true }) path : string;

  // Events
  @Event({ bubbles: true }) docShouldChange : EventEmitter<Change>;

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
      hidden: !this.visible || !this.collapsed,
      visible: this.visible && !this.collapsed
    };
    if(customElements && customElements.get('ion-button') && customElements.get('ion-label') && customElements.get('ion-icon')) {
      return (
        <ion-button onClick={() => this.expand()} class={classes}>
          <ion-label>
            <ion-icon name="add-circle-outline"></ion-icon>
          </ion-label>
        </ion-button>
      )
    } else {
      return (
        <button class={classes} onClick={() => this.expand()}>+</button>
      )
    }
  }

  expand() {
    this.collapsed = false;
  }

  // Add a block
  add(type : "liturgy" | "heading" | "option" | "refrain" | "rubric" | "text" | "responsive" | "bible-reading" | "psalm" | "meditation") {
    const doc = new LiturgicalDocument({ type, label: 'New Item', value: [] });

    this.docShouldChange.emit(
      new Change(
        null, // null path, because we're passing the path in the `p` of the json0 op below
        [
          {
            p: this.path.split('/').filter(part => part !== ''),
            li: doc
          }
        ]
      )
    );

    // collapse the UI
    this.collapsed = true;
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <Host>
        <div class='button-container'>
          {this.plusButtonNode()}
        </div>

        <div class={{ underlying: true, hidden: !this.visible, visible: this.visible, collapsed: this.collapsed, expanded: !this.collapsed }}>
          <div class={{ options: true, collapsed: this.collapsed, expanded: !this.collapsed }}>

            {/* Bible Reading — SVG is Font Awesome 'fa-bible' */}
            <button onClick={() => this.add('bible-reading')} class='block'>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bible" class="svg-inline--fa fa-bible fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 358.4V25.6c0-16-9.6-25.6-25.6-25.6H96C41.6 0 0 41.6 0 96v320c0 54.4 41.6 96 96 96h326.4c12.8 0 25.6-9.6 25.6-25.6v-16c0-6.4-3.2-12.8-9.6-19.2-3.2-16-3.2-60.8 0-73.6 6.4-3.2 9.6-9.6 9.6-19.2zM144 144c0-8.84 7.16-16 16-16h48V80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v48h48c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-48v112c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16V192h-48c-8.84 0-16-7.16-16-16v-32zm236.8 304H96c-19.2 0-32-12.8-32-32s16-32 32-32h284.8v64z"></path></svg>
              { localeStrings.bible }
            </button>

            {/* Heading — SVG is Font Awesome 'fa-heading' */}
            <button onClick={() => this.add('heading')} class='block' data-type='heading'>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heading" class="svg-inline--fa fa-heading fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg>
              { localeStrings.heading }
            </button>

            {/* Text — SVG is Font Awesome 'justify-left' */}
            <button onClick={() => this.add('text')} class='block'>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="align-left" class="svg-inline--fa fa-align-left fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>
              { localeStrings.text }
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
