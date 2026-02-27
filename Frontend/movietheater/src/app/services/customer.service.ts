import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface customer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  role: string;
  bookings: number;
  total_spent: number;
}

@Injectable({
  providedIn: 'root'
})
export class customersService {

  private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<customer[]> {
    return this.http.get<customer[]>(this.apiUrl);
  }
}