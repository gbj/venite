import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrayPage } from './pray.page';

describe('PrayPage', () => {
  let component: PrayPage;
  let fixture: ComponentFixture<PrayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
