import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Destination } from '../models/destination.model';
import { DestinationService } from '../services/destination';

export const destinationResolver: ResolveFn<Destination> = (route) => {

  const destinationService = inject(DestinationService);

  const id = Number(route.paramMap.get('id'));

  return destinationService.getDestinationById(id);
  

};