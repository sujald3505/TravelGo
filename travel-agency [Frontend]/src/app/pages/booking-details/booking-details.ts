import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BookingService } from '../../core/services/booking';
import { Booking } from '../../core/models/booking.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-details.html',
  styleUrl: './booking-details.css',
})
export class BookingDetailsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  booking!: Booking;

  isLoading = true;

  ngOnInit(): void {
    const bookingId = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Booking Id:', bookingId);

    this.bookingService.getBookingById(bookingId).subscribe({
      next: (res) => {
        console.log(res);

        this.booking = res;

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);

        this.isLoading = false;

        this.cdr.detectChanges();
      },
    });
  }
  downloadInvoice(): void {
    if (!this.booking) return;

    const doc = new jsPDF();

    // =====================================================
    // COMPANY DETAILS
    // =====================================================

    const companyName = 'TRAVELGO';
    const companyTagline = 'Travel • Explore • Enjoy';

    // અહીં તમારી actual details નાખી શકશો
    const companyMobile = '+91 95581 27132';
    const companyEmail = 'info@travelgo.com';
    const companyAddress = 'Rajkot, Gujarat, India';

    // =====================================================
    // COLORS
    // =====================================================

    const primary = [13, 110, 253];
    const dark = [33, 37, 41];
    const green = [25, 135, 84];
    const lightGray = [245, 247, 250];

    // =====================================================
    // DATE FORMAT
    // DD/MM/YYYY
    // =====================================================

    const formatDate = (date: any): string => {
      if (!date) {
        return '-';
      }

      const d = new Date(date);

      if (isNaN(d.getTime())) {
        return '-';
      }

      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();

      return `${day}/${month}/${year}`;
    };

    // =====================================================
    // CURRENCY FORMAT
    // Rs. 66,998
    // =====================================================

    const formatCurrency = (amount: number): string => {
      return `Rs. ${Number(amount || 0).toLocaleString('en-IN')}`;
    };

    // =====================================================
    // HEADER
    // =====================================================

    doc.setFillColor(primary[0], primary[1], primary[2]);

    doc.rect(0, 0, 210, 42, 'F');

    // Company Name

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(25);

    doc.setFont('helvetica', 'bold');

    doc.text(companyName, 14, 17);

    // Tagline

    doc.setFontSize(10);

    doc.setFont('helvetica', 'normal');

    doc.text(companyTagline, 14, 25);

    // Company Contact

    doc.setFontSize(9);

    doc.text(`${companyMobile}  |  ${companyEmail}`, 14, 33);

    doc.text(companyAddress, 140, 33);

    // =====================================================
    // INVOICE TITLE
    // =====================================================

    doc.setTextColor(dark[0], dark[1], dark[2]);

    doc.setFontSize(20);

    doc.setFont('helvetica', 'bold');

    doc.text('BOOKING INVOICE', 14, 57);

    // Invoice Number

    doc.setFontSize(10);

    doc.setFont('helvetica', 'normal');

    doc.text(`Invoice No: INV-${this.booking.id}`, 14, 66);

    // Booking Date

    doc.text(`Booking Date: ${formatDate(this.booking.bookingDate)}`, 125, 66);

    // =====================================================
    // CUSTOMER DETAILS BOX
    // =====================================================

    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);

    doc.roundedRect(14, 75, 182, 30, 3, 3, 'F');

    doc.setTextColor(dark[0], dark[1], dark[2]);

    doc.setFontSize(13);

    doc.setFont('helvetica', 'bold');

    doc.text('Customer Details', 20, 86);

    doc.setFontSize(10);

    doc.setFont('helvetica', 'normal');

    doc.text(`Customer: ${this.booking.userName}`, 20, 96);

    doc.text(`Booking ID: #${this.booking.id}`, 130, 96);

    // =====================================================
    // BOOKING DETAILS TABLE
    // =====================================================

    autoTable(doc, {
      startY: 115,

      head: [['Description', 'Details']],

      body: [
        ['Destination', this.booking.destinationName],

        ['Package', this.booking.packageName],

        ['Hotel', this.booking.hotelName],

        ['Travel Date', formatDate(this.booking.travelDate)],

        ['Number Of People', this.booking.numberOfPeople],

        ['Booking Status', this.booking.status],
      ],

      theme: 'grid',

      headStyles: {
        fillColor: [primary[0], primary[1], primary[2]],

        textColor: 255,

        fontStyle: 'bold',

        fontSize: 10,
      },

      bodyStyles: {
        fontSize: 10,

        textColor: [80, 80, 80],
      },

      alternateRowStyles: {
        fillColor: [248, 249, 250],
      },

      columnStyles: {
        0: {
          cellWidth: 65,
          fontStyle: 'bold',
        },

        1: {
          cellWidth: 117,
        },
      },
    });

    // =====================================================
    // PAYMENT SUMMARY
    // =====================================================

    const paymentStartY = (doc as any).lastAutoTable.finalY + 12;

    autoTable(doc, {
      startY: paymentStartY,

      head: [['Payment Summary', 'Amount']],

      body: [
        ['Package', this.booking.packageName],

        ['Hotel', this.booking.hotelName],

        ['Number Of People', this.booking.numberOfPeople],

        ['Total Amount', formatCurrency(this.booking.totalAmount)],
      ],

      theme: 'grid',

      headStyles: {
        fillColor: [green[0], green[1], green[2]],

        textColor: 255,

        fontStyle: 'bold',

        fontSize: 10,
      },

      bodyStyles: {
        fontSize: 10,

        textColor: [80, 80, 80],
      },

      alternateRowStyles: {
        fillColor: [248, 249, 250],
      },

      columnStyles: {
        0: {
          cellWidth: 65,
        },

        1: {
          cellWidth: 117,
        },
      },
    });

    // =====================================================
    // PAYMENT STATUS
    // =====================================================

    const footerY = (doc as any).lastAutoTable.finalY + 20;

    doc.setDrawColor(220, 220, 220);

    doc.line(14, footerY, 196, footerY);

    doc.setFontSize(13);

    doc.setFont('helvetica', 'bold');

    doc.setTextColor(green[0], green[1], green[2]);

    doc.text(`Payment Status: ${this.booking.status}`, 14, footerY + 12);

    // =====================================================
    // THANK YOU MESSAGE
    // =====================================================

    doc.setFontSize(10);

    doc.setFont('helvetica', 'normal');

    doc.setTextColor(110, 110, 110);

    doc.text('Thank you for choosing TravelGo.', 14, footerY + 25);

    doc.text('We wish you a happy and safe journey!', 14, footerY + 32);

    // =====================================================
    // COMPANY FOOTER
    // =====================================================

    doc.setFontSize(8);

    doc.setTextColor(140, 140, 140);

    doc.text(`${companyName} | ${companyMobile} | ${companyEmail}`, 14, 285);

    doc.text(companyAddress, 14, 291);

    // =====================================================
    // SAVE PDF
    // =====================================================

    doc.save(`TravelGo-Invoice-${this.booking.id}.pdf`);
  }
}
