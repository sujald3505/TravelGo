import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BookingService } from '../../core/services/booking';
import { DestinationService } from '../../core/services/destination';
import { PackageService } from '../../core/services/package';
import { HotelService } from '../../core/services/hotel';

import { CreateBooking } from '../../core/models/create-booking.model';
import { Destination } from '../../core/models/destination.model';
import { Package } from '../../core/models/package.model';
import { Hotel } from '../../core/models/hotel.model';
import { BookingStateService } from '../../core/services/booking-state';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class BookingComponent implements OnInit {
  private bookingService = inject(BookingService);
  private destinationService = inject(DestinationService);
  private packageService = inject(PackageService);
  private hotelService = inject(HotelService);
  private authService = inject(AuthService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  private bookingState = inject(BookingStateService);

  destinationId = 0;
  packageId = 0;
  hotelId = 0;

  destination!: Destination;
  package!: Package;
  hotel!: Hotel;

  booking: CreateBooking = {
    userId: 0,
    destinationId: 0,
    packageId: 0,
    hotelId: 0,
    travelDate: '',
    numberOfPeople: 1,
    totalAmount: 0,
  };

  isLoading = true;

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();

    if (userId > 0) {
      this.booking.userId = userId;
    }
    this.destinationId = Number(this.route.snapshot.paramMap.get('destinationId'));

    this.packageId = Number(this.route.snapshot.paramMap.get('packageId'));

    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));

    this.booking.destinationId = this.destinationId;
    this.booking.packageId = this.packageId;
    this.booking.hotelId = this.hotelId;

    this.loadDestination();
    this.loadPackage();
    this.loadHotel();
  }

  loadDestination(): void {
    this.destinationService.getDestinationById(this.destinationId).subscribe({
      next: (res) => {
        this.destination = res;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  loadPackage(): void {
    this.packageService.getPackageById(this.packageId).subscribe({
      next: (res) => {
        this.package = res;

        this.calculateTotal();

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  loadHotel(): void {
    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (res) => {
        this.hotel = res;

        this.calculateTotal();

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);

        this.isLoading = false;
      },
    });
  }

  calculateTotal(): void {
    const packagePrice = this.package?.price ?? 0;

    const hotelPrice = this.hotel?.pricePerNight ?? 0;

    this.booking.totalAmount = (packagePrice + hotelPrice) * this.booking.numberOfPeople;
  }

  submitBooking(): void {
    this.bookingState.destination = this.destination;

    this.bookingState.package = this.package;

    this.bookingState.hotel = this.hotel;

    this.bookingState.booking = {
      ...this.booking,
    };

    this.router.navigate(['/payment']);
  }
}
