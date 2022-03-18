import { TestBed } from '@angular/core/testing';

import { PrayerListService } from './prayer-list.service';

describe('PrayerListService', () => {
  let service: PrayerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrayerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
