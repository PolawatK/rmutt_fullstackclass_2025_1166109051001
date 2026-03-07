import { Component , ViewChild,ElementRef,OnInit } from '@angular/core';
import { Footer } from '../../share/footer/footer';
import { Navbar } from '../../share/navbar/navbar';
import { RouterLink } from '@angular/router';
import { HomeService,MovieShowtime,MovieOngoing,Theater } from '../../services/home.service';



@Component({
  selector: 'app-home',
  imports: [Footer, Navbar, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})




export class Home implements OnInit{
constructor(private hService: HomeService) {}
  MovieShowtimes: MovieShowtime[] = [];
  MovieOngoings: MovieOngoing[] = [];
  theater: Theater[] = [];
  
ngOnInit(): void {
  this.loaddata()
}
loaddata(){
  this.hService.getAllMoviesShowtime().subscribe({
      next : (data) => {
          this.MovieShowtimes = data;
          console.log(data);
      },
      error : (err) => {
          
      },
    });
  this.hService.getAllMoviesOngoing().subscribe({
      next : (data) => {
          this.MovieOngoings = data;
      },
      error : (err) => {
          
      },
    });
    this.hService.getAllTheater().subscribe({
      next:(data) => {
          this.theater = data;
      },
      error:(err) =>{
          
      },
    });
}
  @ViewChild('scrollContainer1')
  scrollContainer1!:ElementRef;

  @ViewChild('scrollContainer2')
  scrollContainer2!:ElementRef;

scrollRight(container: HTMLElement) {
  container.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
}

scrollLeft(container: HTMLElement) {
  container.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
}

  theaterImages: Record<string,string> = {
  Kids: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJTnJsLqhJ5JZb4bu9nql_RLYcvAMyVecyQ&s',
  '4DX': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkofXB7_kcGQ_qilyY-7kGmgrUjC1EmrIZqA&s',
  VIP: 'https://media.sfcinema.com/public/1753244437023_6aa900d2899ee753f77dab9e0be63a0d.png',
  Standard: 'data:image/svg+xml;utf8,\
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300">\
<rect width="100%" height="100%" fill="black"/>\
<text x="50%" y="50%" fill="white" font-size="70" text-anchor="middle" dominant-baseline="middle">STANDARD</text>\
</svg>',
  IMAX: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwHdj5JjbuzbGB4p0kBOmlDSrIh62WP1X2g&s'
};
  

getAmenityImage(type: string): string {

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300">
    <rect width="100%" height="100%" fill="black"/>
    <text x="50%" y="50%" fill="white"
      font-size="60"
      text-anchor="middle"
      dominant-baseline="middle">
      ${type}
    </text>
  </svg>
  `;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

}
