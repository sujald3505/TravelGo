import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';

// =========================================
// Public Pages
// =========================================

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Destinations } from './pages/destinations/destinations';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Packages } from './pages/packages/packages';
import { Register } from './pages/register/register';

import { HotelComponent } from './pages/hotel/hotel';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings';
import { PaymentComponent } from './pages/payment/payment';

// =========================================
// Admin
// =========================================

import { AdminLoginComponent } from './admin/admin-login/admin-login';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  // =========================================
  // PUBLIC WEBSITE
  // =========================================

  {
    path: '',
    component: Home,
  },

  {
    path: 'about',
    component: About,
  },

  {
    path: 'contact',
    component: Contact,
  },

  {
    path: 'destinations',
    component: Destinations,
  },

  {
    path: 'packages/destination/:destinationId',
    component: Packages,
  },

  {
    path: 'packages/details/:id',
    loadComponent: () =>
      import('./pages/package-details/package-details').then((m) => m.PackageDetails),
  },

  {
    path: 'hotels/destination/:destinationId/package/:packageId',
    component: HotelComponent,
  },

  {
    path: 'hotels/:id/package/:packageId',
    component: HotelDetailsComponent,
  },

  // =========================================
  // Booking
  // =========================================

  {
    path: 'booking/:destinationId/:packageId/:hotelId',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/booking/booking').then((m) => m.BookingComponent),
  },

  {
    path: 'my-bookings',
    canActivate: [authGuard],
    component: MyBookingsComponent,
  },

  {
    path: 'booking-details/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/booking-details/booking-details').then((m) => m.BookingDetailsComponent),
  },

  {
    path: 'payment',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/payment/payment').then((m) => m.PaymentComponent),
  },

  // =========================================
  // User Authentication
  // =========================================

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'register',
    component: Register,
  },

  // =========================================
  // ADMIN PANEL
  // =========================================

  {
    path: 'admin',

    children: [
      // ---------------------------------------
      // Admin Login
      // ---------------------------------------

      {
        path: 'login',
        component: AdminLoginComponent,
      },

      // ---------------------------------------
      // Admin Layout
      // ---------------------------------------

      {
        path: '',
        component: AdminLayoutComponent,

        children: [
          // Dashboard
          {
            path: 'dashboard',
            component: AdminDashboardComponent,
          },

          {
            path: 'destinations',
            loadComponent: () =>
              import('./admin/pages/admin-destinations/admin-destinations').then(
                (m) => m.AdminDestinationsComponent,
              ),
          },
          {
            path: 'destinations/add',
            loadComponent: () =>
              import('./admin/pages/admin-destination-form/admin-destination-form').then(
                (m) => m.AdminDestinationFormComponent,
              ),
          },
          {
            path: 'destinations/view/:id',
            loadComponent: () =>
              import('./admin/pages/admin-destination-details/admin-destination-details').then(
                (m) => m.AdminDestinationDetailsComponent,
              ),
          },
          {
            path: 'destinations/edit/:id',
            loadComponent: () =>
              import('./admin/pages/admin-destination-edit/admin-destination-edit').then(
                (m) => m.AdminDestinationEditComponent,
              ),
          },

          {
            path: 'packages',
            loadComponent: () =>
              import('./admin/pages/admin-package/admin-package').then(
                (m) => m.AdminPackageComponent,
              ),
          },

          {
            path: 'packages/add',
            loadComponent: () =>
              import('./admin/pages/admin-package-add/admin-package-add').then(
                (m) => m.AdminPackageAddComponent,
              ),
          },
          {
            path: 'packages/view/:id',
            loadComponent: () =>
              import('./admin/pages/admin-package-details/admin-package-details').then(
                (m) => m.AdminPackageDetailsComponent,
              ),
          },
          {
            path: 'packages/edit/:id',
            loadComponent: () =>
              import('./admin/pages/admin-package-edit/admin-package-edit').then(
                (m) => m.AdminPackageEditComponent,
              ),
          },

          {
            path: 'hotels',
            loadComponent: () =>
              import('./admin/pages/admin-hotel/admin-hotel').then((m) => m.AdminHotelComponent),
          },
          {
            path: 'hotels/add',
            loadComponent: () =>
              import('./admin/pages/admin-hotel-add/admin-hotel-add').then(
                (m) => m.AdminHotelAddComponent,
              ),
          },
          {
            path: 'hotels/view/:id',
            loadComponent: () =>
              import('./admin/pages/admin-hotel-add-details/admin-hotel-add-details').then(
                (m) => m.AdminHotelDetailsComponent,
              ),
          },
          {
            path: 'hotels/edit/:id',
            loadComponent: () =>
              import('./admin/pages/admin-hotel-edit/admin-hotel-edit').then(
                (m) => m.AdminHotelEditComponent,
              ),
          },
          {
            path: 'bookings',
            loadComponent: () =>
              import('./admin/pages/admin-bookings/admin-bookings').then(
                (m) => m.AdminBookingsComponent,
              ),
          },
          {
            path: 'bookings/view/:id',
            loadComponent: () =>
              import('./admin/pages/admin-booking-details/admin-booking-details').then(
                (m) => m.AdminBookingDetailsComponent,
              ),
          },
          {
            path: 'users',
            loadComponent: () =>
              import('./admin/pages/admin-users/admin-users').then((m) => m.AdminUsersComponent),
          },
          {
            path: 'inquiries',
            loadComponent: () =>
              import('./admin/pages/admin-inquiries/admin-inquiries').then(
                (m) => m.AdminInquiriesComponent,
              ),
          },
          {
            path: 'inquiries/view/:id',
            loadComponent: () =>
              import('./admin/pages/admin-inquiries-details/admin-inquiries-details').then(
                (m) => m.AdminInquiryDetailsComponent,
              ),
          },
        ],
      },
    ],
  },

  // =========================================
  // 404 - Not Found
  // =========================================

  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
