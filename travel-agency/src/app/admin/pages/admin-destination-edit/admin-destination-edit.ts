import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { DestinationService } from '../../../core/services/destination';
import { Destination } from '../../../core/models/destination.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-destination-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-destination-edit.html',
  styleUrl: './admin-destination-edit.css',
})
export class AdminDestinationEditComponent
  implements OnInit {

  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private destinationService =
    inject(DestinationService);

  private cdr =
    inject(ChangeDetectorRef);

  // Toastify
  private toastr =
    inject(ToastrService);

  environment = environment;

  destination!: Destination;

  destinationId = 0;

  isLoading = true;

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
    ],

  });

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.destinationId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    console.log(
      'Edit Destination ID:',
      this.destinationId
    );

    if (!this.destinationId) {

      this.toastr.error(
        'Invalid destination ID.',
        'Error'
      );

      this.router.navigate([
        '/admin/destinations'
      ]);

      return;
    }

    this.loadDestination();
  }

  // =========================
  // LOAD DESTINATION
  // =========================

  private loadDestination(): void {

    this.isLoading = true;

    this.destinationService
      .getDestinationById(
        this.destinationId
      )
      .subscribe({

        next: (data) => {

          console.log(
            'Edit Destination API:',
            data
          );

          this.destination = data;

          this.destinationForm.patchValue({

            name: data.name,

            country: data.country,

            city: data.city,

            category: data.category,

            description: data.description,

            rating: data.rating,

            isPopular: data.isPopular,

          });

          // Existing image preview

          if (data.thumbnail) {

            this.imagePreview =
              this.getImageUrl(
                data.thumbnail
              );
          }

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Load Destination Error:',
            error
          );

          this.isLoading = false;

          this.toastr.error(
            'Unable to load destination.',
            'Load Failed'
          );

          this.cdr.detectChanges();

          this.router.navigate([
            '/admin/destinations'
          ]);
        },

      });
  }

  // =========================
  // IMAGE URL
  // =========================

  getImageUrl(
    imageUrl: string
  ): string {

    if (!imageUrl) {

      return 'https://placehold.co/900x500/e9ecef/6c757d?text=Destination';
    }

    if (
      imageUrl.startsWith('http')
    ) {

      return imageUrl;
    }

    return `${this.environment.imageUrl}${imageUrl}`;
  }

  // =========================
  // IMAGE SELECT
  // =========================

  onImageSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {
      return;
    }

    const file =
      input.files[0];

    // Validate type

    if (
      !file.type.startsWith('image/')
    ) {

      this.toastr.warning(
        'Please select a valid image.',
        'Invalid Image'
      );

      input.value = '';

      return;
    }

    // Validate size

    const maxSize =
      5 * 1024 * 1024;

    if (
      file.size > maxSize
    ) {

      this.toastr.warning(
        'Image size must be less than 5 MB.',
        'Image Too Large'
      );

      input.value = '';

      return;
    }

    this.selectedFile = file;

    // Preview

    const reader =
      new FileReader();

    reader.onload = () => {

      this.imagePreview =
        reader.result as string;

      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);

    // New image selected
    // Previous uploaded URL reset

    this.uploadedImageUrl = '';
  }

  // =========================
  // REMOVE NEW IMAGE
  // =========================

  removeImage(): void {

    this.selectedFile = null;

    this.uploadedImageUrl = '';

    // Restore existing image

    if (
      this.destination?.thumbnail
    ) {

      this.imagePreview =
        this.getImageUrl(
          this.destination.thumbnail
        );

    } else {

      this.imagePreview = null;
    }

    this.cdr.detectChanges();
  }

  // =========================
  // SUBMIT
  // =========================

  submit(): void {

    if (
      this.destinationForm.invalid
    ) {

      this.destinationForm.markAllAsTouched();

      this.toastr.warning(
        'Please fill all required fields.',
        'Invalid Form'
      );

      return;
    }

    this.isSubmitting = true;

    // Image changed

    if (this.selectedFile) {

      this.uploadImage();

      return;
    }

    // Image not changed

    this.updateDestination(
      this.destination.thumbnail
    );
  }

  // =========================
  // UPLOAD NEW IMAGE
  // =========================

  private uploadImage(): void {

    if (!this.selectedFile) {
      return;
    }

    this.isUploadingImage = true;

    this.destinationService
      .uploadDestinationImage(
        this.selectedFile
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Updated Image Response:',
            response
          );

          this.uploadedImageUrl =
            response.imageUrl;

          this.isUploadingImage = false;

          this.updateDestination(
            this.uploadedImageUrl
          );
        },

        error: (error) => {

          console.error(
            'Image Upload Error:',
            error
          );

          this.isUploadingImage = false;

          this.isSubmitting = false;

          this.toastr.error(
            'Image upload failed. Please try again.',
            'Upload Failed'
          );

          this.cdr.detectChanges();
        },

      });
  }

  // =========================
  // UPDATE DESTINATION
  // =========================

  private updateDestination(
    thumbnail: string
  ): void {

    const formValue =
      this.destinationForm.getRawValue();

    const destination = {

      id: this.destinationId,

      name:
        formValue.name ?? '',

      country:
        formValue.country ?? '',

      city:
        formValue.city ?? '',

      category:
        formValue.category ?? '',

      description:
        formValue.description ?? '',

      rating:
        Number(
          formValue.rating ?? 0
        ),

      thumbnail:
        thumbnail ?? '',

      isPopular:
        formValue.isPopular ?? false,

    };

    console.log(
      'Update Destination Payload:',
      destination
    );

    this.destinationService
      .updateDestination(
        this.destinationId,
        destination
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Destination Updated:',
            response
          );

          this.isSubmitting = false;

          this.toastr.success(
            'Destination updated successfully.',
            'Updated'
          );

          this.cdr.detectChanges();

          this.router.navigate([
            '/admin/destinations'
          ]);
        },

        error: (error) => {

          console.error(
            'Update Destination Error:',
            error
          );

          this.isSubmitting = false;

          this.toastr.error(
            'Destination update failed. Please try again.',
            'Update Failed'
          );

          this.cdr.detectChanges();
        },

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