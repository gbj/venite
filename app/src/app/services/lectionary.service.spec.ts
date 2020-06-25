import { TestBed } from '@angular/core/testing';

import { LectionaryService } from './lectionary.service';

describe('LectionaryService', () => {
  let service: LectionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LectionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
