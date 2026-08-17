import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { InquiryService } from '../../../core/services/inquiry';

@Component({
  selector: 'app-admin-inquiry-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-inquiries-details.html',
  styleUrl: './admin-inquiries-details.css',
})
export class AdminInquiryDetailsComponent implements OnInit {

  // =========================================
  // SERVICES
  // =========================================

  private inquiryService = inject(InquiryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  // =========================================
  // DATA
  // =========================================

  inquiry: any = null;

  inquiryId = 0;

  // =========================================
  // STATES
  // =========================================

  isLoading = true;

  errorMessage = '';

  // =========================================
  // INIT
  // =========================================

  ngOnInit(): void {
    this.inquiryId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Inquiry Details ID:', this.inquiryId);

    if (!this.inquiryId) {
      this.errorMessage = 'Invalid inquiry ID.';
      this.isLoading = false;

      this.toastr.error(
        'Invalid inquiry ID.',
        'Error'
      );

      return;
    }

    this.loadInquiry();
  }

  // =========================================
  // LOAD INQUIRY
  // =========================================

  loadInquiry(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.inquiryService
      .getInquiryById(this.inquiryId)
      .subscribe({

        next: (data) => {

          console.log(
            'Inquiry Details API:',
            data
          );

          this.inquiry = data;

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Inquiry Details Error:',
            error
          );

          this.isLoading = false;

          this.inquiry = null;

          this.errorMessage =
            'Failed to load inquiry details.';

          this.toastr.error(
            'Unable to load inquiry details.',
            'Error'
          );

          this.cdr.detectChanges();
        }

      });
  }

  // =========================================
  // DELETE INQUIRY
  // =========================================

  deleteInquiry(): void {

    if (!this.inquiry) {
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to delete inquiry from "${this.inquiry.fullName}"?`
    );

    if (!confirmed) {
      return;
    }

    this.inquiryService
      .deleteInquiry(this.inquiry.id)
      .subscribe({

        next: () => {

          console.log(
            'Inquiry Deleted:',
            this.inquiry.id
          );

          this.toastr.success(
            'Inquiry deleted successfully.',
            'Deleted'
          );

          this.router.navigate(
            ['/admin/inquiries']
          );
        },

        error: (error) => {

          console.error(
            'Delete Inquiry Error:',
            error
          );

          this.toastr.error(
            'Failed to delete inquiry.',
            'Delete Failed'
          );

          this.cdr.detectChanges();
        }

      });
  }

  // =========================================
  // BACK
  // =========================================

  goBack(): void {
    this.router.navigate(
      ['/admin/inquiries']
    );
  }

  // =========================================
  // EMAIL
  // =========================================

  sendEmail(): void {

    if (!this.inquiry?.email) {
      return;
    }

    window.location.href =
      `mailto:${this.inquiry.email}`;
  }

  // =========================================
  // PHONE
  // =========================================

  callCustomer(): void {

    if (!this.inquiry?.phone) {
      return;
    }

    window.location.href =
      `tel:${this.inquiry.phone}`;
  }

}