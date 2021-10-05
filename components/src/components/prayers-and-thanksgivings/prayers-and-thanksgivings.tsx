import { popoverController } from '@ionic/core';
import { Component, Prop, Watch, State, Element, h, EventEmitter, Event, Method } from '@stencil/core';
import { Text, Change } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './prayers-and-thanksgivings.i18n.en.json';
const LOCALE = {
  'en': EN,
};
@Component({
  tag: 'ldf-prayers-and-thanksgivings',
  styleUrl: 'prayers-and-thanksgivings.scss',
  scoped: true
})
export class PrayersAndThanksgivingsComponent {
  @Element() element: HTMLElement;

  @State() localeStrings : Record<string, string> = {};

  @State() currentOptions : Text[];

  @State() filter : string = '';

  // Properties

  /** A JSON Pointer that points to the list into which we should insert a prayer */
  @Prop({ reflect: true }) base : string;

  /** A JSON Pointer that points to the index before which we should insert the prayer */
  @Prop({ reflect: true }) index : string;

  @Prop() modal : any;

  loading: any;

  @Prop() parent : any;

  @Prop() options: Text[];
  @Watch('options')
  optionsChange(newOptions) {
    console.log("new options")
    this.currentOptions = newOptions;
  }

  /** Set the list of available prayers */
  @Method()
  async setOptions(options : Text[]): Promise<void> {
    this.optionsChange(options);
    if(this.loading) {
      this.loading.dismiss();
    }
  }

  /** Requests a list of possible Prayers and Thanksgivings */
  @Event({ bubbles: true }) ldfAskForPrayersAndThanksgivings : EventEmitter<boolean>;

  // Lifecycle events
  async componentWillLoad() {
    this.ldfAskForPrayersAndThanksgivings.emit(true);
    this.loadLocaleStrings();
  }

  // Private methods
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.element)];
    } catch(e) {
      console.warn(e);
    }
  }

  async addPrayer(value : Text) {
    // if passed a parent, send the message to it that we should insert this doc
    if(this.parent) {
      this.parent.ldfDocShouldChange.emit(new Change({
        path: this.base,
        op: [{
          type: 'insertAt',
          index: this.index,
          value
        }]
      }));
      this.modal?.dismiss();
    }
    // otherwise, just pop up the text
    else {
      const popover = await popoverController.create({
        backdropDismiss: true,
        component: "ldf-liturgical-document",
        componentProps: {
          doc: {...value, value: value.value.map(line => typeof line === "string" ? line.replace("  ", " ") : line)},
          padding: "1em"
        }
      });
      await popover.present();
    }
  }

  buildTree() : [any, any][][] {
    function groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
           const key = keyGetter(item);
           const collection = map.get(key);
           if (!collection) {
               map.set(key, [item]);
           } else {
               collection.push(item);
           }
      });
      return map;
    }

    const options = !this.filter ? this.currentOptions || [] :
      (this.currentOptions || []).filter(doc => doc.label?.toLowerCase()?.includes(this.filter.toLowerCase()) || (doc.value || [])[0]?.toLowerCase()?.includes(this.filter.toLowerCase()));

    const categories = Array.from(groupBy(options, (item : Text) => (item.category || [])[1]));

    const subcategories = categories.map(([categoryLabel, values]) => [categoryLabel, Array.from(groupBy(values, (item : Text) => (item.category || [])[2]))]);

    return subcategories;
  }
  
  // Render
  render() {
    const localeStrings = this.localeStrings || {};

    const tree = this.buildTree(),
      list = <ion-list>
      <ion-searchbar debounce={100} onIonChange={(ev) => this.filter = ev.detail.value}></ion-searchbar>
      {tree.map(([category, values]) => [
        <h2 class="padded">{category}</h2>,
        ...values.map(([subcategory, subvalues]) => [
          <h3 class="padded">{subcategory}</h3>,
          ...subvalues
            .sort((a, b) => Number(a.label?.split('.')[0]) < Number(b.label?.split('.')[0]) ? -1 : 1)
            .map(option => <ion-item button onClick={() => this.addPrayer(option)}>
            <ion-label>
              <h3>{option.label}</h3>
              <p>{option.value[0].replace(/\*/g, '').replace("  ", " ")}</p>
            </ion-label>
          </ion-item>)
        ])
      ])}
    </ion-list>;

    return this.modal 
      ? [
        <ion-header>
          <ion-toolbar>
            <ion-title>{localeStrings.title}</ion-title>
            <ion-buttons slot="end">
              <ion-button onClick={() => this.modal.dismiss()}>
                <ion-icon slot="icon-only" name="close"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>,
        <ion-content class="ion-padding">
          {list}
        </ion-content>
      ]
      : [list];
  }
}
