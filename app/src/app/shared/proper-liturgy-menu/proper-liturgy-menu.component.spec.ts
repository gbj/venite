import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProperLiturgyMenuComponent } from './proper-liturgy-menu.component';

describe('ProperLiturgyMenuComponent', () => {
  let component: ProperLiturgyMenuComponent;
  let fixture: ComponentFixture<ProperLiturgyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProperLiturgyMenuComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProperLiturgyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
