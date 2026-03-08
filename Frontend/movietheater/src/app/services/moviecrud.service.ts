import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

export interface MovieCRUD {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  release_date: string;
  director: string;
  created_at: string;
  image_url: string;
  avg_rating : number;
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

  createMovieCRUD(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateMovieCRUD(id: string, data: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  deleteMovieCRUD(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}