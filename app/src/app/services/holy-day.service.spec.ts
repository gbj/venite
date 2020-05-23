import { TestBed } from '@angular/core/testing';

import { HolyDayService } from './holy-day.service';

describe('HolyDayService', () => {
  let service: HolyDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolyDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
