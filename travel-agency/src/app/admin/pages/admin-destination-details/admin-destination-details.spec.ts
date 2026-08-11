import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestinationDetails } from './admin-destination-details';

describe('AdminDestinationDetails', () => {
  let component: AdminDestinationDetails;
  let fixture: ComponentFixture<AdminDestinationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDestinationDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDestinationDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
