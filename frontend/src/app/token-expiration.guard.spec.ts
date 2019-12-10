import { TestBed, async, inject } from '@angular/core/testing';

import { TokenExpirationGuard } from './token-expiration.guard';

describe('TokenExpirationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenExpirationGuard]
    });
  });

  it('should ...', inject([TokenExpirationGuard], (guard: TokenExpirationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
