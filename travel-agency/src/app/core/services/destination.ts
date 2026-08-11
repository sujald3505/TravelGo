import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Destination } from '../models/destination.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/Destination`;


  // =========================
  // GET ALL DESTINATIONS
  // =========================

  getAllDestinations(): Observable<Destination[]> {

    return this.http.get<Destination[]>(
      this.apiUrl
    );

  }


  // =========================
  // GET DESTINATION BY ID
  // =========================

  getDestinationById(
    id: number
  ): Observable<Destination> {

    return this.http.get<Destination>(
      `${this.apiUrl}/${id}`
    );

  }


  // =========================
  // CREATE DESTINATION
  // =========================

  createDestination(
    destination: any
  ): Observable<Destination> {

    return this.http.post<Destination>(
      this.apiUrl,
      destination
    );

  }


  // =========================
  // UPDATE DESTINATION
  // =========================

  updateDestination(
    id: number,
    destination: any
  ): Observable<Destination> {

    return this.http.put<Destination>(
      `${this.apiUrl}/${id}`,
      destination
    );

  }


  // =========================
  // DELETE DESTINATION
  // =========================

  deleteDestination(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }


  // =========================
  // DESTINATION IMAGE UPLOAD
  // =========================

  uploadDestinationImage(
    file: File
  ): Observable<{ imageUrl: string }> {

    const formData = new FormData();

    formData.append(
      'File',
      file
    );

    return this.http.post<{ imageUrl: string }>(
      `${environment.apiUrl}/Image/upload/destination`,
      formData
    );

  }

}