import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingDetails } from './admin-booking-details';

describe('AdminBookingDetails', () => {
  let component: AdminBookingDetails;
  let fixture: ComponentFixture<AdminBookingDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookingDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBookingDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
