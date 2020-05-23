import { TestBed } from '@angular/core/testing';

import { LiturgyMenuService } from './liturgy-menu.service';

describe('LiturgyMenuService', () => {
  let service: LiturgyMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiturgyMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
