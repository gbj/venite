import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassicBulletinRedirectComponent } from './classic-bulletin-redirect.component';

describe('ClassicBulletinRedirectComponent', () => {
  let component: ClassicBulletinRedirectComponent;
  let fixture: ComponentFixture<ClassicBulletinRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicBulletinRedirectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassicBulletinRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
