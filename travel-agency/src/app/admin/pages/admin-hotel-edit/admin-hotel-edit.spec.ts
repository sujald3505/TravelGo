import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotelEdit } from './admin-hotel-edit';

describe('AdminHotelEdit', () => {
  let component: AdminHotelEdit;
  let fixture: ComponentFixture<AdminHotelEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHotelEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHotelEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
