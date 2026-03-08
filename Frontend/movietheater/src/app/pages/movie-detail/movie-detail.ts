import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Navbar } from "../../share/navbar/navbar";
import { Review, ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MovieDetailService } from '../../services/movie-detail.service';
@Component({
  selector: 'app-movie-detail',
  imports: [Navbar,CommonModule,FormsModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  constructor(private router: Router,private routes:ActivatedRoute,private reviewService: ReviewService, private movieService: MovieDetailService) {}
  reviews: Review[] = [];
  totalReviews = 0;
  averageRating = 0;
  movieId: string = '';

  movie: any;
  showtimes: any[] = [];

  ngOnInit(): void {
   window.scrollTo({ top: 0, behavior: 'instant' });
   this.movieId = this.routes.snapshot.paramMap.get('id')!; 
   
   this.loadMovieDetails();   
   this.loadReviews();        
   console.log(this.movieId);
  }

  loadReviews() {
    this.reviewService.getReviewsByMovie(this.movieId).subscribe({
      next: (data) => {
          this.reviews = data;
          this.totalReviews = this.reviews.length;
          const totalScore = this.reviews.reduce(
            (sum, r) => sum + r.rating,
            0
          );
          this.averageRating =
            this.totalReviews > 0
              ? totalScore / this.totalReviews
              : 0;

            
      },
      error: (err) => {
        console.error('Failed to load reviews:', err);
      }
    });
}
  getStars(rating: number): number[] {
  return Array(rating).fill(0);
  }

 
  


  selectedRating: number = 0;
comment: string = '';

setRating(rating: number) {
  this.selectedRating = rating;
}

submitReview() {

  if (!this.selectedRating || !this.comment.trim()) {

    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Review',
      text: 'Please add rating and comment'
    });

    return;
  }
  
  const newReview: Review = {
    movie_id: this.movieId,
    name: "You",
    title: "Avengers Reborn",
    rating: this.selectedRating,
    comment: this.comment,
    created_at: new Date()
  };

  this.reviewService.addReview(newReview).subscribe({
    next: (res: Review) => {

      this.loadReviews();   
      this.selectedRating = 0;
      this.comment = '';


      this.totalReviews = this.reviews.length;

      const totalScore = this.reviews.reduce(
        (sum, r) => sum + r.rating,
        0
      );

      this.averageRating = totalScore / this.totalReviews;

      this.selectedRating = 0;
      this.comment = '';
      
      Swal.fire({
        icon: 'success',
        title: 'Review Submitted',
        text: 'Your review has been added!',
        timer: 1500,
        showConfirmButton: false
      });

      console.log("Review added", res);
    },
    error: (err) => {

      if (err.error?.message === "You already reviewed this movie") {

        Swal.fire({
          icon: 'info',
          title: 'Already Reviewed',
          text: 'You already reviewed this movie'
        });

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to submit review'
        });

        console.error("Add review failed", err);
      }

    }
  });
}

loadMovieDetails() {

  this.movieService.getMovieDetails(this.movieId).subscribe({
    next: (data) => {
      this.movie = data.movie;
      this.showtimes = data.showtimes;
    },
    error: (err) => {
      console.error('Failed to load movie details:', err);
    }
  });
}

bookShowtime(showtimeId: string) {
  this.router.navigate(['/booking', showtimeId]);
}
}