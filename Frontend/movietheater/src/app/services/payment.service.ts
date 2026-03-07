import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Payment {
  id: string;
  customer: string;
  method: string;
  amount: number;
  paid_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = `${environment.apiUrl}/paymentcrud`;

  constructor(private http: HttpClient) {}

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

}