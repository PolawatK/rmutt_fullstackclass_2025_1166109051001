import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

export interface Movie {
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

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }
  getAllTheater(): Observable<Theater[]> {
    return this.http.get<Theater[]>(`${this.apiUrl}/theater`);
  }
}