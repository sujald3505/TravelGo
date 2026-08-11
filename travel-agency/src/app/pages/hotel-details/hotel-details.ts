import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { HotelService } from '../../core/services/hotel';
import { Hotel } from '../../core/models/hotel.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hotel-details.html',
  styleUrl: './hotel-details.css',
})
export class HotelDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);
  private cdr = inject(ChangeDetectorRef);

  packageId = 0;

  hotel!: Hotel;

  isLoading = true;

  // Currently selected main image
  selectedImage = '';

  ngOnInit(): void {

    this.packageId = Number(
      this.route.snapshot.paramMap.get('packageId')
    );

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Hotel Id:', id);
    console.log('Package Id:', this.packageId);

    this.hotelService.getHotelById(id).subscribe({

      next: (res) => {

        console.log('Hotel Details:', res);

        this.hotel = res;

        this.isLoading = false;

        // Set first image as main image
        if (
          this.hotel.hotelImages &&
          this.hotel.hotelImages.length > 0
        ) {

          // First try primary image
          const primaryImage = this.hotel.hotelImages.find(
            image => image.isPrimary
          );

          if (primaryImage) {

            this.selectedImage = this.getImageUrl(
              primaryImage.imageUrl
            );

          } else {

            this.selectedImage = this.getImageUrl(
              this.hotel.hotelImages[0].imageUrl
            );

          }

        }

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('Hotel Details Error:', err);

        this.isLoading = false;

        this.cdr.detectChanges();

      }

    });

  }


  // Change main image when thumbnail is clicked
  changeImage(imageUrl: string): void {

    this.selectedImage = this.getImageUrl(imageUrl);

    this.cdr.detectChanges();

  }


  // Convert backend relative URL into complete URL
  getImageUrl(imageUrl: string): string {

    if (!imageUrl) {

      return 'https://placehold.co/800x500/e9ecef/6c757d?text=Hotel';

    }

    // Already full URL
    if (
      imageUrl.startsWith('http://') ||
      imageUrl.startsWith('https://')
    ) {

      return imageUrl;

    }

    // Backend relative URL
    return environment.imageUrl + imageUrl;

  }

}