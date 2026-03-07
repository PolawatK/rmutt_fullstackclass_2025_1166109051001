import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  theatercrudService,
  TheaterScreen,
} from '../../services/theatercrud.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
        this.loadScreens();

        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Screen created successfully',
          timer: 1500,
          showConfirmButton: false,
        });
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
    ).subscribe({
      next: () => {
        this.loadScreens();

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Screen updated successfully',
          timer: 1500,
          showConfirmButton: false,
        });
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteScreen(id: number) {
    Swal.fire({
      title: 'Delete this screen?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.TCRUDService.deleteScreen(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Screen deleted successfully',
            });

            this.loadScreens();
          },

          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Cannot delete',
              text: err.error?.message || 'Delete failed',
            });
          },
        });
      }
    });
  }
}
