import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { EditorButtonsComponent } from "./editor-buttons.component";

describe("EditorButtonsComponent", () => {
  let component: EditorButtonsComponent;
  let fixture: ComponentFixture<EditorButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorButtonsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
