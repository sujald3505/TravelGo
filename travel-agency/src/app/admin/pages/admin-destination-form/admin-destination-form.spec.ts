import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestinationForm } from './admin-destination-form';

describe('AdminDestinationForm', () => {
  let component: AdminDestinationForm;
  let fixture: ComponentFixture<AdminDestinationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDestinationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDestinationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
