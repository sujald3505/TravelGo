import { Injectable } from '@angular/core';

import { Destination } from '../models/destination.model';
import { Package } from '../models/package.model';
import { Hotel } from '../models/hotel.model';
import { CreateBooking } from '../models/create-booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {

  destination: Destination | null = null;

  package: Package | null = null;

  hotel: Hotel | null = null;

  booking: CreateBooking | null = null;

  clear(): void {

    this.destination = null;
    this.package = null;
    this.hotel = null;
    this.booking = null;

  }

}