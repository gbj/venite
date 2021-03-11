import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { DailyReadingsPage } from "./daily-readings.page";

describe("DailyReadingsPage", () => {
  let component: DailyReadingsPage;
  let fixture: ComponentFixture<DailyReadingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyReadingsPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyReadingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
