import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService,Seat,ShowtimeDetail } from '../../services/booking.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Navbar } from "../../share/navbar/navbar";
import { Footer } from "../../share/footer/footer";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-select-seats',
  imports: [DatePipe,Navbar,Footer ],
  templateUrl: './select-seats.html',
  styleUrl: './select-seats.css',
})
export class SelectSeats implements OnInit {

  showtimeId!: string;
  showtime?: ShowtimeDetail;
  seats: Seat[] = [];
  bookedSeats: string[] = [];
  selectedSeats: Seat[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {}


ngOnInit() {
    this.showtimeId = this.route.snapshot.paramMap.get('id')!; 
    this.loadData();
  }


loadData() {
    this.bookingService.getShowtime(this.showtimeId)
      .subscribe(data => { 
        this.showtime = data;
        this.bookingService.getSeats((data as any).screen_id)
          .subscribe(seats =>{
            this.seats = seats;
            console.log(seats);
          });
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
    return this.selectedSeats.length * (this.showtime?.price ?? 0);
  }

  //เอาข้อมูลมา ละก็ลูปจัดกรุ๊ป รอบเเรก !A เลยได้  A = [] ละก็ดัน 1เข้าไป ก็เลยได้ป็น A =[{id:uuid row_label:'A',seat_number 1 หรือ A1}]
  //เสร็จเเล้วก็จะทำการmap ก็คือเเปลงจาก Object {row:'A' ,seats:[{id:uuid row_label:'A',seat_number 1 หรือ A1}]} 
  //โดยการนำ ตัวเเปร row มา = key หลักก็คือ row = A ละ groups[A] ก็คือ seats:[{id:uuid row_label:'A',seat_number 1 หรือ A1}]
  //มันก็เลยกลายเป็น {row: "A",seats:[{id:uuid row_label:'A',seat_number 1}]}
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

goToPayment() {
   Swal.fire({
    title: 'Confirm seats?',
    text: `You selected ${this.selectedSeats.length} seats`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Continue'
  }).then(result => {

    if (result.isConfirmed) {
      this.router.navigate(['payments'], {
        relativeTo: this.route,
        state: {
          showtime: this.showtime,
          seats: this.selectedSeats
        }
      });
    }

  });
}
}
