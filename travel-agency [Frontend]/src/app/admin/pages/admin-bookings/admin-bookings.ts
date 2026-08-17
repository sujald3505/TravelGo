import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { BookingService } from '../../../core/services/booking';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css',
})
export class AdminBookingsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // ==============================
  // BOOKINGS
  // ==============================

  bookings: any[] = [];

  filteredBookings: any[] = [];

  // ==============================
  // FILTER
  // ==============================

  searchText = '';

  selectedStatus = 'All';

  // ==============================
  // STATES
  // ==============================

  isLoading = true;

  errorMessage = '';

  successMessage = '';

  updatingBookingId: number | null = null;

  // ==============================
  // INIT
  // ==============================

  ngOnInit(): void {
    this.loadBookings();
  }

  // ==============================
  // LOAD BOOKINGS
  // ==============================

  loadBookings(): void {
    this.isLoading = true;

    this.errorMessage = '';

    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        console.log('Admin Bookings:', data);

        this.bookings = data ?? [];

        this.filteredBookings = [...this.bookings];

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Booking Load Error:', error);

        this.errorMessage = 'Failed to load bookings.';

        this.isLoading = false;

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // SEARCH
  // ==============================

  onSearch(): void {
    this.applyFilters();
  }

  // ==============================
  // STATUS FILTER
  // ==============================

  onStatusFilter(): void {
    this.applyFilters();
  }

  // ==============================
  // APPLY FILTERS
  // ==============================

  applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredBookings = this.bookings.filter((booking) => {
      const matchesSearch =
        !search ||
        String(booking.id).includes(search) ||
        (booking.userName ?? '').toLowerCase().includes(search) ||
        (booking.destinationName ?? '').toLowerCase().includes(search) ||
        (booking.packageName ?? '').toLowerCase().includes(search) ||
        (booking.hotelName ?? '').toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        this.normalizeStatus(booking.status) === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  // ==============================
  // STATUS
  // ==============================

  normalizeStatus(status: string): string {
    return (status ?? '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  // ==============================
  // STATUS OPTIONS
  // ==============================

  getStatusOptions(currentStatus: string): string[] {
    const status = this.normalizeStatus(currentStatus);

    if (status === 'Pending') {
      return ['Pending', 'Confirmed', 'Cancelled'];
    }

    if (status === 'Confirmed') {
      return ['Confirmed', 'Completed', 'Cancelled'];
    }

    if (status === 'Completed') {
      return ['Completed'];
    }

    if (status === 'Cancelled') {
      return ['Cancelled'];
    }

    return ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  }

  // ==============================
  // CHANGE STATUS
  // ==============================

  changeStatus(booking: any, event: Event): void {
    const select = event.target as HTMLSelectElement;

    const newStatus = select.value;

    const oldStatus = this.normalizeStatus(booking.status);

    if (newStatus === oldStatus) {
      return;
    }

    const confirmed = confirm(
      `Change booking #${booking.id} status from "${oldStatus}" to "${newStatus}"?`,
    );

    if (!confirmed) {
      select.value = oldStatus;

      return;
    }

    this.updateBookingStatus(booking, newStatus, oldStatus, select);
  }

  // ==============================
  // UPDATE STATUS API
  // ==============================

  updateBookingStatus(
    booking: any,
    newStatus: string,
    oldStatus: string,
    select: HTMLSelectElement,
  ): void {
    this.updatingBookingId = booking.id;

    this.errorMessage = '';

    this.successMessage = '';

    this.bookingService.updateBookingStatus(booking.id, newStatus).subscribe({
      next: (response) => {
        console.log('Booking Status Updated:', response);

        booking.status = newStatus;

        this.updatingBookingId = null;

        this.successMessage = `Booking #${booking.id} is now ${newStatus}.`;

        this.applyFilters();

        this.cdr.detectChanges();

        setTimeout(() => {
          this.successMessage = '';

          this.cdr.detectChanges();
        }, 2500);
      },

      error: (error) => {
        console.error('Status Update Error:', error);

        select.value = oldStatus;

        this.updatingBookingId = null;

        this.errorMessage = error?.error?.message || 'Failed to update booking status.';

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // STATUS CLASS
  // ==============================

  getStatusClass(status: string): string {
    switch (this.normalizeStatus(status)) {
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
  // FORMAT DATE
  // ==============================

  formatDate(date: string): string {
    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  // ==============================
  // FORMAT AMOUNT
  // ==============================

  formatAmount(amount: number): string {
    return '₹' + Number(amount ?? 0).toLocaleString('en-IN');
  }

  // ==============================
  // VIEW
  // ==============================

  viewBooking(id: number): void {
    this.router.navigate(['/admin/bookings/view', id]);
  }
}
