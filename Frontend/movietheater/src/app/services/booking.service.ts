import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface ShowtimeDetail {
  id: string;
  movie_title: string;
  screen_name: string;
  start_time: Date;
  price: number;
}
export interface Seat {
  id: string;
  row_label: string;
  seat_number: number;
  seat_type: 'Normal' | 'Premium' | 'VIP';
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getShowtime(id: string) {
    return this.http.get<ShowtimeDetail>(`${this.apiUrl}/showtimes/${id}`);
  }

  getSeats(screenId: string) {
    return this.http.get<Seat[]>(`${this.apiUrl}/screens/${screenId}/seats`);
  }

  getBookedSeats(showtimeId: string) {
    return this.http.get<string[]>(`${this.apiUrl}/showtimes/${showtimeId}/booked-seats`);
  }

  createBooking(data: {showtime_id: string; seats: string[];}) {
  return this.http.post(`${this.apiUrl}/bookings`, data);
  }

  getMyBookings(): Observable<any>{
    return this.http.get(`${this.apiUrl}/my-bookings`);
  }
}