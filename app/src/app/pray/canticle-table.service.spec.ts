import { TestBed } from '@angular/core/testing';

import { CanticleTableService } from './canticle-table.service';

describe('CanticleTableService', () => {
  let service: CanticleTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanticleTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
