import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  isLoading = false;
  errorMessage = '';

  registerForm = this.fb.group({

    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(50)
      ]
    ],

    lastName: [
      '',
      [
        Validators.required,
        Validators.maxLength(50)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    confirmPassword: [
      '',
      [
        Validators.required
      ]
    ]

  }, {
    validators: this.passwordMatchValidator
  });


  // =========================
  // Getters
  // =========================

  get firstName() {
    return this.registerForm.controls.firstName;
  }

  get lastName() {
    return this.registerForm.controls.lastName;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get phoneNumber() {
    return this.registerForm.controls.phoneNumber;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }


  // =========================
  // Password Match Validator
  // =========================

  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword =
      control.get('confirmPassword')?.value;

    if (
      password &&
      confirmPassword &&
      password !== confirmPassword
    ) {
      control.get('confirmPassword')?.setErrors({
        mismatch: true
      });

      return {
        mismatch: true
      };
    }

    return null;
  }


  // =========================
  // Submit
  // =========================

  onSubmit(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      this.toastr.warning(
        'Please fill all fields correctly.',
        'Validation Error'
      );

      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.registerForm.getRawValue();

    // confirmPassword backend DTO માં નથી મોકલવાનું
    const registerData = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      password: formValue.password
    };

    this.authService
      .register(registerData)
      .subscribe({

        next: (response) => {

          this.isLoading = false;

          if (response.isSuccess) {

            this.toastr.success(
              'Registration completed successfully!',
              'Success'
            );

            this.router.navigate(['/login']);

          } else {

            this.errorMessage = response.message;

            this.toastr.error(
              response.message,
              'Registration Failed'
            );

          }

        },

        error: (err) => {

          this.isLoading = false;

          this.errorMessage =
            err?.error?.message ||
            'Registration failed. Please try again.';

          this.toastr.error(
            this.errorMessage,
            'Registration Failed'
          );

        }

      });
  }

}