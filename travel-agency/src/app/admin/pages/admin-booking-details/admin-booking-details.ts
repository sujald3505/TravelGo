import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingService } from '../../../core/services/booking';

@Component({
  selector: 'app-admin-booking-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin-booking-details.html',
  styleUrl: './admin-booking-details.css'
})
export class AdminBookingDetailsComponent
  implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private bookingService =
    inject(BookingService);

  private cdr =
    inject(ChangeDetectorRef);


  // ==============================
  // BOOKING
  // ==============================

  booking: any = null;

  bookingId = 0;


  // ==============================
  // STATES
  // ==============================

  isLoading = true;

  isUpdatingStatus = false;

  

  errorMessage = '';

  successMessage = '';


  // ==============================
  // INIT
  // ==============================

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    this.bookingId =
      Number(id);


    console.log(
      'Booking Route Id:',
      this.bookingId
    );


    if (!this.bookingId) {

      this.errorMessage =
        'Invalid booking ID.';

      this.isLoading = false;

      return;

    }


    this.loadBooking();

  }


  // ==============================
  // LOAD BOOKING
  // ==============================

  loadBooking(): void {

    this.isLoading = true;

    this.errorMessage = '';


    this.bookingService
      .getBookingById(this.bookingId)
      .subscribe({

        next: (data) => {

          console.log(
            'Booking Details:',
            data
          );


          this.booking = data;

          this.isLoading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Booking Details Error:',
            error
          );


          this.errorMessage =
            error?.error?.message ||
            'Failed to load booking details.';


          this.isLoading = false;

          this.cdr.detectChanges();

        }

      });

  }


  // ==============================
  // STATUS OPTIONS
  // ==============================

  getStatusOptions(): string[] {

    const status =
      this.normalizeStatus(
        this.booking?.status
      );


    if (status === 'Pending') {

      return [
        'Pending',
        'Confirmed',
        'Cancelled'
      ];

    }


    if (status === 'Confirmed') {

      return [
        'Confirmed',
        'Completed',
        'Cancelled'
      ];

    }


    if (status === 'Completed') {

      return [
        'Completed'
      ];

    }


    if (status === 'Cancelled') {

      return [
        'Cancelled'
      ];

    }


    return [
      'Pending',
      'Confirmed',
      'Completed',
      'Cancelled'
    ];

  }


  // ==============================
  // CHANGE STATUS
  // ==============================

  onStatusChange(
    event: Event
  ): void {

    const select =
      event.target as HTMLSelectElement;


    const newStatus =
      select.value;


    const oldStatus =
      this.normalizeStatus(
        this.booking?.status
      );


    if (
      !this.booking ||
      newStatus === oldStatus
    ) {

      return;

    }


    const confirmed =
      confirm(
        `Change booking #${this.booking.id} status from "${oldStatus}" to "${newStatus}"?`
      );


    if (!confirmed) {

      select.value =
        oldStatus;

      return;

    }


    this.updateStatus(
      newStatus,
      oldStatus,
      select
    );

  }


  // ==============================
  // UPDATE STATUS
  // ==============================

  updateStatus(
    newStatus: string,
    oldStatus: string,
    select: HTMLSelectElement
  ): void {

    this.isUpdatingStatus = true;

    this.errorMessage = '';

    this.successMessage = '';


    this.bookingService
      .updateBookingStatus(
        this.bookingId,
        newStatus
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Status Updated:',
            response
          );


          this.booking.status =
            newStatus;


          this.isUpdatingStatus =
            false;


          this.successMessage =
            `Booking #${this.bookingId} status changed to ${newStatus}.`;


          this.cdr.detectChanges();


          setTimeout(() => {

            this.successMessage = '';

            this.cdr.detectChanges();

          }, 2500);

        },

        error: (error) => {

          console.error(
            'Status Update Error:',
            error
          );


          select.value =
            oldStatus;


          this.isUpdatingStatus =
            false;


          this.errorMessage =
            error?.error?.message ||
            'Failed to update booking status.';


          this.cdr.detectChanges();

        }

      });

  }


  // ==============================
  // NORMALIZE STATUS
  // ==============================

  normalizeStatus(
    status: string
  ): string {

    return (
      status ?? ''
    )
      .toString()
      .trim()
      .toLowerCase()
      .replace(
        /^\w/,
        c => c.toUpperCase()
      );

  }


  // ==============================
  // STATUS CLASS
  // ==============================

  getStatusClass(
    status: string
  ): string {

    switch (
      this.normalizeStatus(status)
    ) {

      case 'Pending':
        return 'pending';

      case 'Confirmed':
        return 'confirmed';

      case 'Completed':
        return 'completed';

      case 'Cancelled':
        return 'cancelled';

      default:
        return '';

    }

  }


  // ==============================
  // DATE
  // ==============================

  formatDate(
    date: string
  ): string {

    if (!date) {

      return '-';

    }


    return new Date(date)
      .toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      );

  }


  // ==============================
  // AMOUNT
  // ==============================

  formatAmount(
    amount: number
  ): string {

    return (
      '₹' +
      Number(amount ?? 0)
        .toLocaleString('en-IN')
    );

  }


  

  // ==============================
  // BACK
  // ==============================

  goBack(): void {

    this.router.navigate([
      '/admin/bookings'
    ]);

  }

}