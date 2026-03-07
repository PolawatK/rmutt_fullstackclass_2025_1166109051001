import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  theatercrudService,
  TheaterScreen,
} from '../../services/theatercrud.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theatercrud',
  imports: [FormsModule],
  templateUrl: './theatercrud.html',
  styleUrl: './theatercrud.css',
})
export class Theatercrud implements OnInit {
  GroupTheaterScreens: TheaterScreen[] = [];

  newScreen = {
    name: '',
    location: '',
    amenities: '',
    rows: 0,
    seatsPerRow: 0,
  };

  editScreen: any = {};

  constructor(
    private TCRUDService: theatercrudService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadScreens();
  }

  loadScreens() {
    this.TCRUDService.getAllTheaterScreens().subscribe({
      next: (data) => {
        console.log('Theater screens:', data);
        this.GroupTheaterScreens = data;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  addScreen() {
    this.TCRUDService.createScreen(this.newScreen).subscribe({
      next: (res) => {
        console.log('screen created', res);

        this.loadScreens();

        this.newScreen = {
          name: '',
          location: '',
          amenities: '',
          rows: 0,
          seatsPerRow: 0,
        };
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openEdit(screen: any) {
    this.editScreen = { ...screen };
  }

  updateScreen() {
    this.TCRUDService.updateScreen(
      this.editScreen.id,
      this.editScreen,
    ).subscribe(() => {
      this.loadScreens();
    });
  }
}
