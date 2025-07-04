/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@venite/components';


export declare interface IonAccordion extends Components.IonAccordion {}
@ProxyCmp({
  inputs: ['disabled', 'readonly', 'toggleIcon', 'toggleIconSlot', 'value']
})
@Component({
  selector: 'ion-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'readonly', 'toggleIcon', 'toggleIconSlot', 'value']
})
export class IonAccordion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { AccordionGroup as IAccordionGroup } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/accordion-group/accordion-group';
export declare interface IonAccordionGroup extends Components.IonAccordionGroup {}
@ProxyCmp({
  inputs: ['animated', 'disabled', 'expand', 'multiple', 'readonly', 'value']
})
@Component({
  selector: 'ion-accordion-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'disabled', 'expand', 'multiple', 'readonly', 'value'],
  outputs: ['ionChange']
})
export class IonAccordionGroup {
  /** Emitted when the value property has changed. */
  ionChange!: IAccordionGroup['ionChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange']);
  }
}

import { ActionSheet as IActionSheet } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/action-sheet/action-sheet';
export declare interface IonActionSheet extends Components.IonActionSheet {}
@ProxyCmp({
  inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'htmlAttributes', 'keyboardClose', 'leaveAnimation', 'subHeader', 'translucent'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
})
@Component({
  selector: 'ion-action-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'htmlAttributes', 'keyboardClose', 'leaveAnimation', 'subHeader', 'translucent'],
  outputs: ['ionActionSheetDidPresent', 'ionActionSheetWillPresent', 'ionActionSheetWillDismiss', 'ionActionSheetDidDismiss']
})
export class IonActionSheet {
  /** Emitted after the alert has presented. */
  ionActionSheetDidPresent!: IActionSheet['didPresent'];
  /** Emitted before the alert has presented. */
  ionActionSheetWillPresent!: IActionSheet['willPresent'];
  /** Emitted before the alert has dismissed. */
  ionActionSheetWillDismiss!: IActionSheet['willDismiss'];
  /** Emitted after the alert has dismissed. */
  ionActionSheetDidDismiss!: IActionSheet['didDismiss'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionActionSheetDidPresent', 'ionActionSheetWillPresent', 'ionActionSheetWillDismiss', 'ionActionSheetDidDismiss']);
  }
}

import { Alert as IAlert } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/alert/alert';
export declare interface IonAlert extends Components.IonAlert {}
@ProxyCmp({
  inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'htmlAttributes', 'inputs', 'keyboardClose', 'leaveAnimation', 'message', 'subHeader', 'translucent'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
})
@Component({
  selector: 'ion-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'backdropDismiss', 'buttons', 'cssClass', 'enterAnimation', 'header', 'htmlAttributes', 'inputs', 'keyboardClose', 'leaveAnimation', 'message', 'subHeader', 'translucent'],
  outputs: ['ionAlertDidPresent', 'ionAlertWillPresent', 'ionAlertWillDismiss', 'ionAlertDidDismiss']
})
export class IonAlert {
  /** Emitted after the alert has presented. */
  ionAlertDidPresent!: IAlert['didPresent'];
  /** Emitted before the alert has presented. */
  ionAlertWillPresent!: IAlert['willPresent'];
  /** Emitted before the alert has dismissed. */
  ionAlertWillDismiss!: IAlert['willDismiss'];
  /** Emitted after the alert has dismissed. */
  ionAlertDidDismiss!: IAlert['didDismiss'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionAlertDidPresent', 'ionAlertWillPresent', 'ionAlertWillDismiss', 'ionAlertDidDismiss']);
  }
}


export declare interface IonApp extends Components.IonApp {}

@Component({
  selector: 'ion-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class IonApp {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonAvatar extends Components.IonAvatar {}

@Component({
  selector: 'ion-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class IonAvatar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonBackButton extends Components.IonBackButton {}
@ProxyCmp({
  inputs: ['color', 'defaultHref', 'disabled', 'icon', 'routerAnimation', 'text', 'type']
})
@Component({
  selector: 'ion-back-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'defaultHref', 'disabled', 'icon', 'routerAnimation', 'text', 'type']
})
export class IonBackButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Backdrop as IBackdrop } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/backdrop/backdrop';
export declare interface IonBackdrop extends Components.IonBackdrop {}
@ProxyCmp({
  inputs: ['stopPropagation', 'tappable', 'visible']
})
@Component({
  selector: 'ion-backdrop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['stopPropagation', 'tappable', 'visible'],
  outputs: ['ionBackdropTap']
})
export class IonBackdrop {
  /** Emitted when the backdrop is tapped. */
  ionBackdropTap!: IBackdrop['ionBackdropTap'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionBackdropTap']);
  }
}


export declare interface IonBadge extends Components.IonBadge {}
@ProxyCmp({
  inputs: ['color']
})
@Component({
  selector: 'ion-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color']
})
export class IonBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Breadcrumb as IBreadcrumb } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/breadcrumb/breadcrumb';
export declare interface IonBreadcrumb extends Components.IonBreadcrumb {}
@ProxyCmp({
  inputs: ['active', 'color', 'disabled', 'download', 'href', 'rel', 'routerAnimation', 'routerDirection', 'separator', 'target']
})
@Component({
  selector: 'ion-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['active', 'color', 'disabled', 'download', 'href', 'rel', 'routerAnimation', 'routerDirection', 'separator', 'target'],
  outputs: ['ionFocus', 'ionBlur']
})
export class IonBreadcrumb {
  /** Emitted when the breadcrumb has focus. */
  ionFocus!: IBreadcrumb['ionFocus'];
  /** Emitted when the breadcrumb loses focus. */
  ionBlur!: IBreadcrumb['ionBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
  }
}

import { Breadcrumbs as IBreadcrumbs } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/breadcrumbs/breadcrumbs';
export declare interface IonBreadcrumbs extends Components.IonBreadcrumbs {}
@ProxyCmp({
  inputs: ['color', 'itemsAfterCollapse', 'itemsBeforeCollapse', 'maxItems']
})
@Component({
  selector: 'ion-breadcrumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'itemsAfterCollapse', 'itemsBeforeCollapse', 'maxItems'],
  outputs: ['ionCollapsedClick']
})
export class IonBreadcrumbs {
  /** Emitted when the collapsed indicator is clicked on. */
  ionCollapsedClick!: IBreadcrumbs['ionCollapsedClick'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionCollapsedClick']);
  }
}

import { Button as IButton } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/button/button';
export declare interface IonButton extends Components.IonButton {}
@ProxyCmp({
  inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'rel', 'routerAnimation', 'routerDirection', 'shape', 'size', 'strong', 'target', 'type']
})
@Component({
  selector: 'ion-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'rel', 'routerAnimation', 'routerDirection', 'shape', 'size', 'strong', 'target', 'type'],
  outputs: ['ionFocus', 'ionBlur']
})
export class IonButton {
  /** Emitted when the button has focus. */
  ionFocus!: IButton['ionFocus'];
  /** Emitted when the button loses focus. */
  ionBlur!: IButton['ionBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
  }
}


export declare interface IonButtons extends Components.IonButtons {}
@ProxyCmp({
  inputs: ['collapse']
})
@Component({
  selector: 'ion-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['collapse']
})
export class IonButtons {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonCard extends Components.IonCard {}
@ProxyCmp({
  inputs: ['button', 'color', 'disabled', 'download', 'href', 'rel', 'routerAnimation', 'routerDirection', 'target', 'type']
})
@Component({
  selector: 'ion-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['button', 'color', 'disabled', 'download', 'href', 'rel', 'routerAnimation', 'routerDirection', 'target', 'type']
})
export class IonCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonCardContent extends Components.IonCardContent {}

@Component({
  selector: 'ion-card-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class IonCardContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonCardHeader extends Components.IonCardHeader {}
@ProxyCmp({
  inputs: ['color', 'translucent']
})
@Component({
  selector: 'ion-card-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'translucent']
})
export class IonCardHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonCardSubtitle extends Components.IonCardSubtitle {}
@ProxyCmp({
  inputs: ['color']
})
@Component({
  selector: 'ion-card-subtitle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color']
})
export class IonCardSubtitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonCardTitle extends Components.IonCardTitle {}
@ProxyCmp({
  inputs: ['color']
})
@Component({
  selector: 'ion-card-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color']
})
export class IonCardTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Checkbox as ICheckbox } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/checkbox/checkbox';
export declare interface IonCheckbox extends Components.IonCheckbox {}
@ProxyCmp({
  inputs: ['checked', 'color', 'disabled', 'indeterminate', 'name', 'value']
})
@Component({
  selector: 'ion-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'color', 'disabled', 'indeterminate', 'name', 'value'],
  outputs: ['ionChange', 'ionFocus', 'ionBlur']
})
export class IonCheckbox {
  /** Emitted when the checked property has changed. */
  ionChange!: ICheckbox['ionChange'];
  /** Emitted when the checkbox has focus. */
  ionFocus!: ICheckbox['ionFocus'];
  /** Emitted when the checkbox loses focus. */
  ionBlur!: ICheckbox['ionBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
  }
}


