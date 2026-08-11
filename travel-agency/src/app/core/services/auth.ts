import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/Auth`;

  login(model: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      model
    );
  }

  register(model: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      model
    );
  }

  saveUser(auth: AuthResponse): void {

    localStorage.setItem('token', auth.token);

    localStorage.setItem('userId', auth.userId.toString());

    localStorage.setItem('firstName', auth.firstName);

    localStorage.setItem('lastName', auth.lastName);

    localStorage.setItem('email', auth.email);

    localStorage.setItem('role', auth.role);

  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  getFirstName(): string {
    return localStorage.getItem('firstName') ?? '';
  }

  getLastName(): string {
    return localStorage.getItem('lastName') ?? '';
  }

  getEmail(): string {
    return localStorage.getItem('email') ?? '';
  }

  getRole(): string {
    return localStorage.getItem('role') ?? '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('userId');

    localStorage.removeItem('firstName');

    localStorage.removeItem('lastName');

    localStorage.removeItem('email');

    localStorage.removeItem('role');

  }

}