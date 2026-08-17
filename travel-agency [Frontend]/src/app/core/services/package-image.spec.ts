import { TestBed } from '@angular/core/testing';

import { PackageImage } from './package-image';

describe('PackageImage', () => {
  let service: PackageImage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageImage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
