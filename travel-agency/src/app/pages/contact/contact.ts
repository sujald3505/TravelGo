import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { InquiryService } from '../../core/services/inquiry';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  private toastr = inject(ToastrService);
  private inquiryService = inject(InquiryService);

  contactInfo = [
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Our Office',
      value: 'Rajkot, Gujarat, India'
    },
    {
      icon: 'fa-solid fa-phone',
      title: 'Call Us',
      value: '+91 95581 27132'
    },
    {
      icon: 'fa-solid fa-envelope',
      title: 'Email',
      value: 'sujald3505@gmail.com'
    }
  ];

  workingHours = [
    {
      day: 'Monday - Friday',
      time: '09:00 AM - 06:00 PM'
    },
    {
      day: 'Saturday',
      time: '09:00 AM - 02:00 PM'
    },
    {
      day: 'Sunday',
      time: 'Closed'
    }
  ];

  name = '';
  email = '';
  phone = '';
  subject = '';
  message = '';

  isSubmitting = false;

  // =========================================
  // SUBMIT INQUIRY
  // =========================================

  submitForm(): void {

    // Validation
    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.message.trim()
    ) {

      this.toastr.warning(
        'Please fill all required fields.',
        'Validation'
      );

      return;
    }

    // Prevent multiple submit
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    // =========================================
    // Inquiry Payload
    // =========================================

    const inquiryData = {
      name: this.name.trim(),
      email: this.email.trim(),
      phone: this.phone.trim(),
      subject: this.subject.trim(),
      message: this.message.trim()
    };

    console.log('Inquiry Payload:', inquiryData);

    // =========================================
    // API CALL
    // =========================================

    this.inquiryService.createInquiry(inquiryData).subscribe({

      // =========================================
      // SUCCESS
      // =========================================

      next: (response) => {

        console.log(
          'Inquiry Created:',
          response
        );

        this.isSubmitting = false;

        this.toastr.success(
          'Thank you! Our travel expert will contact you shortly.',
          'Inquiry Sent'
        );

        // Reset form
        this.resetForm();
      },

      // =========================================
      // ERROR
      // =========================================

      error: (error) => {

        console.error(
          'Inquiry API Error:',
          error
        );

        this.isSubmitting = false;

        this.toastr.error(
          error?.error?.message ||
          'Failed to send inquiry. Please try again.',
          'Submission Failed'
        );
      }

    });
  }

  // =========================================
  // RESET FORM
  // =========================================

  resetForm(): void {

    this.name = '';
    this.email = '';
    this.phone = '';
    this.subject = '';
    this.message = '';
  }
}