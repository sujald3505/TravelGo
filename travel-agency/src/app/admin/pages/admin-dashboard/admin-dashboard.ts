import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

interface DashboardBooking {
  id: number;
  userName: string;
  destinationName: string;
  packageName: string;
  hotelName: string;
  totalAmount: number;
  status: string;
}

interface DashboardResponse {
  totalUsers: number;
  totalDestinations: number;
  totalPackages: number;
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  recentBookings: DashboardBooking[];
}

interface DashboardStat {
  title: string;
  value: string | number;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  isLoading = true;
  errorMessage = '';

  stats: DashboardStat[] = [];

  recentBookings: DashboardBooking[] = [];

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<DashboardResponse>(`${environment.apiUrl}/Dashboard`).subscribe({
      next: (response) => {
        console.log('Admin Dashboard API:', response);

        // ==============================
        // Dashboard Statistics
        // ==============================

        this.stats = [
          {
            title: 'Total Users',
            value: response.totalUsers,
            icon: '👥',
            route: '/admin/users',
          },
          {
            title: 'Destinations',
            value: response.totalDestinations,
            icon: '🌍',
            route: '/admin/destinations',
          },
          {
            title: 'Packages',
            value: response.totalPackages,
            icon: '🎒',
            route: '/admin/packages',
          },
          {
            title: 'Hotels',
            value: response.totalHotels,
            icon: '🏨',
            route: '/admin/hotels',
          },
          {
            title: 'Bookings',
            value: response.totalBookings,
            icon: '📋',
            route: '/admin/bookings',
          },
          {
            title: 'Total Revenue',
            value: this.formatCurrency(response.totalRevenue),
            icon: '💰',
            route: '/admin/bookings',
          },
        ];

        // ==============================
        // Recent Bookings
        // ==============================

        this.recentBookings = response.recentBookings ?? [];

        console.log('Recent Bookings:', this.recentBookings);

        this.isLoading = false;

        // ==============================
        // Force Angular UI Update
        // ==============================

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Dashboard API Error:', error);

        this.errorMessage = 'Unable to load dashboard data.';

        this.isLoading = false;

        this.cdr.detectChanges();
      },
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount ?? 0);
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';

      case 'pending':
        return 'status-pending';

      case 'cancelled':
      case 'canceled':
        return 'status-cancelled';

      default:
        return '';
    }
  }

  getCustomerInitial(name: string): string {
    if (!name) {
      return 'U';
    }

    return name.charAt(0).toUpperCase();
  }
}
