import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestinationEdit } from './admin-destination-edit';

describe('AdminDestinationEdit', () => {
  let component: AdminDestinationEdit;
  let fixture: ComponentFixture<AdminDestinationEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDestinationEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDestinationEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
