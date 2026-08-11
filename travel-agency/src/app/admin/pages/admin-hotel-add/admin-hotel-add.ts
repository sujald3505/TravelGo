import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HotelService } from '../../../core/services/hotel';
import { DestinationService } from '../../../core/services/destination';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-hotel-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-hotel-add.html',
  styleUrl: './admin-hotel-add.css',
})
export class AdminHotelAddComponent implements OnInit {
  private hotelService = inject(HotelService);
  private destinationService = inject(DestinationService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private toastr = inject(ToastrService);

  // ==============================
  // DATA
  // ==============================

  destinations: any[] = [];

  hotelId: number | null = null;

  // ==============================
  // FORM
  // ==============================

  hotelData = {
    name: '',
    description: '',
    address: '',
    starRating: 1,
    pricePerNight: 0,
    isAvailable: true,
    destinationId: 0,
  };

  // ==============================
  // IMAGES
  // ==============================

  selectedImages: File[] = [];

  imagePreviews: string[] = [];

  imageBaseUrl = environment.imageUrl;

  // ==============================
  // STATES
  // ==============================

  isLoadingDestinations = true;

  isSubmitting = false;

  isUploadingImages = false;

  successMessage = '';

  errorMessage = '';

  // ==============================
  // INIT
  // ==============================

  ngOnInit(): void {
    this.loadDestinations();
  }

  // ==============================
  // LOAD DESTINATIONS
  // ==============================

  loadDestinations(): void {
    this.isLoadingDestinations = true;

    this.destinationService.getAllDestinations().subscribe({
      next: (data) => {
        console.log('Destinations:', data);

        this.destinations = data;

        this.isLoadingDestinations = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Destination Error:', error);

        this.errorMessage = 'Failed to load destinations.';

        this.isLoadingDestinations = false;

        this.toastr.error('Unable to load destinations. Please try again.', 'Load Failed');

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // IMAGE SELECT
  // ==============================

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const newFiles = Array.from(input.files);

    // Existing + new images
    this.selectedImages = [...this.selectedImages, ...newFiles];

    // Create previews only for new files
    newFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);

        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    });

    // Same file ફરીથી select કરી શકાય
    input.value = '';
  }

  // ==============================
  // REMOVE SELECTED IMAGE
  // ==============================

  removeSelectedImage(index: number): void {
    this.selectedImages = this.selectedImages.filter((_, i) => i !== index);

    this.imagePreviews = this.imagePreviews.filter((_, i) => i !== index);
  }

  // ==============================
  // CREATE HOTEL
  // ==============================

  createHotel(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // ==============================
    // VALIDATION
    // ==============================

    if (!this.hotelData.name.trim()) {
      this.toastr.warning('Hotel name is required.', 'Validation');

      return;
    }

    if (!this.hotelData.description.trim()) {
      this.toastr.warning('Description is required.', 'Validation');

      return;
    }

    if (!this.hotelData.address.trim()) {
      this.toastr.warning('Address is required.', 'Validation');

      return;
    }

    if (this.hotelData.destinationId === 0) {
      this.toastr.warning('Please select a destination.', 'Validation');

      return;
    }

    if (this.hotelData.starRating < 1 || this.hotelData.starRating > 5) {
      this.toastr.warning('Star rating must be between 1 and 5.', 'Validation');

      return;
    }

    if (this.hotelData.pricePerNight <= 0) {
      this.toastr.warning('Price per night must be greater than 0.', 'Validation');

      return;
    }

    // ==============================
    // START SUBMIT
    // ==============================

    this.isSubmitting = true;

    console.log('Creating Hotel:', this.hotelData);

    // ==============================
    // CREATE HOTEL API
    // ==============================

    this.hotelService.createHotel(this.hotelData).subscribe({
      next: (response) => {
        console.log('Hotel Created:', response);

        this.hotelId = response.id;

        // Upload images
        if (this.selectedImages.length > 0) {
          this.uploadHotelImages();
        } else {
          this.finishCreate();
        }
      },

      error: (error) => {
        console.error('Create Hotel Error:', error);

        this.isSubmitting = false;

        this.errorMessage = error?.error?.message || 'Failed to create hotel.';

        this.toastr.error(this.errorMessage, 'Creation Failed');

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // UPLOAD HOTEL IMAGES
  // ==============================

  uploadHotelImages(): void {
    if (!this.hotelId) {
      this.errorMessage = 'Hotel ID not found.';

      this.isSubmitting = false;

      this.toastr.error('Hotel ID was not found.', 'Upload Failed');

      return;
    }

    this.isUploadingImages = true;

    let completed = 0;

    this.selectedImages.forEach((file) => {
      this.hotelService.uploadHotelImage(file).subscribe({
        next: (uploadResponse) => {
          console.log('Image Uploaded:', uploadResponse.imageUrl);

          this.hotelService.createHotelImage(this.hotelId!, uploadResponse.imageUrl).subscribe({
            next: (savedImage) => {
              console.log('Hotel Image Saved:', savedImage);

              completed++;

              this.checkImageUploadComplete(completed);
            },

            error: (error) => {
              console.error('Save Hotel Image Error:', error);

              completed++;

              this.checkImageUploadComplete(completed);
            },
          });
        },

        error: (error) => {
          console.error('Hotel Image Upload Error:', error);

          completed++;

          this.checkImageUploadComplete(completed);
        },
      });
    });
  }

  // ==============================
  // CHECK IMAGE UPLOAD
  // ==============================

  checkImageUploadComplete(completed: number): void {
    if (completed === this.selectedImages.length) {
      this.finishCreate();
    }
  }

  // ==============================
  // FINISH
  // ==============================

  finishCreate(): void {
    this.isUploadingImages = false;

    this.isSubmitting = false;

    this.successMessage = 'Hotel created successfully.';

    this.toastr.success('Hotel created successfully.', 'Created');

    this.cdr.detectChanges();

    setTimeout(() => {
      this.router.navigate(['/admin/hotels']);
    }, 800);
  }

  // ==============================
  // CANCEL
  // ==============================

  cancel(): void {
    this.router.navigate(['/admin/hotels']);
  }
}
