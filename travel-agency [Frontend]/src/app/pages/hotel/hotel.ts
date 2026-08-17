import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { HotelService } from '../../core/services/hotel';
import { Hotel } from '../../core/models/hotel.model';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './hotel.html',
  styleUrl: './hotel.css',
})
export class HotelComponent implements OnInit {

  private hotelService = inject(HotelService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  environment = environment;

  packageId = 0;

  hotels: Hotel[] = [];

  isLoading = true;


  ngOnInit(): void {

    const destinationId = Number(
      this.route.snapshot.paramMap.get('destinationId')
    );

    this.packageId = Number(
      this.route.snapshot.paramMap.get('packageId')
    );

    console.log('Destination Id:', destinationId);
    console.log('Package Id:', this.packageId);


    this.hotelService
      .getHotelsByDestination(destinationId)
      .subscribe({

        next: (res) => {

          console.log('Hotels API Response:', res);

          this.hotels = res;

          console.log('Hotels:', this.hotels);

          this.isLoading = false;

          this.cdr.detectChanges();
        },


        error: (err) => {

          console.error(
            'Hotel API Error:',
            err
          );

          this.hotels = [];

          this.isLoading = false;

          this.cdr.detectChanges();
        }

      });
  }


  getHotelImage(hotel: Hotel): string {

    if (
      hotel.hotelImages &&
      hotel.hotelImages.length > 0 &&
      hotel.hotelImages[0].imageUrl
    ) {

      return environment.imageUrl +
        hotel.hotelImages[0].imageUrl;
    }

    return 'https://via.placeholder.com/400x250';
  }


  onImageError(event: Event): void {

    const img =
      event.target as HTMLImageElement;

    img.src =
      'https://via.placeholder.com/400x250';
  }

}