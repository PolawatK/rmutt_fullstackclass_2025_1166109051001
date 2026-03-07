import { Component,OnInit } from '@angular/core';
import { MovieCRUDService,MovieCRUD } from '../../services/moviecrud.service';

@Component({
  selector: 'app-moviecrud',
  imports: [],
  templateUrl: './moviecrud.html',
  styleUrl: './moviecrud.css',
})
export class Moviecrud {
constructor(private MService: MovieCRUDService) {}
  movieCRUD:MovieCRUD[] =[];

  ngOnInit():void {
    this.MService.getAllMoviesCRUD().subscribe({
      next:(data) =>{
        this.movieCRUD = data;
        console.log(data);
      },
      error:(err) => {

      },
    });
  }
}
