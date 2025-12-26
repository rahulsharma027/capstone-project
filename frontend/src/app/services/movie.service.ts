import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getActiveMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/active`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  getMoviesByGenre(genre: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/genre/${genre}`);
  }

  getMoviesByLanguage(language: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/language/${language}`);
  }

  filterMovies(genre: string, language: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/filter?genre=${genre}&language=${language}`);
  }

  searchMovies(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search?query=${query}`);
  }
}
