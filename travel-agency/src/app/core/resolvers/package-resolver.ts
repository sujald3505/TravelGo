import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PackageService } from '../services/package';
import { Package } from '../models/package.model';

export const packageResolver: ResolveFn<Package> = (route) => {

  const packageService = inject(PackageService);

  const id = Number(route.paramMap.get('id'));

  return packageService.getPackageById(id);
};