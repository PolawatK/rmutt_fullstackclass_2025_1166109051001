import { Component, OnInit } from '@angular/core';
import { showtimes, theatersService } from '../../services/theaters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theaters',
  imports: [],
  templateUrl: './theaters.html',
  styleUrl: './theaters.css',
})
export class Theaters implements OnInit {
  constructor(private tService: theatersService,private router: Router) {}
  
  showtimes: showtimes[] = [];
  
  ngOnInit(): void {
    this.tService.getAllshowtimes().subscribe({
      next: (data) => {
        console.log('Data from backend:', data);
        this.showtimes = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  gotoBooking(showtimeId: string){
    console.log(showtimeId);
    this.router.navigate(['/booking', showtimeId]);
  }
  

}
