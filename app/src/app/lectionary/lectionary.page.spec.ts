import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LectionaryPage } from './lectionary.page';

describe('LectionaryPage', () => {
  let component: LectionaryPage;
  let fixture: ComponentFixture<LectionaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectionaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LectionaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
