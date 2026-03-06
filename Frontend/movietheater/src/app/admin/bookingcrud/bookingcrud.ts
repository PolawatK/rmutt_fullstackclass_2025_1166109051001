import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../services/bookingcrud.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookingcrud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookingcrud.html',
  styleUrls: ['./bookingcrud.css']
})
export class Bookingcrud implements OnInit {

  bookingscurd: Booking[] = [];
  loading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (data: Booking[]) => {
        console.log('Booking Data:', data);
        this.bookingscurd = data;
        this.loading = false;  
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        this.loading = false;   
      }
    });
  }
}