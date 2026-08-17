import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BookingStateService } from '../../core/services/booking-state';
import { BookingService } from '../../core/services/booking';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class PaymentComponent implements OnInit {
  private bookingState = inject(BookingStateService);
  private bookingService = inject(BookingService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  destination = this.bookingState.destination;
  package = this.bookingState.package;
  hotel = this.bookingState.hotel;
  booking = this.bookingState.booking;

  paymentMethod = 'UPI';

  isProcessing = false;

  ngOnInit(): void {
    if (!this.destination || !this.package || !this.hotel || !this.booking) {
      this.router.navigate(['/']);
      return;
    }
    this.cdr.detectChanges();
  }

  payNow(): void {
    if (!this.booking) return;

    this.isProcessing = true;

    setTimeout(() => {
      this.bookingService.createBooking(this.booking!).subscribe({
        next: (booking) => {
          console.log('POST Response:', booking);
          console.log('Returned Booking Id:', booking.id);
          this.toastr.success('Payment Successful');

          this.bookingState.clear();

          this.router.navigate(['/booking-details', booking.id]);
        },

        error: () => {
          this.isProcessing = false;

          this.toastr.error('Payment Failed');
        },
      });
    }, 2000);
  }
}
