import { Component , ViewChild,ElementRef } from '@angular/core';
import { Footer } from '../../share/footer/footer';
import { Navbar } from '../../share/navbar/navbar';
@Component({
  selector: 'app-home',
  imports: [Footer, Navbar],
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
      image: 'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon-614x460.png',
      title: 'Movie 1',
      description: 'Description of Movie 1'
    },
    {
      image: 'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon-614x460.png',
      title: 'Movie 1',
      description: 'Description of Movie 1'
    },
    {
      image: 'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon-614x460.png',
      title: 'Movie 1',
      description: 'Description of Movie 1'
    },
    {
      image: 'https://endlessicons.com/wp-content/uploads/2012/11/image-holder-icon-614x460.png',
      title: 'Movie 1',
      description: 'Description of Movie 1'
    },
    
  ]

  movies: any[] = [];

  constructor() {}

}
