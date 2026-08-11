import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MyBooking } from '../models/my-booking.model';

@Injectable({
  providedIn: 'root'
})
export class MyBookingService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/MyBooking`;

  getMyBookings(userId: number): Observable<MyBooking[]> {
    return this.http.get<MyBooking[]>(`${this.apiUrl}/user/${userId}`);
  }

  getBookingDetails(id: number): Observable<MyBooking> {
    return this.http.get<MyBooking>(`${this.apiUrl}/${id}`);
  }

}