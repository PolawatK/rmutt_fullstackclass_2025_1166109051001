import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { Navbar } from "../../share/navbar/navbar";

@Component({
  selector: 'app-mybooking',
  imports: [CommonModule, Navbar],
  templateUrl: './mybooking.html',
  styleUrl: './mybooking.css',
})
export class Mybooking implements OnInit {
  bookings: any[] = [];
  loading = true

  constructor(private bookingService: BookingService){}

  ngOnInit(): void {
      this.bookingService.getMyBookings().subscribe({
        next:(data) =>{
          this.bookings = data;
          this.loading = false;
        },
        error:(err)=>{
          console.error(err);
          this.loading = false;
        }
      })
  }
}
