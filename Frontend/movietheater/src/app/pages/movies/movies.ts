import { Component, OnInit } from '@angular/core';
import { Footer } from "../../share/footer/footer";
import { Navbar } from '../../share/navbar/navbar';
import { HomeService, MovieShowtime } from '../../services/home.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [Footer,Navbar, FormsModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit{
constructor(private mService: HomeService,private router: Router) {}
Movie : MovieShowtime[]=[];
filteredMovies: MovieShowtime[] = [];
searchText: string = "";

ngOnInit(): void {
    this.mService.getAllMoviesShowtime().subscribe({
      next : (data) => {
          this.Movie = data;
          this.filteredMovies = data;
      },
      error : () => { 
      },
    })
  }
  //includes()ตรวจว่า string มีคำนี้อยู่ไหม "avengers".includes("ave") → true filter() คือ function ของ JavaScript ที่ใช้ คัดข้อมูลบางตัวออกมา
searchMovie() {
  this.filteredMovies = this.Movie.filter(movie =>
    movie.title.toLowerCase().includes(this.searchText.toLowerCase())
  );
}
gotomoviedetail(id: string){
  console.log(id);
  this.router.navigate(['/moviedetail', id]);
}
}
