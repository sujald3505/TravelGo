import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { DestinationService } from '../../../core/services/destination';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-destination-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-destination-form.html',
  styleUrl: './admin-destination-form.css'
})
export class AdminDestinationFormComponent {

  private fb = inject(FormBuilder);
  private destinationService = inject(DestinationService);
  private router = inject(Router);

  environment = environment;

  isSubmitting = false;
  isUploadingImage = false;

  selectedFile: File | null = null;

  imagePreview: string | null = null;

  uploadedImageUrl = '';


  destinationForm = this.fb.group({

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    country: [
      '',
      Validators.required
    ],

    city: [
      '',
      Validators.required
    ],

    category: [
      '',
      Validators.required
    ],

    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ],

    rating: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.max(5)
      ]
    ],

    isPopular: [
      false
    ]

  });


  get f() {
    return this.destinationForm.controls;
  }


  // =========================
  // IMAGE SELECT
  // =========================

  onImageSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Validate image type
    if (!file.type.startsWith('image/')) {

      alert('Please select a valid image.');

      input.value = '';

      return;
    }


    // Validate image size - 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {

      alert('Image size must be less than 5 MB.');

      input.value = '';

      return;
    }


    this.selectedFile = file;


    // Preview
    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview =
        reader.result as string;

    };

    reader.readAsDataURL(file);


    // Reset previous uploaded URL
    this.uploadedImageUrl = '';
  }


  // =========================
  // REMOVE IMAGE
  // =========================

  removeImage(): void {

    this.selectedFile = null;

    this.imagePreview = null;

    this.uploadedImageUrl = '';

  }


  // =========================
  // SUBMIT
  // =========================

  submit(): void {

    if (this.destinationForm.invalid) {

      this.destinationForm.markAllAsTouched();

      return;
    }


    if (!this.selectedFile) {

      alert('Please select a destination image.');

      return;
    }


    this.isSubmitting = true;


    // First upload image
    this.uploadImage();

  }


  // =========================
  // UPLOAD IMAGE
  // =========================

  private uploadImage(): void {

    if (!this.selectedFile) {
      return;
    }


    this.isUploadingImage = true;


    this.destinationService
      .uploadDestinationImage(this.selectedFile)
      .subscribe({

        next: (response) => {

          console.log(
            'Image Upload Response:',
            response
          );


          this.uploadedImageUrl =
            response.imageUrl;


          this.isUploadingImage = false;


          // After image upload
          // create destination
          this.createDestination();

        },


        error: (error) => {

          console.error(
            'Image Upload Error:',
            error
          );


          this.isUploadingImage = false;

          this.isSubmitting = false;


          alert(
            'Image upload failed. Please try again.'
          );

        }

      });

  }


  // =========================
  // CREATE DESTINATION
  // =========================

  private createDestination(): void {

    const formValue =
      this.destinationForm.getRawValue();


    const destination = {

      name: formValue.name ?? '',

      country: formValue.country ?? '',

      city: formValue.city ?? '',

      category: formValue.category ?? '',

      description: formValue.description ?? '',

      rating: Number(formValue.rating ?? 0),

      thumbnail: this.uploadedImageUrl,

      isPopular: formValue.isPopular ?? false

    };


    console.log(
      'Create Destination Payload:',
      destination
    );


    this.destinationService
      .createDestination(destination)
      .subscribe({

        next: (response) => {

          console.log(
            'Destination Created:',
            response
          );


          this.isSubmitting = false;


          this.router.navigate([
            '/admin/destinations'
          ]);

        },


        error: (error) => {

          console.error(
            'Create Destination Error:',
            error
          );


          this.isSubmitting = false;


          alert(
            'Destination creation failed. Please try again.'
          );

        }

      });

  }


  // =========================
  // CANCEL
  // =========================

  cancel(): void {

    this.router.navigate([
      '/admin/destinations'
    ]);

  }

}