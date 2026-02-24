import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
export interface showtimes {
  showtimes_id: string;
  screen_id: string;
  name: string;
  location: string;
  amenities: string;
  movie_title:string;
  start_time:Date;
  price:number;
}

@Injectable({
  providedIn: 'root'
})
export class theatersService {

  private apiUrl = `${environment.apiUrl}/theaters`;

  constructor(private http: HttpClient,private router: Router) {}


  getAllshowtimes(): Observable<showtimes[]> {
    return this.http.get<showtimes[]>(this.apiUrl);
  }
}