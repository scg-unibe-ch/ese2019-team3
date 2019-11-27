import { TestBed, async, inject } from '@angular/core/testing';

import { UserGroupGuard } from './user-group.guard';

describe('RoleGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGroupGuard]
    });
  });

  it('should ...', inject([UserGroupGuard], (guard: UserGroupGuard) => {
    expect(guard).toBeTruthy();
  }));
});
