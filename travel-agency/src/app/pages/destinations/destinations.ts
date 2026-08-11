import { CommonModule } from '@angular/common';
import { Component, inject, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Destination } from '../../core/models/destination.model';
import { DestinationService } from '../../core/services/destination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './destinations.html',
  styleUrl: './destinations.css'
})
export class Destinations implements OnInit {

  private destinationService = inject(DestinationService);
  private cdr = inject(ChangeDetectorRef);

  destinations: Destination[] = [];

  filteredDestinations: Destination[] = [];

   environment = environment;

  searchText = '';

  isLoading = true;

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {

  this.destinationService.getAllDestinations().subscribe({

    next: (data) => {

      console.log('Destination API Data:', data);

      this.destinations = data;

      // Initial page load → ALL destinations
      this.filteredDestinations = [...data];

      this.isLoading = false;

      console.table(this.destinations);

      this.cdr.detectChanges();

    },

    error: (error) => {

      console.error('Destination Error:', error);

      this.destinations = [];
      this.filteredDestinations = [];

      this.isLoading = false;

      this.cdr.detectChanges();

    }

  });

}

  searchDestination(): void {

  const search = this.searchText
    .toLowerCase()
    .trim();

  // Search empty હોય ત્યારે બધા destinations બતાવો
  if (!search) {

    this.filteredDestinations = [
      ...this.destinations
    ];

    return;
  }

  this.filteredDestinations =
    this.destinations.filter(destination =>

      destination.name
        .toLowerCase()
        .includes(search) ||

      destination.city
        .toLowerCase()
        .includes(search) ||

      destination.country
        .toLowerCase()
        .includes(search) ||

      destination.category
        .toLowerCase()
        .includes(search)

    );
}

}