export declare interface IonChip extends Components.IonChip {}
@ProxyCmp({
  inputs: ['color', 'disabled', 'outline']
})
@Component({
  selector: 'ion-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'disabled', 'outline']
})
export class IonChip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonCol extends Components.IonCol {}
@ProxyCmp({
  inputs: ['offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'pull', 'pullLg', 'pullMd', 'pullSm', 'pullXl', 'pullXs', 'push', 'pushLg', 'pushMd', 'pushSm', 'pushXl', 'pushXs', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs']
})
@Component({
  selector: 'ion-col',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['offset', 'offsetLg', 'offsetMd', 'offsetSm', 'offsetXl', 'offsetXs', 'pull', 'pullLg', 'pullMd', 'pullSm', 'pullXl', 'pullXs', 'push', 'pushLg', 'pushMd', 'pushSm', 'pushXl', 'pushXs', 'size', 'sizeLg', 'sizeMd', 'sizeSm', 'sizeXl', 'sizeXs']
})
export class IonCol {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Content as IContent } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/content/content';
export declare interface IonContent extends Components.IonContent {}
@ProxyCmp({
  inputs: ['color', 'forceOverscroll', 'fullscreen', 'scrollEvents', 'scrollX', 'scrollY'],
  methods: ['getScrollElement', 'scrollToTop', 'scrollToBottom', 'scrollByPoint', 'scrollToPoint']
})
@Component({
  selector: 'ion-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'forceOverscroll', 'fullscreen', 'scrollEvents', 'scrollX', 'scrollY'],
  outputs: ['ionScrollStart', 'ionScroll', 'ionScrollEnd']
})
export class IonContent {
  /** Emitted when the scroll has started. This event is disabled by default.
Set `scrollEvents` to `true` to enable. */
  ionScrollStart!: IContent['ionScrollStart'];
  /** Emitted while scrolling. This event is disabled by default.
Set `scrollEvents` to `true` to enable. */
  ionScroll!: IContent['ionScroll'];
  /** Emitted when the scroll has ended. This event is disabled by default.
Set `scrollEvents` to `true` to enable. */
  ionScrollEnd!: IContent['ionScrollEnd'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionScrollStart', 'ionScroll', 'ionScrollEnd']);
  }
}

import { Datetime as IDatetime } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/datetime/datetime';
export declare interface IonDatetime extends Components.IonDatetime {}
@ProxyCmp({
  inputs: ['cancelText', 'clearText', 'color', 'dayValues', 'disabled', 'doneText', 'firstDayOfWeek', 'hourCycle', 'hourValues', 'isDateEnabled', 'locale', 'max', 'min', 'minuteValues', 'monthValues', 'multiple', 'name', 'preferWheel', 'presentation', 'readonly', 'showClearButton', 'showDefaultButtons', 'showDefaultTimeLabel', 'showDefaultTitle', 'size', 'value', 'yearValues'],
  methods: ['confirm', 'reset', 'cancel']
})
@Component({
  selector: 'ion-datetime',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['cancelText', 'clearText', 'color', 'dayValues', 'disabled', 'doneText', 'firstDayOfWeek', 'hourCycle', 'hourValues', 'isDateEnabled', 'locale', 'max', 'min', 'minuteValues', 'monthValues', 'multiple', 'name', 'preferWheel', 'presentation', 'readonly', 'showClearButton', 'showDefaultButtons', 'showDefaultTimeLabel', 'showDefaultTitle', 'size', 'value', 'yearValues'],
  outputs: ['ionCancel', 'ionChange', 'ionFocus', 'ionBlur']
})
export class IonDatetime {
  /** Emitted when the datetime selection was cancelled. */
  ionCancel!: IDatetime['ionCancel'];
  /** Emitted when the value (selected date) has changed. */
  ionChange!: IDatetime['ionChange'];
  /** Emitted when the datetime has focus. */
  ionFocus!: IDatetime['ionFocus'];
  /** Emitted when the datetime loses focus. */
  ionBlur!: IDatetime['ionBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionCancel', 'ionChange', 'ionFocus', 'ionBlur']);
  }
}


export declare interface IonDatetimeButton extends Components.IonDatetimeButton {}
@ProxyCmp({
  inputs: ['color', 'datetime', 'disabled']
})
@Component({
  selector: 'ion-datetime-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'datetime', 'disabled']
})
export class IonDatetimeButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonFab extends Components.IonFab {}
@ProxyCmp({
  inputs: ['activated', 'edge', 'horizontal', 'vertical'],
  methods: ['close']
})
@Component({
  selector: 'ion-fab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['activated', 'edge', 'horizontal', 'vertical']
})
export class IonFab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { FabButton as IFabButton } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/fab-button/fab-button';
export declare interface IonFabButton extends Components.IonFabButton {}
@ProxyCmp({
  inputs: ['activated', 'closeIcon', 'color', 'disabled', 'download', 'href', 'rel', 'routerAnimation', 'routerDirection', 'show', 'size', 'target', 'translucent', 'type']
})
@Component({
  selector: 'ion-fab-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['activated', 'closeIcon', 'color', 'disabled', 'download', 'href', 'rel', 'routerAnimation', 'routerDirection', 'show', 'size', 'target', 'translucent', 'type'],
  outputs: ['ionFocus', 'ionBlur']
})
export class IonFabButton {
  /** Emitted when the button has focus. */
  ionFocus!: IFabButton['ionFocus'];
  /** Emitted when the button loses focus. */
  ionBlur!: IFabButton['ionBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
  }
}


export declare interface IonFabList extends Components.IonFabList {}
@ProxyCmp({
  inputs: ['activated', 'side']
})
@Component({
  selector: 'ion-fab-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['activated', 'side']
})
export class IonFabList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonFooter extends Components.IonFooter {}
@ProxyCmp({
  inputs: ['collapse', 'translucent']
})
@Component({
  selector: 'ion-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['collapse', 'translucent']
})
export class IonFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonGrid extends Components.IonGrid {}
@ProxyCmp({
  inputs: ['fixed']
})
@Component({
  selector: 'ion-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['fixed']
})
export class IonGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonHeader extends Components.IonHeader {}
@ProxyCmp({
  inputs: ['collapse', 'translucent']
})
@Component({
  selector: 'ion-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['collapse', 'translucent']
})
export class IonHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonIcon extends Components.IonIcon {}
@ProxyCmp({
  inputs: ['color', 'flipRtl', 'icon', 'ios', 'lazy', 'md', 'mode', 'name', 'sanitize', 'size', 'src']
})
@Component({
  selector: 'ion-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'flipRtl', 'icon', 'ios', 'lazy', 'md', 'mode', 'name', 'sanitize', 'size', 'src']
})
export class IonIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Img as IImg } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/img/img';
export declare interface IonImg extends Components.IonImg {}
@ProxyCmp({
  inputs: ['alt', 'src']
})
@Component({
  selector: 'ion-img',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['alt', 'src'],
  outputs: ['ionImgWillLoad', 'ionImgDidLoad', 'ionError']
})
export class IonImg {
  /** Emitted when the img src has been set */
  ionImgWillLoad!: IImg['ionImgWillLoad'];
  /** Emitted when the image has finished loading */
  ionImgDidLoad!: IImg['ionImgDidLoad'];
  /** Emitted when the img fails to load */
  ionError!: IImg['ionError'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionImgWillLoad', 'ionImgDidLoad', 'ionError']);
  }
}

import { InfiniteScroll as IInfiniteScroll } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/infinite-scroll/infinite-scroll';
export declare interface IonInfiniteScroll extends Components.IonInfiniteScroll {}
@ProxyCmp({
  inputs: ['disabled', 'position', 'threshold'],
  methods: ['complete']
})
@Component({
  selector: 'ion-infinite-scroll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'position', 'threshold'],
  outputs: ['ionInfinite']
})
export class IonInfiniteScroll {
  /** Emitted when the scroll reaches
the threshold distance. From within your infinite handler,
you must call the infinite scroll's `complete()` method when
your async operation has completed. */
  ionInfinite!: IInfiniteScroll['ionInfinite'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionInfinite']);
  }
}


export declare interface IonInfiniteScrollContent extends Components.IonInfiniteScrollContent {}
@ProxyCmp({
  inputs: ['loadingSpinner', 'loadingText']
})
@Component({
  selector: 'ion-infinite-scroll-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['loadingSpinner', 'loadingText']
})
export class IonInfiniteScrollContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Input as IInput } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/input/input';
export declare interface IonInput extends Components.IonInput {}
@ProxyCmp({
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  methods: ['setFocus', 'getInputElement']
})
@Component({
  selector: 'ion-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  outputs: ['ionInput', 'ionChange', 'ionBlur', 'ionFocus']
})
export class IonInput {
  /** Emitted when a keyboard input occurred. */
  ionInput!: IInput['ionInput'];
  /** Emitted when the value has changed. */
  ionChange!: IInput['ionChange'];
  /** Emitted when the input loses focus. */
  ionBlur!: IInput['ionBlur'];
  /** Emitted when the input has focus. */
  ionFocus!: IInput['ionFocus'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionBlur', 'ionFocus']);
  }
}


export declare interface IonItem extends Components.IonItem {}
@ProxyCmp({
  inputs: ['button', 'color', 'counter', 'counterFormatter', 'detail', 'detailIcon', 'disabled', 'download', 'fill', 'href', 'lines', 'rel', 'routerAnimation', 'routerDirection', 'shape', 'target', 'type']
})
@Component({
  selector: 'ion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['button', 'color', 'counter', 'counterFormatter', 'detail', 'detailIcon', 'disabled', 'download', 'fill', 'href', 'lines', 'rel', 'routerAnimation', 'routerDirection', 'shape', 'target', 'type']
})
export class IonItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonItemDivider extends Components.IonItemDivider {}
@ProxyCmp({
  inputs: ['color', 'sticky']
})
@Component({
  selector: 'ion-item-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'sticky']
})
export class IonItemDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonItemGroup extends Components.IonItemGroup {}

