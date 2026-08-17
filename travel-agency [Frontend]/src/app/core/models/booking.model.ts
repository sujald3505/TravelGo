export interface Booking {
  id: number;
  userId: number;
  userName: string;

  destinationId: number;
  destinationName: string;

  hotelId: number;
  hotelName: string;

  packageId: number;
  packageName: string;

  bookingDate: string;
  travelDate: string;

  numberOfPeople: number;
  totalAmount: number;

  status: string;
}