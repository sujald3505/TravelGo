import { TestBed } from '@angular/core/testing';

import { MyBooking } from './my-booking';

describe('MyBooking', () => {
  let service: MyBooking;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBooking);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
