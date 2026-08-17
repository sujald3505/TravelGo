import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPackageDetails } from './admin-package-details';

describe('AdminPackageDetails', () => {
  let component: AdminPackageDetails;
  let fixture: ComponentFixture<AdminPackageDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPackageDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPackageDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
