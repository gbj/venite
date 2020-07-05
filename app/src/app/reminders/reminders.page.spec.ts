import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemindersPage } from './reminders.page';

describe('RemindersPage', () => {
  let component: RemindersPage;
  let fixture: ComponentFixture<RemindersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RemindersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
