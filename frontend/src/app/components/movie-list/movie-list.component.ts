import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <h1>Movies</h1>
      
      <div class="filters">
        <div class="filter-group">
          <label>Genre:</label>
          <select [(ngModel)]="selectedGenre" (change)="onFilterChange()">
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Language:</label>
          <select [(ngModel)]="selectedLanguage" (change)="onFilterChange()">
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Malayalam">Malayalam</option>
          </select>
        </div>
        
        <div class="filter-group search-group">
          <input type="text" [(ngModel)]="searchQuery" (input)="onSearch()" placeholder="Search movies...">
        </div>
      </div>

      <div class="spinner" *ngIf="loading"></div>

      <div class="movie-grid" *ngIf="!loading">
        <div class="card" *ngFor="let movie of movies">
          <img [src]="movie.posterUrl || 'assets/placeholder.jpg'" [alt]="movie.title" class="movie-poster">
          <h3>{{ movie.title }}</h3>
          <p class="movie-info">{{ movie.genre }} | {{ movie.language }}</p>
          <p class="movie-info">⏱️ {{ movie.duration }} mins</p>
          <p class="movie-rating">⭐ {{ movie.rating }}/10</p>
          <button class="btn btn-primary" [routerLink]="['/movies', movie.id]">Book Now</button>
        </div>
      </div>

      <div *ngIf="!loading && movies.length === 0" class="no-results">
        <p>No movies found</p>
      </div>
    </div>
  `,
  styles: [`
    .filters {
      display: flex;
      gap: 20px;
      margin: 30px 0;
      flex-wrap: wrap;
    }
    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .filter-group label {
      font-weight: 500;
      color: #1a1a2e;
    }
    .filter-group select,
    .filter-group input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      min-width: 200px;
    }
    .search-group input {
      min-width: 300px;
    }
    .movie-poster {
      width: 100%;
      height: 350px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .movie-info {
      color: #666;
      margin: 5px 0;
    }
    .movie-rating {
      font-weight: bold;
      color: #e94560;
      margin: 10px 0;
    }
    .no-results {
      text-align: center;
      padding: 40px;
      color: #666;
      font-size: 1.2rem;
    }
  `]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  selectedGenre = '';
  selectedLanguage = '';
  searchQuery = '';
  loading = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.movieService.getActiveMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    if (this.selectedGenre && this.selectedLanguage) {
      this.loading = true;
      this.movieService.filterMovies(this.selectedGenre, this.selectedLanguage).subscribe({
        next: (movies) => {
          this.movies = movies;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error filtering movies:', error);
          this.loading = false;
        }
      });
    } else if (this.selectedGenre) {
      this.loading = true;
      this.movieService.getMoviesByGenre(this.selectedGenre).subscribe({
        next: (movies) => {
          this.movies = movies;
          this.loading = false;
        }
      });
    } else if (this.selectedLanguage) {
      this.loading = true;
      this.movieService.getMoviesByLanguage(this.selectedLanguage).subscribe({
        next: (movies) => {
          this.movies = movies;
          this.loading = false;
        }
      });
    } else {
      this.loadMovies();
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.movieService.searchMovies(this.searchQuery).subscribe({
        next: (movies) => {
          this.movies = movies;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching movies:', error);
          this.loading = false;
        }
      });
    } else {
      this.loadMovies();
    }
  }
}
