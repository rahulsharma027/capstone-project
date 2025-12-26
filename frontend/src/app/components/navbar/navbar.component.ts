import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <div class="nav-container">
        <a routerLink="/" class="logo">🎬 MovieTicket</a>
        <ul>
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/movies">Movies</a></li>
          <li *ngIf="isLoggedIn"><a routerLink="/my-bookings">My Bookings</a></li>
          <li *ngIf="!isLoggedIn"><a routerLink="/login">Login</a></li>
          <li *ngIf="!isLoggedIn"><a routerLink="/signup">Signup</a></li>
          <li *ngIf="isLoggedIn"><a (click)="logout()" style="cursor: pointer;">Logout</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
