import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Hotel`;

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  // NEW
  getHotelsByDestination(destinationId: number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/destination/${destinationId}`);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createHotel(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  uploadHotelImage(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(`${environment.apiUrl}/Image/upload/hotel`, formData);
  }

  createHotelImage(hotelId: number, imageUrl: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/HotelImage`, {
      hotelId,
      imageUrl,
    });
  }
  updateHotel(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteHotelImage(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/HotelImage/${id}`);
  }
}
