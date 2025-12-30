import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="auth-card">
        <h2>Sign Up</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" [(ngModel)]="signupData.fullName" name="fullName" required>
          </div>
          <div class="form-group">
            <label>Username</label>
            <input type="text" [(ngModel)]="signupData.username" name="username" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="signupData.email" name="email" required>
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" [(ngModel)]="signupData.phoneNumber" name="phoneNumber">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="signupData.password" name="password" required>
          </div>
          <div class="alert alert-success" *ngIf="success">{{ success }}</div>
          <div class="alert alert-error" *ngIf="error">{{ error }}</div>
          <button type="submit" class="btn btn-primary" [disabled]="loading">
            {{ loading ? 'Signing up...' : 'Sign Up' }}
          </button>
        </form>
        <p class="auth-link">
          Already have an account? <a routerLink="/login">Login</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-card {
      max-width: 400px;
      margin: 60px auto;
      padding: 40px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .auth-card h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #1a1a2e;
    }
    .auth-card button {
      width: 100%;
    }
    .auth-link {
      text-align: center;
      margin-top: 20px;
    }
    .auth-link a {
      color: #e94560;
      text-decoration: none;
    }
  `]
})
export class SignupComponent {
  signupData = {
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: ''
  };
  error = '';
  success = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.success = '';
    
    this.authService.signup(this.signupData).subscribe({
      next: () => {
        this.success = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.error = err.error.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
