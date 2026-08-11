import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Package } from '../models/package.model';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/Package`;

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl);
  }

  // NEW
  getPackagesByDestination(destinationId: number): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiUrl}/destination/${destinationId}`);
  }

  createPackage(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updatePackage(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  getPackageById(id: number): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/${id}`);
  }

  deletePackage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
