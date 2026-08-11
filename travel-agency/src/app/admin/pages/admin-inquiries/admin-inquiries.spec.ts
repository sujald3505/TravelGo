import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInquiries } from './admin-inquiries';

describe('AdminInquiries', () => {
  let component: AdminInquiries;
  let fixture: ComponentFixture<AdminInquiries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInquiries],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminInquiries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
