import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import { DomController } from "@ionic/angular";
import { PlatformService } from "@venite/ng-platform";
import { debounceTime } from "rxjs/operators";

const TOOLBAR_HEIGHT = "56px";

/* Thanks to Josh Morony https://www.joshmorony.com/creating-a-custom-scroll-vanish-directive-with-ionic-web-components/ */
@Directive({
  selector: "[veniteScrollVanish]",
})
export class ScrollVanishDirective {
  @Input("veniteScrollVanish") scrollArea;

  private hidden: boolean = false;
  private triggerDistance: number = 20;
  private currentY: number = 0;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController,
    private platform: PlatformService
  ) {}

  ngOnInit() {
    // only hide the header in the web version
    if (!this.platform.is("capacitor") && !this.platform.is("pwa")) {
      this.initStyles();

      this.scrollArea.ionScroll
        .pipe(
          // animation time is 200ms, and scroll events fire continuously,
          // so debounce so you don't have stuttering animations while scrolling
          debounceTime(50)
        )
        .subscribe((scrollEvent) => {
          //console.log('scrollVanish', scrollEvent);
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
  }

  initStyles() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.element.nativeElement,
        "transition",
        "0.2s linear"
      );
      this.renderer.setStyle(
        this.element.nativeElement,
        "height",
        "var(--min-height)"
      );
    });
  }

  hide() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, "min-height", "0px");
      //this.renderer.setStyle(this.element.nativeElement, "height", "0px");
      this.renderer.setStyle(this.element.nativeElement, "z-index", "-100");
      this.renderer.setStyle(
        document.querySelector("venite-pray ion-content"),
        "z-index",
        10
      );
      this.renderer.setStyle(this.element.nativeElement, "opacity", "0");
      this.renderer.setStyle(this.element.nativeElement, "padding", "0");
    });

    this.hidden = true;
  }

  show() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.element.nativeElement,
        "min-height",
        "var(--min-height)"
      );
      this.renderer.setStyle(this.element.nativeElement, "z-index", "auto");
      this.renderer.setStyle(
        document.querySelector("venite-pray ion-content"),
        "z-index",
        "auto"
      );
      this.renderer.removeStyle(this.element.nativeElement, "opacity");
      this.renderer.removeStyle(this.element.nativeElement, "padding");
    });

    this.hidden = false;
  }
}
