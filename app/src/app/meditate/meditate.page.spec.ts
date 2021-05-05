import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeditatePage } from './meditate.page';

describe('MeditatePage', () => {
  let component: MeditatePage;
  let fixture: ComponentFixture<MeditatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeditatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
