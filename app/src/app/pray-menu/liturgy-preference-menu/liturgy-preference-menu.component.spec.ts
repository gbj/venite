import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiturgyPreferenceMenuComponent } from './liturgy-preference-menu.component';

describe('LiturgyPreferenceMenuComponent', () => {
  let component: LiturgyPreferenceMenuComponent;
  let fixture: ComponentFixture<LiturgyPreferenceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiturgyPreferenceMenuComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiturgyPreferenceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
