import { TestBed } from '@angular/core/testing';

import { BookingRequestService } from './booking-request.service';

describe('BookingRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingRequestService = TestBed.get(BookingRequestService);
    expect(service).toBeTruthy();
  });
});
