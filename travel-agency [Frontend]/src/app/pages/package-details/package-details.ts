import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { environment } from '../../../environments/environment';

import { PackageService } from '../../core/services/package';
import { Package } from '../../core/models/package.model';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './package-details.html',
  styleUrl: './package-details.css',
})
export class PackageDetails implements OnInit {
  // =========================================
  // SERVICES
  // =========================================

  private packageService = inject(PackageService);

  private route = inject(ActivatedRoute);

  private cdr = inject(ChangeDetectorRef);

  // =========================================
  // VARIABLES
  // =========================================

  package!: Package;

  selectedImage: string = '';

  isLoading = true;

  environment = environment;

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {
    const packageId = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Package Id:', packageId);

    if (!packageId) {
      console.error('Invalid Package Id');

      this.isLoading = false;

      return;
    }

    this.loadPackage(packageId);
  }

  // =========================================
  // LOAD PACKAGE
  // =========================================

  loadPackage(id: number): void {
    this.isLoading = true;

    this.packageService.getPackageById(id).subscribe({
      next: (data) => {
        console.log('Package Data:', data);

        this.package = data;

        // ===================================
        // DEBUG PACKAGE IMAGES
        // ===================================

        console.log('Package Images:', this.package.packageImages);

        if (this.package.packageImages && this.package.packageImages.length > 0) {
          console.log('First Image URL:', this.package.packageImages[0].imageUrl);

          this.selectedImage = this.getImageUrl(this.package.packageImages[0].imageUrl);

          console.log('Main Image URL:', this.selectedImage);
        } else {
          console.log('No package images found');

          this.selectedImage = '';
        }

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading package:', error);

        this.isLoading = false;

        this.cdr.detectChanges();
      },
    });
  }

  // =========================================
  // GET FULL IMAGE URL
  // =========================================

  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return '';
    }

    // Already full URL
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // Make sure slash exists
    if (!imageUrl.startsWith('/')) {
      imageUrl = '/' + imageUrl;
    }

    return environment.imageUrl + imageUrl;
  }

  // =========================================
  // CHANGE MAIN IMAGE
  // =========================================

  changeImage(imageUrl: string): void {
    console.log('Thumbnail clicked:', imageUrl);

    const fullImageUrl = this.getImageUrl(imageUrl);

    console.log('Changing main image to:', fullImageUrl);

    this.selectedImage = fullImageUrl;

    this.cdr.detectChanges();
  }

  // =========================================
  // MAIN IMAGE ERROR
  // =========================================

  onImageError(event: Event): void {
    console.error('Main image failed:', this.selectedImage);

    const image = event.target as HTMLImageElement;

    image.src = 'https://placehold.co/900x600?text=Image+Not+Found';
  }

  // =========================================
  // THUMBNAIL ERROR
  // =========================================

  onThumbnailError(event: Event): void {
    const image = event.target as HTMLImageElement;

    console.error('Thumbnail image failed:', image.src);

    image.src = 'https://placehold.co/120x90?text=Image';
  }
}
