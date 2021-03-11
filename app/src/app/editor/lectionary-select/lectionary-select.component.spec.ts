import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { LectionarySelectComponent } from "./lectionary-select.component";

describe("LectionarySelectComponent", () => {
  let component: LectionarySelectComponent;
  let fixture: ComponentFixture<LectionarySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LectionarySelectComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LectionarySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
