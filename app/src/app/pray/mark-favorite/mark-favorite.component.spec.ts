import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { MarkFavoriteComponent } from "./mark-favorite.component";

describe("MarkFavoriteComponent", () => {
  let component: MarkFavoriteComponent;
  let fixture: ComponentFixture<MarkFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkFavoriteComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MarkFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
