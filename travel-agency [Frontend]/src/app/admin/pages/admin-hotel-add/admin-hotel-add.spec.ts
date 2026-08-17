import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotelAdd } from './admin-hotel-add';

describe('AdminHotelAdd', () => {
  let component: AdminHotelAdd;
  let fixture: ComponentFixture<AdminHotelAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHotelAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHotelAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
