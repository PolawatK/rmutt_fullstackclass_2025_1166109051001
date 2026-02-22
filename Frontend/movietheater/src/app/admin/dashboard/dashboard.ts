import { Component } from '@angular/core';
import { MovieService,Movie } from '../../services/movie.service';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
movies: Movie[] = [];

  constructor(private MvService: MovieService) {}

  ngOnInit(): void {
    this.MvService.getAllMovies().subscribe({
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
