import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Booking } from '../models/booking.model';
import { CreateBooking } from '../models/create-booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/Booking`;

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/my-bookings`);
  }

  createBooking(model: CreateBooking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, model);
  }

  updateBookingStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, { status });
  }
  
  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
