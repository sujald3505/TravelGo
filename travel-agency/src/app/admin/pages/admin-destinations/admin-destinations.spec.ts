import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestinations } from './admin-destinations';

describe('AdminDestinations', () => {
  let component: AdminDestinations;
  let fixture: ComponentFixture<AdminDestinations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDestinations],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDestinations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
