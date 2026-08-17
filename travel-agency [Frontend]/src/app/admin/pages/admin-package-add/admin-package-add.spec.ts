import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPackageAdd } from './admin-package-add';

describe('AdminPackageAdd', () => {
  let component: AdminPackageAdd;
  let fixture: ComponentFixture<AdminPackageAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPackageAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPackageAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
