import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { customer, customersService } from '../../services/customer.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-customers',
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  customers: customer[] = [];

  constructor(private customerService: customersService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        console.log('Data from backend:', data);
        this.customers = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}