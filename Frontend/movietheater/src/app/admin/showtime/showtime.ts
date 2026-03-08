import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ShowtimeService } from '../../services/showtime.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showtime',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showtime.html',
  styleUrl: './showtime.css',
})
export class Showtime {

  showtimes: any[] = [];
  movies: any[] = [];
  screens: any[] = [];

  constructor(
    private showtimeService: ShowtimeService,
    private http: HttpClient
  ) {}

ngOnInit(){
this.loadShowtimes();
 this.loadMovies();
this.loadScreens();
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

  editShowtime(showtime: any) {
    const movieOptions = this.movies.map(m =>
      `<option value="${m.id}" ${m.id === showtime.movie_id ? "selected" : ""}>${m.title}</option>`
    ).join('');

    const screenOptions = this.screens.map(s =>
      `<option value="${s.id}" ${s.id === showtime.screen_id ? "selected" : ""}>${s.name}</option>`
    ).join('');

    Swal.fire({
      title: "Edit Showtime",
      background: "#1a1f2e",
      color: "#fff",
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "transparent",
      showCancelButton: true,
      confirmButtonText: "✓ Update Showtime",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      width: "440px",
      customClass: {
        popup: 'swal-showtime-popup',
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn',
        actions: 'swal-actions',
        title: 'swal-title'
      },

      html: `
        <style>
          .swal-showtime-popup { border-radius: 16px !important; padding: 32px !important; }
          .swal-title { font-size: 20px !important; font-weight: 600 !important; text-align: left !important; padding: 0 !important; margin-bottom: 20px !important; }
          .swal2-html-container { text-align: left !important; margin: 0 !important; padding: 0 !important; }
          .swal-actions { justify-content: stretch !important; gap: 12px !important; padding: 0 !important; margin-top: 24px !important; width: 100% !important; }
          .swal-confirm-btn, .swal-cancel-btn { flex: 1 !important; margin: 0 !important; padding: 12px !important; border-radius: 8px !important; font-size: 14px !important; font-weight: 500 !important; }
          .swal-cancel-btn { border: 1px solid #374151 !important; color: #e5e7eb !important; }
          .swal-cancel-btn:hover { background: #374151 !important; }

          .swal-field { margin-bottom: 16px; }
          .swal-label { display: block; font-size: 14px; color: #e5e7eb; margin-bottom: 6px; font-weight: 500; }
          .swal-select, .swal-input {
            width: 100%;
            background: #2d3348;
            border: 1px solid #374151;
            border-radius: 8px;
            color: #e5e7eb;
            padding: 10px 14px;
            font-size: 14px;
            box-sizing: border-box;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
          }
          .swal-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
          .swal-select:focus, .swal-input:focus { border-color: #f59e0b; }
          .swal-select option { background: #1a1f2e; }
          .swal-input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }
          .swal-input[type="datetime-local"]::-webkit-calendar-picker-indicator {filter: invert(1); cursor: pointer;}
        </style>

        <div class="swal-field">
          <label class="swal-label">Movie</label>
          <select id="movie" class="swal-select">
            ${movieOptions}
          </select>
        </div>

        <div class="swal-field">
          <label class="swal-label">Screen</label>
          <select id="screen" class="swal-select">
            ${screenOptions}
          </select>
        </div>

        <div class="swal-field">
          <label class="swal-label">Start Time</label>
          <input id="start" type="datetime-local" class="swal-input" value="${showtime.start_time.slice(0, 16)}">
        </div>

        <div class="swal-field">
          <label class="swal-label">Price (THB)</label>
          <input id="price" type="number" class="swal-input" value="${showtime.price}">
        </div>
      `,

      preConfirm: () => {
        const movie = (document.getElementById("movie") as HTMLSelectElement).value;
        const screen = (document.getElementById("screen") as HTMLSelectElement).value;
        const start = (document.getElementById("start") as HTMLInputElement).value;
        const price = (document.getElementById("price") as HTMLInputElement).value;

        if (!movie || !screen || !start || !price) {
          Swal.showValidationMessage("Please fill all fields");
          return false;
        }

        return {
          movie_id: movie,
          screen_id: Number(screen),
          start_time: start,
          price: Number(price)
        };
      }

    }).then(result => {
      if (result.isConfirmed) {
        this.showtimeService.updateShowtime(showtime.id, result.value)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: "success",
                title: "Updated",
                background: "#1a1f2e",
                color: "#fff"
              });
              this.loadShowtimes();
            },
            error: (err) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: err.error.message,
                background: "#1a1f2e",
                color: "#fff"
              });
            }
          });
      }
    });
  }

  openShowtimeModal() {
    const movieOptions = this.movies.map(m =>
      `<option value="${m?.id}">${m?.title}</option>`
    ).join('');

    const screenOptions = this.screens.map(s =>
      `<option value="${s.id}">${s.name}</option>`
    ).join('');

    Swal.fire({
      title: "Add New Showtime",
      background: "#1a1f2e",
      color: "#fff",
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "transparent",
      showCancelButton: true,
      confirmButtonText: "✓ Add Showtime",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      width: "440px",
      customClass: {
        popup: 'swal-showtime-popup',
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn',
        actions: 'swal-actions',
        title: 'swal-title'
      },

      html: `
        <style>
          .swal-showtime-popup { border-radius: 16px !important; padding: 32px !important; }
          .swal-title { font-size: 20px !important; font-weight: 600 !important; text-align: left !important; padding: 0 !important; margin-bottom: 20px !important; }
          .swal2-html-container { text-align: left !important; margin: 0 !important; padding: 0 !important; }
          .swal-actions { justify-content: stretch !important; gap: 12px !important; padding: 0 !important; margin-top: 24px !important; width: 100% !important; }
          .swal-confirm-btn, .swal-cancel-btn { flex: 1 !important; margin: 0 !important; padding: 12px !important; border-radius: 8px !important; font-size: 14px !important; font-weight: 500 !important; }
          .swal-cancel-btn { border: 1px solid #374151 !important; color: #e5e7eb !important; }
          .swal-cancel-btn:hover { background: #374151 !important; }

          .swal-field { margin-bottom: 16px; }
          .swal-label { display: block; font-size: 14px; color: #e5e7eb; margin-bottom: 6px; font-weight: 500; }
          .swal-select, .swal-input {
            width: 100%;
            background: #2d3348;
            border: 1px solid #374151;
            border-radius: 8px;
            color: #e5e7eb;
            padding: 10px 14px;
            font-size: 14px;
            box-sizing: border-box;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
          }
          .swal-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
          .swal-select:focus, .swal-input:focus { border-color: #f59e0b; }
          .swal-select option { background: #1a1f2e; }
          .swal-input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }
          .swal-input[type="datetime-local"]::-webkit-calendar-picker-indicator {filter: invert(1); cursor: pointer;}

        </style>

        <div class="swal-field">
          <label class="swal-label">Movie</label>
          <select id="movie" class="swal-select">
            <option value="">Select Movie</option>
            ${movieOptions}
          </select>
        </div>

        <div class="swal-field">
          <label class="swal-label">Screen</label>
          <select id="screen" class="swal-select">
            <option value="">Select Screen</option>
            ${screenOptions}
          </select>
        </div>

        <div class="swal-field">
          <label class="swal-label">Start Time</label>
          <input id="start" type="datetime-local" class="swal-input">
        </div>

        <div class="swal-field">
          <label class="swal-label">Price (THB)</label>
          <input id="price" type="number" class="swal-input" placeholder="250">
        </div>
      `,

      preConfirm: () => {
        const movie = (document.getElementById("movie") as HTMLSelectElement).value;
        const screen = (document.getElementById("screen") as HTMLSelectElement).value;
        const start = (document.getElementById("start") as HTMLInputElement).value;
        const price = (document.getElementById("price") as HTMLInputElement).value;

        if (!movie || !screen || !start || !price) {
          Swal.showValidationMessage("Please fill all fields");
          return false;
        }

        return {
          movie_id: movie,
          screen_id: Number(screen),
          start_time: start,
          price: Number(price)
        };
      }

    }).then(result => {
      if (result.isConfirmed) {
        this.showtimeService.createShowtime(result.value)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: "success",
                title: "Showtime Added",
                background: "#1a1f2e",
                color: "#fff"
              });
              this.loadShowtimes();
            },
            error: (err) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: err.error.message,
                background: "#1a1f2e",
                color: "#fff"
              });
            }
          });
      }
    });
  }
}
