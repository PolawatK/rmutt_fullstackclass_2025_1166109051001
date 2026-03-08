// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { environment } from '../../../environments/environment';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-showtime',
//   imports: [ CommonModule ],
//   templateUrl: './showtime.html',
//   styleUrl: './showtime.css',
// })
// export class Showtime {

//   showtimes:any[] = [];
//   movies:any[] = [];
//   screens:any[] = [];

//   constructor(
//     private http:HttpClient
//   ){}

//   ngOnInit(){
//     this.loadShowtimes();
//     this.loadMovies();
//     this.loadScreens();
//   }

//   loadShowtimes(){

//     this.http.get<any>(`${environment.apiUrl}/showtimes`)
//     .subscribe({

//       next:(res)=>{
//         this.showtimes = res;
//       },

//       error:(err)=>{
//         console.error("Load showtimes failed", err);
//       }

//     });

//   }

//   loadMovies(){

//     this.http.get<any>(`${environment.apiUrl}/movies`)
//     .subscribe({

//       next:(res)=>{
//         this.movies = res;
//       },

//       error:(err)=>{
//         console.error("Load movies failed", err);
//       }

//     });

//   }

//   loadScreens(){

//     this.http.get<any>(`${environment.apiUrl}/screens`)
//     .subscribe({

//       next:(res)=>{
//         this.screens = res;
//       },

//       error:(err)=>{
//         console.error("Load screens failed", err);
//       }

//     });

//   }

//  openShowtimeModal(){

//   console.log("movies", this.movies);
// console.log("screens", this.screens);

//   const movieOptions = this.movies.map(m =>
//     `<option value="${m.id}">${m.title}</option>`
//   ).join('');

//   const screenOptions = this.screens.map(s =>
//     `<option value="${s.id}">${s.name}</option>`
//   ).join('');

//   Swal.fire({

//     title: "Add New Showtime",

//     background: "#0f172a",
//     color: "#fff",

//     confirmButtonColor: "#f59e0b",
//     cancelButtonColor: "#374151",

//     showCancelButton: true,
//     confirmButtonText: "✓ Add Showtime",
//     cancelButtonText: "Cancel",

//     html: `

//     <label style="display:block;text-align:left;margin-top:10px">Movie</label>
//     <select id="movie" class="swal2-input">
//       <option value="">Select Movie</option>
//       ${movieOptions}
//     </select>

//     <label style="display:block;text-align:left;margin-top:10px">Screen</label>
//     <select id="screen" class="swal2-input">
//       <option value="">Select Screen</option>
//       ${screenOptions}
//     </select>

//     <label style="display:block;text-align:left;margin-top:10px">Start Time</label>
//     <input id="start"
//     type="datetime-local"
//     class="swal2-input">

//     <label style="display:block;text-align:left;margin-top:10px">Price (THB)</label>
//     <input id="price"
//     type="number"
//     class="swal2-input"
//     placeholder="250">

//     `,

//     preConfirm:()=>{

//       return{

//         movie_id:(document.getElementById("movie") as HTMLSelectElement).value,

//         screen_id:(document.getElementById("screen") as HTMLSelectElement).value,

//         start_time:(document.getElementById("start") as HTMLInputElement).value,

//         price:(document.getElementById("price") as HTMLInputElement).value

//       }

//     }

//   }).then(result=>{

//     if(result.isConfirmed){

//       this.showtimeService.createShowtime(result.value)
//       .subscribe({

//         next:()=>{

//           Swal.fire({
//             icon:"success",
//             title:"Showtime Added",
//             background:"#0f172a",
//             color:"#fff"
//           });

//           this.loadShowtimes();

//         },

//         error:(err)=>{

//           Swal.fire({
//             icon:"error",
//             title:"Error",
//             text:err.error.message,
//             background:"#0f172a",
//             color:"#fff"
//           });
//         }
//       });
//     }
//   });
// }
// }