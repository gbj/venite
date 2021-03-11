import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { DroppableComponent } from "./droppable.component";

describe("DroppableComponent", () => {
  let component: DroppableComponent;
  let fixture: ComponentFixture<DroppableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DroppableComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DroppableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
