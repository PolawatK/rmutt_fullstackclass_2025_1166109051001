import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Seat,ShowtimeDetail } from '../../services/booking.service';
import { DatePipe } from '@angular/common';

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
    private route: ActivatedRoute
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;

    if (state) {
      this.showtime = state.showtime;
      this.seats = state.seats;
    }
  }

  getTotal() {
    return this.seats.length * this.showtime.price;
  }
}
