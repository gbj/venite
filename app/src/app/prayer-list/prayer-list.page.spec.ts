import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrayerListPage } from './prayer-list.page';

describe('PrayerListPage', () => {
  let component: PrayerListPage;
  let fixture: ComponentFixture<PrayerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayerListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrayerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
