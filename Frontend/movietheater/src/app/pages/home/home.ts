import { Component , ViewChild,ElementRef } from '@angular/core';
import { Footer } from '../../share/footer/footer';
import { Navbar } from '../../share/navbar/navbar';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [Footer, Navbar,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})




export class Home {
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
  theater = [
    {name:'Major'},
    {name:'Kid'},
    {name:'IMAX'},
  ]

   items1 = [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxdLg0DZlN8b8Y_LoC2lpUrtBmxzcPPdfPWA&s',
      title: 'Movie 1',
      description: 'Description of Movie 1'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooTWufA5l-rDG6r7B-5rcvFXj4Z4w8eFwXg&s',
      title: 'Movie 1',
      description: 'Description of Movie 1'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqdcf3Ls86pJ2rMyEe1kkJmAzbhZnmXVUiBA&s',
      title: 'Movie 1',
      description: 'Description of Movie 1'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpM4UVhH8EiRHwevbx2vw1MK7pNK5VzYo1aQ&s',
      title: 'Movie 1',
      description: 'Description of Movie 1'
    },
    
  ]

  movies: any[] = [];

  constructor() {}

}
