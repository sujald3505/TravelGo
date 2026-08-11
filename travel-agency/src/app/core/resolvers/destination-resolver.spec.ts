import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { destinationResolver } from './destination-resolver';

describe('destinationResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => destinationResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
