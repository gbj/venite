import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SponsorComponent } from './sponsor.component';

describe('SponsorComponent', () => {
  let component: SponsorComponent;
  let fixture: ComponentFixture<SponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
