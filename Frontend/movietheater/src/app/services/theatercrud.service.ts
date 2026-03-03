import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

export interface TheaterScreen {
  id: number;
  name: string;
  location: string;
  amenities: string;

  total_seats: number;
  normal_count: number;
  premium_count: number;
  vip_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class theatercrudService {

  // ตรง theater ยังไม่แก้ 
  private apiUrl = `${environment.apiUrl}/theaters`;

  constructor(private http: HttpClient,private router: Router) {}


  getAllTheaterScreens(): Observable<TheaterScreen[]> {
    return this.http.get<TheaterScreen[]>(this.apiUrl);
  }
}