import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/movie.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h1>My Bookings</h1>
      
      <div class="spinner" *ngIf="loading"></div>

      <div *ngIf="!loading && bookings.length > 0">
        <div class="booking-card card" *ngFor="let booking of bookings">
          <div class="booking-header">
            <h2>{{ booking.show.movie.title }}</h2>
            <span class="booking-status" [class.cancelled]="booking.status === 'CANCELLED'">
              {{ booking.status }}
            </span>
          </div>
          
          <div class="booking-details">
            <p><strong>Reference:</strong> {{ booking.bookingReference }}</p>
            <p><strong>Theater:</strong> {{ booking.show.theater.name }}</p>
            <p><strong>Location:</strong> {{ booking.show.theater.city }}</p>
            <p><strong>Show Time:</strong> {{ booking.show.showTime | date:'medium' }}</p>
            <p><strong>Seats:</strong> {{ booking.seatNumbers }}</p>
            <p><strong>Number of Seats:</strong> {{ booking.numberOfSeats }}</p>
            <p><strong>Total Amount:</strong> ₹{{ booking.totalAmount }}</p>
            <p><strong>Booking Date:</strong> {{ booking.bookingDate | date:'medium' }}</p>
          </div>

          <button 
            class="btn btn-secondary" 
            (click)="cancelBooking(booking.id)"
            *ngIf="booking.status === 'CONFIRMED'"
            [disabled]="cancelling === booking.id">
            {{ cancelling === booking.id ? 'Cancelling...' : 'Cancel Booking' }}
          </button>
        </div>
      </div>

      <div *ngIf="!loading && bookings.length === 0" class="no-bookings">
        <p>You haven't made any bookings yet</p>
        <button class="btn btn-primary" routerLink="/movies">Browse Movies</button>
      </div>
    </div>
  `,
  styles: [`
    .booking-card {
      margin-bottom: 20px;
      padding: 25px;
    }
    .booking-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f0f0;
    }
    .booking-header h2 {
      color: #1a1a2e;
      margin: 0;
    }
    .booking-status {
      padding: 5px 15px;
      border-radius: 20px;
      background-color: #4caf50;
      color: white;
      font-weight: bold;
      font-size: 0.9rem;
    }
    .booking-status.cancelled {
      background-color: #f44336;
    }
    .booking-details p {
      margin: 10px 0;
      color: #555;
    }
    .booking-card button {
      margin-top: 15px;
    }
    .no-bookings {
      text-align: center;
      padding: 60px 20px;
    }
    .no-bookings p {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 20px;
    }
  `]
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = false;
  cancelling: number | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.loading = false;
      }
    });
  }

  cancelBooking(bookingId: number): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.cancelling = bookingId;
      this.bookingService.cancelBooking(bookingId).subscribe({
        next: () => {
          this.loadBookings();
          this.cancelling = null;
        },
        error: (error) => {
          console.error('Error cancelling booking:', error);
          alert('Failed to cancel booking');
          this.cancelling = null;
        }
      });
    }
  }
}
