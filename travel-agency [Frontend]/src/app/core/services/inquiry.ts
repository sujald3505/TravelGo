import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface CreateInquiry {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface Inquiry {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class InquiryService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/Inquiry`;

  
  createInquiry(data: any) {
    return this.http.post(`${environment.apiUrl}/Inquiry`, data);
  }

  getAllInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(this.apiUrl);
  }

  getInquiryById(id: number): Observable<Inquiry> {
    return this.http.get<Inquiry>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: string): Observable<Inquiry> {
    return this.http.put<Inquiry>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteInquiry(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
