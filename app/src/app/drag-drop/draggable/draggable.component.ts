import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { GestureController, Gesture } from '@ionic/angular';
import { DroppableComponent } from '../droppable/droppable.component';

/* Adapted from Josh Morony's Stencil version
 * https://www.joshmorony.com/create-your-own-drag-and-drop-functionality-using-ionic-gestures/ */

@Component({
  selector: 'venite-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
})
export class DraggableComponent implements OnInit, AfterViewInit {
  @Input() droppable : DroppableComponent;
  @Input() dropData : any;
  @ViewChild("draggable") draggable: ElementRef;

  constructor(private gestureCtrl : GestureController) { }

  ngOnInit() { }

  ngAfterViewInit() {
    const style = this.draggable.nativeElement.style;
  
    const dragGesture: Gesture = this.gestureCtrl.create({
      el: this.draggable.nativeElement,
      gestureName: "draggable",
      threshold: 0,
      onStart: () => {
        style.transition = "none";
        style.opacity = "0.7";
      },
      onMove: (ev) => {
        style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px)`;
      },
      onEnd: (ev) => {
        style.transition = ".3s ease-out";
        style.transform = `translate(0, 0)`;
        style.zIndex = "inherit";
        style.opacity = "1";
        this.droppable.complete(ev, this.dropData);
      },
    });

    dragGesture.enable();
  }

}
