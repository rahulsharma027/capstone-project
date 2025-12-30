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
          <li *ngIf="isAdmin"><a routerLink="/admin" class="admin-link">⚙️ Admin</a></li>
          <li *ngIf="!isLoggedIn"><a routerLink="/login">Login</a></li>
          <li *ngIf="!isLoggedIn"><a routerLink="/signup">Signup</a></li>
          <li *ngIf="isLoggedIn">
            <span class="user-name">{{ userName }}</span>
          </li>
          <li *ngIf="isLoggedIn"><a (click)="logout()" style="cursor: pointer;">Logout</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .admin-link {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 8px 15px !important;
      border-radius: 20px;
      font-weight: 600;
      color: white !important;
    }
    .admin-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
    }
    .user-name {
      color: #e94560;
      font-weight: 600;
      padding: 0 10px;
    }
  `]
})
export class NavbarComponent {
  isLoggedIn = false;
  isAdmin = false;
  userName = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.roles?.includes('ROLE_ADMIN') || false;
      this.userName = user?.username || '';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
