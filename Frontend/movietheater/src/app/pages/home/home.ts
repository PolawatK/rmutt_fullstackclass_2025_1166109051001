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
  movies: any[] = [];

  constructor() {}

}
