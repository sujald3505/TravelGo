import { HotelImage } from './hotel-image.model';

export interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  starRating: number;
  pricePerNight: number;
  isAvailable: boolean;
  destinationId: number;
  destinationName: string;
  hotelImages: HotelImage[];
}