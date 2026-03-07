import { Component } from '@angular/core';
import { DashboardService,DashboardStats} from '../../services/dashboard.service';
import { AdminRoutingModule } from "../admin-routing";
import { Booking, BookingService } from '../../services/bookingcrud.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [AdminRoutingModule,CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  stats!: DashboardStats;
  bookingscurd: Booking[] = [];

  constructor(private DbService: DashboardService,private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadalldata();
  }

  loadalldata(){
    this.DbService.getAllStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
    this.bookingService.getAllBookings().subscribe({
      next: (data: Booking[]) => {
        console.log('Booking Data:', data);
        this.bookingscurd = data;
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      }
    });
  }
}
