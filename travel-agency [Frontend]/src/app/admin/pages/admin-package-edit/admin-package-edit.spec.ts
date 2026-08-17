import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPackageEdit } from './admin-package-edit';

describe('AdminPackageEdit', () => {
  let component: AdminPackageEdit;
  let fixture: ComponentFixture<AdminPackageEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPackageEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPackageEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
