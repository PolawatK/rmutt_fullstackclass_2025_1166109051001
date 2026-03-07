import { Component, OnInit } from '@angular/core';
import { PaymentService, Payment } from '../../services/payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paymentcrud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paymentcrud.html',
  styleUrls: ['./paymentcrud.css']
})
export class Paymentcrud implements OnInit {

  paymentscrud: Payment[] = [];
  loading = true;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getAllPayments().subscribe({
      next: (data: Payment[]) => {
        console.log('Payment Data:', data);
        this.paymentscrud = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading payments:', err);
        this.loading = false;
      }
    });
  }

}