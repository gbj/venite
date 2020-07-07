import { TestBed } from '@angular/core/testing';

import { PrayMenuService } from './pray-menu.service';

describe('PrayMenuService', () => {
  let service: PrayMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrayMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
