import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Destination } from '../../../core/models/destination.model';
import { DestinationService } from '../../../core/services/destination';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-destinations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-destinations.html',
  styleUrl: './admin-destinations.css',
})
export class AdminDestinationsComponent implements OnInit {
  private destinationService = inject(DestinationService);
  private cdr = inject(ChangeDetectorRef);
  private toastr = inject(ToastrService);

  // =========================================
  // Data
  // =========================================

  destinations: Destination[] = [];

  filteredDestinations: Destination[] = [];

  // =========================================
  // Environment
  // =========================================

  environment = environment;

  // =========================================
  // Search
  // =========================================

  searchText = '';

  // =========================================
  // Loading
  // =========================================

  isLoading = true;

  errorMessage = '';

  // =========================================
  // Init
  // =========================================

  ngOnInit(): void {
    this.loadDestinations();
  }

  // =========================================
  // Load All Destinations
  // =========================================

  loadDestinations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.destinationService.getAllDestinations().subscribe({
      next: (data) => {
        console.log('Admin Destination API Data:', data);

        this.destinations = data;

        this.filteredDestinations = [...data];

        this.isLoading = false;

        console.table(this.destinations);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Admin Destination Error:', error);

        this.destinations = [];

        this.filteredDestinations = [];

        this.errorMessage = 'Unable to load destinations.';

        this.isLoading = false;

        this.toastr.error('Unable to load destinations.', 'Load Failed');

        this.cdr.detectChanges();
      },
    });
  }

  // =========================================
  // Search Destination
  // =========================================

  searchDestination(): void {
    const search = this.searchText.toLowerCase().trim();

    // Empty search
    if (!search) {
      this.filteredDestinations = [...this.destinations];

      return;
    }

    this.filteredDestinations = this.destinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(search) ||
        destination.city.toLowerCase().includes(search) ||
        destination.country.toLowerCase().includes(search) ||
        destination.category.toLowerCase().includes(search),
    );
  }

  // =========================================
  // Clear Search
  // =========================================

  clearSearch(): void {
    this.searchText = '';

    this.filteredDestinations = [...this.destinations];
  }

  // =========================================
  // Refresh
  // =========================================

  refreshDestinations(): void {
    this.loadDestinations();
  }

  // =========================================
  // Delete Destination
  // =========================================

  deleteDestination(destination: Destination): void {
    const confirmed = confirm(`Are you sure you want to delete "${destination.name}"?`);

    if (!confirmed) {
      return;
    }

    this.destinationService.deleteDestination(destination.id).subscribe({
      next: (response) => {
        console.log('Destination Deleted:', response);

        // Remove from main list
        this.destinations = this.destinations.filter((d) => d.id !== destination.id);

        // Remove from filtered list
        this.filteredDestinations = this.filteredDestinations.filter(
          (d) => d.id !== destination.id,
        );

        this.toastr.success('Destination deleted successfully.', 'Deleted');

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Delete Destination Error:', error);

        this.toastr.error('Failed to delete destination. Please try again.', 'Delete Failed');

        this.cdr.detectChanges();
      },
    });
  }
}
