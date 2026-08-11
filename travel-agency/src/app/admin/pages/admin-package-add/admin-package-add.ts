import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PackageService } from '../../../core/services/package';
import { DestinationService } from '../../../core/services/destination';
import { PackageImageService } from '../../../core/services/package-image';

@Component({
  selector: 'app-admin-package-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-package-add.html',
  styleUrl: './admin-package-add.css',
})
export class AdminPackageAddComponent implements OnInit {

  // ==============================
  // SERVICES
  // ==============================

  private packageService = inject(PackageService);
  private destinationService = inject(DestinationService);
  private packageImageService = inject(PackageImageService);

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  private toastr = inject(ToastrService);

  // ==============================
  // DESTINATIONS
  // ==============================

  destinations: any[] = [];

  isLoadingDestinations = false;

  // ==============================
  // PACKAGE FORM
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
  // IMAGE DATA
  // ==============================

  selectedImages: File[] = [];

  imagePreviews: string[] = [];

  uploadedImages: any[] = [];

  createdPackageId: number | null = null;

  // ==============================
  // STATES
  // ==============================

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

    this.destinationService
      .getAllDestinations()
      .subscribe({

        next: (data) => {

          console.log(
            'Destinations:',
            data
          );

          this.destinations = data;

          this.isLoadingDestinations = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Destination API Error:',
            error
          );

          this.isLoadingDestinations = false;

          this.errorMessage =
            'Failed to load destinations.';

          this.toastr.error(
            'Failed to load destinations.',
            'Load Failed'
          );

          this.cdr.detectChanges();
        },

      });
  }

  // ==============================
  // IMAGE SELECT
  // ==============================

  onImagesSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {
      return;
    }

    const files =
      Array.from(input.files);

    // Store selected files

    this.selectedImages = files;

    // Clear previous previews

    this.imagePreviews = [];

    // Generate previews

    files.forEach((file) => {

      // Validate image

      if (!file.type.startsWith('image/')) {

        this.toastr.warning(
          `${file.name} is not a valid image.`,
          'Invalid Image'
        );

        return;
      }

      // Validate size

      const maxSize =
        5 * 1024 * 1024;

      if (file.size > maxSize) {

        this.toastr.warning(
          `${file.name} is larger than 5 MB.`,
          'Image Too Large'
        );

        return;
      }

      const reader =
        new FileReader();

      reader.onload = () => {

        this.imagePreviews.push(
          reader.result as string
        );

        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);

    });
  }

  // ==============================
  // CREATE PACKAGE
  // ==============================

  submitPackage(): void {

    this.successMessage = '';

    this.errorMessage = '';

    // ==============================
    // VALIDATION
    // ==============================

    if (
      !this.packageData.name.trim()
    ) {

      this.errorMessage =
        'Package name is required.';

      this.toastr.warning(
        'Package name is required.',
        'Validation'
      );

      return;
    }

    if (
      !this.packageData.description.trim()
    ) {

      this.errorMessage =
        'Description is required.';

      this.toastr.warning(
        'Description is required.',
        'Validation'
      );

      return;
    }

    if (
      this.packageData.destinationId === 0
    ) {

      this.errorMessage =
        'Please select a destination.';

      this.toastr.warning(
        'Please select a destination.',
        'Validation'
      );

      return;
    }

    if (
      this.packageData.price <= 0
    ) {

      this.errorMessage =
        'Price must be greater than 0.';

      this.toastr.warning(
        'Price must be greater than 0.',
        'Validation'
      );

      return;
    }

    if (
      this.packageData.duration <= 0
    ) {

      this.errorMessage =
        'Duration must be greater than 0.';

      this.toastr.warning(
        'Duration must be greater than 0.',
        'Validation'
      );

      return;
    }

    if (
      this.packageData.maxPeople <= 0
    ) {

      this.errorMessage =
        'Maximum people must be greater than 0.';

      this.toastr.warning(
        'Maximum people must be greater than 0.',
        'Validation'
      );

      return;
    }

    // ==============================
    // START SUBMIT
    // ==============================

    this.isSubmitting = true;

    console.log(
      'Creating Package:',
      this.packageData
    );

    // ==============================
    // CREATE PACKAGE API
    // ==============================

    this.packageService
      .createPackage(this.packageData)
      .subscribe({

        next: (response) => {

          console.log(
            'Package Created:',
            response
          );

          // Get newly created package ID

          const packageId =
            response.id;

          this.createdPackageId =
            packageId;

          // ==============================
          // UPLOAD IMAGES
          // ==============================

          if (
            this.selectedImages.length > 0
          ) {

            this.uploadPackageImages(
              packageId
            );

          } else {

            // No images

            this.finishPackageCreation();
          }
        },

        error: (error) => {

          console.error(
            'Create Package Error:',
            error
          );

          this.isSubmitting = false;

          this.errorMessage =
            error?.error?.message ||
            'Failed to create package.';

          this.toastr.error(
            this.errorMessage,
            'Create Failed'
          );

          this.cdr.detectChanges();
        },

      });
  }

  // ==============================
  // UPLOAD PACKAGE IMAGES
  // ==============================

  uploadPackageImages(
    packageId: number
  ): void {

    this.isUploadingImages = true;

    let completed = 0;

    this.selectedImages.forEach(
      (file) => {

        // ==============================
        // STEP 1
        // Upload physical image
        // ==============================

        this.packageImageService
          .uploadImage(file)
          .subscribe({

            next: (uploadResponse) => {

              console.log(
                'Image Uploaded:',
                uploadResponse.imageUrl
              );

              // ==============================
              // STEP 2
              // Save image URL
              // ==============================

              this.packageImageService
                .createPackageImage(
                  packageId,
                  uploadResponse.imageUrl
                )
                .subscribe({

                  next: (savedImage) => {

                    console.log(
                      'Package Image Saved:',
                      savedImage
                    );

                    this.uploadedImages.push(
                      savedImage
                    );

                    completed++;

                    if (
                      completed ===
                      this.selectedImages.length
                    ) {

                      this.finishPackageCreation();
                    }
                  },

                  error: (error) => {

                    console.error(
                      'Package Image Save Error:',
                      error
                    );

                    completed++;

                    if (
                      completed ===
                      this.selectedImages.length
                    ) {

                      this.finishPackageCreation();
                    }
                  },

                });
            },

            error: (error) => {

              console.error(
                'Package Image Upload Error:',
                error
              );

              completed++;

              if (
                completed ===
                this.selectedImages.length
              ) {

                this.finishPackageCreation();
              }
            },

          });

      }
    );
  }

  // ==============================
  // FINISH
  // ==============================

  finishPackageCreation(): void {

    this.isUploadingImages = false;

    this.isSubmitting = false;

    this.successMessage =
      'Package and images created successfully.';

    this.toastr.success(
      'Package and images created successfully.',
      'Package Created'
    );

    this.cdr.detectChanges();

    // Redirect to package list

    setTimeout(() => {

      this.router.navigate([
        '/admin/packages'
      ]);

    }, 1000);
  }

  // ==============================
  // CANCEL
  // ==============================

  cancel(): void {

    this.router.navigate([
      '/admin/packages'
    ]);
  }
}