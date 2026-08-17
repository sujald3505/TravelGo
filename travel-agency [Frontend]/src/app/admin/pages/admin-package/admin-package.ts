import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { PackageService } from '../../../core/services/package';
import { Package } from '../../../core/models/package.model';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-package',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-package.html',
  styleUrl: './admin-package.css',
})
export class AdminPackageComponent implements OnInit {

  private packageService =
    inject(PackageService);

  private cdr =
    inject(ChangeDetectorRef);

  private toastr =
    inject(ToastrService);

  environmentImageUrl =
    environment.imageUrl;

  packages: Package[] = [];

  filteredPackages: Package[] = [];

  searchText = '';

  isLoading = false;

  errorMessage = '';

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {
    this.loadPackages();
  }

  // =========================================
  // LOAD PACKAGES
  // =========================================

  loadPackages(): void {

    this.isLoading = true;

    this.errorMessage = '';

    this.packageService
      .getAllPackages()
      .subscribe({

        next: (data) => {

          console.log(
            'Admin Packages API Data:',
            data
          );

          this.packages = data;

          this.filteredPackages =
            [...data];

          this.isLoading = false;

          this.cdr.detectChanges();

          console.log(
            'Packages Array:',
            this.packages
          );

          console.log(
            'Filtered Packages:',
            this.filteredPackages
          );
        },

        error: (error) => {

          console.error(
            'Admin Package API Error:',
            error
          );

          this.errorMessage =
            'Failed to load packages.';

          this.isLoading = false;

          this.toastr.error(
            'Failed to load packages.',
            'Load Failed'
          );

          this.cdr.detectChanges();
        },

      });
  }

  // =========================================
  // SEARCH PACKAGES
  // =========================================

  searchPackages(): void {

    const search =
      this.searchText
        .trim()
        .toLowerCase();

    if (!search) {

      this.filteredPackages =
        [...this.packages];

      return;
    }

    this.filteredPackages =
      this.packages.filter(
        (pkg) =>

          pkg.name
            .toLowerCase()
            .includes(search) ||

          pkg.description
            .toLowerCase()
            .includes(search)
      );
  }

  // =========================================
  // CLEAR SEARCH
  // =========================================

  clearSearch(): void {

    this.searchText = '';

    this.filteredPackages =
      [...this.packages];
  }

  // =========================================
  // REFRESH
  // =========================================

  refreshPackages(): void {

    this.loadPackages();

    this.toastr.info(
      'Packages refreshed.',
      'Refresh'
    );
  }

  // =========================================
  // DELETE PACKAGE
  // =========================================

  deletePackage(id: number): void {

    const confirmed =
      confirm(
        'Are you sure you want to delete this package?'
      );

    if (!confirmed) {
      return;
    }

    console.log(
      'Delete Package ID:',
      id
    );

    // Delete API will be connected later

    this.toastr.info(
      'Delete API is not connected yet.',
      'Coming Soon'
    );
  }

  // =========================================
  // IMAGE ERROR
  // =========================================

  onImageError(event: Event): void {

    const img =
      event.target as HTMLImageElement;

    img.src =
      'assets/images/package-placeholder.jpg';
  }
}