import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { MovieService } from "../../services/movie.service";
import { ShowService } from "../../services/show.service";
import { Movie, Show } from "../../models/movie.model";

@Component({
  selector: "app-movie-detail",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" *ngIf="movie">
      <div class="movie-detail">
        <div class="movie-poster-section">
          <img
            [src]="movie.posterUrl || 'assets/placeholder.jpg'"
            [alt]="movie.title"
            class="detail-poster"
          />
        </div>

        <div class="movie-info-section">
          <h1>{{ movie.title }}</h1>
          <p class="movie-meta">
            <span>{{ movie.genre }}</span> | <span>{{ movie.language }}</span> |
            <span>{{ movie.duration }} mins</span>
          </p>
          <p class="movie-rating">⭐ {{ movie.rating }}/10</p>
          <p class="movie-director">Director: {{ movie.director }}</p>
          <p class="movie-cast">Cast: {{ movie.cast }}</p>
          <p class="movie-description">{{ movie.description }}</p>

          <div class="release-date">
            <strong>Release Date:</strong>
            {{ movie.releaseDate | date : "mediumDate" }}
          </div>
        </div>
      </div>

      <div class="trailer-section" *ngIf="movie.trailerUrl">
        <h2>Watch Trailer</h2>
        <div class="video-container">
          <iframe
            [src]="getSafeUrl(movie.trailerUrl)"
            width="100%"
            height="500"
            frameborder="0"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          >
          </iframe>
        </div>
      </div>

      <div class="shows-section">
        <h2>Available Shows</h2>
        <div class="spinner" *ngIf="loadingShows"></div>

        <div class="shows-grid" *ngIf="!loadingShows && shows.length > 0">
          <div class="show-card" *ngFor="let show of shows">
            <h3>{{ show.theater.name }}</h3>
            <p>{{ show.theater.location }}, {{ show.theater.city }}</p>
            <p class="show-time">🕐 {{ show.showTime | date : "short" }}</p>
            <p class="show-price">₹{{ show.price }}</p>
            <p class="show-seats">{{ show.availableSeats }} seats available</p>
            <button
              class="btn btn-primary"
              [routerLink]="['/booking', show.id]"
              [disabled]="show.availableSeats === 0"
            >
              {{ show.availableSeats === 0 ? "Sold Out" : "Book Tickets" }}
            </button>
          </div>
        </div>

        <div *ngIf="!loadingShows && shows.length === 0" class="no-shows">
          <p>No shows available for this movie yet. Check back soon!</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .movie-detail {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 40px;
        margin: 40px 0;
      }
      .detail-poster {
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }
      .movie-info-section h1 {
        color: #1a1a2e;
        margin-bottom: 15px;
      }
      .movie-meta {
        color: #666;
        margin: 10px 0;
      }
      .movie-meta span {
        margin: 0 10px;
      }
      .movie-rating {
        font-size: 1.5rem;
        color: #e94560;
        font-weight: bold;
        margin: 15px 0;
      }
      .movie-description {
        line-height: 1.6;
        margin: 20px 0;
        color: #444;
      }
      .movie-director,
      .movie-cast {
        margin: 10px 0;
        color: #555;
      }
      .release-date {
        margin-top: 20px;
        padding: 10px;
        background: #f5f5f5;
        border-radius: 5px;
      }
      .trailer-section {
        margin: 40px 0;
        padding: 30px;
        background: #f8f9fa;
        border-radius: 10px;
      }
      .trailer-section h2 {
        margin-bottom: 20px;
        color: #1a1a2e;
      }
      .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .shows-section {
        margin-top: 60px;
      }
      .shows-section h2 {
        margin-bottom: 20px;
        color: #1a1a2e;
      }
      .shows-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .show-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .show-card h3 {
        color: #1a1a2e;
        margin-bottom: 10px;
      }
      .show-time {
        font-size: 1.1rem;
        color: #e94560;
        margin: 10px 0;
      }
      .show-price {
        font-size: 1.3rem;
        font-weight: bold;
        color: #16213e;
        margin: 10px 0;
      }
      .show-seats {
        color: #666;
        margin-bottom: 15px;
      }
      .no-shows {
        text-align: center;
        padding: 40px;
        color: #666;
      }
      @media (max-width: 768px) {
        .movie-detail {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  shows: Show[] = [];
  loadingShows = false;
  movieId!: number;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private showService: ShowService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = +params["id"];
      this.loadMovieDetails();
      this.loadShows();
    });
  }

  loadMovieDetails(): void {
    this.movieService.getMovieById(this.movieId).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
      error: (error) => console.error("Error loading movie:", error),
    });
  }

  loadShows(): void {
    this.loadingShows = true;
    this.showService.getShowsByMovie(this.movieId).subscribe({
      next: (shows) => {
        this.shows = shows;
        this.loadingShows = false;
      },
      error: (error) => {
        console.error("Error loading shows:", error);
        this.loadingShows = false;
      },
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    // Convert YouTube watch URLs to embed URLs
    let embedUrl = url;
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
