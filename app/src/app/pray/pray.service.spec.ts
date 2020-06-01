import { TestBed } from '@angular/core/testing';

import { PrayService } from './pray.service';

describe('PrayService', () => {
  let service: PrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
