import { TestBed } from '@angular/core/testing';

import { AllBookingsService } from './all-bookings.service';

describe('AllBookingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllBookingsService = TestBed.get(AllBookingsService);
    expect(service).toBeTruthy();
  });
});
