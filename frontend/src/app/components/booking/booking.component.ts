import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShowService } from '../../services/show.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { Show } from '../../models/movie.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container" *ngIf="show">
      <div class="booking-container">
        <h1>Book Tickets</h1>
        
        <div class="booking-details card">
          <h2>{{ show.movie.title }}</h2>
          <p><strong>Theater:</strong> {{ show.theater.name }}</p>
          <p><strong>Location:</strong> {{ show.theater.location }}, {{ show.theater.city }}</p>
          <p><strong>Show Time:</strong> {{ show.showTime | date:'medium' }}</p>
          <p><strong>Price per Ticket:</strong> ₹{{ show.price }}</p>
          <p><strong>Available Seats:</strong> {{ show.availableSeats }}</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="booking-form card">
          <div class="form-group">
            <label>Number of Seats</label>
            <input 
              type="number" 
              [(ngModel)]="numberOfSeats" 
              name="numberOfSeats" 
              min="1" 
              [max]="show.availableSeats"
              required>
          </div>
          
          <div class="form-group">
            <label>Seat Numbers (comma separated, e.g., A1, A2, A3)</label>
            <input 
              type="text" 
              [(ngModel)]="seatNumbers" 
              name="seatNumbers" 
              placeholder="A1, A2, A3"
              required>
          </div>

          <div class="total-amount">
            <h3>Total Amount: ₹{{ totalAmount }}</h3>
          </div>

          <div class="alert alert-success" *ngIf="success">
            {{ success }}
          </div>
          <div class="alert alert-error" *ngIf="error">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="loading || !isLoggedIn">
            {{ loading ? 'Processing...' : 'Confirm Booking' }}
          </button>
          
          <p class="login-warning" *ngIf="!isLoggedIn">
            Please <a routerLink="/login">login</a> to book tickets
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .booking-container {
      max-width: 800px;
      margin: 40px auto;
    }
    .booking-details {
      margin-bottom: 30px;
    }
    .booking-details h2 {
      color: #1a1a2e;
      margin-bottom: 15px;
    }
    .booking-details p {
      margin: 10px 0;
      color: #555;
    }
    .booking-form {
      padding: 30px;
    }
    .total-amount {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
      margin: 20px 0;
    }
    .total-amount h3 {
      color: #e94560;
      font-size: 1.5rem;
    }
    .login-warning {
      text-align: center;
      margin-top: 15px;
      color: #666;
    }
    .login-warning a {
      color: #e94560;
      text-decoration: none;
    }
  `]
})
export class BookingComponent implements OnInit {
  show: Show | null = null;
  numberOfSeats = 1;
  seatNumbers = '';
  loading = false;
  error = '';
  success = '';
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private showService: ShowService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    const showId = +this.route.snapshot.params['showId'];
    this.loadShow(showId);
  }

  loadShow(id: number): void {
    this.showService.getShowById(id).subscribe({
      next: (show) => {
        this.show = show;
      },
      error: (error) => {
        console.error('Error loading show:', error);
        this.error = 'Failed to load show details';
      }
    });
  }

  get totalAmount(): number {
    return this.show ? this.show.price * this.numberOfSeats : 0;
  }

  onSubmit(): void {
    if (!this.isLoggedIn) {
      this.error = 'Please login to book tickets';
      return;
    }

    if (!this.show) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    const bookingRequest = {
      showId: this.show.id,
      numberOfSeats: this.numberOfSeats,
      seatNumbers: this.seatNumbers
    };

    this.bookingService.createBooking(bookingRequest).subscribe({
      next: (booking) => {
        this.success = `Booking confirmed! Reference: ${booking.bookingReference}`;
        setTimeout(() => {
          this.router.navigate(['/my-bookings']);
        }, 2000);
      },
      error: (err) => {
        this.error = err.error.message || 'Booking failed';
        this.loading = false;
      }
    });
  }
}
