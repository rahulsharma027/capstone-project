import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../models/movie.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private apiUrl = `${environment.apiUrl}/shows`;

  constructor(private http: HttpClient) {}

  getAllShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.apiUrl);
  }

  getShowById(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/${id}`);
  }

  getShowsByMovie(movieId: number): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/movie/${movieId}`);
  }

  getUpcomingShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.apiUrl}/upcoming`);
  }
}