@Component({
  selector: 'ion-item-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class IonItemGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonItemOption extends Components.IonItemOption {}
@ProxyCmp({
  inputs: ['color', 'disabled', 'download', 'expandable', 'href', 'rel', 'target', 'type']
})
@Component({
  selector: 'ion-item-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'disabled', 'download', 'expandable', 'href', 'rel', 'target', 'type']
})
export class IonItemOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { ItemOptions as IItemOptions } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/item-options/item-options';
export declare interface IonItemOptions extends Components.IonItemOptions {}
@ProxyCmp({
  inputs: ['side']
})
@Component({
  selector: 'ion-item-options',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['side'],
  outputs: ['ionSwipe']
})
export class IonItemOptions {
  /** Emitted when the item has been fully swiped. */
  ionSwipe!: IItemOptions['ionSwipe'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionSwipe']);
  }
}

import { ItemSliding as IItemSliding } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/item-sliding/item-sliding';
export declare interface IonItemSliding extends Components.IonItemSliding {}
@ProxyCmp({
  inputs: ['disabled'],
  methods: ['getOpenAmount', 'getSlidingRatio', 'open', 'close', 'closeOpened']
})
@Component({
  selector: 'ion-item-sliding',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled'],
  outputs: ['ionDrag']
})
export class IonItemSliding {
  /** Emitted when the sliding position changes. */
  ionDrag!: IItemSliding['ionDrag'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionDrag']);
  }
}


export declare interface IonLabel extends Components.IonLabel {}
@ProxyCmp({
  inputs: ['color', 'position']
})
@Component({
  selector: 'ion-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'position']
})
export class IonLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonList extends Components.IonList {}
@ProxyCmp({
  inputs: ['inset', 'lines'],
  methods: ['closeSlidingItems']
})
@Component({
  selector: 'ion-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['inset', 'lines']
})
export class IonList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonListHeader extends Components.IonListHeader {}
@ProxyCmp({
  inputs: ['color', 'lines']
})
@Component({
  selector: 'ion-list-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'lines']
})
export class IonListHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Loading as ILoading } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/loading/loading';
export declare interface IonLoading extends Components.IonLoading {}
@ProxyCmp({
  inputs: ['animated', 'backdropDismiss', 'cssClass', 'duration', 'enterAnimation', 'htmlAttributes', 'keyboardClose', 'leaveAnimation', 'message', 'showBackdrop', 'spinner', 'translucent'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
})
@Component({
  selector: 'ion-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'backdropDismiss', 'cssClass', 'duration', 'enterAnimation', 'htmlAttributes', 'keyboardClose', 'leaveAnimation', 'message', 'showBackdrop', 'spinner', 'translucent'],
  outputs: ['ionLoadingDidPresent', 'ionLoadingWillPresent', 'ionLoadingWillDismiss', 'ionLoadingDidDismiss']
})
export class IonLoading {
  /** Emitted after the loading has presented. */
  ionLoadingDidPresent!: ILoading['didPresent'];
  /** Emitted before the loading has presented. */
  ionLoadingWillPresent!: ILoading['willPresent'];
  /** Emitted before the loading has dismissed. */
  ionLoadingWillDismiss!: ILoading['willDismiss'];
  /** Emitted after the loading has dismissed. */
  ionLoadingDidDismiss!: ILoading['didDismiss'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionLoadingDidPresent', 'ionLoadingWillPresent', 'ionLoadingWillDismiss', 'ionLoadingDidDismiss']);
  }
}

import { Menu as IMenu } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/menu/menu';
export declare interface IonMenu extends Components.IonMenu {}
@ProxyCmp({
  inputs: ['contentId', 'disabled', 'maxEdgeStart', 'menuId', 'side', 'swipeGesture', 'type'],
  methods: ['isOpen', 'isActive', 'open', 'close', 'toggle', 'setOpen']
})
@Component({
  selector: 'ion-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['contentId', 'disabled', 'maxEdgeStart', 'menuId', 'side', 'swipeGesture', 'type'],
  outputs: ['ionWillOpen', 'ionWillClose', 'ionDidOpen', 'ionDidClose']
})
export class IonMenu {
  /** Emitted when the menu is about to be opened. */
  ionWillOpen!: IMenu['ionWillOpen'];
  /** Emitted when the menu is about to be closed. */
  ionWillClose!: IMenu['ionWillClose'];
  /** Emitted when the menu is open. */
  ionDidOpen!: IMenu['ionDidOpen'];
  /** Emitted when the menu is closed. */
  ionDidClose!: IMenu['ionDidClose'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionWillOpen', 'ionWillClose', 'ionDidOpen', 'ionDidClose']);
  }
}


export declare interface IonMenuButton extends Components.IonMenuButton {}
@ProxyCmp({
  inputs: ['autoHide', 'color', 'disabled', 'menu', 'type']
})
@Component({
  selector: 'ion-menu-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['autoHide', 'color', 'disabled', 'menu', 'type']
})
export class IonMenuButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonMenuToggle extends Components.IonMenuToggle {}
@ProxyCmp({
  inputs: ['autoHide', 'menu']
})
@Component({
  selector: 'ion-menu-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['autoHide', 'menu']
})
export class IonMenuToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Modal as IModal } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/modal/modal';
export declare interface IonModal extends Components.IonModal {}
@ProxyCmp({
  inputs: ['animated', 'backdropBreakpoint', 'backdropDismiss', 'breakpoints', 'canDismiss', 'enterAnimation', 'handle', 'handleBehavior', 'htmlAttributes', 'initialBreakpoint', 'isOpen', 'keepContentsMounted', 'keyboardClose', 'leaveAnimation', 'presentingElement', 'showBackdrop', 'swipeToClose', 'trigger'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss', 'setCurrentBreakpoint', 'getCurrentBreakpoint']
})
@Component({
  selector: 'ion-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'backdropBreakpoint', 'backdropDismiss', 'breakpoints', 'canDismiss', 'enterAnimation', 'handle', 'handleBehavior', 'htmlAttributes', 'initialBreakpoint', 'isOpen', 'keepContentsMounted', 'keyboardClose', 'leaveAnimation', 'presentingElement', 'showBackdrop', 'swipeToClose', 'trigger'],
  outputs: ['ionModalDidPresent', 'ionModalWillPresent', 'ionModalWillDismiss', 'ionModalDidDismiss', 'ionBreakpointDidChange', 'didPresent', 'willPresent', 'willDismiss', 'didDismiss']
})
export class IonModal {
  /** Emitted after the modal has presented. */
  ionModalDidPresent!: IModal['didPresent'];
  /** Emitted before the modal has presented. */
  ionModalWillPresent!: IModal['willPresent'];
  /** Emitted before the modal has dismissed. */
  ionModalWillDismiss!: IModal['willDismiss'];
  /** Emitted after the modal has dismissed. */
  ionModalDidDismiss!: IModal['didDismiss'];
  /** Emitted after the modal breakpoint has changed. */
  ionBreakpointDidChange!: IModal['ionBreakpointDidChange'];
  /** Emitted after the modal has presented.
Shorthand for ionModalWillDismiss. */
  didPresent!: IModal['didPresentShorthand'];
  /** Emitted before the modal has presented.
Shorthand for ionModalWillPresent. */
  willPresent!: IModal['willPresentShorthand'];
  /** Emitted before the modal has dismissed.
Shorthand for ionModalWillDismiss. */
  willDismiss!: IModal['willDismissShorthand'];
  /** Emitted after the modal has dismissed.
Shorthand for ionModalDidDismiss. */
  didDismiss!: IModal['didDismissShorthand'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionModalDidPresent', 'ionModalWillPresent', 'ionModalWillDismiss', 'ionModalDidDismiss', 'ionBreakpointDidChange', 'didPresent', 'willPresent', 'willDismiss', 'didDismiss']);
  }
}

import { Nav as INav } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/nav/nav';
export declare interface IonNav extends Components.IonNav {}
@ProxyCmp({
  inputs: ['animated', 'animation', 'root', 'rootParams', 'swipeGesture'],
  methods: ['push', 'insert', 'insertPages', 'pop', 'popTo', 'popToRoot', 'removeIndex', 'setRoot', 'setPages', 'getActive', 'getByIndex', 'canGoBack', 'getPrevious']
})
@Component({
  selector: 'ion-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'animation', 'root', 'rootParams', 'swipeGesture'],
  outputs: ['ionNavWillChange', 'ionNavDidChange']
})
export class IonNav {
  /** Event fired when the nav will change components */
  ionNavWillChange!: INav['ionNavWillChange'];
  /** Event fired when the nav has changed components */
  ionNavDidChange!: INav['ionNavDidChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionNavWillChange', 'ionNavDidChange']);
  }
}


export declare interface IonNavLink extends Components.IonNavLink {}
@ProxyCmp({
  inputs: ['component', 'componentProps', 'routerAnimation', 'routerDirection']
})
@Component({
  selector: 'ion-nav-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['component', 'componentProps', 'routerAnimation', 'routerDirection']
})
export class IonNavLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonNote extends Components.IonNote {}
@ProxyCmp({
  inputs: ['color']
})
@Component({
  selector: 'ion-note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color']
})
export class IonNote {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Picker as IPicker } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/picker/picker';
export declare interface IonPicker extends Components.IonPicker {}
@ProxyCmp({
  inputs: ['animated', 'backdropDismiss', 'buttons', 'columns', 'cssClass', 'duration', 'enterAnimation', 'htmlAttributes', 'keyboardClose', 'leaveAnimation', 'showBackdrop'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss', 'getColumn']
})
@Component({
  selector: 'ion-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'backdropDismiss', 'buttons', 'columns', 'cssClass', 'duration', 'enterAnimation', 'htmlAttributes', 'keyboardClose', 'leaveAnimation', 'showBackdrop'],
  outputs: ['ionPickerDidPresent', 'ionPickerWillPresent', 'ionPickerWillDismiss', 'ionPickerDidDismiss']
})
export class IonPicker {
  /** Emitted after the picker has presented. */
  ionPickerDidPresent!: IPicker['didPresent'];
  /** Emitted before the picker has presented. */
  ionPickerWillPresent!: IPicker['willPresent'];
  /** Emitted before the picker has dismissed. */
  ionPickerWillDismiss!: IPicker['willDismiss'];
  /** Emitted after the picker has dismissed. */
  ionPickerDidDismiss!: IPicker['didDismiss'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionPickerDidPresent', 'ionPickerWillPresent', 'ionPickerWillDismiss', 'ionPickerDidDismiss']);
  }
}


export declare interface IonPickerColumn extends Components.IonPickerColumn {}
@ProxyCmp({
  inputs: ['col']
})
@Component({
  selector: 'ion-picker-column',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['col']
})
export class IonPickerColumn {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { PickerColumnInternal as IPickerColumnInternal } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/picker-column-internal/picker-column-internal';
export declare interface IonPickerColumnInternal extends Components.IonPickerColumnInternal {}
@ProxyCmp({
  inputs: ['color', 'items', 'value']
})
@Component({
  selector: 'ion-picker-column-internal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'items', 'value'],
  outputs: ['ionChange']
})
export class IonPickerColumnInternal {
  /** Emitted when the value has changed. */
  ionChange!: IPickerColumnInternal['ionChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange']);
  }
}

