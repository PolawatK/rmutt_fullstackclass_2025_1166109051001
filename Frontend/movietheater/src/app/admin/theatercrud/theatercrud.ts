import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  theatercrudService,
  TheaterScreen,
} from '../../services/theatercrud.service';
import Swal from 'sweetalert2';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-theatercrud',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './theatercrud.html',
  styleUrl: './theatercrud.css',
})
export class Theatercrud implements OnInit {
  screens: TheaterScreen[] = [];
  addForm!: FormGroup;
  editForm!: FormGroup;

  constructor(
    private TCRUDService: theatercrudService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loadScreens();

    /* ADD FORM */
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', Validators.required],
      amenities: [''],
      rows: [
        null,
        [Validators.required, Validators.min(1), Validators.max(26)],
      ],
      seatsPerRow: [
        null,
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
    });

    /* EDIT FORM */
    this.editForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', [Validators.required, Validators.minLength(2)]],
      amenities: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  /* LOAD SCREENS */
  loadScreens() {
    this.TCRUDService.getAllTheaterScreens().subscribe({
      next: (data) => {
        this.screens = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  /* CLOSE MODAL */
  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
    modalInstance.hide();
  }

  /* ADD SCREEN */
  addScreen() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    this.TCRUDService.createScreen(this.addForm.value).subscribe({
      next: () => {
        this.loadScreens();
        this.addForm.reset();
        this.closeModal('addScreenModal');
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Screen created successfully',
          timer: 1500,
          showConfirmButton: false,
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'Create failed',
        });
      },
    });
  }

  /* OPEN EDIT */
  openEdit(screen: TheaterScreen) {
    this.editForm.patchValue(screen);
    const modalElement = document.getElementById('editScreenModal');
    if (!modalElement) return;
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
  }

  /* UPDATE SCREEN */
  updateScreen() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    const id = this.editForm.value.id;

    this.TCRUDService.updateScreen(id, this.editForm.value).subscribe({
      next: () => {
        this.loadScreens();
        this.closeModal('editScreenModal');

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Screen updated successfully',
          timer: 1500,
          showConfirmButton: false,
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'Update failed',
        });
      },
    });
  }

  /* DELETE SCREEN */
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
