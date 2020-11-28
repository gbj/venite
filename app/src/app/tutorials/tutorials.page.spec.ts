import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorialsPage } from './tutorials.page';

describe('TutorialsPage', () => {
  let component: TutorialsPage;
  let fixture: ComponentFixture<TutorialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
