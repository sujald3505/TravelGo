import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  isLoading = false;
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // =========================================
  // Email Getter
  // =========================================

  get email() {
    return this.loginForm.controls.email;
  }

  // =========================================
  // Password Getter
  // =========================================

  get password() {
    return this.loginForm.controls.password;
  }

  // =========================================
  // Admin Login
  // =========================================

  onSubmit(): void {
    this.errorMessage = '';

    // =========================================
    // Validate Form
    // =========================================

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      this.toastr.warning('Please enter a valid email and password.', 'Invalid Form');

      return;
    }

    // =========================================
    // Start Loading
    // =========================================

    this.isLoading = true;

    const loginData = this.loginForm.getRawValue();

    console.log('Admin Login Data:', loginData);

    // =========================================
    // Login API
    // =========================================

    this.authService.login(loginData).subscribe({
      // =========================================
      // SUCCESS
      // =========================================

      next: (response: any) => {
        console.log('Admin Login Response:', response);

        this.isLoading = false;

        // =========================================
        // Get Role From API
        // =========================================

        const role = response?.role ?? response?.user?.role ?? response?.data?.role;

        console.log('User Role:', role);

        // =========================================
        // Admin Role Check
        // =========================================

        if (role !== 'Admin') {
          this.errorMessage = 'Access denied. Admin account required.';

          this.toastr.error('This account does not have Admin access.', 'Access Denied');

          this.authService.logout();

          return;
        }

        // =========================================
        // Admin Login Success
        // =========================================

        this.toastr.success('Welcome back, Administrator!', 'Login Successful');

        this.router.navigate(['/admin/dashboard']);
      },

      // =========================================
      // LOGIN ERROR
      // =========================================

      error: (error) => {
        console.error('Admin Login Error:', error);

        this.isLoading = false;

        this.errorMessage = error?.error?.message ?? 'Invalid email or password.';

        this.toastr.error(this.errorMessage, 'Login Failed');
      },
    });
  }

  // =========================================
  // Back To Home
  // =========================================

  goHome(): void {
    this.router.navigate(['/']);
  }
}
