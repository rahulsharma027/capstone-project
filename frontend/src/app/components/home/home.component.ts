import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="hero">
        <h1>Welcome to Movie Ticket Booking</h1>
        <p>Book your favorite movies online</p>
        <button class="btn btn-primary" routerLink="/movies">Browse Movies</button>
      </div>

      <section class="featured-section">
        <h2>Featured Movies</h2>
        <div class="movie-grid">
          <div class="card" *ngFor="let movie of featuredMovies">
            <img [src]="movie.posterUrl || 'assets/placeholder.jpg'" [alt]="movie.title" class="movie-poster">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.genre }} | {{ movie.language }}</p>
            <p>⭐ {{ movie.rating }}/10</p>
            <button class="btn btn-primary" [routerLink]="['/movies', movie.id]">View Details</button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
      margin-bottom: 40px;
    }
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 20px;
    }
    .hero p {
      font-size: 1.5rem;
      margin-bottom: 30px;
    }
    .featured-section {
      margin-top: 40px;
    }
    .featured-section h2 {
      margin-bottom: 20px;
      color: #1a1a2e;
    }
    .movie-poster {
      width: 100%;
      height: 350px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getActiveMovies().subscribe({
      next: (movies) => {
        this.featuredMovies = movies.slice(0, 6);
      },
      error: (error) => console.error('Error loading movies:', error)
    });
  }
}
