import { TestBed, async, inject } from '@angular/core/testing';

import { CustomerOrProviderGuard } from './customerOrProvider.guard';

describe('CustomerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerOrProviderGuard]
    });
  });

  it('should ...', inject([CustomerOrProviderGuard], (guard: CustomerOrProviderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
