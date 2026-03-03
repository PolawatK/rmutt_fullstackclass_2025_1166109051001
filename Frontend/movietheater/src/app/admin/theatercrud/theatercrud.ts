import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  theatercrudService,
  TheaterScreen,
} from '../../services/theatercrud.service';
@Component({
  selector: 'app-theatercrud',
  imports: [],
  templateUrl: './theatercrud.html',
  styleUrl: './theatercrud.css',
})

export class Theatercrud implements OnInit {

  GroupTheaterScreens: TheaterScreen[] = [];

  constructor(
    private TCRUDService: theatercrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.TCRUDService.getAllTheaterScreens().subscribe({
      next: (data) => {
        console.log('Theater screens:', data);
        this.GroupTheaterScreens = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  addScreen() {
    // Popup 
  }
}
