import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-admin-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="admin-movies">
      <div class="container">
        <div class="header">
          <h1>Manage Movies</h1>
          <button class="btn btn-primary" (click)="showAddForm()">+ Add New Movie</button>
        </div>

        <!-- Add/Edit Form -->
        <div class="movie-form" *ngIf="showForm">
          <h2>{{ editMode ? 'Edit Movie' : 'Add New Movie' }}</h2>
          <form (ngSubmit)="saveMovie()">
            <div class="form-row">
              <div class="form-group">
                <label>Title *</label>
                <input type="text" [(ngModel)]="currentMovie.title" name="title" required>
              </div>
              <div class="form-group">
                <label>Genre *</label>
                <select [(ngModel)]="currentMovie.genre" name="genre" required>
                  <option value="">Select Genre</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Language *</label>
                <input type="text" [(ngModel)]="currentMovie.language" name="language" required>
              </div>
              <div class="form-group">
                <label>Duration (mins) *</label>
                <input type="number" [(ngModel)]="currentMovie.duration" name="duration" required>
              </div>
            </div>

            <div class="form-group">
              <label>Description *</label>
              <textarea [(ngModel)]="currentMovie.description" name="description" rows="3" required></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Director *</label>
                <input type="text" [(ngModel)]="currentMovie.director" name="director" required>
              </div>
              <div class="form-group">
                <label>Rating *</label>
                <input type="number" step="0.1" min="0" max="10" [(ngModel)]="currentMovie.rating" name="rating" required>
              </div>
            </div>

            <div class="form-group">
              <label>Cast *</label>
              <input type="text" [(ngModel)]="currentMovie.cast" name="cast" placeholder="Actor 1, Actor 2, Actor 3" required>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Poster URL</label>
                <input type="url" [(ngModel)]="currentMovie.posterUrl" name="posterUrl">
              </div>
              <div class="form-group">
                <label>Trailer URL</label>
                <input type="url" [(ngModel)]="currentMovie.trailerUrl" name="trailerUrl">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Release Date *</label>
                <input type="datetime-local" [(ngModel)]="currentMovie.releaseDate" name="releaseDate" required>
              </div>
              <div class="form-group">
                <label>Status</label>
                <select [(ngModel)]="currentMovie.isActive" name="isActive">
                  <option [value]="true">Active</option>
                  <option [value]="false">Inactive</option>
                </select>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">{{ editMode ? 'Update' : 'Add' }} Movie</button>
              <button type="button" class="btn btn-secondary" (click)="cancelForm()">Cancel</button>
            </div>
          </form>
        </div>

        <!-- Movies Table -->
        <div class="movies-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Language</th>
                <th>Duration</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let movie of movies">
                <td>{{ movie.id }}</td>
                <td>{{ movie.title }}</td>
                <td>{{ movie.genre }}</td>
                <td>{{ movie.language }}</td>
                <td>{{ movie.duration }} mins</td>
                <td>⭐ {{ movie.rating }}</td>
                <td>
                  <span class="badge" [class.active]="movie.isActive" [class.inactive]="!movie.isActive">
                    {{ movie.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <button class="btn-icon" (click)="editMovie(movie)" title="Edit">✏️</button>
                  <button class="btn-icon" (click)="deleteMovie(movie.id)" title="Delete">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-movies {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 40px 0;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    h1 {
      color: #1a1a2e;
      font-size: 2rem;
      margin: 0;
    }
    .movie-form {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    .movie-form h2 {
      margin-top: 0;
      color: #1a1a2e;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #555;
      font-weight: 500;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }
    .form-group textarea {
      resize: vertical;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .movies-table {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background: #f8f9fa;
      color: #1a1a2e;
      font-weight: 600;
    }
    .badge {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .badge.active {
      background: #d4edda;
      color: #155724;
    }
    .badge.inactive {
      background: #f8d7da;
      color: #721c24;
    }
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
    }
    .btn-primary {
      background: #e94560;
      color: white;
    }
    .btn-primary:hover {
      background: #d63651;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn-secondary:hover {
      background: #5a6268;
    }
    .btn-icon {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 5px 10px;
    }
    .btn-icon:hover {
      opacity: 0.7;
    }
  `]
})
export class AdminMoviesComponent implements OnInit {
  movies: Movie[] = [];
  showForm = false;
  editMode = false;
  currentMovie: any = this.getEmptyMovie();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => this.movies = movies,
      error: (error) => console.error('Error loading movies:', error)
    });
  }

  getEmptyMovie(): any {
    return {
      title: '',
      description: '',
      genre: '',
      language: '',
      duration: 120,
      director: '',
      cast: '',
      posterUrl: '',
      trailerUrl: '',
      rating: 8.0,
      releaseDate: '',
      isActive: true
    };
  }

  showAddForm(): void {
    this.showForm = true;
    this.editMode = false;
    this.currentMovie = this.getEmptyMovie();
  }

  editMovie(movie: Movie): void {
    this.showForm = true;
    this.editMode = true;
    this.currentMovie = { ...movie };
  }

  saveMovie(): void {
    if (this.editMode) {
      this.movieService.updateMovie(this.currentMovie.id, this.currentMovie).subscribe({
        next: () => {
          alert('Movie updated successfully!');
          this.loadMovies();
          this.cancelForm();
        },
        error: (error) => {
          console.error('Error updating movie:', error);
          alert('Failed to update movie');
        }
      });
    } else {
      this.movieService.createMovie(this.currentMovie).subscribe({
        next: () => {
          alert('Movie added successfully!');
          this.loadMovies();
          this.cancelForm();
        },
        error: (error) => {
          console.error('Error adding movie:', error);
          alert('Failed to add movie');
        }
      });
    }
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          alert('Movie deleted successfully!');
          this.loadMovies();
        },
        error: (error) => {
          console.error('Error deleting movie:', error);
          alert('Failed to delete movie');
        }
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.editMode = false;
    this.currentMovie = this.getEmptyMovie();
  }
}
