import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/User`;

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(
    id: number,
    data: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      isActive: boolean;
    }
  ): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  updateUserRole(
    id: number,
    roleId: number
  ): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/${id}/role`,
      { roleId }
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}