import { PickerInternal as IPickerInternal } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/picker-internal/picker-internal';
export declare interface IonPickerInternal extends Components.IonPickerInternal {}

@Component({
  selector: 'ion-picker-internal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  outputs: ['ionInputModeChange']
})
export class IonPickerInternal {
  /**  */
  ionInputModeChange!: IPickerInternal['ionInputModeChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionInputModeChange']);
  }
}

import { Popover as IPopover } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/popover/popover';
export declare interface IonPopover extends Components.IonPopover {}
@ProxyCmp({
  inputs: ['alignment', 'animated', 'arrow', 'backdropDismiss', 'component', 'componentProps', 'dismissOnSelect', 'enterAnimation', 'event', 'htmlAttributes', 'isOpen', 'keepContentsMounted', 'keyboardClose', 'leaveAnimation', 'reference', 'showBackdrop', 'side', 'size', 'translucent', 'trigger', 'triggerAction'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
})
@Component({
  selector: 'ion-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['alignment', 'animated', 'arrow', 'backdropDismiss', 'component', 'componentProps', 'dismissOnSelect', 'enterAnimation', 'event', 'htmlAttributes', 'isOpen', 'keepContentsMounted', 'keyboardClose', 'leaveAnimation', 'reference', 'showBackdrop', 'side', 'size', 'translucent', 'trigger', 'triggerAction'],
  outputs: ['ionPopoverDidPresent', 'ionPopoverWillPresent', 'ionPopoverWillDismiss', 'ionPopoverDidDismiss', 'didPresent', 'willPresent', 'willDismiss', 'didDismiss']
})
export class IonPopover {
  /** Emitted after the popover has presented. */
  ionPopoverDidPresent!: IPopover['didPresent'];
  /** Emitted before the popover has presented. */
  ionPopoverWillPresent!: IPopover['willPresent'];
  /** Emitted before the popover has dismissed. */
  ionPopoverWillDismiss!: IPopover['willDismiss'];
  /** Emitted after the popover has dismissed. */
  ionPopoverDidDismiss!: IPopover['didDismiss'];
  /** Emitted after the popover has presented.
Shorthand for ionPopoverWillDismiss. */
  didPresent!: IPopover['didPresentShorthand'];
  /** Emitted before the popover has presented.
Shorthand for ionPopoverWillPresent. */
  willPresent!: IPopover['willPresentShorthand'];
  /** Emitted before the popover has dismissed.
Shorthand for ionPopoverWillDismiss. */
  willDismiss!: IPopover['willDismissShorthand'];
  /** Emitted after the popover has dismissed.
Shorthand for ionPopoverDidDismiss. */
  didDismiss!: IPopover['didDismissShorthand'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionPopoverDidPresent', 'ionPopoverWillPresent', 'ionPopoverWillDismiss', 'ionPopoverDidDismiss', 'didPresent', 'willPresent', 'willDismiss', 'didDismiss']);
  }
}


export declare interface IonProgressBar extends Components.IonProgressBar {}
@ProxyCmp({
  inputs: ['buffer', 'color', 'reversed', 'type', 'value']
})
@Component({
  selector: 'ion-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['buffer', 'color', 'reversed', 'type', 'value']
})
export class IonProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Radio as IRadio } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/radio/radio';
export declare interface IonRadio extends Components.IonRadio {}
@ProxyCmp({
  inputs: ['color', 'disabled', 'name', 'value']
})
@Component({
  selector: 'ion-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'disabled', 'name', 'value'],
  outputs: ['ionFocus', 'ionBlur']
})
export class IonRadio {
  /** Emitted when the radio button has focus. */
  ionFocus!: IRadio['ionFocus'];
  /** Emitted when the radio button loses focus. */
  ionBlur!: IRadio['ionBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
  }
}

import { RadioGroup as IRadioGroup } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/radio-group/radio-group';
export declare interface IonRadioGroup extends Components.IonRadioGroup {}
@ProxyCmp({
  inputs: ['allowEmptySelection', 'name', 'value']
})
@Component({
  selector: 'ion-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['allowEmptySelection', 'name', 'value'],
  outputs: ['ionChange']
})
export class IonRadioGroup {
  /** Emitted when the value has changed. */
  ionChange!: IRadioGroup['ionChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange']);
  }
}

import { Range as IRange } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/range/range';
export declare interface IonRange extends Components.IonRange {}
@ProxyCmp({
  inputs: ['activeBarStart', 'color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'name', 'pin', 'pinFormatter', 'snaps', 'step', 'ticks', 'value']
})
@Component({
  selector: 'ion-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['activeBarStart', 'color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'name', 'pin', 'pinFormatter', 'snaps', 'step', 'ticks', 'value'],
  outputs: ['ionChange', 'ionFocus', 'ionBlur', 'ionKnobMoveStart', 'ionKnobMoveEnd']
})
export class IonRange {
  /** Emitted when the value property has changed. */
  ionChange!: IRange['ionChange'];
  /** Emitted when the range has focus. */
  ionFocus!: IRange['ionFocus'];
  /** Emitted when the range loses focus. */
  ionBlur!: IRange['ionBlur'];
  /** Emitted when the user starts moving the range knob, whether through
mouse drag, touch gesture, or keyboard interaction. */
  ionKnobMoveStart!: IRange['ionKnobMoveStart'];
  /** Emitted when the user finishes moving the range knob, whether through
mouse drag, touch gesture, or keyboard interaction. */
  ionKnobMoveEnd!: IRange['ionKnobMoveEnd'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur', 'ionKnobMoveStart', 'ionKnobMoveEnd']);
  }
}

import { Refresher as IRefresher } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/refresher/refresher';
export declare interface IonRefresher extends Components.IonRefresher {}
@ProxyCmp({
  inputs: ['closeDuration', 'disabled', 'pullFactor', 'pullMax', 'pullMin', 'snapbackDuration'],
  methods: ['complete', 'cancel', 'getProgress']
})
@Component({
  selector: 'ion-refresher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['closeDuration', 'disabled', 'pullFactor', 'pullMax', 'pullMin', 'snapbackDuration'],
  outputs: ['ionRefresh', 'ionPull', 'ionStart']
})
export class IonRefresher {
  /** Emitted when the user lets go of the content and has pulled down
further than the `pullMin` or pulls the content down and exceeds the pullMax.
Updates the refresher state to `refreshing`. The `complete()` method should be
called when the async operation has completed. */
  ionRefresh!: IRefresher['ionRefresh'];
  /** Emitted while the user is pulling down the content and exposing the refresher. */
  ionPull!: IRefresher['ionPull'];
  /** Emitted when the user begins to start pulling down. */
  ionStart!: IRefresher['ionStart'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionRefresh', 'ionPull', 'ionStart']);
  }
}


export declare interface IonRefresherContent extends Components.IonRefresherContent {}
@ProxyCmp({
  inputs: ['pullingIcon', 'pullingText', 'refreshingSpinner', 'refreshingText']
})
@Component({
  selector: 'ion-refresher-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['pullingIcon', 'pullingText', 'refreshingSpinner', 'refreshingText']
})
export class IonRefresherContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonReorder extends Components.IonReorder {}

@Component({
  selector: 'ion-reorder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class IonReorder {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { ReorderGroup as IReorderGroup } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/reorder-group/reorder-group';
export declare interface IonReorderGroup extends Components.IonReorderGroup {}
@ProxyCmp({
  inputs: ['disabled'],
  methods: ['complete']
})
@Component({
  selector: 'ion-reorder-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled'],
  outputs: ['ionItemReorder']
})
export class IonReorderGroup {
  /** Event that needs to be listened to in order to complete the reorder action.
Once the event has been emitted, the `complete()` method then needs
to be called in order to finalize the reorder action. */
  ionItemReorder!: IReorderGroup['ionItemReorder'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionItemReorder']);
  }
}


export declare interface IonRippleEffect extends Components.IonRippleEffect {}
@ProxyCmp({
  inputs: ['type'],
  methods: ['addRipple']
})
@Component({
  selector: 'ion-ripple-effect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['type']
})
export class IonRippleEffect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Route as IRoute } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/route/route';
export declare interface IonRoute extends Components.IonRoute {}
@ProxyCmp({
  inputs: ['beforeEnter', 'beforeLeave', 'component', 'componentProps', 'url']
})
@Component({
  selector: 'ion-route',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['beforeEnter', 'beforeLeave', 'component', 'componentProps', 'url'],
  outputs: ['ionRouteDataChanged']
})
export class IonRoute {
  /** Used internally by `ion-router` to know when this route did change. */
  ionRouteDataChanged!: IRoute['ionRouteDataChanged'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionRouteDataChanged']);
  }
}

import { RouteRedirect as IRouteRedirect } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/route-redirect/route-redirect';
export declare interface IonRouteRedirect extends Components.IonRouteRedirect {}
@ProxyCmp({
  inputs: ['from', 'to']
})
@Component({
  selector: 'ion-route-redirect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['from', 'to'],
  outputs: ['ionRouteRedirectChanged']
})
export class IonRouteRedirect {
  /** Internal event that fires when any value of this rule is added/removed from the DOM,
or any of his public properties changes.

`ion-router` captures this event in order to update his internal registry of router rules. */
  ionRouteRedirectChanged!: IRouteRedirect['ionRouteRedirectChanged'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionRouteRedirectChanged']);
  }
}

