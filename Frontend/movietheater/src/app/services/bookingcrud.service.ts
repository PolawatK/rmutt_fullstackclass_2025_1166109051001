import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Booking {
  id: string;
  customer: string;
  movie: string;
  start_time: string;
  total_price: number;
  status: string;
  total_seats: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private apiUrl = `${environment.apiUrl}/bookingcrud`;

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }
}