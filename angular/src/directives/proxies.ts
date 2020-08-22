/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';

export const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype;
  inputs.forEach(item => {
    Object.defineProperty(Prototype, item, {
      get() { return this.el[item]; },
      set(val: any) { this.z.runOutsideAngular(() => (this.el[item] = val)); }
    });
  });
};

export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype;
  methods.forEach(methodName => {
    Prototype[methodName] = function () {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};

export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
}

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp(opts: { inputs?: any; methods?: any }) {
  const decorator =  function(cls: any){
    if (opts.inputs) {
      proxyInputs(cls, opts.inputs);
    }
    if (opts.methods) {
      proxyMethods(cls, opts.methods);
    }
    return cls;
  };
  return decorator;
}

import { Components } from '@venite/components'

export declare interface IonActionSheet extends Components.IonActionSheet {}
@ProxyCmp({inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'keyboardClose', 'leaveAnimation', 'subHeader', 'translucent'], 'methods': ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']})
@Component({ selector: 'ion-action-sheet', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'keyboardClose', 'leaveAnimation', 'subHeader', 'translucent'] })
export class IonActionSheet {
  ionActionSheetDidPresent!: EventEmitter<CustomEvent>;
  ionActionSheetWillPresent!: EventEmitter<CustomEvent>;
  ionActionSheetWillDismiss!: EventEmitter<CustomEvent>;
  ionActionSheetDidDismiss!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionActionSheetDidPresent', 'ionActionSheetWillPresent', 'ionActionSheetWillDismiss', 'ionActionSheetDidDismiss']);
  }
}

export declare interface IonAlert extends Components.IonAlert {}
@ProxyCmp({inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'inputs', 'keyboardClose', 'leaveAnimation', 'message', 'subHeader', 'translucent'], 'methods': ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']})
@Component({ selector: 'ion-alert', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'inputs', 'keyboardClose', 'leaveAnimation', 'message', 'subHeader', 'translucent'] })
export class IonAlert {
  ionAlertDidPresent!: EventEmitter<CustomEvent>;
  ionAlertWillPresent!: EventEmitter<CustomEvent>;
  ionAlertWillDismiss!: EventEmitter<CustomEvent>;
  ionAlertDidDismiss!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionAlertDidPresent', 'ionAlertWillPresent', 'ionAlertWillDismiss', 'ionAlertDidDismiss']);
  }
}

export declare interface IonApp extends Components.IonApp {}

