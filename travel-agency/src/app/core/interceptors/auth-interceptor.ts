import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // =========================================
  // LOGIN / REGISTER
  // =========================================
  // Login અને Register API પર existing token
  // Authorization header તરીકે મોકલવો નહીં.
  // =========================================

  if (req.url.includes('/Auth/login') || req.url.includes('/Auth/register')) {
    return next(req);
  }

  // =========================================
  // GET TOKEN
  // =========================================

  const token = authService.getToken();

  // =========================================
  // ADD AUTHORIZATION HEADER
  // =========================================

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clonedRequest);
  }

  // =========================================
  // NO TOKEN
  // =========================================

  return next(req);
};
