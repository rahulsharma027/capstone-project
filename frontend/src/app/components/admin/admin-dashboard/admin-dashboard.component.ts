import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ShowService } from '../../services/show.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-dashboard">
      <div class="container">
        <h1>Admin Dashboard</h1>
        
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">🎬</div>
            <div class="stat-content">
              <h3>Total Movies</h3>
              <p class="stat-number">{{ totalMovies }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🎭</div>
            <div class="stat-content">
              <h3>Total Theaters</h3>
              <p class="stat-number">{{ totalTheaters }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🎟️</div>
            <div class="stat-content">
              <h3>Total Shows</h3>
              <p class="stat-number">{{ totalShows }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-content">
              <h3>Total Bookings</h3>
              <p class="stat-number">{{ totalBookings }}</p>
            </div>
          </div>
        </div>

        <div class="admin-actions">
          <h2>Quick Actions</h2>
          <div class="actions-grid">
            <a routerLink="/admin/movies" class="action-card">
              <div class="action-icon">🎬</div>
              <h3>Manage Movies</h3>
              <p>Add, edit, or delete movies</p>
            </a>
            
            <a routerLink="/admin/theaters" class="action-card">
              <div class="action-icon">🎭</div>
              <h3>Manage Theaters</h3>
              <p>Add, edit, or delete theaters</p>
            </a>
            
            <a routerLink="/admin/shows" class="action-card">
              <div class="action-icon">🎟️</div>
              <h3>Manage Shows</h3>
              <p>Create and manage movie shows</p>
            </a>
            
            <a routerLink="/admin/bookings" class="action-card">
              <div class="action-icon">📋</div>
              <h3>View Bookings</h3>
              <p>See all customer bookings</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 40px 0;
    }
    h1 {
      color: #1a1a2e;
      margin-bottom: 40px;
      font-size: 2.5rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 60px;
    }
    .stat-card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .stat-icon {
      font-size: 3rem;
    }
    .stat-content h3 {
      color: #666;
      font-size: 0.9rem;
      margin: 0 0 10px 0;
      font-weight: normal;
    }
    .stat-number {
      color: #1a1a2e;
      font-size: 2rem;
      font-weight: bold;
      margin: 0;
    }
    .admin-actions {
      margin-top: 40px;
    }
    .admin-actions h2 {
      color: #1a1a2e;
      margin-bottom: 30px;
      font-size: 1.8rem;
    }
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    .action-card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      text-decoration: none;
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }
    .action-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    .action-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }
    .action-card h3 {
      color: #1a1a2e;
      margin: 15px 0 10px 0;
      font-size: 1.3rem;
    }
    .action-card p {
      color: #666;
      margin: 0;
      font-size: 0.9rem;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  totalMovies = 0;
  totalTheaters = 0;
  totalShows = 0;
  totalBookings = 0;

  constructor(
    private movieService: MovieService,
    private showService: ShowService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => this.totalMovies = movies.length,
      error: (error) => console.error('Error loading movies:', error)
    });

    this.showService.getAllShows().subscribe({
      next: (shows) => this.totalShows = shows.length,
      error: (error) => console.error('Error loading shows:', error)
    });

    // Add API calls for theaters and bookings when endpoints are available
    this.totalTheaters = 5; // Placeholder
    this.totalBookings = 0; // Placeholder
  }
}
