import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PackageService } from '../../core/services/package';
import { Package } from '../../core/models/package.model';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './packages.html',
  styleUrl: './packages.css',
})
export class Packages implements OnInit {

  private packageService = inject(PackageService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  searchText = '';

  packages: Package[] = [];

  isLoading = true;

  /**
   * Backend image base URL
   * Example:
   * https://localhost:7204
   */
  imageBaseUrl = environment.imageUrl;

  ngOnInit(): void {

    const destinationId = Number(
      this.route.snapshot.paramMap.get('destinationId')
    );

    console.log('Destination Id : ', destinationId);

    this.packageService
      .getPackagesByDestination(destinationId)
      .subscribe({

        next: (data) => {

          console.log('Packages API Data:', data);

          this.packages = data;

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error('Package API Error:', err);

          this.isLoading = false;

          this.cdr.detectChanges();
        }

      });
  }

  filteredPackages(): Package[] {

    return this.packages.filter(x =>
      x.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  /**
   * Convert backend image path into complete image URL
   *
   * Example:
   * /uploads/packages/abc.jpg
   *
   * becomes:
   * https://localhost:7204/uploads/packages/abc.jpg
   */
  getImageUrl(imageUrl: string): string {

    if (!imageUrl) {
      return 'https://placehold.co/600x400/e9ecef/6c757d?text=Travel+Package';
    }

    // Already full URL
    if (
      imageUrl.startsWith('http://') ||
      imageUrl.startsWith('https://')
    ) {
      return imageUrl;
    }

    return `${this.imageBaseUrl}${imageUrl}`;
  }

  /**
   * If image fails to load
   */
  onImageError(event: Event): void {

    const img = event.target as HTMLImageElement;

    img.src =
      'https://placehold.co/600x400/e9ecef/6c757d?text=Travel+Package';
  }
}