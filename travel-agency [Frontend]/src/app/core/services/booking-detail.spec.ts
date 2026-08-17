import { TestBed } from '@angular/core/testing';

import { BookingDetail } from './booking-detail';

describe('BookingDetail', () => {
  let service: BookingDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
