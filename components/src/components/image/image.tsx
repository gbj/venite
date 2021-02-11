import { modalController } from '@ionic/core';
import { Element, Component, Prop, Watch, State, Host, h, Listen, EventEmitter, Event } from '@stencil/core';
import { Change, Image } from '@venite/ldf';
import Debounce from 'debounce-decorator';

import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './image.i18n.en.json';
const LOCALE = {
  'en': EN
};

type Direction = 'ne' | 'nw' | 'se' | 'sw';

@Component({
  tag: 'ldf-image',
  styleUrl: 'image.scss',
  shadow: true
})
export class ImageComponent {
  @Element() element : HTMLElement;
  imgElement : HTMLImageElement | undefined;

  // States
  @State() obj : Image;

  @State() localeStrings : Record<string, string>;

  @State() isResizing : boolean = false;
  resizingStartPoint : {x: number; y: number;} | null = null;
  resizingCorner : Direction | null = null;

  @State() height : number | null;
  @State() width : number | null;

  // Properties
  /**
   * An LDF Image object.
   */
  @Prop() doc : Image | string;
  @Watch('doc')
  docChanged(newDoc : Image | string) {
    try {
      if(typeof newDoc == 'string') {
        this.obj = new Image(JSON.parse(newDoc));
      } else {
        this.obj = new Image(newDoc);
      }
      this.height = this.obj?.metadata?.height || null;
      this.width = this.obj?.metadata?.width || null;
    } catch(e) {
      console.warn(e);
      this.obj = new Image();
    }
  }

  /**
   * A JSON Pointer that points to the Collect being edited
   */
  @Prop({ reflect: true }) path : string;

  /** Whether the object is editable */
  @Prop() editable : boolean;

  /** If the image is being shown in a modal, pass the modal here */
  @Prop() modal : any;

  /** Tell the Editor that a change has been made to the document */
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  // Lifecycle events
  componentWillLoad() {
    this.docChanged(this.doc);
    this.loadLocaleStrings();
  }

  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  async showZoomed() {
    const modal = await modalController.create({
      component: 'ldf-image'
    });
    modal.componentProps = {
      modal,
      doc: this.obj
    };
    await modal.present();
  }

  startResizing(corner: Direction, ev: MouseEvent) {
    console.log('start resizing');
    this.resizingCorner = corner;
    this.resizingStartPoint = { x: ev.clientX, y: ev.clientY };
  }

  @Listen('mouseup', { target: 'document' })
  stopResizing() {
    // clear status of resizing
    this.resizingCorner = null;
  }

  @Listen('mousemove', { target: 'window' })
  resizingMove(ev: MouseEvent) {
    if(this.resizingCorner && this.resizingStartPoint) {
      const { x } = this.resizingStartPoint;
      const xDiff = x - ev.clientX;
      this.resizingStartPoint = { x: ev.clientX, y: ev.clientY };
  
      // force fixed aspect ratio by nulling out `height`
      this.width = this.imgElement.clientWidth - xDiff;
      this.height = null;

      this.updateDoc();
    }
  }

  // debounce saving the change by 500ms, preventing sending multiple changes as the mouse moves
  @Debounce(250)
  updateDoc() {
    if(!this.obj?.metadata) {
      this.ldfDocShouldChange.emit(new Change({
        path: this.path,
        op: [{ type: 'set', index: 'metadata', oldValue: this.obj?.metadata, value: {}}]
      }));
    }
    this.ldfDocShouldChange.emit(new Change({
      path: `${this.path}/metadata`,
      op: [
        {
          type: 'set',
          index: 'height',
          oldValue: this.obj?.metadata?.height,
          value: this.imgElement.clientHeight
        },
        {
          type: 'set',
          index: 'width',
          oldValue: this.obj?.metadata?.width,
          value: this.imgElement.clientWidth
        }
      ]
    }));
  }

  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    const imageDisplay = [
      this.editable && <ldf-label-bar>
        <slot slot='end' name='controls'></slot>
      </ldf-label-bar>,
      <div class={`${this.obj?.style || ''} ${this.obj?.metadata?.align || 'center'}`}>
        {this.obj.value && this.obj.value.map((url, ii) =>
          this.editable ?
          <figure>
            <div class="img-wrapper">
              <img src={url}
                ref={el => this.imgElement = el as HTMLImageElement}
                alt={this.obj?.label}
                style={{
                  height: this.height ? `${this.height}px` : 'auto',
                  width: this.width ? `${this.width}px` : 'auto'
                }}
                class="editable"
              />
              <button class="resize top-left"
                onMouseDown={(ev) => this.startResizing('nw', ev)}
              ></button>
              <button class="resize bottom-left"
                onMouseDown={(ev) => this.startResizing('sw', ev)}
              ></button>
              <button class="resize top-right"
                onMouseDown={(ev) => this.startResizing('ne', ev)}
              ></button>
              <button class="resize bottom-right"
                onMouseDown={(ev) => this.startResizing('se', ev)}
              ></button>
            </div>
            <figcaption>
              <code>{localeStrings.url}</code>
              <ldf-editable-text
                id={`${this.obj.uid || this.obj.slug}-${ii}`}
                text={url}
                path={`${this.path}/value/${ii}`}
              ></ldf-editable-text>
            </figcaption>
          </figure>
          :
          <img
            src={url}
            onClick={() => this.showZoomed()}
            style={{
              height: this.height ? `${this.height}px` : 'auto',
              width: this.width ? `${this.width}px` : 'auto'
            }}
          />
        )}
      </div>
    ];

    if(!this.modal) {
      return <Host lang={this.obj?.language}>{imageDisplay}</Host>;
    } else {
      return [
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button onClick={() => this.modal.dismiss()}>
                <ion-label slot="start">{localeStrings.close}</ion-label>
                <ion-icon slot="end" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>,
        <ion-content class="ion-padding" scrollX={true} lang={this.obj?.language}>
          {imageDisplay}
        </ion-content>
      ];
    }
  }
}
