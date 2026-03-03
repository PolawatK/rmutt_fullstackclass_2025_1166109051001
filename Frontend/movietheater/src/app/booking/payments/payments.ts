import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Seat,ShowtimeDetail } from '../../services/booking.service';
import { DatePipe } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-payments',
  imports: [DatePipe],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments {

  showtime!: ShowtimeDetail;
  seats: Seat[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;

    if (state) {
      this.showtime = state.showtime;
      this.seats = state.seats;
    }
    console.log('state:', state);
    console.log('showtime:', state?.showtime);
  }

  getTotal() {
    return this.seats.length * this.showtime.price;
  }

  confirmBooking() {
  if (!this.showtime || this.seats.length === 0) return;

  const payload = {
    showtime_id: this.showtime.id,
    seats: this.seats.map(s => s.id)
  };
  console.log(payload);

  this.bookingService.createBooking(payload).subscribe({
    next: (res: any) => {
      alert('Booking successful!');
      this.router.navigate(['/']); 
    },
    error: (err) => {
      if (err.error?.message) {
        alert(err.error.message);
      } else {
        alert('Booking failed');
      }
    }
  });
}
}
