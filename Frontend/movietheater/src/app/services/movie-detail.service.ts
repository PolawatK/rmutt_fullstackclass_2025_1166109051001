import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Movie {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  release_date: string;
  director: string;
  image_url: string;
}

export interface Actor {
  name: string;
}

export interface Showtime {
  id: number;
  screen_name: string;
  location: string;
  start_time: string;
  price: number;
}

export interface MovieDetails {
  movie: Movie;
  actors: Actor[];
  rating: {
    rating: number;
    reviews: number;
  };
  showtimes: Showtime[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {

  private apiUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  getMovieDetails(movieId: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.apiUrl}/${movieId}/details`);
  }

}