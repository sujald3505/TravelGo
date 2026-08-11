import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DestinationService } from '../../core/services/destination';
import { PackageService } from '../../core/services/package';

import { Destination } from '../../core/models/destination.model';
import { Package } from '../../core/models/package.model';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  // =========================================
  // SERVICES
  // =========================================

  private destinationService = inject(DestinationService);
  private packageService = inject(PackageService);
  private cdr = inject(ChangeDetectorRef);

  // =========================================
  // ENVIRONMENT
  // =========================================

  environment = environment;

  imageBaseUrl = environment.imageUrl;

  // =========================================
  // DESTINATIONS
  // =========================================

  destinations: Destination[] = [];

  // =========================================
  // PACKAGES
  // =========================================

  packages: Package[] = [];

  // =========================================
  // LOADING
  // =========================================

  isLoadingDestinations = true;
  isLoadingPackages = true;

  // =========================================
  // ERRORS
  // =========================================

  destinationError = '';
  packageError = '';

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {
    this.loadDestinations();
    this.loadPackages();
  }

  // =========================================
  // LOAD DESTINATIONS
  // =========================================

  loadDestinations(): void {
  this.isLoadingDestinations = true;
  this.destinationError = '';

  this.destinationService.getAllDestinations().subscribe({
    next: (data) => {

      console.log('Home Destinations API:', data);

      this.destinations = data
        .filter(destination => destination.isPopular === true)
        .slice(0, 3);

      this.isLoadingDestinations = false;

      this.cdr.detectChanges();
    },

    error: (error) => {

      console.error('Home Destination API Error:', error);

      this.isLoadingDestinations = false;
      this.destinationError = 'Unable to load destinations.';

      this.cdr.detectChanges();
    }
  });
}
  // =========================================
  // LOAD PACKAGES
  // =========================================

  loadPackages(): void {
  this.isLoadingPackages = true;
  this.packageError = '';

  this.packageService.getAllPackages().subscribe({
    next: (data) => {

      console.log('Home Packages API:', data);

      this.packages = data
        .filter(pkg => pkg.isFeatured === true)
        .slice(0, 3);

      this.isLoadingPackages = false;

      this.cdr.detectChanges();
    },

    error: (error) => {

      console.error('Home Package API Error:', error);

      this.isLoadingPackages = false;
      this.packageError = 'Unable to load packages.';

      this.cdr.detectChanges();
    }
  });
}
  // =========================================
  // DESTINATION IMAGE
  // =========================================

  getDestinationImage(
    thumbnail: string | null | undefined
  ): string {

    if (!thumbnail) {

      return 'assets/images/destination-placeholder.jpg';
    }

    if (thumbnail.startsWith('http')) {

      return thumbnail;
    }

    return `${this.imageBaseUrl}${thumbnail}`;
  }

  // =========================================
  // PACKAGE IMAGE
  // =========================================

  getPackageImage(pkg: any): string {

    /*
      Different API responses may return
      package image collection with different names.
    */

    const imageUrl =
      pkg?.packageImages?.[0]?.imageUrl ??
      pkg?.images?.[0]?.imageUrl ??
      pkg?.thumbnail ??
      pkg?.image ??
      '';

    if (!imageUrl) {

      return 'assets/images/package-placeholder.jpg';
    }

    if (imageUrl.startsWith('http')) {

      return imageUrl;
    }

    return `${this.imageBaseUrl}${imageUrl}`;
  }

  // =========================================
  // IMAGE ERROR
  // =========================================

  onDestinationImageError(
    event: Event
  ): void {

    const image =
      event.target as HTMLImageElement;

    image.src =
      'assets/images/destination-placeholder.jpg';
  }

  onPackageImageError(
    event: Event
  ): void {

    const image =
      event.target as HTMLImageElement;

    image.src =
      'assets/images/package-placeholder.jpg';
  }

}