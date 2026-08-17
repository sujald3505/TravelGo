export interface CreateBooking {
  userId: number;
  destinationId: number;
  hotelId: number;
  packageId: number;
  travelDate: string;
  numberOfPeople: number;
  totalAmount: number;
}