import { Router as IRouter } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/router/router';
export declare interface IonRouter extends Components.IonRouter {}
@ProxyCmp({
  inputs: ['root', 'useHash'],
  methods: ['push', 'back']
})
@Component({
  selector: 'ion-router',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['root', 'useHash'],
  outputs: ['ionRouteWillChange', 'ionRouteDidChange']
})
export class IonRouter {
  /** Event emitted when the route is about to change */
  ionRouteWillChange!: IRouter['ionRouteWillChange'];
  /** Emitted when the route had changed */
  ionRouteDidChange!: IRouter['ionRouteDidChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionRouteWillChange', 'ionRouteDidChange']);
  }
}


export declare interface IonRouterLink extends Components.IonRouterLink {}
@ProxyCmp({
  inputs: ['color', 'href', 'rel', 'routerAnimation', 'routerDirection', 'target']
})
@Component({
  selector: 'ion-router-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'href', 'rel', 'routerAnimation', 'routerDirection', 'target']
})
export class IonRouterLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonRouterOutlet extends Components.IonRouterOutlet {}
@ProxyCmp({
  inputs: ['animated', 'animation', 'mode']
})
@Component({
  selector: 'ion-router-outlet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'animation', 'mode']
})
export class IonRouterOutlet {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonRow extends Components.IonRow {}

@Component({
  selector: 'ion-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class IonRow {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Searchbar as ISearchbar } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/searchbar/searchbar';
export declare interface IonSearchbar extends Components.IonSearchbar {}
@ProxyCmp({
  inputs: ['animated', 'autocomplete', 'autocorrect', 'cancelButtonIcon', 'cancelButtonText', 'clearIcon', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'placeholder', 'searchIcon', 'showCancelButton', 'showClearButton', 'spellcheck', 'type', 'value'],
  methods: ['setFocus', 'getInputElement']
})
@Component({
  selector: 'ion-searchbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'autocomplete', 'autocorrect', 'cancelButtonIcon', 'cancelButtonText', 'clearIcon', 'color', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'placeholder', 'searchIcon', 'showCancelButton', 'showClearButton', 'spellcheck', 'type', 'value'],
  outputs: ['ionInput', 'ionChange', 'ionCancel', 'ionClear', 'ionBlur', 'ionFocus']
})
export class IonSearchbar {
  /** Emitted when a keyboard input occurred. */
  ionInput!: ISearchbar['ionInput'];
  /** Emitted when the value has changed. */
  ionChange!: ISearchbar['ionChange'];
  /** Emitted when the cancel button is clicked. */
  ionCancel!: ISearchbar['ionCancel'];
  /** Emitted when the clear input button is clicked. */
  ionClear!: ISearchbar['ionClear'];
  /** Emitted when the input loses focus. */
  ionBlur!: ISearchbar['ionBlur'];
  /** Emitted when the input has focus. */
  ionFocus!: ISearchbar['ionFocus'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionCancel', 'ionClear', 'ionBlur', 'ionFocus']);
  }
}

import { Segment as ISegment } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/segment/segment';
export declare interface IonSegment extends Components.IonSegment {}
@ProxyCmp({
  inputs: ['color', 'disabled', 'scrollable', 'selectOnFocus', 'swipeGesture', 'value']
})
@Component({
  selector: 'ion-segment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'disabled', 'scrollable', 'selectOnFocus', 'swipeGesture', 'value'],
  outputs: ['ionChange']
})
export class IonSegment {
  /** Emitted when the value property has changed and any
dragging pointer has been released from `ion-segment`. */
  ionChange!: ISegment['ionChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange']);
  }
}


export declare interface IonSegmentButton extends Components.IonSegmentButton {}
@ProxyCmp({
  inputs: ['disabled', 'layout', 'type', 'value']
})
@Component({
  selector: 'ion-segment-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'layout', 'type', 'value']
})
export class IonSegmentButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Select as ISelect } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/select/select';
export declare interface IonSelect extends Components.IonSelect {}
@ProxyCmp({
  inputs: ['cancelText', 'compareWith', 'disabled', 'interface', 'interfaceOptions', 'multiple', 'name', 'okText', 'placeholder', 'selectedText', 'value'],
  methods: ['open']
})
@Component({
  selector: 'ion-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['cancelText', 'compareWith', 'disabled', 'interface', 'interfaceOptions', 'multiple', 'name', 'okText', 'placeholder', 'selectedText', 'value'],
  outputs: ['ionChange', 'ionCancel', 'ionDismiss', 'ionFocus', 'ionBlur']
})
export class IonSelect {
  /** Emitted when the value has changed. */
  ionChange!: ISelect['ionChange'];
  /** Emitted when the selection is cancelled. */
  ionCancel!: ISelect['ionCancel'];
  /** Emitted when the overlay is dismissed. */
  ionDismiss!: ISelect['ionDismiss'];
  /** Emitted when the select has focus. */
  ionFocus!: ISelect['ionFocus'];
  /** Emitted when the select loses focus. */
  ionBlur!: ISelect['ionBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionCancel', 'ionDismiss', 'ionFocus', 'ionBlur']);
  }
}


export declare interface IonSelectOption extends Components.IonSelectOption {}
@ProxyCmp({
  inputs: ['disabled', 'value']
})
@Component({
  selector: 'ion-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'value']
})
export class IonSelectOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonSelectPopover extends Components.IonSelectPopover {}
@ProxyCmp({
  inputs: ['header', 'message', 'multiple', 'options', 'subHeader']
})
@Component({
  selector: 'ion-select-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['header', 'message', 'multiple', 'options', 'subHeader']
})
export class IonSelectPopover {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonSkeletonText extends Components.IonSkeletonText {}
@ProxyCmp({
  inputs: ['animated']
})
@Component({
  selector: 'ion-skeleton-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated']
})
export class IonSkeletonText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonSlide extends Components.IonSlide {}

@Component({
  selector: 'ion-slide',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class IonSlide {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Slides as ISlides } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/slides/slides';
export declare interface IonSlides extends Components.IonSlides {}
@ProxyCmp({
  inputs: ['options', 'pager', 'scrollbar'],
  methods: ['update', 'updateAutoHeight', 'slideTo', 'slideNext', 'slidePrev', 'getActiveIndex', 'getPreviousIndex', 'length', 'isEnd', 'isBeginning', 'startAutoplay', 'stopAutoplay', 'lockSwipeToNext', 'lockSwipeToPrev', 'lockSwipes', 'getSwiper']
})
@Component({
  selector: 'ion-slides',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['options', 'pager', 'scrollbar'],
  outputs: ['ionSlidesDidLoad', 'ionSlideTap', 'ionSlideDoubleTap', 'ionSlideWillChange', 'ionSlideDidChange', 'ionSlideNextStart', 'ionSlidePrevStart', 'ionSlideNextEnd', 'ionSlidePrevEnd', 'ionSlideTransitionStart', 'ionSlideTransitionEnd', 'ionSlideDrag', 'ionSlideReachStart', 'ionSlideReachEnd', 'ionSlideTouchStart', 'ionSlideTouchEnd']
})
export class IonSlides {
  /** Emitted after Swiper initialization */
  ionSlidesDidLoad!: ISlides['ionSlidesDidLoad'];
  /** Emitted when the user taps/clicks on the slide's container. */
  ionSlideTap!: ISlides['ionSlideTap'];
  /** Emitted when the user double taps on the slide's container. */
  ionSlideDoubleTap!: ISlides['ionSlideDoubleTap'];
  /** Emitted before the active slide has changed. */
  ionSlideWillChange!: ISlides['ionSlideWillChange'];
  /** Emitted after the active slide has changed. */
  ionSlideDidChange!: ISlides['ionSlideDidChange'];
  /** Emitted when the next slide has started. */
  ionSlideNextStart!: ISlides['ionSlideNextStart'];
  /** Emitted when the previous slide has started. */
  ionSlidePrevStart!: ISlides['ionSlidePrevStart'];
  /** Emitted when the next slide has ended. */
  ionSlideNextEnd!: ISlides['ionSlideNextEnd'];
  /** Emitted when the previous slide has ended. */
  ionSlidePrevEnd!: ISlides['ionSlidePrevEnd'];
  /** Emitted when the slide transition has started. */
  ionSlideTransitionStart!: ISlides['ionSlideTransitionStart'];
  /** Emitted when the slide transition has ended. */
  ionSlideTransitionEnd!: ISlides['ionSlideTransitionEnd'];
  /** Emitted when the slider is actively being moved. */
  ionSlideDrag!: ISlides['ionSlideDrag'];
  /** Emitted when the slider is at its initial position. */
  ionSlideReachStart!: ISlides['ionSlideReachStart'];
  /** Emitted when the slider is at the last slide. */
  ionSlideReachEnd!: ISlides['ionSlideReachEnd'];
  /** Emitted when the user first touches the slider. */
  ionSlideTouchStart!: ISlides['ionSlideTouchStart'];
  /** Emitted when the user releases the touch. */
  ionSlideTouchEnd!: ISlides['ionSlideTouchEnd'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionSlidesDidLoad', 'ionSlideTap', 'ionSlideDoubleTap', 'ionSlideWillChange', 'ionSlideDidChange', 'ionSlideNextStart', 'ionSlidePrevStart', 'ionSlideNextEnd', 'ionSlidePrevEnd', 'ionSlideTransitionStart', 'ionSlideTransitionEnd', 'ionSlideDrag', 'ionSlideReachStart', 'ionSlideReachEnd', 'ionSlideTouchStart', 'ionSlideTouchEnd']);
  }
}


export declare interface IonSpinner extends Components.IonSpinner {}
@ProxyCmp({
  inputs: ['color', 'duration', 'name', 'paused']
})
@Component({
  selector: 'ion-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'duration', 'name', 'paused']
})
export class IonSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { SplitPane as ISplitPane } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/split-pane/split-pane';
export declare interface IonSplitPane extends Components.IonSplitPane {}
@ProxyCmp({
  inputs: ['contentId', 'disabled', 'when']
})
@Component({
  selector: 'ion-split-pane',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['contentId', 'disabled', 'when'],
  outputs: ['ionSplitPaneVisible']
})
export class IonSplitPane {
  /** Expression to be called when the split-pane visibility has changed */
  ionSplitPaneVisible!: ISplitPane['ionSplitPaneVisible'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionSplitPaneVisible']);
  }
}


export declare interface IonTab extends Components.IonTab {}
@ProxyCmp({
  inputs: ['component', 'tab'],
  methods: ['setActive']
})
@Component({
  selector: 'ion-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['component', 'tab']
})
export class IonTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonTabBar extends Components.IonTabBar {}
@ProxyCmp({
  inputs: ['color', 'selectedTab', 'translucent']
})
@Component({
  selector: 'ion-tab-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'selectedTab', 'translucent']
})
export class IonTabBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonTabButton extends Components.IonTabButton {}
@ProxyCmp({
  inputs: ['disabled', 'download', 'href', 'layout', 'rel', 'selected', 'tab', 'target']
})
@Component({
  selector: 'ion-tab-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'download', 'href', 'layout', 'rel', 'selected', 'tab', 'target']
})
export class IonTabButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Tabs as ITabs } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/tabs/tabs';
export declare interface IonTabs extends Components.IonTabs {}
@ProxyCmp({
  methods: ['select', 'getTab', 'getSelected']
})
@Component({
  selector: 'ion-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  outputs: ['ionTabsWillChange', 'ionTabsDidChange']
})
export class IonTabs {
  /** Emitted when the navigation is about to transition to a new component. */
  ionTabsWillChange!: ITabs['ionTabsWillChange'];
  /** Emitted when the navigation has finished transitioning to a new component. */
  ionTabsDidChange!: ITabs['ionTabsDidChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionTabsWillChange', 'ionTabsDidChange']);
  }
}


