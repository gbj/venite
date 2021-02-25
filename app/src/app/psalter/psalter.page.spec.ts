import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PsalterPage } from './psalter.page';

describe('PsalterPage', () => {
  let component: PsalterPage;
  let fixture: ComponentFixture<PsalterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsalterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PsalterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
