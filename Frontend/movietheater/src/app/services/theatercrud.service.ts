import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

//add addiotional
export interface TheaterScreenCreate {
  name: string;
  location: string;
  amenities: string;
  rows: number;
  seatsPerRow: number;
}

@Injectable({
  providedIn: 'root',
})
export class theatercrudService {
  // ตรง theater ยังไม่แก้
  private apiUrl = `${environment.apiUrl}/theatercrud`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getAllTheaterScreens(): Observable<TheaterScreen[]> {
    return this.http.get<TheaterScreen[]>(this.apiUrl);
  }

  createScreen(screenData: TheaterScreenCreate): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, screenData);
  }

  updateScreen(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  deleteScreen(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
