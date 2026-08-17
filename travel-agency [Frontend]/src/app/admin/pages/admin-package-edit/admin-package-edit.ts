import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PackageService } from '../../../core/services/package';
import { PackageImageService, PackageImage } from '../../../core/services/package-image';

import { DestinationService } from '../../../core/services/destination';

import { Package } from '../../../core/models/package.model';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-package-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-package-edit.html',
  styleUrl: './admin-package-edit.css',
})
export class AdminPackageEditComponent implements OnInit {
  // ==============================
  // SERVICES
  // ==============================

  private packageService = inject(PackageService);

  private packageImageService = inject(PackageImageService);

  private destinationService = inject(DestinationService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private cdr = inject(ChangeDetectorRef);

  private toastr = inject(ToastrService);

  // ==============================
  // DATA
  // ==============================

  packageId = 0;

  package: Package | null = null;

  destinations: any[] = [];

  packageImages: PackageImage[] = [];

  // ==============================
  // FORM
  // ==============================

  packageData = {
    name: '',

    description: '',

    price: 0,

    duration: 1,

    maxPeople: 1,

    isFeatured: false,

    destinationId: 0,
  };

  // ==============================
  // IMAGE
  // ==============================

  selectedImages: File[] = [];

  imagePreviews: string[] = [];

  imageBaseUrl = environment.imageUrl;

  // ==============================
  // STATES
  // ==============================

  isLoading = true;

  isLoadingImages = false;

  isSubmitting = false;

  isUploadingImages = false;

  deletingImageId: number | null = null;

  successMessage = '';

  errorMessage = '';

  // ==============================
  // INIT
  // ==============================

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = 'Invalid package ID.';

      this.isLoading = false;

      this.toastr.error('Invalid package ID.', 'Error');

      return;
    }

    this.packageId = id;

    this.loadDestinations();

    this.loadPackage();
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

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // LOAD PACKAGE
  // ==============================

