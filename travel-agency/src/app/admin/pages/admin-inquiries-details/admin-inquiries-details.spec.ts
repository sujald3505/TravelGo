import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInquiriesDetails } from './admin-inquiries-details';

describe('AdminInquiriesDetails', () => {
  let component: AdminInquiriesDetails;
  let fixture: ComponentFixture<AdminInquiriesDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInquiriesDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminInquiriesDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
