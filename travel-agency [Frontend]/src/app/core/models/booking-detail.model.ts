export interface BookingDetail {
  id: number;

  bookingId: number;

  packageId: number;
  packageName: string;

  hotelId: number;
  hotelName: string;

  price: number;
  quantity: number;
  subTotal: number;
}