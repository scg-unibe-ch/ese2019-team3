import { TestBed, async, inject } from '@angular/core/testing';

import { ProviderGuard } from './provider.guard';

describe('RoleGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderGuard]
    });
  });

  it('should ...', inject([ProviderGuard], (guard: ProviderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
