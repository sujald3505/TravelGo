import { CommonModule } from '@angular/common';
import { Component, OnInit, inject,ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BookingService } from '../../core/services/booking';
import { Booking } from '../../core/models/booking.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookingsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private cdr = inject(ChangeDetectorRef);

  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];

  isLoading = true;

  searchText = '';
  selectedStatus = 'All';

  ngOnInit(): void {
    this.loadMyBookings();
  }

  loadMyBookings(): void {
    this.isLoading = true;

    this.bookingService.getMyBookings().subscribe({
      next: (res) => {
        console.log('My Bookings:', res);

        this.bookings = res;
        this.filteredBookings = res;

        this.isLoading = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('My Bookings Error:', err);

        this.bookings = [];
        this.filteredBookings = [];

        this.isLoading = false;
      },
    });
  }

  filterBookings(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredBookings = this.bookings.filter((booking) => {
      const matchesSearch =
        !search ||
        booking.destinationName?.toLowerCase().includes(search) ||
        booking.packageName?.toLowerCase().includes(search) ||
        booking.hotelName?.toLowerCase().includes(search) ||
        booking.id.toString().includes(search);

      const matchesStatus = this.selectedStatus === 'All' || booking.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  get totalBookings(): number {
    return this.bookings.length;
  }

  get totalAmount(): number {
    return this.bookings.reduce((total, booking) => total + booking.totalAmount, 0);
  }

  get pendingBookings(): number {
    return this.bookings.filter((booking) => booking.status === 'Pending').length;
  }

  get confirmedBookings(): number {
    return this.bookings.filter((booking) => booking.status === 'Confirmed').length;
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';

      case 'pending':
        return 'status-pending';

      case 'cancelled':
        return 'status-cancelled';

      case 'completed':
        return 'status-completed';

      default:
        return 'status-default';
    }
  }
}
