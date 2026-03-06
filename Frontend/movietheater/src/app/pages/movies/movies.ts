import { Component, OnInit } from '@angular/core';
import { Footer } from "../../share/footer/footer";
import { Navbar } from '../../share/navbar/navbar';
import { HomeService, MovieShowtime } from '../../services/home.service';
@Component({
  selector: 'app-movies',
  imports: [Footer,Navbar],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit{
  constructor(private mService: HomeService) {}
  Movie : MovieShowtime[]=[];

  ngOnInit(): void {
    this.mService.getAllMoviesShowtime().subscribe({
      next : (data) => {
          this.Movie = data;
          console.log(data);
      },
      error : () => { 
      },
  })

  }
}
