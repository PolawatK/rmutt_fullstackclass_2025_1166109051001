import { Component } from '@angular/core';
import { Footer } from '../../share/footer/footer';
import { Navbar } from '../../share/navbar/navbar';
@Component({
  selector: 'app-home',
  imports: [Footer, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
scrollRight(){

  }
  scrollLeft(){

  }
  

   items1 = [
    {
      image: 'assets/images/1.jpg',
      title: 'Movie 1',
      description: 'Description of Movie 1'
    }
    
  ]

  movies: any[] = [];

  constructor() {}

}
