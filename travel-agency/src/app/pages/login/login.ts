import { CommonModule } from '@angular/common';

import { Component, inject } from '@angular/core';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})
export class Login {

  // =========================================
  // SERVICES
  // =========================================

  private fb = inject(NonNullableFormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  private toastr = inject(ToastrService);


  // =========================================
  // STATES
  // =========================================

  isLoading = false;

  errorMessage = '';


  // =========================================
  // LOGIN FORM
  // =========================================

  loginForm = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]

  });


  // =========================================
  // EMAIL GETTER
  // =========================================

  get email() {

    return this.loginForm.controls.email;

  }


  // =========================================
  // PASSWORD GETTER
  // =========================================

  get password() {

    return this.loginForm.controls.password;

  }


  // =========================================
  // SUBMIT
  // =========================================

  onSubmit(): void {

    // Clear previous error

    this.errorMessage = '';


    // =========================================
    // VALIDATION
    // =========================================

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      this.toastr.warning(
        'Please enter valid email and password.',
        'Validation Error'
      );

      return;

    }


    // =========================================
    // LOADING
    // =========================================

    this.isLoading = true;


    // =========================================
    // LOGIN DATA
    // =========================================

    const loginData =
      this.loginForm.getRawValue();


    console.log(
      'Login Data:',
      loginData
    );


    // =========================================
    // LOGIN API
    // =========================================

    this.authService
      .login(loginData)
      .subscribe({

        // =====================================
        // SUCCESS
        // =====================================

        next: (response) => {

          console.log(
            'Login Response:',
            response
          );


          this.isLoading = false;


          // ===================================
          // CHECK API SUCCESS
          // ===================================

          if (response.isSuccess) {


            // ================================
            // SAVE USER
            // ================================

            this.authService.saveUser(
              response
            );


            this.toastr.success(
              'Login successful!',
              'Welcome'
            );


            // ================================
            // GET RETURN URL
            // ================================

            const returnUrl =
              this.route.snapshot
                .queryParamMap
                .get('returnUrl');


            console.log(
              'Return URL:',
              returnUrl
            );


            // ================================
            // REDIRECT
            // ================================

            if (returnUrl) {

              this.router.navigateByUrl(
                returnUrl
              );

            } else {

              this.router.navigate(['/']);

            }

          }

          // ===================================
          // API FAILED
          // ===================================

          else {

            this.errorMessage =
              response.message;


            this.toastr.error(
              response.message,
              'Login Failed'
            );

          }

        },


        // =====================================
        // API ERROR
        // =====================================

        error: (err) => {

          console.error(
            'Login Error:',
            err
          );


          this.isLoading = false;


          this.errorMessage =
            err?.error?.message ||
            'Invalid email or password.';


          this.toastr.error(
            this.errorMessage,
            'Login Failed'
          );

        }

      });

  }

}