import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ShowtimeService } from '../../services/showtime.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showtime',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './showtime.html',
  styleUrl: './showtime.css',
})
export class Showtime {

  showtimes: any[] = [];
  movies: any[] = [];
  screens: any[] = [];

  timeSlots: string[] = [];

  // edit modal
  editingShowtime: any = null;

  editData = {
    movie_id: 0,
    screen_id: 0,
    start_time: '',
    price: 0
  };

  // add modal
  showAddModal = false;

  addData = {
    movie_id: '',
    screen_id: '',
    start_time: '',
    price: 0
  };

  constructor(
    private showtimeService: ShowtimeService,
    private http: HttpClient
  ) {}

  ngOnInit(){
    this.loadShowtimes();
    this.loadMovies();
    this.loadScreens();

    for(let h = 8; h <= 24; h++){

      let hour = h.toString().padStart(2,'0');

      this.timeSlots.push(`${hour}:00`);

    }

  }

  loadShowtimes(){
    this.http.get<any>(`${environment.apiUrl}/showtimes`)
    .subscribe({
      next:(res)=>{
        this.showtimes = res;
      },
      error:(err)=>{
        console.error("Load showtimes failed", err);
      }
    });
  }

  loadMovies(){
    this.http.get<any>(`${environment.apiUrl}/moviecrud`)
    .subscribe({
      next:(res)=>{
        this.movies = res;
      },
      error:(err)=>{
        console.error("Load movies failed", err);
      }
    });
  }

  loadScreens(){
    this.http.get<any>(`${environment.apiUrl}/screens`)
    .subscribe({
      next:(res)=>{
        this.screens = res;
      },
      error:(err)=>{
        console.error("Load screens failed", err);
      }
    });
  }

  deleteShowtime(id:string){
    Swal.fire({
      title:"Delete Showtime?",
      text:"This action cannot be undone",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:"Delete",
      confirmButtonColor:"#ef4444",
      cancelButtonColor:"#6b7280",
      background:"#0f172a",
      color:"#fff"
    }).then(result=>{

      if(result.isConfirmed){

        this.showtimeService.deleteShowtime(id)
        .subscribe({

          next:()=>{

            Swal.fire({
              icon:"success",
              title:"Deleted",
              background:"#0f172a",
              color:"#fff"
            });

            this.loadShowtimes();
          },

          error:(err)=>{

            Swal.fire({
              icon:"error",
              title:"Error",
              text:err.error.message,
              background:"#0f172a",
              color:"#fff"
            });

          }
        });
      }
    });
  }

  editShowtime(showtime: any){

    console.log("movies:", this.movies);
  console.log("screens:", this.screens);
  console.log("showtime:", showtime);

  console.log(typeof showtime.movie_id);
console.log(typeof showtime.screen_id);

    const date = new Date(showtime.start_time);

    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0,16);

    this.editingShowtime = showtime;

    this.editData = {
      movie_id: showtime.movie_id,
      screen_id: Number(showtime.screen_id),
      start_time: local,
      price: showtime.price
    };

  }

  updateShowtime(){
    this.showtimeService.updateShowtime(
      this.editingShowtime.id,
      this.editData
    ).subscribe({

      next:()=>{
        Swal.fire({
          icon:"success",
          title:"Updated",
          background:"#0f172a",
          color:"#fff"
        });

        this.editingShowtime = null;
        this.loadShowtimes();

      },

      error:(err)=>{
        Swal.fire({
          icon:"error",
          title:"Error",
          text:err.error.message,
          background:"#0f172a",
          color:"#fff"
        });
      }
    });
  }

  openShowtimeModal(){
    this.showAddModal = true;

    this.addData = {
      movie_id: '',
      screen_id: '',
      start_time: '',
      price: 0
    };
  }

  createShowtime(){
    this.showtimeService.createShowtime(this.addData)
    .subscribe({

      next:()=>{

        Swal.fire({
          icon:"success",
          title:"Showtime Added",
          background:"#0f172a",
          color:"#fff"
        });

        this.showAddModal = false;
        this.loadShowtimes();

      },

      error:(err)=>{

        Swal.fire({
          icon:"error",
          title:"Error",
          text:err.error.message,
          background:"#0f172a",
          color:"#fff"
        });
      }
    });
  }

getStartPosition(time:string){

  const start = new Date(time);

  const minutes =
    start.getHours()*60 +
    start.getMinutes();

  const startMinutes = 8*60;
  const totalMinutes = 16*60;

  return ((minutes - startMinutes)/totalMinutes)*100;

}

  getDurationWidth(duration:number){

  const totalMinutes = 16 * 60;

  return (duration / totalMinutes) * 100;

}
  getShowtimesForScreen(screenId:number){
      
    return this.showtimes.filter(
      s => s.screen_id === screenId
    );
  }
  
}

