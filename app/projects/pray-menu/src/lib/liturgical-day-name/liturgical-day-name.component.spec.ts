import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiturgicalDayNameComponent } from './liturgical-day-name.component';

describe('LiturgicalDayNameComponent', () => {
  let component: LiturgicalDayNameComponent;
  let fixture: ComponentFixture<LiturgicalDayNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiturgicalDayNameComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiturgicalDayNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