@Component({ selector: 'ion-app', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class IonApp {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonAvatar extends Components.IonAvatar {}

@Component({ selector: 'ion-avatar', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class IonAvatar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonBackButton extends Components.IonBackButton {}
@ProxyCmp({inputs: ['color', 'defaultHref', 'disabled', 'icon', 'text', 'type']})
@Component({ selector: 'ion-back-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'defaultHref', 'disabled', 'icon', 'text', 'type'] })
export class IonBackButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonBackdrop extends Components.IonBackdrop {}
@ProxyCmp({inputs: ['stopPropagation', 'tappable', 'visible']})
@Component({ selector: 'ion-backdrop', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['stopPropagation', 'tappable', 'visible'] })
export class IonBackdrop {
  ionBackdropTap!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionBackdropTap']);
  }
}

export declare interface IonBadge extends Components.IonBadge {}
@ProxyCmp({inputs: ['color']})
@Component({ selector: 'ion-badge', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color'] })
export class IonBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonButton extends Components.IonButton {}
@ProxyCmp({inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'rel', 'routerDirection', 'shape', 'size', 'strong', 'target', 'type']})
@Component({ selector: 'ion-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'rel', 'routerDirection', 'shape', 'size', 'strong', 'target', 'type'] })
export class IonButton {
  ionFocus!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
  }
}

export declare interface IonButtons extends Components.IonButtons {}
@ProxyCmp({inputs: ['collapse']})
@Component({ selector: 'ion-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['collapse'] })
export class IonButtons {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonCard extends Components.IonCard {}
@ProxyCmp({inputs: ['button', 'color', 'disabled', 'download', 'href', 'rel', 'routerDirection', 'target', 'type']})
@Component({ selector: 'ion-card', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['button', 'color', 'disabled', 'download', 'href', 'rel', 'routerDirection', 'target', 'type'] })
export class IonCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonCardContent extends Components.IonCardContent {}

@Component({ selector: 'ion-card-content', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class IonCardContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonCardHeader extends Components.IonCardHeader {}
@ProxyCmp({inputs: ['color', 'translucent']})
@Component({ selector: 'ion-card-header', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'translucent'] })
export class IonCardHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonCardSubtitle extends Components.IonCardSubtitle {}
@ProxyCmp({inputs: ['color']})
@Component({ selector: 'ion-card-subtitle', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color'] })
export class IonCardSubtitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonCardTitle extends Components.IonCardTitle {}
@ProxyCmp({inputs: ['color']})
@Component({ selector: 'ion-card-title', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color'] })
export class IonCardTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonCheckbox extends Components.IonCheckbox {}
@ProxyCmp({inputs: ['checked', 'color', 'disabled', 'indeterminate', 'name', 'value']})
@Component({ selector: 'ion-checkbox', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['checked', 'color', 'disabled', 'indeterminate', 'name', 'value'] })
export class IonCheckbox {
  ionChange!: EventEmitter<CustomEvent>;
  ionFocus!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
  }
}

export declare interface IonChip extends Components.IonChip {}
@ProxyCmp({inputs: ['color', 'outline']})
@Component({ selector: 'ion-chip', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'outline'] })
export class IonChip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonCol extends Components.IonCol {}
@ProxyCmp({inputs: ['offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'pull', 'pullLg', 'pullMd', 'pullSm', 'pullXl', 'pullXs', 'push', 'pushLg', 'pushMd', 'pushSm', 'pushXl', 'pushXs', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs']})
@Component({ selector: 'ion-col', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'pull', 'pullLg', 'pullMd', 'pullSm', 'pullXl', 'pullXs', 'push', 'pushLg', 'pushMd', 'pushSm', 'pushXl', 'pushXs', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs'] })
export class IonCol {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonContent extends Components.IonContent {}
@ProxyCmp({inputs: ['color', 'forceOverscroll', 'fullscreen', 'scrollEvents', 'scrollX', 'scrollY'], 'methods': ['getScrollElement', 'scrollToTop', 'scrollToBottom', 'scrollByPoint', 'scrollToPoint']})
@Component({ selector: 'ion-content', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'forceOverscroll', 'fullscreen', 'scrollEvents', 'scrollX', 'scrollY'] })
export class IonContent {
  ionScrollStart!: EventEmitter<CustomEvent>;
  ionScroll!: EventEmitter<CustomEvent>;
  ionScrollEnd!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionScrollStart', 'ionScroll', 'ionScrollEnd']);
  }
}

export declare interface IonDatetime extends Components.IonDatetime {}
@ProxyCmp({inputs: ['cancelText', 'dayNames', 'dayShortNames', 'dayValues', 'disabled', 'displayFormat', 'displayTimezone', 'doneText', 'hourValues', 'max', 'min', 'minuteValues', 'monthNames', 'monthShortNames', 'monthValues', 'name', 'pickerFormat', 'pickerOptions', 'placeholder', 'readonly', 'value', 'yearValues'], 'methods': ['open']})
@Component({ selector: 'ion-datetime', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['cancelText', 'dayNames', 'dayShortNames', 'dayValues', 'disabled', 'displayFormat', 'displayTimezone', 'doneText', 'hourValues', 'max', 'min', 'minuteValues', 'monthNames', 'monthShortNames', 'monthValues', 'name', 'pickerFormat', 'pickerOptions', 'placeholder', 'readonly', 'value', 'yearValues'] })
export class IonDatetime {
  ionCancel!: EventEmitter<CustomEvent>;
  ionChange!: EventEmitter<CustomEvent>;
  ionFocus!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionCancel', 'ionChange', 'ionFocus', 'ionBlur']);
  }
}

export declare interface IonFab extends Components.IonFab {}
@ProxyCmp({inputs: ['activated', 'edge', 'horizontal', 'vertical'], 'methods': ['close']})
@Component({ selector: 'ion-fab', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['activated', 'edge', 'horizontal', 'vertical'] })
export class IonFab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonFabButton extends Components.IonFabButton {}
@ProxyCmp({inputs: ['activated', 'color', 'disabled', 'download', 'href', 'rel', 'routerDirection', 'show', 'size', 'target', 'translucent', 'type']})
@Component({ selector: 'ion-fab-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['activated', 'color', 'disabled', 'download', 'href', 'rel', 'routerDirection', 'show', 'size', 'target', 'translucent', 'type'] })
export class IonFabButton {
  ionFocus!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
  }
}

export declare interface IonFabList extends Components.IonFabList {}
@ProxyCmp({inputs: ['activated', 'side']})
@Component({ selector: 'ion-fab-list', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['activated', 'side'] })
export class IonFabList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonFooter extends Components.IonFooter {}
@ProxyCmp({inputs: ['translucent']})
@Component({ selector: 'ion-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['translucent'] })
export class IonFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonGrid extends Components.IonGrid {}
@ProxyCmp({inputs: ['fixed']})
@Component({ selector: 'ion-grid', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['fixed'] })
export class IonGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonHeader extends Components.IonHeader {}
@ProxyCmp({inputs: ['collapse', 'translucent']})
@Component({ selector: 'ion-header', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['collapse', 'translucent'] })
export class IonHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonIcon extends Components.IonIcon {}
@ProxyCmp({inputs: ['ariaLabel', 'color', 'flipRtl', 'icon', 'ios', 'lazy', 'md', 'mode', 'name', 'size', 'src']})
@Component({ selector: 'ion-icon', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['ariaLabel', 'color', 'flipRtl', 'icon', 'ios', 'lazy', 'md', 'mode', 'name', 'size', 'src'] })
export class IonIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonImg extends Components.IonImg {}
@ProxyCmp({inputs: ['alt', 'src']})
@Component({ selector: 'ion-img', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['alt', 'src'] })
export class IonImg {
  ionImgWillLoad!: EventEmitter<CustomEvent>;
  ionImgDidLoad!: EventEmitter<CustomEvent>;
  ionError!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionImgWillLoad', 'ionImgDidLoad', 'ionError']);
  }
}

export declare interface IonInfiniteScroll extends Components.IonInfiniteScroll {}
@ProxyCmp({inputs: ['disabled', 'position', 'threshold'], 'methods': ['complete']})
@Component({ selector: 'ion-infinite-scroll', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled', 'position', 'threshold'] })
export class IonInfiniteScroll {
  ionInfinite!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionInfinite']);
  }
}

export declare interface IonInfiniteScrollContent extends Components.IonInfiniteScrollContent {}
@ProxyCmp({inputs: ['loadingSpinner', 'loadingText']})
@Component({ selector: 'ion-infinite-scroll-content', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['loadingSpinner', 'loadingText'] })
export class IonInfiniteScrollContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonInput extends Components.IonInput {}
@ProxyCmp({inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'], 'methods': ['setFocus', 'getInputElement']})
@Component({ selector: 'ion-input', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'] })
export class IonInput {
  ionInput!: EventEmitter<CustomEvent>;
  ionChange!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  ionFocus!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionBlur', 'ionFocus']);
  }
}

export declare interface IonItem extends Components.IonItem {}
@ProxyCmp({inputs: ['button', 'color', 'detail', 'detailIcon', 'disabled', 'download', 'href', 'lines', 'rel', 'routerDirection', 'target', 'type']})
@Component({ selector: 'ion-item', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['button', 'color', 'detail', 'detailIcon', 'disabled', 'download', 'href', 'lines', 'rel', 'routerDirection', 'target', 'type'] })
export class IonItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonItemDivider extends Components.IonItemDivider {}
@ProxyCmp({inputs: ['color', 'sticky']})
@Component({ selector: 'ion-item-divider', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'sticky'] })
export class IonItemDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonItemGroup extends Components.IonItemGroup {}

@Component({ selector: 'ion-item-group', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class IonItemGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonItemOption extends Components.IonItemOption {}
@ProxyCmp({inputs: ['color', 'disabled', 'download', 'expandable', 'href', 'rel', 'target', 'type']})
@Component({ selector: 'ion-item-option', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'disabled', 'download', 'expandable', 'href', 'rel', 'target', 'type'] })
export class IonItemOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonItemOptions extends Components.IonItemOptions {}
@ProxyCmp({inputs: ['side']})
@Component({ selector: 'ion-item-options', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['side'] })
export class IonItemOptions {
  ionSwipe!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionSwipe']);
  }
}

export declare interface IonItemSliding extends Components.IonItemSliding {}
@ProxyCmp({inputs: ['disabled'], 'methods': ['getOpenAmount', 'getSlidingRatio', 'open', 'close', 'closeOpened']})
@Component({ selector: 'ion-item-sliding', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled'] })
export class IonItemSliding {
  ionDrag!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionDrag']);
  }
}

export declare interface IonLabel extends Components.IonLabel {}
@ProxyCmp({inputs: ['color', 'position']})
@Component({ selector: 'ion-label', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'position'] })
export class IonLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonList extends Components.IonList {}
@ProxyCmp({inputs: ['inset', 'lines'], 'methods': ['closeSlidingItems']})
@Component({ selector: 'ion-list', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['inset', 'lines'] })
export class IonList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonListHeader extends Components.IonListHeader {}
@ProxyCmp({inputs: ['color', 'lines']})
@Component({ selector: 'ion-list-header', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'lines'] })
export class IonListHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonLoading extends Components.IonLoading {}
@ProxyCmp({inputs: ['animated', 'backdropDismiss', 'cssClass', 'duration', 'enterAnimation', 'keyboardClose', 'leaveAnimation', 'message', 'showBackdrop', 'spinner', 'translucent'], 'methods': ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']})
@Component({ selector: 'ion-loading', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'backdropDismiss', 'cssClass', 'duration', 'enterAnimation', 'keyboardClose', 'leaveAnimation', 'message', 'showBackdrop', 'spinner', 'translucent'] })
export class IonLoading {
  ionLoadingDidPresent!: EventEmitter<CustomEvent>;
  ionLoadingWillPresent!: EventEmitter<CustomEvent>;
  ionLoadingWillDismiss!: EventEmitter<CustomEvent>;
  ionLoadingDidDismiss!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionLoadingDidPresent', 'ionLoadingWillPresent', 'ionLoadingWillDismiss', 'ionLoadingDidDismiss']);
  }
}

export declare interface IonMenu extends Components.IonMenu {}
@ProxyCmp({inputs: ['contentId', 'disabled', 'maxEdgeStart', 'menuId', 'side', 'swipeGesture', 'type'], 'methods': ['isOpen', 'isActive', 'open', 'close', 'toggle', 'setOpen']})
@Component({ selector: 'ion-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['contentId', 'disabled', 'maxEdgeStart', 'menuId', 'side', 'swipeGesture', 'type'] })
export class IonMenu {
  ionWillOpen!: EventEmitter<CustomEvent>;
  ionWillClose!: EventEmitter<CustomEvent>;
  ionDidOpen!: EventEmitter<CustomEvent>;
  ionDidClose!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionWillOpen', 'ionWillClose', 'ionDidOpen', 'ionDidClose']);
  }
}

export declare interface IonMenuButton extends Components.IonMenuButton {}
@ProxyCmp({inputs: ['autoHide', 'color', 'disabled', 'menu', 'type']})
@Component({ selector: 'ion-menu-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['autoHide', 'color', 'disabled', 'menu', 'type'] })
export class IonMenuButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonMenuToggle extends Components.IonMenuToggle {}
@ProxyCmp({inputs: ['autoHide', 'menu']})
@Component({ selector: 'ion-menu-toggle', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['autoHide', 'menu'] })
export class IonMenuToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonModal extends Components.IonModal {}
@ProxyCmp({inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'enterAnimation', 'keyboardClose', 'leaveAnimation', 'presentingElement', 'showBackdrop', 'swipeToClose'], 'methods': ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']})
@Component({ selector: 'ion-modal', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'enterAnimation', 'keyboardClose', 'leaveAnimation', 'presentingElement', 'showBackdrop', 'swipeToClose'] })
export class IonModal {
  ionModalDidPresent!: EventEmitter<CustomEvent>;
  ionModalWillPresent!: EventEmitter<CustomEvent>;
  ionModalWillDismiss!: EventEmitter<CustomEvent>;
  ionModalDidDismiss!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionModalDidPresent', 'ionModalWillPresent', 'ionModalWillDismiss', 'ionModalDidDismiss']);
  }
}

export declare interface IonNav extends Components.IonNav {}
@ProxyCmp({inputs: ['animated', 'animation', 'root', 'rootParams', 'swipeGesture'], 'methods': ['push', 'insert', 'insertPages', 'pop', 'popTo', 'popToRoot', 'removeIndex', 'setRoot', 'setPages', 'getActive', 'getByIndex', 'canGoBack', 'getPrevious']})
@Component({ selector: 'ion-nav', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'animation', 'root', 'rootParams', 'swipeGesture'] })
export class IonNav {
  ionNavWillChange!: EventEmitter<CustomEvent>;
  ionNavDidChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionNavWillChange', 'ionNavDidChange']);
  }
}

export declare interface IonNavLink extends Components.IonNavLink {}
@ProxyCmp({inputs: ['component', 'componentProps', 'routerDirection']})
@Component({ selector: 'ion-nav-link', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['component', 'componentProps', 'routerDirection'] })
export class IonNavLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonNote extends Components.IonNote {}
@ProxyCmp({inputs: ['color']})
@Component({ selector: 'ion-note', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color'] })
export class IonNote {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonPicker extends Components.IonPicker {}
@ProxyCmp({inputs: ['animated', 'backdropDismiss', 'buttons', 'columns', 'cssClass', 'duration', 'enterAnimation', 'keyboardClose', 'leaveAnimation', 'showBackdrop'], 'methods': ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss', 'getColumn']})
@Component({ selector: 'ion-picker', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'backdropDismiss', 'buttons', 'columns', 'cssClass', 'duration', 'enterAnimation', 'keyboardClose', 'leaveAnimation', 'showBackdrop'] })
export class IonPicker {
  ionPickerDidPresent!: EventEmitter<CustomEvent>;
  ionPickerWillPresent!: EventEmitter<CustomEvent>;
  ionPickerWillDismiss!: EventEmitter<CustomEvent>;
  ionPickerDidDismiss!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionPickerDidPresent', 'ionPickerWillPresent', 'ionPickerWillDismiss', 'ionPickerDidDismiss']);
  }
}

export declare interface IonPickerColumn extends Components.IonPickerColumn {}
@ProxyCmp({inputs: ['col']})
@Component({ selector: 'ion-picker-column', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['col'] })
export class IonPickerColumn {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonPopover extends Components.IonPopover {}
@ProxyCmp({inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'enterAnimation', 'event', 'keyboardClose', 'leaveAnimation', 'showBackdrop', 'translucent'], 'methods': ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']})
@Component({ selector: 'ion-popover', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'enterAnimation', 'event', 'keyboardClose', 'leaveAnimation', 'showBackdrop', 'translucent'] })
export class IonPopover {
  ionPopoverDidPresent!: EventEmitter<CustomEvent>;
  ionPopoverWillPresent!: EventEmitter<CustomEvent>;
  ionPopoverWillDismiss!: EventEmitter<CustomEvent>;
  ionPopoverDidDismiss!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionPopoverDidPresent', 'ionPopoverWillPresent', 'ionPopoverWillDismiss', 'ionPopoverDidDismiss']);
  }
}

export declare interface IonProgressBar extends Components.IonProgressBar {}
@ProxyCmp({inputs: ['buffer', 'color', 'reversed', 'type', 'value']})
@Component({ selector: 'ion-progress-bar', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buffer', 'color', 'reversed', 'type', 'value'] })
export class IonProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonRadio extends Components.IonRadio {}
@ProxyCmp({inputs: ['color', 'disabled', 'name', 'value']})
@Component({ selector: 'ion-radio', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'disabled', 'name', 'value'] })
export class IonRadio {
  ionFocus!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
  }
}

export declare interface IonRadioGroup extends Components.IonRadioGroup {}
@ProxyCmp({inputs: ['allowEmptySelection', 'name', 'value']})
@Component({ selector: 'ion-radio-group', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['allowEmptySelection', 'name', 'value'] })
export class IonRadioGroup {
  ionChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange']);
  }
}

export declare interface IonRange extends Components.IonRange {}
@ProxyCmp({inputs: ['color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'name', 'pin', 'snaps', 'step', 'ticks', 'value']})
@Component({ selector: 'ion-range', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'name', 'pin', 'snaps', 'step', 'ticks', 'value'] })
export class IonRange {
  ionChange!: EventEmitter<CustomEvent>;
  ionFocus!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
  }
}

export declare interface IonRefresher extends Components.IonRefresher {}
@ProxyCmp({inputs: ['closeDuration', 'disabled', 'pullFactor', 'pullMax', 'pullMin', 'snapbackDuration'], 'methods': ['complete', 'cancel', 'getProgress']})
@Component({ selector: 'ion-refresher', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['closeDuration', 'disabled', 'pullFactor', 'pullMax', 'pullMin', 'snapbackDuration'] })
export class IonRefresher {
  ionRefresh!: EventEmitter<CustomEvent>;
  ionPull!: EventEmitter<CustomEvent>;
  ionStart!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionRefresh', 'ionPull', 'ionStart']);
  }
}

export declare interface IonRefresherContent extends Components.IonRefresherContent {}
@ProxyCmp({inputs: ['pullingIcon', 'pullingText', 'refreshingSpinner', 'refreshingText']})
@Component({ selector: 'ion-refresher-content', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['pullingIcon', 'pullingText', 'refreshingSpinner', 'refreshingText'] })
export class IonRefresherContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonReorder extends Components.IonReorder {}

@Component({ selector: 'ion-reorder', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class IonReorder {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonReorderGroup extends Components.IonReorderGroup {}
@ProxyCmp({inputs: ['disabled'], 'methods': ['complete']})
@Component({ selector: 'ion-reorder-group', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled'] })
export class IonReorderGroup {
  ionItemReorder!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionItemReorder']);
  }
}

export declare interface IonRippleEffect extends Components.IonRippleEffect {}
@ProxyCmp({inputs: ['type'], 'methods': ['addRipple']})
@Component({ selector: 'ion-ripple-effect', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['type'] })
export class IonRippleEffect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonRoute extends Components.IonRoute {}
@ProxyCmp({inputs: ['component', 'componentProps', 'url']})
@Component({ selector: 'ion-route', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['component', 'componentProps', 'url'] })
export class IonRoute {
  ionRouteDataChanged!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionRouteDataChanged']);
  }
}

export declare interface IonRouteRedirect extends Components.IonRouteRedirect {}
@ProxyCmp({inputs: ['from', 'to']})
@Component({ selector: 'ion-route-redirect', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['from', 'to'] })
export class IonRouteRedirect {
  ionRouteRedirectChanged!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionRouteRedirectChanged']);
  }
}

export declare interface IonRouter extends Components.IonRouter {}
@ProxyCmp({inputs: ['root', 'useHash'], 'methods': ['push', 'back']})
@Component({ selector: 'ion-router', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['root', 'useHash'] })
export class IonRouter {
  ionRouteWillChange!: EventEmitter<CustomEvent>;
  ionRouteDidChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionRouteWillChange', 'ionRouteDidChange']);
  }
}

export declare interface IonRouterLink extends Components.IonRouterLink {}
@ProxyCmp({inputs: ['color', 'href', 'rel', 'routerDirection', 'target']})
@Component({ selector: 'ion-router-link', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'href', 'rel', 'routerDirection', 'target'] })
export class IonRouterLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonRouterOutlet extends Components.IonRouterOutlet {}
@ProxyCmp({inputs: ['animated', 'animation', 'mode']})
@Component({ selector: 'ion-router-outlet', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'animation', 'mode'] })
export class IonRouterOutlet {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonRow extends Components.IonRow {}

@Component({ selector: 'ion-row', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class IonRow {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonSearchbar extends Components.IonSearchbar {}
@ProxyCmp({inputs: ['animated', 'autocomplete', 'autocorrect', 'cancelButtonIcon', 'cancelButtonText', 'clearIcon', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'placeholder', 'searchIcon', 'showCancelButton', 'spellcheck', 'type', 'value'], 'methods': ['setFocus', 'getInputElement']})
@Component({ selector: 'ion-searchbar', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'autocomplete', 'autocorrect', 'cancelButtonIcon', 'cancelButtonText', 'clearIcon', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'placeholder', 'searchIcon', 'showCancelButton', 'spellcheck', 'type', 'value'] })
export class IonSearchbar {
  ionInput!: EventEmitter<CustomEvent>;
  ionChange!: EventEmitter<CustomEvent>;
  ionCancel!: EventEmitter<CustomEvent>;
  ionClear!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  ionFocus!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionCancel', 'ionClear', 'ionBlur', 'ionFocus']);
  }
}

export declare interface IonSegment extends Components.IonSegment {}
@ProxyCmp({inputs: ['color', 'disabled', 'scrollable', 'value']})
@Component({ selector: 'ion-segment', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'disabled', 'scrollable', 'value'] })
export class IonSegment {
  ionChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange']);
  }
}

export declare interface IonSegmentButton extends Components.IonSegmentButton {}
@ProxyCmp({inputs: ['disabled', 'layout', 'type', 'value']})
@Component({ selector: 'ion-segment-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled', 'layout', 'type', 'value'] })
export class IonSegmentButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonSelect extends Components.IonSelect {}
@ProxyCmp({inputs: ['cancelText', 'compareWith', 'disabled', 'interface', 'interfaceOptions', 'multiple', 'name', 'okText', 'placeholder', 'selectedText', 'value'], 'methods': ['open']})
@Component({ selector: 'ion-select', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['cancelText', 'compareWith', 'disabled', 'interface', 'interfaceOptions', 'multiple', 'name', 'okText', 'placeholder', 'selectedText', 'value'] })
export class IonSelect {
  ionChange!: EventEmitter<CustomEvent>;
  ionCancel!: EventEmitter<CustomEvent>;
  ionFocus!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionCancel', 'ionFocus', 'ionBlur']);
  }
}

export declare interface IonSelectOption extends Components.IonSelectOption {}
@ProxyCmp({inputs: ['disabled', 'value']})
@Component({ selector: 'ion-select-option', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled', 'value'] })
export class IonSelectOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonSelectPopover extends Components.IonSelectPopover {}
@ProxyCmp({inputs: ['header', 'message', 'options', 'subHeader']})
@Component({ selector: 'ion-select-popover', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['header', 'message', 'options', 'subHeader'] })
export class IonSelectPopover {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonSkeletonText extends Components.IonSkeletonText {}
@ProxyCmp({inputs: ['animated']})
@Component({ selector: 'ion-skeleton-text', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated'] })
export class IonSkeletonText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonSlide extends Components.IonSlide {}

@Component({ selector: 'ion-slide', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class IonSlide {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonSlides extends Components.IonSlides {}
@ProxyCmp({inputs: ['options', 'pager', 'scrollbar'], 'methods': ['update', 'updateAutoHeight', 'slideTo', 'slideNext', 'slidePrev', 'getActiveIndex', 'getPreviousIndex', 'length', 'isEnd', 'isBeginning', 'startAutoplay', 'stopAutoplay', 'lockSwipeToNext', 'lockSwipeToPrev', 'lockSwipes', 'getSwiper']})
@Component({ selector: 'ion-slides', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['options', 'pager', 'scrollbar'] })
export class IonSlides {
  ionSlidesDidLoad!: EventEmitter<CustomEvent>;
  ionSlideTap!: EventEmitter<CustomEvent>;
  ionSlideDoubleTap!: EventEmitter<CustomEvent>;
  ionSlideWillChange!: EventEmitter<CustomEvent>;
  ionSlideDidChange!: EventEmitter<CustomEvent>;
  ionSlideNextStart!: EventEmitter<CustomEvent>;
  ionSlidePrevStart!: EventEmitter<CustomEvent>;
  ionSlideNextEnd!: EventEmitter<CustomEvent>;
  ionSlidePrevEnd!: EventEmitter<CustomEvent>;
  ionSlideTransitionStart!: EventEmitter<CustomEvent>;
  ionSlideTransitionEnd!: EventEmitter<CustomEvent>;
  ionSlideDrag!: EventEmitter<CustomEvent>;
  ionSlideReachStart!: EventEmitter<CustomEvent>;
  ionSlideReachEnd!: EventEmitter<CustomEvent>;
  ionSlideTouchStart!: EventEmitter<CustomEvent>;
  ionSlideTouchEnd!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionSlidesDidLoad', 'ionSlideTap', 'ionSlideDoubleTap', 'ionSlideWillChange', 'ionSlideDidChange', 'ionSlideNextStart', 'ionSlidePrevStart', 'ionSlideNextEnd', 'ionSlidePrevEnd', 'ionSlideTransitionStart', 'ionSlideTransitionEnd', 'ionSlideDrag', 'ionSlideReachStart', 'ionSlideReachEnd', 'ionSlideTouchStart', 'ionSlideTouchEnd']);
  }
}

export declare interface IonSpinner extends Components.IonSpinner {}
@ProxyCmp({inputs: ['color', 'duration', 'name', 'paused']})
@Component({ selector: 'ion-spinner', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'duration', 'name', 'paused'] })
export class IonSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonSplitPane extends Components.IonSplitPane {}
@ProxyCmp({inputs: ['contentId', 'disabled', 'when']})
@Component({ selector: 'ion-split-pane', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['contentId', 'disabled', 'when'] })
export class IonSplitPane {
  ionSplitPaneVisible!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionSplitPaneVisible']);
  }
}

export declare interface IonTab extends Components.IonTab {}
@ProxyCmp({inputs: ['component', 'tab'], 'methods': ['setActive']})
@Component({ selector: 'ion-tab', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['component', 'tab'] })
export class IonTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonTabBar extends Components.IonTabBar {}
@ProxyCmp({inputs: ['color', 'selectedTab', 'translucent']})
@Component({ selector: 'ion-tab-bar', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'selectedTab', 'translucent'] })
export class IonTabBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonTabButton extends Components.IonTabButton {}
@ProxyCmp({inputs: ['disabled', 'download', 'href', 'layout', 'rel', 'selected', 'tab', 'target']})
@Component({ selector: 'ion-tab-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled', 'download', 'href', 'layout', 'rel', 'selected', 'tab', 'target'] })
export class IonTabButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonTabs extends Components.IonTabs {}
@ProxyCmp({'methods': ['select', 'getTab', 'getSelected']})
@Component({ selector: 'ion-tabs', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class IonTabs {
  ionTabsWillChange!: EventEmitter<CustomEvent>;
  ionTabsDidChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionTabsWillChange', 'ionTabsDidChange']);
  }
}

export declare interface IonText extends Components.IonText {}
@ProxyCmp({inputs: ['color']})
@Component({ selector: 'ion-text', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color'] })
export class IonText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonTextarea extends Components.IonTextarea {}
@ProxyCmp({inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'color', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'spellcheck', 'value', 'wrap'], 'methods': ['setFocus', 'getInputElement']})
@Component({ selector: 'ion-textarea', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'color', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'spellcheck', 'value', 'wrap'] })
export class IonTextarea {
  ionChange!: EventEmitter<CustomEvent>;
  ionInput!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  ionFocus!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionInput', 'ionBlur', 'ionFocus']);
  }
}

export declare interface IonThumbnail extends Components.IonThumbnail {}

@Component({ selector: 'ion-thumbnail', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class IonThumbnail {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonTitle extends Components.IonTitle {}
@ProxyCmp({inputs: ['color', 'size']})
@Component({ selector: 'ion-title', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'size'] })
export class IonTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonToast extends Components.IonToast {}
@ProxyCmp({inputs: ['animated', 'buttons', 'color', 'cssClass', 'duration', 'enterAnimation', 'header', 'keyboardClose', 'leaveAnimation', 'message', 'position', 'translucent'], 'methods': ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']})
@Component({ selector: 'ion-toast', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'buttons', 'color', 'cssClass', 'duration', 'enterAnimation', 'header', 'keyboardClose', 'leaveAnimation', 'message', 'position', 'translucent'] })
export class IonToast {
  ionToastDidPresent!: EventEmitter<CustomEvent>;
  ionToastWillPresent!: EventEmitter<CustomEvent>;
  ionToastWillDismiss!: EventEmitter<CustomEvent>;
  ionToastDidDismiss!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionToastDidPresent', 'ionToastWillPresent', 'ionToastWillDismiss', 'ionToastDidDismiss']);
  }
}

export declare interface IonToggle extends Components.IonToggle {}
@ProxyCmp({inputs: ['checked', 'color', 'disabled', 'name', 'value']})
@Component({ selector: 'ion-toggle', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['checked', 'color', 'disabled', 'name', 'value'] })
export class IonToggle {
  ionChange!: EventEmitter<CustomEvent>;
  ionFocus!: EventEmitter<CustomEvent>;
  ionBlur!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
  }
}

export declare interface IonToolbar extends Components.IonToolbar {}
@ProxyCmp({inputs: ['color']})
@Component({ selector: 'ion-toolbar', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color'] })
export class IonToolbar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface IonVirtualScroll extends Components.IonVirtualScroll {}
@ProxyCmp({inputs: ['approxFooterHeight', 'approxHeaderHeight', 'approxItemHeight', 'footerFn', 'footerHeight', 'headerFn', 'headerHeight', 'itemHeight', 'items', 'nodeRender', 'renderFooter', 'renderHeader', 'renderItem'], 'methods': ['positionForItem', 'checkRange', 'checkEnd']})
@Component({ selector: 'ion-virtual-scroll', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['approxFooterHeight', 'approxHeaderHeight', 'approxItemHeight', 'footerFn', 'footerHeight', 'headerFn', 'headerHeight', 'itemHeight', 'items', 'nodeRender', 'renderFooter', 'renderHeader', 'renderItem'] })
export class IonVirtualScroll {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfBibleReading extends Components.LdfBibleReading {}
@ProxyCmp({inputs: ['doc', 'editable', 'path'], 'methods': ['getLocaleStrings']})
@Component({ selector: 'ldf-bible-reading', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['doc', 'editable', 'path'] })
export class LdfBibleReading {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfDayName extends Components.LdfDayName {}
@ProxyCmp({inputs: ['day']})
@Component({ selector: 'ldf-day-name', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['day'] })
export class LdfDayName {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfEditableAddBlock extends Components.LdfEditableAddBlock {}
@ProxyCmp({inputs: ['base', 'index', 'visible']})
@Component({ selector: 'ldf-editable-add-block', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['base', 'index', 'visible'] })
export class LdfEditableAddBlock {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  ldfDocShouldAdd!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange', 'ldfDocShouldAdd']);
  }
}

export declare interface LdfEditableAddBlockMenu extends Components.LdfEditableAddBlockMenu {}

@Component({ selector: 'ldf-editable-add-block-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class LdfEditableAddBlockMenu {
  ldfShouldAddBlock!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfShouldAddBlock']);
  }
}

export declare interface LdfEditableBoolean extends Components.LdfEditableBoolean {}
@ProxyCmp({inputs: ['path', 'property', 'value']})
@Component({ selector: 'ldf-editable-boolean', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['path', 'property', 'value'] })
export class LdfEditableBoolean {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditableCondition extends Components.LdfEditableCondition {}
@ProxyCmp({inputs: ['condition', 'modal', 'path']})
@Component({ selector: 'ldf-editable-condition', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['condition', 'modal', 'path'] })
export class LdfEditableCondition {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditableConditionPiece extends Components.LdfEditableConditionPiece {}
@ProxyCmp({inputs: ['condition', 'path']})
@Component({ selector: 'ldf-editable-condition-piece', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['condition', 'path'] })
export class LdfEditableConditionPiece {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditableDelete extends Components.LdfEditableDelete {}
@ProxyCmp({inputs: ['base', 'index', 'obj', 'type']})
@Component({ selector: 'ldf-editable-delete', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['base', 'index', 'obj', 'type'] })
export class LdfEditableDelete {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditableFilterDocuments extends Components.LdfEditableFilterDocuments {}
@ProxyCmp({inputs: ['options', 'type', 'versions']})
@Component({ selector: 'ldf-editable-filter-documents', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['options', 'type', 'versions'] })
export class LdfEditableFilterDocuments {
  ldfDocumentSelected!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocumentSelected']);
  }
}

export declare interface LdfEditableMetadata extends Components.LdfEditableMetadata {}
@ProxyCmp({inputs: ['collapsed', 'doc', 'modal', 'path', 'visible']})
@Component({ selector: 'ldf-editable-metadata', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['collapsed', 'doc', 'modal', 'path', 'visible'] })
export class LdfEditableMetadata {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditableMetadataButtons extends Components.LdfEditableMetadataButtons {}
@ProxyCmp({inputs: ['base', 'index', 'obj', 'parentType', 'visible']})
@Component({ selector: 'ldf-editable-metadata-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['base', 'index', 'obj', 'parentType', 'visible'] })
export class LdfEditableMetadataButtons {
  ldfAddOptionToDoc!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfAddOptionToDoc']);
  }
}

export declare interface LdfEditableMetadataMetadataFields extends Components.LdfEditableMetadataMetadataFields {}
@ProxyCmp({inputs: ['bibleReadingIntros', 'doc', 'path'], 'methods': ['setBibleReadingIntros']})
@Component({ selector: 'ldf-editable-metadata-metadata-fields', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['bibleReadingIntros', 'doc', 'path'] })
export class LdfEditableMetadataMetadataFields {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  ldfAskForBibleIntros!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange', 'ldfAskForBibleIntros']);
  }
}

export declare interface LdfEditablePreference extends Components.LdfEditablePreference {}
@ProxyCmp({inputs: ['modal', 'path', 'preference']})
@Component({ selector: 'ldf-editable-preference', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['modal', 'path', 'preference'] })
export class LdfEditablePreference {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditablePreferenceOption extends Components.LdfEditablePreferenceOption {}
@ProxyCmp({inputs: ['option', 'path']})
@Component({ selector: 'ldf-editable-preference-option', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['option', 'path'] })
export class LdfEditablePreferenceOption {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditablePreferences extends Components.LdfEditablePreferences {}
@ProxyCmp({inputs: ['modal', 'path', 'preferences', 'special_preferences']})
@Component({ selector: 'ldf-editable-preferences', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['modal', 'path', 'preferences', 'special_preferences'] })
export class LdfEditablePreferences {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditableSelect extends Components.LdfEditableSelect {}
@ProxyCmp({inputs: ['options', 'path', 'property', 'value']})
@Component({ selector: 'ldf-editable-select', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['options', 'path', 'property', 'value'] })
export class LdfEditableSelect {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditableStringList extends Components.LdfEditableStringList {}
@ProxyCmp({inputs: ['path', 'property', 'value']})
@Component({ selector: 'ldf-editable-string-list', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['path', 'property', 'value'] })
export class LdfEditableStringList {
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

export declare interface LdfEditableText extends Components.LdfEditableText {}
@ProxyCmp({inputs: ['inputType', 'path', 'placeholder', 'short', 'template', 'text']})
@Component({ selector: 'ldf-editable-text', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['inputType', 'path', 'placeholder', 'short', 'template', 'text'] })
export class LdfEditableText {
  ldfCursorMoved!: EventEmitter<CustomEvent>;
  ldfDocShouldChange!: EventEmitter<CustomEvent>;
  ldfAddChildAfter!: EventEmitter<CustomEvent>;
  ldfMergeWithPrevious!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfCursorMoved', 'ldfDocShouldChange', 'ldfAddChildAfter', 'ldfMergeWithPrevious']);
  }
}

export declare interface LdfEditor extends Components.LdfEditor {}
@ProxyCmp({inputs: ['cursors', 'doc', 'uid', 'users']})
@Component({ selector: 'ldf-editor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['cursors', 'doc', 'uid', 'users'] })
export class LdfEditor {
  editorCursorMoved!: EventEmitter<CustomEvent>;
  editorDocShouldChange!: EventEmitter<CustomEvent>;
  editorDocShouldAdd!: EventEmitter<CustomEvent>;
  editorAskForBibleIntros!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['editorCursorMoved', 'editorDocShouldChange', 'editorDocShouldAdd', 'editorAskForBibleIntros']);
  }
}

export declare interface LdfEditorCursor extends Components.LdfEditorCursor {}
@ProxyCmp({inputs: ['cursors', 'uid', 'users']})
@Component({ selector: 'ldf-editor-cursor', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['cursors', 'uid', 'users'] })
export class LdfEditorCursor {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfHeading extends Components.LdfHeading {}
@ProxyCmp({inputs: ['doc', 'editable', 'path']})
@Component({ selector: 'ldf-heading', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['doc', 'editable', 'path'] })
export class LdfHeading {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfLabelBar extends Components.LdfLabelBar {}

@Component({ selector: 'ldf-label-bar', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class LdfLabelBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfLiturgicalDocument extends Components.LdfLiturgicalDocument {}
@ProxyCmp({inputs: ['base', 'doc', 'editable', 'index', 'parentType', 'path']})
@Component({ selector: 'ldf-liturgical-document', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['base', 'doc', 'editable', 'index', 'parentType', 'path'] })
export class LdfLiturgicalDocument {
  focusPath!: EventEmitter<CustomEvent>;
  focusObj!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['focusPath', 'focusObj']);
  }
}

export declare interface LdfLiturgy extends Components.LdfLiturgy {}
@ProxyCmp({inputs: ['doc', 'editable', 'path']})
@Component({ selector: 'ldf-liturgy', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['doc', 'editable', 'path'] })
export class LdfLiturgy {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfMeditation extends Components.LdfMeditation {}
@ProxyCmp({inputs: ['autostart', 'color', 'doc', 'editable', 'path'], 'methods': ['getLocaleStrings', 'start', 'pause', 'resume', 'rewind']})
@Component({ selector: 'ldf-meditation', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['autostart', 'color', 'doc', 'editable', 'path'] })
export class LdfMeditation {
  timerChanged!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['timerChanged']);
  }
}

export declare interface LdfOption extends Components.LdfOption {}
@ProxyCmp({inputs: ['doc', 'editable', 'path'], 'methods': ['select']})
@Component({ selector: 'ldf-option', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['doc', 'editable', 'path'] })
export class LdfOption {
  ldfAddOptionToDoc!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfAddOptionToDoc']);
  }
}

export declare interface LdfPsalm extends Components.LdfPsalm {}
@ProxyCmp({inputs: ['doc', 'editable', 'path']})
@Component({ selector: 'ldf-psalm', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['doc', 'editable', 'path'] })
export class LdfPsalm {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfRefrain extends Components.LdfRefrain {}
@ProxyCmp({inputs: ['doc', 'editable', 'path']})
@Component({ selector: 'ldf-refrain', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['doc', 'editable', 'path'] })
export class LdfRefrain {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfResponsivePrayer extends Components.LdfResponsivePrayer {}
@ProxyCmp({inputs: ['doc', 'editable', 'path']})
@Component({ selector: 'ldf-responsive-prayer', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['doc', 'editable', 'path'] })
export class LdfResponsivePrayer {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfRubric extends Components.LdfRubric {}
@ProxyCmp({inputs: ['doc', 'editable', 'path']})
@Component({ selector: 'ldf-rubric', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['doc', 'editable', 'path'] })
export class LdfRubric {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfString extends Components.LdfString {}
@ProxyCmp({inputs: ['citation', 'dropcap', 'dropcapMinLength', 'index', 'replaceTetragrammaton', 'text']})
@Component({ selector: 'ldf-string', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['citation', 'dropcap', 'dropcapMinLength', 'index', 'replaceTetragrammaton', 'text'] })
export class LdfString {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface LdfText extends Components.LdfText {}
@ProxyCmp({inputs: ['doc', 'editable', 'path'], 'methods': ['getLocaleStrings']})
@Component({ selector: 'ldf-text', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['doc', 'editable', 'path'] })
export class LdfText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
