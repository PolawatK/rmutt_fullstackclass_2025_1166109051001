import { Component, OnInit } from '@angular/core';
import { ScreenWithShowtimes,theatersService } from '../../services/theaters.service';
import { Router } from '@angular/router';
import { Navbar } from '../../share/navbar/navbar';
import { DatePipe } from '@angular/common';
import { Footer } from '../../share/footer/footer';
@Component({
  selector: 'app-theaters',
  imports: [Navbar, DatePipe, Footer],
  templateUrl: './theaters.html',
  styleUrl: './theaters.css',
})
export class Theaters implements OnInit {
  constructor(
    private tService: theatersService,
    private router: Router,
  ) {}

  groupedScreensShowtimes: ScreenWithShowtimes[] = [];

  ngOnInit(): void {
    this.tService.getAllshowtimes().subscribe({
      next: (data) => {
        console.log('Data from backend:', data);
        this.groupData(data);
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
  gotoBooking(showtimeId: string) {
    console.log(showtimeId);
    this.router.navigate(['/booking', showtimeId]);
  }

  groupData(data: any[]) {
    const grouped: any = {};
    //จัดกรุ๊ปเหมือนกัน หาก screen นั้นยังไม่ถูกจัดกรุ๊ปให้เอามาสร้าง grouped ใหม่ เเล้วทำการ .showtimes.push ยัดข้อมูล showtimes นั้นเข้าไปใน arrays
    data.forEach((item) => {
      if (!grouped[item.screen_id]) {
        grouped[item.screen_id] = {
          screen_id: item.screen_id,
          screen_name: item.screen_name,
          location: item.location,
          amenities: item.amenities,
          showtimes: [],
        };
      }
      grouped[item.screen_id].showtimes.push(item);
    });

    this.groupedScreensShowtimes = Object.values(grouped);
  }
}
