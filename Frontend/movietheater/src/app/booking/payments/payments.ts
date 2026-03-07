import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Seat,ShowtimeDetail } from '../../services/booking.service';
import { DatePipe } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { Navbar } from "../../share/navbar/navbar";
import { Footer } from "../../share/footer/footer";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payments',
  imports: [DatePipe, FormsModule, Navbar, Footer],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments {

  showtime?: ShowtimeDetail;
  seats: Seat[] = [];
  payment: string = '';

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
    return this.seats.length * (this.showtime?.price ?? 0); //เขียนงีเเพราะไม่ได้ล็อคให้เป็น notnull พำอมันเป็ฯ null ได้ต้องมีตัวเเทน
  }

  confirmBooking() {
    Swal.fire({
    title: 'Confirm booking?',
    text: 'Do you want to continue?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
        if (!this.showtime || this.seats.length === 0) return;
      const payload = {
        showtime_id: this.showtime.id,
        seats: this.seats.map(s => s.id),
        paymentMethod  : this.payment
      };
      console.log(payload);

      this.bookingService.createBooking(payload).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Success!',
            text: 'Booking completed',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/mybooking']);
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
  });
}
}