export declare interface IonText extends Components.IonText {}
@ProxyCmp({
  inputs: ['color']
})
@Component({
  selector: 'ion-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color']
})
export class IonText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Textarea as ITextarea } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/textarea/textarea';
export declare interface IonTextarea extends Components.IonTextarea {}
@ProxyCmp({
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'color', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'spellcheck', 'value', 'wrap'],
  methods: ['setFocus', 'getInputElement']
})
@Component({
  selector: 'ion-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'clearOnEdit', 'color', 'cols', 'debounce', 'disabled', 'enterkeyhint', 'inputmode', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly', 'required', 'rows', 'spellcheck', 'value', 'wrap'],
  outputs: ['ionChange', 'ionInput', 'ionBlur', 'ionFocus']
})
export class IonTextarea {
  /** Emitted when the input value has changed. */
  ionChange!: ITextarea['ionChange'];
  /** Emitted when a keyboard input occurred. */
  ionInput!: ITextarea['ionInput'];
  /** Emitted when the input loses focus. */
  ionBlur!: ITextarea['ionBlur'];
  /** Emitted when the input has focus. */
  ionFocus!: ITextarea['ionFocus'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionInput', 'ionBlur', 'ionFocus']);
  }
}


export declare interface IonThumbnail extends Components.IonThumbnail {}

