import { TestBed, async, inject } from '@angular/core/testing';

import { MyServicesGuard } from './myServices.guard';

describe('CustomerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyServicesGuard]
    });
  });

  it('should ...', inject([MyServicesGuard], (guard: MyServicesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