  loadPackage(): void {
    this.isLoading = true;

    this.packageService.getPackageById(this.packageId).subscribe({
      next: (data: Package) => {
        console.log('Package:', data);

        this.package = data;

        // Populate form

        this.packageData = {
          name: data.name,

          description: data.description,

          price: data.price,

          duration: data.duration,

          maxPeople: data.maxPeople,

          isFeatured: data.isFeatured,

          destinationId: data.destinationId,
        };

        this.isLoading = false;

        this.loadPackageImages();

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Package Load Error:', error);

        this.errorMessage = 'Failed to load package.';

        this.isLoading = false;

        this.toastr.error('Failed to load package.', 'Load Failed');

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // LOAD PACKAGE IMAGES
  // ==============================

  loadPackageImages(): void {
    this.isLoadingImages = true;

    this.packageImageService.getByPackageId(this.packageId).subscribe({
      next: (images) => {
        console.log('Package Images:', images);

        this.packageImages = images;

        this.isLoadingImages = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Package Images Error:', error);

        this.isLoadingImages = false;

        this.toastr.warning('Package images could not be loaded.', 'Images');

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // SELECT NEW IMAGES
  // ==============================

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const files = Array.from(input.files);

    this.selectedImages = files;

    this.imagePreviews = [];

    files.forEach((file) => {
      // Validate image type

      if (!file.type.startsWith('image/')) {
        this.toastr.warning(`${file.name} is not a valid image.`, 'Invalid Image');

        return;
      }

      // Validate image size

      const maxSize = 5 * 1024 * 1024;

      if (file.size > maxSize) {
        this.toastr.warning(`${file.name} is larger than 5 MB.`, 'Image Too Large');

        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);

        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    });
  }

  // ==============================
  // UPDATE PACKAGE
  // ==============================

  updatePackage(): void {
    this.successMessage = '';

    this.errorMessage = '';

    // ==============================
    // VALIDATION
    // ==============================

    if (!this.packageData.name.trim()) {
      this.errorMessage = 'Package name is required.';

      this.toastr.warning('Package name is required.', 'Validation');

      return;
    }

    if (!this.packageData.description.trim()) {
      this.errorMessage = 'Description is required.';

      this.toastr.warning('Description is required.', 'Validation');

      return;
    }

    if (this.packageData.destinationId === 0) {
      this.errorMessage = 'Please select a destination.';

      this.toastr.warning('Please select a destination.', 'Validation');

      return;
    }

    if (this.packageData.price <= 0) {
      this.errorMessage = 'Price must be greater than 0.';

      this.toastr.warning('Price must be greater than 0.', 'Validation');

      return;
    }

    if (this.packageData.duration <= 0) {
      this.errorMessage = 'Duration must be greater than 0.';

      this.toastr.warning('Duration must be greater than 0.', 'Validation');

      return;
    }

    if (this.packageData.maxPeople <= 0) {
      this.errorMessage = 'Maximum people must be greater than 0.';

      this.toastr.warning('Maximum people must be greater than 0.', 'Validation');

      return;
    }

    // ==============================
    // START UPDATE
    // ==============================

    this.isSubmitting = true;

    console.log('Updating Package:', this.packageData);

    // ==============================
    // UPDATE API
    // ==============================

    this.packageService.updatePackage(this.packageId, this.packageData).subscribe({
      next: (response) => {
        console.log('Package Updated:', response);

        // Upload new images if selected

        if (this.selectedImages.length > 0) {
          this.uploadNewImages();
        } else {
          this.finishUpdate();
        }
      },

      error: (error) => {
        console.error('Update Package Error:', error);

        this.isSubmitting = false;

        this.errorMessage = error?.error?.message || 'Failed to update package.';

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
      this.packageImageService.uploadImage(file).subscribe({
        next: (uploadResponse) => {
          console.log('Image Uploaded:', uploadResponse.imageUrl);

          this.packageImageService
            .createPackageImage(this.packageId, uploadResponse.imageUrl)
            .subscribe({
              next: (savedImage) => {
                console.log('Image Saved:', savedImage);

                completed++;

                if (completed === this.selectedImages.length) {
                  this.finishUpdate();
                }
              },

              error: (error) => {
                console.error('Save Image Error:', error);

                completed++;

                if (completed === this.selectedImages.length) {
                  this.finishUpdate();
                }
              },
            });
        },

        error: (error) => {
          console.error('Upload Image Error:', error);

          completed++;

          if (completed === this.selectedImages.length) {
            this.finishUpdate();
          }
        },
      });
    });
  }

  // ==============================
  // DELETE IMAGE
  // ==============================

  deleteImage(image: PackageImage): void {
    const confirmed = confirm('Are you sure you want to delete this image?');

    if (!confirmed) {
      return;
    }

    this.deletingImageId = image.id;

    this.packageImageService.deleteImage(image.id).subscribe({
      next: () => {
        console.log('Image Deleted:', image.id);

        this.packageImages = this.packageImages.filter((item) => item.id !== image.id);

        this.deletingImageId = null;

        this.toastr.success('Package image deleted successfully.', 'Image Deleted');

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Delete Image Error:', error);

        this.deletingImageId = null;

        this.errorMessage = 'Failed to delete image.';

        this.toastr.error('Failed to delete package image.', 'Delete Failed');

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // FINISH UPDATE
  // ==============================

  finishUpdate(): void {
    this.isUploadingImages = false;

    this.isSubmitting = false;

    this.successMessage = 'Package updated successfully.';

    this.toastr.success('Package updated successfully.', 'Package Updated');

    this.cdr.detectChanges();

    setTimeout(() => {
      this.router.navigate(['/admin/packages/view', this.packageId]);
    }, 1000);
  }

  // ==============================
  // IMAGE ERROR
  // ==============================

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.src = 'assets/images/package-placeholder.jpg';
  }

  // ==============================
  // DELETE PACKAGE
  // ==============================

  deletePackage(): void {
    if (!this.package) {
      this.toastr.warning('Package data is not available.', 'Delete');

      return;
    }

    const confirmed = confirm(`Are you sure you want to delete "${this.package.name}"?`);

    if (!confirmed) {
      return;
    }

    this.isLoading = true;

    this.packageService.deletePackage(this.package.id).subscribe({
      next: () => {
        console.log('Package deleted successfully');

        this.toastr.success('Package deleted successfully.', 'Package Deleted');

        this.router.navigate(['/admin/packages']);
      },

      error: (error) => {
        console.error('Delete Package Error:', error);

        this.isLoading = false;

        this.errorMessage = error?.error?.message || 'Failed to delete package.';

        this.toastr.error(this.errorMessage, 'Delete Failed');

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // BACK
  // ==============================

  cancel(): void {
    this.router.navigate(['/admin/packages/view', this.packageId]);
  }
}
