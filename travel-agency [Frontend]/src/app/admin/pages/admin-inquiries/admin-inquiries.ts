import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { InquiryService } from '../../../core/services/inquiry';

@Component({
  selector: 'app-admin-inquiries',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-inquiries.html',
  styleUrl: './admin-inquiries.css',
})
export class AdminInquiriesComponent implements OnInit {
  private inquiryService = inject(InquiryService);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  // =========================================
  // DATA
  // =========================================

  inquiries: any[] = [];
  filteredInquiries: any[] = [];

  // =========================================
  // SEARCH
  // =========================================

  searchText = '';

  // =========================================
  // LOADING
  // =========================================

  isLoading = true;

  errorMessage = '';

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {
    this.loadInquiries();
  }

  // =========================================
  // LOAD INQUIRIES
  // =========================================

  loadInquiries(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.inquiryService.getAllInquiries().subscribe({
      next: (data) => {
        console.log('Admin Inquiries:', data);

        this.inquiries = data;

        this.filteredInquiries = [...data];

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Inquiry API Error:', error);

        this.isLoading = false;

        this.inquiries = [];

        this.filteredInquiries = [];

        this.errorMessage = 'Failed to load inquiries.';

        this.toastr.error('Unable to load inquiries.', 'Error');

        this.cdr.detectChanges();
      },
    });
  }

  // =========================================
  // SEARCH
  // =========================================

  searchInquiries(): void {
    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      this.filteredInquiries = [...this.inquiries];

      return;
    }

    this.filteredInquiries = this.inquiries.filter(
      (inquiry) =>
        inquiry.fullName?.toLowerCase().includes(search) ||
        inquiry.email?.toLowerCase().includes(search) ||
        inquiry.phone?.toLowerCase().includes(search) ||
        inquiry.subject?.toLowerCase().includes(search),
    );
  }

  // =========================================
  // CLEAR SEARCH
  // =========================================

  clearSearch(): void {
    this.searchText = '';

    this.filteredInquiries = [...this.inquiries];
  }

  // =========================================
  // REFRESH
  // =========================================

  refreshInquiries(): void {
    this.loadInquiries();
  }

  // =========================================
  // DELETE INQUIRY
  // =========================================

  deleteInquiry(inquiry: any): void {
    const confirmed = confirm(`Are you sure you want to delete inquiry from "${inquiry.fullName}"?`);

    if (!confirmed) {
      return;
    }

    this.inquiryService.deleteInquiry(inquiry.id).subscribe({
      next: () => {
        console.log('Inquiry Deleted:', inquiry.id);

        this.inquiries = this.inquiries.filter((item) => item.id !== inquiry.id);

        this.filteredInquiries = this.filteredInquiries.filter((item) => item.id !== inquiry.id);

        this.toastr.success('Inquiry deleted successfully.', 'Deleted');

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Delete Inquiry Error:', error);

        this.toastr.error('Failed to delete inquiry.', 'Delete Failed');

        this.cdr.detectChanges();
      },
    });
  }
}
