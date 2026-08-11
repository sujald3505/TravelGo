import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DestinationService } from '../../../core/services/destination';
import { Destination } from '../../../core/models/destination.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-destination-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-destination-details.html',
  styleUrl: './admin-destination-details.css'
})
export class AdminDestinationDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private destinationService = inject(DestinationService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  environment = environment;

  destination!: Destination;

  isLoading = true;


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Destination ID:', id);

    if (!id) {

      this.router.navigate([
        '/admin/destinations'
      ]);

      return;
    }

    this.loadDestination(id);
  }


  private loadDestination(id: number): void {

    this.isLoading = true;

    this.destinationService
      .getDestinationById(id)
      .subscribe({

        next: (data) => {

          console.log(
            'Admin Destination Details API:',
            data
          );

          this.destination = data;

          this.isLoading = false;

          this.cdr.detectChanges();

          console.log(
            'Destination Loaded:',
            this.destination
          );

        },

        error: (error) => {

          console.error(
            'Destination Details Error:',
            error
          );

          this.isLoading = false;

          this.cdr.detectChanges();

          this.router.navigate([
            '/admin/destinations'
          ]);

        }

      });

  }


  getImageUrl(): string {

    if (!this.destination?.thumbnail) {

      return 'https://placehold.co/900x500/e9ecef/6c757d?text=Destination';

    }


    if (
      this.destination.thumbnail.startsWith('http')
    ) {

      return this.destination.thumbnail;

    }


    return `${this.environment.imageUrl}${this.destination.thumbnail}`;

  }


  goBack(): void {

    this.router.navigate([
      '/admin/destinations'
    ]);

  }


  editDestination(): void {

    if (!this.destination) {
      return;
    }

    this.router.navigate([
      '/admin/destinations/edit',
      this.destination.id
    ]);

  }

}