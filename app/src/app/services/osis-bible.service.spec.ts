import { TestBed } from '@angular/core/testing';

import { OsisBibleService } from './osis-bible.service';

describe('OsisBibleService', () => {
  let service: OsisBibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsisBibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
