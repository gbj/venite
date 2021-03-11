import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DraggableComponent } from "./draggable/draggable.component";
import { DroppableComponent } from "./droppable/droppable.component";

@NgModule({
  declarations: [DraggableComponent, DroppableComponent],
  imports: [CommonModule],
  exports: [DraggableComponent, DroppableComponent],
})
export class DragDropModule {}
