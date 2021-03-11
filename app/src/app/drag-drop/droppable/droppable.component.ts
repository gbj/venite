import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";

/* Adapted from Josh Morony's Stencil version
 * https://www.joshmorony.com/create-your-own-drag-and-drop-functionality-using-ionic-gestures/ */

@Component({
  selector: "venite-droppable",
  templateUrl: "./droppable.component.html",
  styleUrls: ["./droppable.component.scss"],
})
export class DroppableComponent implements OnInit {
  @ViewChild("droppable") droppable: ElementRef;
  @Output() elementDropped: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  complete(ev, data: any) {
    if (this.isInsideDroppableArea(ev.currentX, ev.currentY)) {
      this.elementDropped.emit(data);
    }
  }

  isInsideDroppableArea(x: number, y: number) {
    const droppableArea = this.droppable.nativeElement.getBoundingClientRect();
    if (x < droppableArea.left || x >= droppableArea.right) {
      return false;
    }
    if (y < droppableArea.top || y >= droppableArea.bottom) {
      return false;
    }
    return true;
  }
}
