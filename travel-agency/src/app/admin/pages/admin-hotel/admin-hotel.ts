import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { HotelService } from '../../../core/services/hotel';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-hotel',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './admin-hotel.html',
  styleUrl: './admin-hotel.css',
})
export class AdminHotelComponent implements OnInit {

  private hotelService = inject(HotelService);
  private cdr = inject(ChangeDetectorRef);
  private toastr = inject(ToastrService);

  imageBaseUrl = environment.imageUrl;

  hotels: any[] = [];

  isLoading = true;

  errorMessage = '';

  searchText = '';

  filteredHotels: any[] = [];

  // ==============================
  // INIT
  // ==============================

  ngOnInit(): void {
    this.loadHotels();
  }

  // ==============================
  // LOAD HOTELS
  // ==============================

  loadHotels(): void {

    this.isLoading = true;

    this.errorMessage = '';

    this.hotelService.getAllHotels().subscribe({

      next: (data) => {

        console.log('Admin Hotels:', data);

        this.hotels = data;

        this.filteredHotels = [...this.hotels];

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Hotel API Error:', error);

        this.errorMessage = 'Failed to load hotels.';

        this.isLoading = false;

        this.toastr.error(
          'Unable to load hotels. Please try again.',
          'Load Failed'
        );

        this.cdr.detectChanges();
      },

    });
  }

  // ==============================
  // SEARCH
  // ==============================

  searchHotels(): void {

    const search = this.searchText.trim().toLowerCase();

    if (!search) {

      this.filteredHotels = [...this.hotels];

      return;
    }

    this.filteredHotels = this.hotels.filter(
      (hotel) =>
        hotel.name?.toLowerCase().includes(search) ||
        hotel.destinationName?.toLowerCase().includes(search) ||
        hotel.address?.toLowerCase().includes(search)
    );
  }

  // ==============================
  // DELETE HOTEL
  // ==============================

  deleteHotel(hotel: any): void {

    const confirmed = confirm(
      `Are you sure you want to delete "${hotel.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.hotelService.deleteHotel(hotel.id).subscribe({

      next: () => {

        console.log('Hotel deleted:', hotel.id);

        this.hotels = this.hotels.filter(
          (item) => item.id !== hotel.id
        );

        this.filteredHotels = this.filteredHotels.filter(
          (item) => item.id !== hotel.id
        );

        this.toastr.success(
          'Hotel deleted successfully.',
          'Deleted'
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Delete Hotel Error:', error);

        this.errorMessage = 'Failed to delete hotel.';

        this.toastr.error(
          'Hotel deletion failed. Please try again.',
          'Delete Failed'
        );

        this.cdr.detectChanges();
      },

    });
  }

  // ==============================
  // IMAGE ERROR
  // ==============================

  onImageError(event: Event): void {

    const image = event.target as HTMLImageElement;

    image.src = 'assets/images/hotel-placeholder.jpg';
  }
}