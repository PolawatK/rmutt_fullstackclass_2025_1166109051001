import { Component,OnInit } from '@angular/core';
import { MovieCRUDService,MovieCRUD } from '../../services/moviecrud.service';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moviecrud',
  imports: [CommonModule, FormsModule],
  templateUrl: './moviecrud.html',
  styleUrl: './moviecrud.css',
})
export class Moviecrud implements OnInit {
constructor(private MService: MovieCRUDService) {}
  movieCRUD:MovieCRUD[] =[];

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(){
    this.MService.getAllMoviesCRUD().subscribe({
      next: (data) => {
        this.movieCRUD = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

newMovie: any = {
  title: '',
  description: '',
  duration_minutes: 0,
  release_date: '',
  director: ''
};

selectedFile: File | null = null;
imagePreview: string | null = null;

onFileSelected(event: any) {

  const file = event.target.files[0];

  if (!file) return;

  this.selectedFile = file;

  const reader = new FileReader();

  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };

  reader.readAsDataURL(file);

}

// create
createMovie(event: Event){

  event.preventDefault();

  const formData = new FormData();

  formData.append('title', this.newMovie.title);
  formData.append('description', this.newMovie.description);
  formData.append('duration_minutes', this.newMovie.duration_minutes);
  formData.append('release_date', this.newMovie.release_date);
  formData.append('director', this.newMovie.director);

  if(this.selectedFile){
    formData.append('image', this.selectedFile);
  }

  this.MService.createMovieCRUD(formData).subscribe({

    next: () => {

      this.loadMovies();

      Swal.fire({
        icon: 'success',
        title: 'Created!',
        text: 'Movie created successfully',
        timer: 1500,
        showConfirmButton: false
      });

      this.imagePreview = null;
      this.selectedFile = null;

      this.newMovie = {
        title: '',
        description: '',
        duration_minutes: 0,
        release_date: '',
        director: ''
      };

      const modal = document.getElementById("addMovieModal");

      if(modal){
        const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
        modalInstance?.hide();
      }

    },

    error: (err)=>{
      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Create movie failed'
      });
    }
    
  });

}

// delete
deleteMovie(id: string) {

  Swal.fire({
    title: 'Delete this movie?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel',
  }).then((result) => {

    if (result.isConfirmed) {

      this.MService.deleteMovieCRUD(id).subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Movie deleted successfully',
            timer: 1500,
            showConfirmButton: false
          });

          this.loadMovies();

        },

        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Cannot delete',
            text: err.error?.message || 'Delete failed',
          });

        }

      });

    }

  });

}

//edit
editMovie: any = {
  id: '',
  title: '',
  description: '',
  duration_minutes: 0,
  release_date: '',
  director: '',
  image_url: ''
};

openEditModal(movie:any){

  this.selectedFile = null;

  const date = new Date(movie.release_date);

  const formattedDate =
    date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2,'0') + '-' +
    String(date.getDate()).padStart(2,'0');

  this.editMovie = {
    id: movie.id,
    title: movie.title,
    description: movie.description,
    duration_minutes: movie.duration_minutes,
    release_date: formattedDate,
    director: movie.director,
    image_url: movie.image_url
  };

  this.imagePreview = movie.image_url;

}

updateMovie(event:Event){

  event.preventDefault();

  const formData = new FormData();

  formData.append('title', this.editMovie.title);
  formData.append('description', this.editMovie.description);
  formData.append('duration_minutes', this.editMovie.duration_minutes);
  formData.append('release_date', this.editMovie.release_date);
  formData.append('director', this.editMovie.director);

  if(this.selectedFile){
    formData.append('image', this.selectedFile);
  }

  this.MService.updateMovieCRUD(this.editMovie.id, formData).subscribe({

    next: ()=>{

      this.loadMovies();

      Swal.fire({
        icon:'success',
        title:'Updated!',
        text:'Movie updated successfully',
        timer:1500,
        showConfirmButton:false
      });

      const modal = document.getElementById("editMovieModal");

      if(modal){
        const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
        modalInstance?.hide();
      }

    },

    error:(err)=>{
      console.error(err);

      Swal.fire({
        icon:'error',
        title:'Error',
        text:'Update movie failed'
      });

    }

  });

}

}