@Component({
  selector: 'ion-thumbnail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class IonThumbnail {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonTitle extends Components.IonTitle {}
@ProxyCmp({
  inputs: ['color', 'size']
})
@Component({
  selector: 'ion-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'size']
})
export class IonTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { Toast as IToast } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/toast/toast';
export declare interface IonToast extends Components.IonToast {}
@ProxyCmp({
  inputs: ['animated', 'buttons', 'color', 'cssClass', 'duration', 'enterAnimation', 'header', 'htmlAttributes', 'icon', 'keyboardClose', 'leaveAnimation', 'message', 'position', 'translucent'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
})
@Component({
  selector: 'ion-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'buttons', 'color', 'cssClass', 'duration', 'enterAnimation', 'header', 'htmlAttributes', 'icon', 'keyboardClose', 'leaveAnimation', 'message', 'position', 'translucent'],
  outputs: ['ionToastDidPresent', 'ionToastWillPresent', 'ionToastWillDismiss', 'ionToastDidDismiss']
})
export class IonToast {
  /** Emitted after the toast has presented. */
  ionToastDidPresent!: IToast['didPresent'];
  /** Emitted before the toast has presented. */
  ionToastWillPresent!: IToast['willPresent'];
  /** Emitted before the toast has dismissed. */
  ionToastWillDismiss!: IToast['willDismiss'];
  /** Emitted after the toast has dismissed. */
  ionToastDidDismiss!: IToast['didDismiss'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionToastDidPresent', 'ionToastWillPresent', 'ionToastWillDismiss', 'ionToastDidDismiss']);
  }
}

import { Toggle as IToggle } from '@venite/components/Users/gjohnston/Documents/venite/components/node_modules/@ionic/core/dist/collection/components/toggle/toggle';
export declare interface IonToggle extends Components.IonToggle {}
@ProxyCmp({
  inputs: ['checked', 'color', 'disabled', 'enableOnOffLabels', 'name', 'value']
})
@Component({
  selector: 'ion-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'color', 'disabled', 'enableOnOffLabels', 'name', 'value'],
  outputs: ['ionChange', 'ionFocus', 'ionBlur']
})
export class IonToggle {
  /** Emitted when the value property has changed. */
  ionChange!: IToggle['ionChange'];
  /** Emitted when the toggle has focus. */
  ionFocus!: IToggle['ionFocus'];
  /** Emitted when the toggle loses focus. */
  ionBlur!: IToggle['ionBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
  }
}


export declare interface IonToolbar extends Components.IonToolbar {}
@ProxyCmp({
  inputs: ['color']
})
@Component({
  selector: 'ion-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color']
})
export class IonToolbar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface IonVirtualScroll extends Components.IonVirtualScroll {}
@ProxyCmp({
  inputs: ['approxFooterHeight', 'approxHeaderHeight', 'approxItemHeight', 'footerFn', 'footerHeight', 'headerFn', 'headerHeight', 'itemHeight', 'items', 'nodeRender', 'renderFooter', 'renderHeader', 'renderItem'],
  methods: ['positionForItem', 'checkRange', 'checkEnd']
})
@Component({
  selector: 'ion-virtual-scroll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['approxFooterHeight', 'approxHeaderHeight', 'approxItemHeight', 'footerFn', 'footerHeight', 'headerFn', 'headerHeight', 'itemHeight', 'items', 'nodeRender', 'renderFooter', 'renderHeader', 'renderItem']
})
export class IonVirtualScroll {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { BibleReadingComponent as IBibleReadingComponent } from '@venite/components/dist/types/components/bible-reading/bible-reading';
export declare interface LdfBibleReading extends Components.LdfBibleReading {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path'],
  methods: ['changeReading']
})
@Component({
  selector: 'ldf-bible-reading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path'],
  outputs: ['ldfDocShouldChange']
})
export class LdfBibleReading {
  /**  */
  ldfDocShouldChange!: IBibleReadingComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}


export declare interface LdfDayName extends Components.LdfDayName {}
@ProxyCmp({
  inputs: ['day']
})
@Component({
  selector: 'ldf-day-name',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['day']
})
export class LdfDayName {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { EditableAddBlockComponent as IEditableAddBlockComponent } from '@venite/components/dist/types/components/editable-add-block/editable-add-block';
export declare interface LdfEditableAddBlock extends Components.LdfEditableAddBlock {}
@ProxyCmp({
  inputs: ['base', 'index', 'visible']
})
@Component({
  selector: 'ldf-editable-add-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['base', 'index', 'visible'],
  outputs: ['ldfDocShouldChange', 'ldfDocShouldAdd']
})
export class LdfEditableAddBlock {
  /**  */
  ldfDocShouldChange!: IEditableAddBlockComponent['ldfDocShouldChange'];
  /** Gives a path to the point in the document at which a new LiturgicalDocument should be added */
  ldfDocShouldAdd!: IEditableAddBlockComponent['ldfDocShouldAdd'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange', 'ldfDocShouldAdd']);
  }
}

import { EditableAddBlockMenuComponent as IEditableAddBlockMenuComponent } from '@venite/components/dist/types/components/editable-add-block-menu/editable-add-block-menu';
export declare interface LdfEditableAddBlockMenu extends Components.LdfEditableAddBlockMenu {}

@Component({
  selector: 'ldf-editable-add-block-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  outputs: ['ldfShouldAddBlock']
})
export class LdfEditableAddBlockMenu {
  /**  */
  ldfShouldAddBlock!: IEditableAddBlockMenuComponent['ldfShouldAddBlock'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfShouldAddBlock']);
  }
}

import { EditableAntiphonFieldComponent as IEditableAntiphonFieldComponent } from '@venite/components/dist/types/components/editable-antiphon-field/editable-antiphon-field';
export declare interface LdfEditableAntiphonField extends Components.LdfEditableAntiphonField {}
@ProxyCmp({
  inputs: ['antiphon', 'insert_antiphon', 'omit_antiphon', 'path']
})
@Component({
  selector: 'ldf-editable-antiphon-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['antiphon', 'insert_antiphon', 'omit_antiphon', 'path'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditableAntiphonField {
  /**  */
  ldfDocShouldChange!: IEditableAntiphonFieldComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditableBooleanComponent as IEditableBooleanComponent } from '@venite/components/dist/types/components/editable-boolean/editable-boolean';
export declare interface LdfEditableBoolean extends Components.LdfEditableBoolean {}
@ProxyCmp({
  inputs: ['path', 'property', 'value']
})
@Component({
  selector: 'ldf-editable-boolean',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['path', 'property', 'value'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditableBoolean {
  /**  */
  ldfDocShouldChange!: IEditableBooleanComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditableConditionComponent as IEditableConditionComponent } from '@venite/components/dist/types/components/editable-condition/editable-condition';
export declare interface LdfEditableCondition extends Components.LdfEditableCondition {}
@ProxyCmp({
  inputs: ['modal', 'obj', 'path']
})
@Component({
  selector: 'ldf-editable-condition',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['modal', 'obj', 'path'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditableCondition {
  /**  */
  ldfDocShouldChange!: IEditableConditionComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditableConditionComponent as IEditableConditionComponent } from '@venite/components/dist/types/components/editable-condition-piece/editable-condition-piece';
export declare interface LdfEditableConditionPiece extends Components.LdfEditableConditionPiece {}
@ProxyCmp({
  inputs: ['condition', 'path']
})
@Component({
  selector: 'ldf-editable-condition-piece',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['condition', 'path'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditableConditionPiece {
  /**  */
  ldfDocShouldChange!: IEditableConditionComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditableDeleteComponent as IEditableDeleteComponent } from '@venite/components/dist/types/components/editable-delete/editable-delete';
export declare interface LdfEditableDelete extends Components.LdfEditableDelete {}
@ProxyCmp({
  inputs: ['base', 'index', 'obj', 'type']
})
@Component({
  selector: 'ldf-editable-delete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['base', 'index', 'obj', 'type'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditableDelete {
  /**  */
  ldfDocShouldChange!: IEditableDeleteComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditableFilterDocumentsComponent as IEditableFilterDocumentsComponent } from '@venite/components/dist/types/components/editable-filter-documents/editable-filter-documents';
export declare interface LdfEditableFilterDocuments extends Components.LdfEditableFilterDocuments {}
@ProxyCmp({
  inputs: ['changeCallback', 'modal', 'options', 'type', 'versions'],
  methods: ['setVersions', 'setVersion', 'setOptions']
})
@Component({
  selector: 'ldf-editable-filter-documents',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['changeCallback', 'modal', 'options', 'type', 'versions'],
  outputs: ['ldfDocumentSelected']
})
export class LdfEditableFilterDocuments {
  /**  */
  ldfDocumentSelected!: IEditableFilterDocumentsComponent['ldfDocumentSelected'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocumentSelected']);
  }
}

import { EditableLookupComponent as IEditableLookupComponent } from '@venite/components/dist/types/components/editable-lookup/editable-lookup';
export declare interface LdfEditableLookup extends Components.LdfEditableLookup {}
@ProxyCmp({
  inputs: ['lookup', 'path', 'types']
})
@Component({
  selector: 'ldf-editable-lookup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['lookup', 'path', 'types'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditableLookup {
  /**  */
  ldfDocShouldChange!: IEditableLookupComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditableMetadataComponent as IEditableMetadataComponent } from '@venite/components/dist/types/components/editable-metadata/editable-metadata';
export declare interface LdfEditableMetadata extends Components.LdfEditableMetadata {}
@ProxyCmp({
  inputs: ['collapsed', 'doc', 'modal', 'path', 'visible']
})
@Component({
  selector: 'ldf-editable-metadata',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['collapsed', 'doc', 'modal', 'path', 'visible'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditableMetadata {
  /**  */
  ldfDocShouldChange!: IEditableMetadataComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditableMetadataButtonsComponent as IEditableMetadataButtonsComponent } from '@venite/components/dist/types/components/editable-metadata-buttons/editable-metadata-buttons';
export declare interface LdfEditableMetadataButtons extends Components.LdfEditableMetadataButtons {}
@ProxyCmp({
  inputs: ['base', 'index', 'obj', 'parentType', 'preview', 'visible']
})
@Component({
  selector: 'ldf-editable-metadata-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['base', 'index', 'obj', 'parentType', 'preview', 'visible'],
  outputs: ['ldfAddOptionToDoc', 'ldfTogglePreview', 'ldfDocShouldMove', 'ldfDocShouldChange']
})
export class LdfEditableMetadataButtons {
  /**  */
  ldfAddOptionToDoc!: IEditableMetadataButtonsComponent['ldfAddOptionToDoc'];
  /**  */
  ldfTogglePreview!: IEditableMetadataButtonsComponent['ldfTogglePreview'];
  /**  */
  ldfDocShouldMove!: IEditableMetadataButtonsComponent['ldfDocShouldMove'];
  /**  */
  ldfDocShouldChange!: IEditableMetadataButtonsComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfAddOptionToDoc', 'ldfTogglePreview', 'ldfDocShouldMove', 'ldfDocShouldChange']);
  }
}

import { EditableMetadataMetadataFieldsComponent as IEditableMetadataMetadataFieldsComponent } from '@venite/components/dist/types/components/editable-metadata-metadata-fields/editable-metadata-metadata-fields';
export declare interface LdfEditableMetadataMetadataFields extends Components.LdfEditableMetadataMetadataFields {}
@ProxyCmp({
  inputs: ['bibleReadingIntros', 'doc', 'path'],
  methods: ['setBibleReadingIntros']
})
@Component({
  selector: 'ldf-editable-metadata-metadata-fields',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['bibleReadingIntros', 'doc', 'path'],
  outputs: ['ldfDocShouldChange', 'ldfAskForBibleIntros', 'ldfShouldAddGloriaPatri']
})
export class LdfEditableMetadataMetadataFields {
  /**  */
  ldfDocShouldChange!: IEditableMetadataMetadataFieldsComponent['ldfDocShouldChange'];
  /**  */
  ldfAskForBibleIntros!: IEditableMetadataMetadataFieldsComponent['ldfAskForBibleIntros'];
  /**  */
  ldfShouldAddGloriaPatri!: IEditableMetadataMetadataFieldsComponent['ldfShouldAddGloriaPatri'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange', 'ldfAskForBibleIntros', 'ldfShouldAddGloriaPatri']);
  }
}

import { EditablePreferenceComponent as IEditablePreferenceComponent } from '@venite/components/dist/types/components/editable-preference/editable-preference';
export declare interface LdfEditablePreference extends Components.LdfEditablePreference {}
@ProxyCmp({
  inputs: ['modal', 'path', 'preference']
})
@Component({
  selector: 'ldf-editable-preference',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['modal', 'path', 'preference'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditablePreference {
  /**  */
  ldfDocShouldChange!: IEditablePreferenceComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditablePreferenceOptionComponent as IEditablePreferenceOptionComponent } from '@venite/components/dist/types/components/editable-preference-option/editable-preference-option';
export declare interface LdfEditablePreferenceOption extends Components.LdfEditablePreferenceOption {}
@ProxyCmp({
  inputs: ['option', 'path']
})
@Component({
  selector: 'ldf-editable-preference-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['option', 'path'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditablePreferenceOption {
  /**  */
  ldfDocShouldChange!: IEditablePreferenceOptionComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditablePreferencesComponent as IEditablePreferencesComponent } from '@venite/components/dist/types/components/editable-preferences/editable-preferences';
export declare interface LdfEditablePreferences extends Components.LdfEditablePreferences {}
@ProxyCmp({
  inputs: ['modal', 'obj', 'path']
})
@Component({
  selector: 'ldf-editable-preferences',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['modal', 'obj', 'path'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditablePreferences {
  /**  */
  ldfDocShouldChange!: IEditablePreferencesComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditableSelectComponent as IEditableSelectComponent } from '@venite/components/dist/types/components/editable-select/editable-select';
export declare interface LdfEditableSelect extends Components.LdfEditableSelect {}
@ProxyCmp({
  inputs: ['options', 'path', 'placeholder', 'property', 'value']
})
@Component({
  selector: 'ldf-editable-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['options', 'path', 'placeholder', 'property', 'value'],
  outputs: ['ldfChange', 'ldfDocShouldChange']
})
export class LdfEditableSelect {
  /** Optional callback when it emits a change */
  ldfChange!: IEditableSelectComponent['ldfChange'];
  /**  */
  ldfDocShouldChange!: IEditableSelectComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfChange', 'ldfDocShouldChange']);
  }
}

import { EditableStringListComponent as IEditableStringListComponent } from '@venite/components/dist/types/components/editable-string-list/editable-string-list';
export declare interface LdfEditableStringList extends Components.LdfEditableStringList {}
@ProxyCmp({
  inputs: ['path', 'property', 'value']
})
@Component({
  selector: 'ldf-editable-string-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['path', 'property', 'value'],
  outputs: ['ldfDocShouldChange']
})
export class LdfEditableStringList {
  /**  */
  ldfDocShouldChange!: IEditableStringListComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}

import { EditableTextComponent as IEditableTextComponent } from '@venite/components/dist/types/components/editable-text/editable-text';
export declare interface LdfEditableText extends Components.LdfEditableText {}
@ProxyCmp({
  inputs: ['inputType', 'path', 'placeholder', 'short', 'template', 'templateMaker', 'text', 'unit']
})
@Component({
  selector: 'ldf-editable-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['inputType', 'path', 'placeholder', 'short', 'template', 'templateMaker', 'text', 'unit'],
  outputs: ['ldfCursorMoved', 'ldfDocShouldChange', 'ldfAddChildAfter', 'ldfMergeWithPrevious']
})
export class LdfEditableText {
  /** Tells the Editor that the cursor has moved within this input */
  ldfCursorMoved!: IEditableTextComponent['ldfCursorMoved'];
  /** Tell the Editor that a change has been made to the document */
  ldfDocShouldChange!: IEditableTextComponent['ldfDocShouldChange'];
  /** Tells the Editor to add another child after this one in the document */
  ldfAddChildAfter!: IEditableTextComponent['ldfAddChildAfter'];
  /** Tells the Editor to merge this node with the previous one in the value */
  ldfMergeWithPrevious!: IEditableTextComponent['ldfMergeWithPrevious'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfCursorMoved', 'ldfDocShouldChange', 'ldfAddChildAfter', 'ldfMergeWithPrevious']);
  }
}

import { EditorComponent as IEditorComponent } from '@venite/components/dist/types/components/editor/editor';
export declare interface LdfEditor extends Components.LdfEditor {}
@ProxyCmp({
  inputs: ['cursors', 'doc', 'listUsers', 'preview', 'uid', 'users']
})
@Component({
  selector: 'ldf-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['cursors', 'doc', 'listUsers', 'preview', 'uid', 'users'],
  outputs: ['editorCursorMoved', 'editorDocShouldChange', 'editorDocShouldAdd', 'editorAskForBibleIntros', 'editorAskForCanticleOptions', 'editorAskForPrayersAndThanksgivings', 'editorShouldAddGloriaPatri']
})
export class LdfEditor {
  /** User's cursor/selection changed */
  editorCursorMoved!: IEditorComponent['editorCursorMoved'];
  /** User has edited the document */
  editorDocShouldChange!: IEditorComponent['editorDocShouldChange'];
  /** User is requesting we add a new LiturgicalDocument block at JSON pointer path `base`/`index` */
  editorDocShouldAdd!: IEditorComponent['editorDocShouldAdd'];
  /**  */
  editorAskForBibleIntros!: IEditorComponent['editorAskForBibleIntros'];
  /**  */
  editorAskForCanticleOptions!: IEditorComponent['editorAskForCanticleOptions'];
  /**  */
  editorAskForPrayersAndThanksgivings!: IEditorComponent['editorAskForPrayersAndThanksgivings'];
  /**  */
  editorShouldAddGloriaPatri!: IEditorComponent['editorShouldAddGloriaPatri'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['editorCursorMoved', 'editorDocShouldChange', 'editorDocShouldAdd', 'editorAskForBibleIntros', 'editorAskForCanticleOptions', 'editorAskForPrayersAndThanksgivings', 'editorShouldAddGloriaPatri']);
  }
}


export declare interface LdfEditorCursors extends Components.LdfEditorCursors {}
@ProxyCmp({
  inputs: ['cursors', 'parent', 'uid', 'users']
})
@Component({
  selector: 'ldf-editor-cursors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['cursors', 'parent', 'uid', 'users']
})
export class LdfEditorCursors {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface LdfHeading extends Components.LdfHeading {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path']
})
@Component({
  selector: 'ldf-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path']
})
export class LdfHeading {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { ImageComponent as IImageComponent } from '@venite/components/dist/types/components/image/image';
export declare interface LdfImage extends Components.LdfImage {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'modal', 'path']
})
@Component({
  selector: 'ldf-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'modal', 'path'],
  outputs: ['ldfDocShouldChange']
})
export class LdfImage {
  /** Tell the Editor that a change has been made to the document */
  ldfDocShouldChange!: IImageComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange']);
  }
}


export declare interface LdfLabelBar extends Components.LdfLabelBar {}
@ProxyCmp({
  inputs: ['center']
})
@Component({
  selector: 'ldf-label-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['center']
})
export class LdfLabelBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { LiturgicalDocumentComponent as ILiturgicalDocumentComponent } from '@venite/components/dist/types/components/liturgical-document/liturgical-document';
export declare interface LdfLiturgicalDocument extends Components.LdfLiturgicalDocument {}
@ProxyCmp({
  inputs: ['base', 'doc', 'editable', 'index', 'padding', 'parentType', 'path', 'preview']
})
@Component({
  selector: 'ldf-liturgical-document',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['base', 'doc', 'editable', 'index', 'padding', 'parentType', 'path', 'preview'],
  outputs: ['focusPath', 'focusObj', 'ldfSelectionChange']
})
export class LdfLiturgicalDocument {
  /**  */
  focusPath!: ILiturgicalDocumentComponent['focusPath'];
  /**  */
  focusObj!: ILiturgicalDocumentComponent['focusObj'];
  /**  */
  ldfSelectionChange!: ILiturgicalDocumentComponent['ldfSelectionChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['focusPath', 'focusObj', 'ldfSelectionChange']);
  }
}


export declare interface LdfLiturgy extends Components.LdfLiturgy {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path', 'preview']
})
@Component({
  selector: 'ldf-liturgy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path', 'preview']
})
export class LdfLiturgy {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { MeditationComponent as IMeditationComponent } from '@venite/components/dist/types/components/meditation/meditation';
export declare interface LdfMeditation extends Components.LdfMeditation {}
@ProxyCmp({
  inputs: ['autostart', 'color', 'doc', 'editable', 'path'],
  methods: ['start', 'pause', 'resume', 'rewind', 'duration', 'reset']
})
@Component({
  selector: 'ldf-meditation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['autostart', 'color', 'doc', 'editable', 'path'],
  outputs: ['timerChanged']
})
export class LdfMeditation {
  /**  */
  timerChanged!: IMeditationComponent['timerChanged'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['timerChanged']);
  }
}

import { OptionComponent as IOptionComponent } from '@venite/components/dist/types/components/option/option';
export declare interface LdfOption extends Components.LdfOption {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path', 'preview'],
  methods: ['select']
})
@Component({
  selector: 'ldf-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path', 'preview'],
  outputs: ['ldfAddOptionToDoc', 'ldfDocShouldChange', 'ldfOptionAskForStoredSelection', 'ldfOptionMakeSelection']
})
export class LdfOption {
  /**  */
  ldfAddOptionToDoc!: IOptionComponent['ldfAddOptionToDoc'];
  /**  */
  ldfDocShouldChange!: IOptionComponent['ldfDocShouldChange'];
  /**  */
  ldfOptionAskForStoredSelection!: IOptionComponent['ldfOptionAskForStoredSelection'];
  /**  */
  ldfOptionMakeSelection!: IOptionComponent['ldfOptionMakeSelection'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfAddOptionToDoc', 'ldfDocShouldChange', 'ldfOptionAskForStoredSelection', 'ldfOptionMakeSelection']);
  }
}

import { ParallelComponent as IParallelComponent } from '@venite/components/dist/types/components/parallel/parallel';
export declare interface LdfParallel extends Components.LdfParallel {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path', 'preview']
})
@Component({
  selector: 'ldf-parallel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path', 'preview'],
  outputs: ['ldfAddOptionToDoc', 'ldfDocShouldChange', 'ldfOptionAskForStoredSelection', 'ldfOptionMakeSelection']
})
export class LdfParallel {
  /**  */
  ldfAddOptionToDoc!: IParallelComponent['ldfAddOptionToDoc'];
  /**  */
  ldfDocShouldChange!: IParallelComponent['ldfDocShouldChange'];
  /**  */
  ldfOptionAskForStoredSelection!: IParallelComponent['ldfOptionAskForStoredSelection'];
  /**  */
  ldfOptionMakeSelection!: IParallelComponent['ldfOptionMakeSelection'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfAddOptionToDoc', 'ldfDocShouldChange', 'ldfOptionAskForStoredSelection', 'ldfOptionMakeSelection']);
  }
}

import { PrayersAndThanksgivingsComponent as IPrayersAndThanksgivingsComponent } from '@venite/components/dist/types/components/prayers-and-thanksgivings/prayers-and-thanksgivings';
export declare interface LdfPrayersAndThanksgivings extends Components.LdfPrayersAndThanksgivings {}
@ProxyCmp({
  inputs: ['base', 'index', 'modal', 'options', 'parent'],
  methods: ['setOptions']
})
@Component({
  selector: 'ldf-prayers-and-thanksgivings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['base', 'index', 'modal', 'options', 'parent'],
  outputs: ['ldfAskForPrayersAndThanksgivings']
})
export class LdfPrayersAndThanksgivings {
  /** Requests a list of possible Prayers and Thanksgivings */
  ldfAskForPrayersAndThanksgivings!: IPrayersAndThanksgivingsComponent['ldfAskForPrayersAndThanksgivings'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfAskForPrayersAndThanksgivings']);
  }
}

import { PsalmComponent as IPsalmComponent } from '@venite/components/dist/types/components/psalm/psalm';
export declare interface LdfPsalm extends Components.LdfPsalm {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path']
})
@Component({
  selector: 'ldf-psalm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path'],
  outputs: ['ldfAskForCanticleOptions', 'ldfDocShouldChange']
})
export class LdfPsalm {
  /**  */
  ldfAskForCanticleOptions!: IPsalmComponent['ldfAskForCanticleOptions'];
  /**  */
  ldfDocShouldChange!: IPsalmComponent['ldfDocShouldChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfAskForCanticleOptions', 'ldfDocShouldChange']);
  }
}


export declare interface LdfRefrain extends Components.LdfRefrain {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path']
})
@Component({
  selector: 'ldf-refrain',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path']
})
export class LdfRefrain {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface LdfResponsivePrayer extends Components.LdfResponsivePrayer {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path']
})
@Component({
  selector: 'ldf-responsive-prayer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path']
})
export class LdfResponsivePrayer {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface LdfRubric extends Components.LdfRubric {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path']
})
@Component({
  selector: 'ldf-rubric',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path']
})
export class LdfRubric {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import { StringComponent as IStringComponent } from '@venite/components/dist/types/components/string/string';
export declare interface LdfString extends Components.LdfString {}
@ProxyCmp({
  inputs: ['citation', 'dropcap', 'dropcapMinLength', 'fragment', 'index', 'replaceTetragrammaton', 'text']
})
@Component({
  selector: 'ldf-string',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['citation', 'dropcap', 'dropcapMinLength', 'fragment', 'index', 'replaceTetragrammaton', 'text'],
  outputs: ['ldfStringClicked']
})
export class LdfString {
  /** Emitted when text is clicked (used for Share/Favorite) */
  ldfStringClicked!: IStringComponent['ldfStringClicked'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfStringClicked']);
  }
}

import { TextComponent as ITextComponent } from '@venite/components/dist/types/components/text/text';
export declare interface LdfText extends Components.LdfText {}
@ProxyCmp({
  inputs: ['doc', 'editable', 'path'],
  methods: ['setPrayerList']
})
@Component({
  selector: 'ldf-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['doc', 'editable', 'path'],
  outputs: ['ldfDocShouldChange', 'ldfAskForPrayerList']
})
export class LdfText {
  /** Used to add Prayers and Thanksgivings */
  ldfDocShouldChange!: ITextComponent['ldfDocShouldChange'];
  /** Request prayer list for Prayers and Thanksgivings */
  ldfAskForPrayerList!: ITextComponent['ldfAskForPrayerList'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ldfDocShouldChange', 'ldfAskForPrayerList']);
  }
}
