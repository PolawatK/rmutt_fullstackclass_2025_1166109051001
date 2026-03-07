import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

export interface MovieCRUD {
  id: string;
  title: string;
  description: string;
  duration_minutes: string;
  release_date: string;
  director: string;
  created_at: string;
  image_url: string;
  avg_rating : string;
}


@Injectable({
  providedIn: 'root'
})
export class MovieCRUDService {

  private apiUrl = `${environment.apiUrl}/moviecrud`;

  constructor(private http: HttpClient) {}

  getAllMoviesCRUD(): Observable<MovieCRUD[]> {
    return this.http.get<MovieCRUD[]>(`${this.apiUrl}`);
  }
}