import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

import { HotelService } from '../../../core/services/hotel';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-hotel-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-hotel-add-details.html',
  styleUrl: './admin-hotel-add-details.css',
})
export class AdminHotelDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // ==============================
  // HOTEL
  // ==============================

  hotel: any = null;

  hotelId = 0;

  // ==============================
  // STATES
  // ==============================

  isLoading = true;

  errorMessage = '';

  // ==============================
  // IMAGE
  // ==============================

  imageBaseUrl = environment.imageUrl;

  selectedImage: string | null = null;

  // ==============================
  // INIT
  // ==============================

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.hotelId = Number(id);

    console.log('Hotel Route Id:', this.hotelId);

    if (!this.hotelId) {
      this.errorMessage = 'Invalid hotel ID.';

      this.isLoading = false;

      return;
    }

    this.loadHotel();
  }

  // ==============================
  // LOAD HOTEL
  // ==============================

  loadHotel(): void {
    this.isLoading = true;

    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (data) => {
        console.log('Hotel API Data:', data);

        this.hotel = data;

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Hotel Details Error:', error);

        this.errorMessage = 'Failed to load hotel details.';

        this.isLoading = false;

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // SELECT IMAGE
  // ==============================

  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  // ==============================
  // CLOSE IMAGE
  // ==============================

  closeImage(): void {
    this.selectedImage = null;
  }

  // ==============================
  // IMAGE URL
  // ==============================

  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return 'assets/images/hotel-placeholder.jpg';
    }

    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    return this.imageBaseUrl + imageUrl;
  }

  // ==============================
  // IMAGE ERROR
  // ==============================

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.src = 'assets/images/hotel-placeholder.jpg';
  }

  // ==============================
  // DELETE
  // ==============================

  deleteHotel(): void {
    if (!this.hotel) {
      return;
    }

    const confirmed = confirm(`Are you sure you want to delete "${this.hotel.name}"?`);

    if (!confirmed) {
      return;
    }

    this.isLoading = true;

    this.hotelService.deleteHotel(this.hotel.id).subscribe({
      next: () => {
        console.log('Hotel deleted successfully');

        this.router.navigate(['/admin/hotels']);
      },

      error: (error) => {
        console.error('Delete Hotel Error:', error);

        this.errorMessage = error?.error?.message || 'Failed to delete hotel.';

        this.isLoading = false;

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // BACK
  // ==============================

  goBack(): void {
    this.router.navigate(['/admin/hotels']);
  }
}
