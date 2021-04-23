import { TestBed } from '@angular/core/testing';

import { IssueManagerGuard } from './issue-manager.guard';

describe('IssueManagerGuard', () => {
  let guard: IssueManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IssueManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
