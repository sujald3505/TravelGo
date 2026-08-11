import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PackageService } from '../../../core/services/package';
import { PackageImageService, PackageImage } from '../../../core/services/package-image';

import { Package } from '../../../core/models/package.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-package-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-package-details.html',
  styleUrl: './admin-package-details.css',
})
export class AdminPackageDetailsComponent implements OnInit {
  // ==============================
  // SERVICES
  // ==============================

  private packageService = inject(PackageService);

  private packageImageService = inject(PackageImageService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private cdr = inject(ChangeDetectorRef);

  private toastr = inject(ToastrService);

  // ==============================
  // IMAGE
  // ==============================

  imageBaseUrl = environment.imageUrl;

  // ==============================
  // DATA
  // ==============================

  package: Package | null = null;

  packageImages: PackageImage[] = [];

  // ==============================
  // STATES
  // ==============================

  isLoading = true;

  isLoadingImages = false;

  errorMessage = '';

  selectedImage = '';

  // ==============================
  // INIT
  // ==============================

  ngOnInit(): void {
    this.loadPackage();
  }

  // ==============================
  // LOAD PACKAGE
  // ==============================

  loadPackage(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = 'Invalid package ID.';

      this.isLoading = false;

      this.toastr.error('Invalid package ID.', 'Error');

      return;
    }

    console.log('Package ID:', id);

    this.packageService.getPackageById(id).subscribe({
      next: (data: Package) => {
        console.log('Package Details:', data);

        this.package = data;

        this.isLoading = false;

        this.loadPackageImages(id);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Package Details Error:', error);

        this.errorMessage = 'Failed to load package details.';

        this.isLoading = false;

        this.toastr.error('Failed to load package details.', 'Load Failed');

        this.cdr.detectChanges();
      },
    });
  }

  // ==============================
  // LOAD IMAGES
  // ==============================

  loadPackageImages(id: number): void {
    this.isLoadingImages = true;

    this.packageImageService.getByPackageId(id).subscribe({
      next: (images) => {
        console.log('Package Images:', images);

        this.packageImages = images;

        if (images.length > 0) {
          this.selectedImage = images[0].imageUrl;
        }

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
  // SELECT IMAGE
  // ==============================

  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  // ==============================
  // IMAGE ERROR
  // ==============================

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.src = 'assets/images/package-placeholder.jpg';
  }

  // ==============================
  // EDIT
  // ==============================

  editPackage(): void {
    if (!this.package) {
      this.toastr.warning('Package data is not available.', 'Edit');

      return;
    }

    this.router.navigate(['/admin/packages/edit', this.package.id]);
  }

  // ==============================
  // DELETE
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

    console.log('Delete Package:', this.package.id);

    /*
      Delete API will be connected
      in CRUD step.
    */

    this.toastr.info('Delete API will be connected in the CRUD step.', 'Delete');
  }

  // ==============================
  // BACK
  // ==============================

  goBack(): void {
    this.router.navigate(['/admin/packages']);
  }
}
