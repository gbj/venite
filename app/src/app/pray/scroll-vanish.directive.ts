import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

const TOOLBAR_HEIGHT = "56px";

/* Thanks to Josh Morony https://www.joshmorony.com/creating-a-custom-scroll-vanish-directive-with-ionic-web-components/ */
@Directive({
  selector: '[veniteScrollVanish]'
})
export class ScrollVanishDirective {
  @Input("veniteScrollVanish") scrollArea;

  private hidden: boolean = false;
  private triggerDistance: number = 20;
  private currentY : number = 0;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController
  ) {}

  ngOnInit() {
    this.initStyles();

    this.scrollArea.ionScroll.subscribe(scrollEvent => {
      console.log(scrollEvent);
      const delta = scrollEvent.detail.deltaY;

      if (scrollEvent.detail.currentY === 0 && this.hidden) {
        this.show();
      } else if (!this.hidden && delta > this.triggerDistance) {
        this.hide();
      } else if (this.hidden && delta < -this.triggerDistance) {
        this.show();
      } else if (scrollEvent.detail.currentY < this.currentY) {
        this.show();
      }

      this.currentY = scrollEvent.detail.currentY;
    });
  }

  initStyles() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.element.nativeElement,
        "transition",
        "0.2s linear"
      );
      this.renderer.setStyle(this.element.nativeElement, "height", TOOLBAR_HEIGHT);
    });
  }

  hide() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, "min-height", "0px");
      this.renderer.setStyle(this.element.nativeElement, "height", "0px");
      this.renderer.setStyle(this.element.nativeElement, "opacity", "0");
      this.renderer.setStyle(this.element.nativeElement, "padding", "0");
    });

    this.hidden = true;
  }

  show() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, "min-height", TOOLBAR_HEIGHT);
      this.renderer.removeStyle(this.element.nativeElement, "opacity");
      this.renderer.removeStyle(this.element.nativeElement, "padding");
    });

    this.hidden = false;
  }

}
