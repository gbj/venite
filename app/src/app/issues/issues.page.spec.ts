import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IssuesPage } from './issues.page';

describe('IssuesPage', () => {
  let component: IssuesPage;
  let fixture: ComponentFixture<IssuesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
