import { Component } from '@angular/core';
import { DashboardService,Movie } from '../../services/dashboard.service';
import { AdminRoutingModule } from "../admin-routing";
@Component({
  selector: 'app-dashboard',
  imports: [AdminRoutingModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
movies: Movie[] = [];

  constructor(private DbService: DashboardService) {}

  ngOnInit(): void {
    this.DbService.getAllMovies().subscribe({
      next: (data) => {
        console.log('Data from backend:', data);
        this.movies = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
