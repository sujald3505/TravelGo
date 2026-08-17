import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PackageImage {
  id: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackageImageService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/PackageImage`;
  private imageApiUrl = `${environment.apiUrl}/Image`;

  getByPackageId(packageId: number): Observable<PackageImage[]> {
    return this.http.get<PackageImage[]>(
      `${this.apiUrl}/package/${packageId}`
    );
  }

  uploadImage(file: File): Observable<{ imageUrl: string }> {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<{ imageUrl: string }>(
      `${this.imageApiUrl}/upload/package`,
      formData
    );
  }

  createPackageImage(
    packageId: number,
    imageUrl: string
  ): Observable<PackageImage> {

    return this.http.post<PackageImage>(
      this.apiUrl,
      {
        packageId,
        imageUrl
      }
    );
  }

  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}