import { TestBed } from '@angular/core/testing';

import { UserloggedGuard } from './userlogged.guard';

describe('UserloggedGuard', () => {
  let guard: UserloggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserloggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
