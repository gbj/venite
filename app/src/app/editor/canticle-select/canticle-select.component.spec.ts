import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { CanticleSelectComponent } from "./canticle-select.component";

describe("CanticleSelectComponent", () => {
  let component: CanticleSelectComponent;
  let fixture: ComponentFixture<CanticleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanticleSelectComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CanticleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
