import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HotelService } from '../../../core/services/hotel';
import { DestinationService } from '../../../core/services/destination';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-hotel-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-hotel-edit.html',
  styleUrl: './admin-hotel-edit.css',
})
export class AdminHotelEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);
  private destinationService = inject(DestinationService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private toastr = inject(ToastrService);

  // ==============================
  // HOTEL
  // ==============================

  hotelId = 0;

  hotel: any = null;

  destinations: any[] = [];

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
  // EXISTING IMAGES
  // ==============================

  existingImages: any[] = [];

  // ==============================
  // NEW IMAGES
  // ==============================

  selectedImages: File[] = [];

  imagePreviews: string[] = [];

  // ==============================
  // IMAGE
  // ==============================

  imageBaseUrl = environment.imageUrl;

  // ==============================
  // STATES
  // ==============================

  isLoading = true;

  isSubmitting = false;

  isUploadingImages = false;

  errorMessage = '';

  successMessage = '';

  // ==============================
  // INIT
  // ==============================

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.hotelId = Number(id);

    console.log('Hotel Edit ID:', this.hotelId);

    if (!this.hotelId) {
      this.errorMessage = 'Invalid hotel ID.';

      this.toastr.error('Invalid hotel ID.', 'Error');

      this.isLoading = false;

      return;
    }

    this.loadDestinations();

    this.loadHotel();
  }

  // ==============================
  // LOAD DESTINATIONS
  // ==============================

  loadDestinations(): void {
    this.destinationService.getAllDestinations().subscribe({
      next: (data) => {
        console.log('Destinations:', data);

        this.destinations = data;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Destination Error:', error);

        this.toastr.error('Failed to load destinations.', 'Load Failed');
      },
    });
  }

  // ==============================
  // LOAD HOTEL
  // ==============================

  loadHotel(): void {
    this.isLoading = true;

    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (data) => {
        console.log('Hotel Data:', data);

        this.hotel = data;

        this.hotelData = {
          name: data.name ?? '',

          description: data.description ?? '',

          address: data.address ?? '',

          starRating: data.starRating ?? 1,

          pricePerNight: data.pricePerNight ?? 0,

          isAvailable: data.isAvailable ?? true,

          destinationId: data.destinationId ?? 0,
        };

        this.existingImages = data.hotelImages ?? [];

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Hotel Load Error:', error);

        this.errorMessage = 'Failed to load hotel.';

        this.toastr.error('Failed to load hotel.', 'Load Failed');

        this.isLoading = false;

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

    this.selectedImages = [...this.selectedImages, ...newFiles];

    newFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);

        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  // ==============================
  // REMOVE NEW IMAGE
  // ==============================

  removeSelectedImage(index: number): void {
    this.selectedImages = this.selectedImages.filter((_, i) => i !== index);

    this.imagePreviews = this.imagePreviews.filter((_, i) => i !== index);
  }

  // ==============================
  // DELETE EXISTING IMAGE
  // ==============================

  deleteExistingImage(imageId: number, index: number): void {
    const confirmed = confirm('Are you sure you want to delete this image?');

    if (!confirmed) {
      return;
    }

    this.hotelService.deleteHotelImage(imageId).subscribe({
      next: () => {
        this.existingImages = this.existingImages.filter((_, i) => i !== index);

        this.toastr.success('Hotel image deleted successfully.', 'Deleted');

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Delete Image Error:', error);

        this.errorMessage = 'Failed to delete image.';

        this.toastr.error('Failed to delete hotel image.', 'Delete Failed');

        this.cdr.detectChanges();
      },
    });
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
  // UPDATE HOTEL
  // ==============================

  updateHotel(): void {
    this.errorMessage = '';

    this.successMessage = '';

    // Validation

    if (!this.hotelData.name.trim()) {
      this.errorMessage = 'Hotel name is required.';

      this.toastr.warning('Hotel name is required.', 'Validation');

      return;
    }

    if (!this.hotelData.description.trim()) {
      this.errorMessage = 'Description is required.';

      this.toastr.warning('Description is required.', 'Validation');

      return;
    }

    if (!this.hotelData.address.trim()) {
      this.errorMessage = 'Address is required.';

      this.toastr.warning('Address is required.', 'Validation');

      return;
    }

    if (this.hotelData.destinationId === 0) {
      this.errorMessage = 'Please select a destination.';

      this.toastr.warning('Please select a destination.', 'Validation');

      return;
    }

    if (this.hotelData.starRating < 1 || this.hotelData.starRating > 5) {
      this.errorMessage = 'Star rating must be between 1 and 5.';

      this.toastr.warning('Star rating must be between 1 and 5.', 'Validation');

      return;
    }

    if (this.hotelData.pricePerNight <= 0) {
      this.errorMessage = 'Price must be greater than 0.';

      this.toastr.warning('Price must be greater than 0.', 'Validation');

      return;
    }

    this.isSubmitting = true;

    this.hotelService.updateHotel(this.hotelId, this.hotelData).subscribe({
      next: (response) => {
        console.log('Hotel Updated:', response);

        if (this.selectedImages.length > 0) {
          this.uploadNewImages();
        } else {
          this.finishUpdate();
        }
      },

      error: (error) => {
        console.error('Update Hotel Error:', error);

        this.isSubmitting = false;

        this.errorMessage = error?.error?.message || 'Failed to update hotel.';

        this.toastr.error(this.errorMessage, 'Update Failed');

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // UPLOAD NEW IMAGES
  // ==============================

  uploadNewImages(): void {
    this.isUploadingImages = true;

    let completed = 0;

    this.selectedImages.forEach((file) => {
      this.hotelService.uploadHotelImage(file).subscribe({
        next: (uploadResponse) => {
          console.log('Uploaded:', uploadResponse.imageUrl);

          this.hotelService.createHotelImage(this.hotelId, uploadResponse.imageUrl).subscribe({
            next: () => {
              completed++;

              this.checkUploadComplete(completed);
            },

            error: () => {
              completed++;

              this.checkUploadComplete(completed);
            },
          });
        },

        error: () => {
          completed++;

          this.checkUploadComplete(completed);
        },
      });
    });
  }

  // ==============================
  // CHECK UPLOAD
  // ==============================

  checkUploadComplete(completed: number): void {
    if (completed === this.selectedImages.length) {
      this.finishUpdate();
    }
  }

  // ==============================
  // FINISH UPDATE
  // ==============================

  finishUpdate(): void {
    this.isUploadingImages = false;

    this.isSubmitting = false;

    this.successMessage = 'Hotel updated successfully.';

    this.toastr.success('Hotel updated successfully.', 'Updated');

    this.cdr.detectChanges();

    setTimeout(() => {
      this.router.navigate(['/admin/hotels/view', this.hotelId]);
    }, 800);
  }

  // ==============================
  // CANCEL
  // ==============================

  cancel(): void {
    this.router.navigate(['/admin/hotels/view', this.hotelId]);
  }
}
