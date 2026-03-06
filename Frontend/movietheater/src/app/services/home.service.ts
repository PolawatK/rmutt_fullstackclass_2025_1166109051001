import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

export interface MovieShowtime {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface MovieOngoing {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Theater{
  id: string;
  name: string;
  location: string;
  amenities: string;
}


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = `${environment.apiUrl}/homes`;

  constructor(private http: HttpClient) {}

  getAllMoviesShowtime(): Observable<MovieShowtime[]> {
    return this.http.get<MovieShowtime[]>(`${this.apiUrl}/movies/showing`);
  }
  getAllMoviesOngoing(): Observable<MovieOngoing[]> {
    return this.http.get<MovieOngoing[]>(`${this.apiUrl}/movies/coming-soon`);
  }
  getAllTheater(): Observable<Theater[]> {
    return this.http.get<Theater[]>(`${this.apiUrl}/theater`);
  }
}