import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotelAddDetails } from './admin-hotel-add-details';

describe('AdminHotelAddDetails', () => {
  let component: AdminHotelAddDetails;
  let fixture: ComponentFixture<AdminHotelAddDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHotelAddDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHotelAddDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
