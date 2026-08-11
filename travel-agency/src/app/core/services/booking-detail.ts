import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { BookingDetail } from '../models/booking-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/BookingDetail`;

  getAllBookingDetails(): Observable<BookingDetail[]> {
    return this.http.get<BookingDetail[]>(this.apiUrl);
  }

  getBookingDetailById(id: number): Observable<BookingDetail> {
    return this.http.get<BookingDetail>(`${this.apiUrl}/${id}`);
  }
}