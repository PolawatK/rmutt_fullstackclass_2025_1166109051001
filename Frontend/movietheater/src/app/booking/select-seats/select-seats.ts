import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService,Seat,ShowtimeDetail } from '../../services/booking.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-select-seats',
  imports: [DatePipe ],
  templateUrl: './select-seats.html',
  styleUrl: './select-seats.css',
})
export class SelectSeats implements OnInit {

  showtimeId!: string;
  showtime!: ShowtimeDetail;
  seats: Seat[] = [];
  bookedSeats: string[] = [];
  selectedSeats: Seat[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}
  ngOnInit() {
    this.showtimeId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

 loadData() {
    this.bookingService.getShowtime(this.showtimeId)
      .subscribe(data => {
        this.showtime = data;

        // โหลด seats หลังรู้ screen_id
        this.bookingService.getSeats((data as any).screen_id)
          .subscribe(seats => this.seats = seats);
      });

    this.bookingService.getBookedSeats(this.showtimeId)
      .subscribe(data => this.bookedSeats = data);
  }
  toggleSeat(seat: Seat) {
  if (this.isBooked(seat.id)) return;

  const index = this.selectedSeats.findIndex(s => s.id === seat.id);

  if (index > -1) {
    this.selectedSeats.splice(index, 1);
  } else {
    this.selectedSeats.push(seat);
  }
}

  isBooked(seatId: string) {
  return this.bookedSeats.includes(seatId);
}

isSelected(seatId: string) {
  return this.selectedSeats.some(s => s.id === seatId);
}

  getTotal() {
    return this.selectedSeats.length * this.showtime.price;
  }
  //******* */
  get groupedSeats(): { row: string; seats: Seat[] }[] {

  const groups: { [key: string]: Seat[] } = {};

  for (const seat of this.seats) {
    if (!groups[seat.row_label]) {
      groups[seat.row_label] = [];
    }
    groups[seat.row_label].push(seat);
  }

  return Object.keys(groups).map(row => ({
    row,
    seats: groups[row]
  }));
}
}
