import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Navbar } from "../../share/navbar/navbar";
import { Review, ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  imports: [Navbar,CommonModule,FormsModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  constructor(private router: Router,private routes:ActivatedRoute,private reviewService: ReviewService) {}
  reviews: Review[] = [];
  totalReviews = 0;
  averageRating = 0;
  movieId: string = '';
  ngOnInit(): void {
   this.movieId = this.routes.snapshot.paramMap.get('id')!; 
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
    alert("Please add rating and comment");
    return;
  }
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    alert("User not logged in");
    return;
  }

  const newReview: Review = {
    
    user_id: userId,
    movie_id: this.movieId,
    name: "You",
    title: "Avengers Reborn",
    rating: this.selectedRating,
    comment: this.comment,
    created_at: new Date()
  };

  this.reviewService.addReview(newReview).subscribe({
    next: (res) => {

      this.reviews.push(res);

      this.totalReviews = this.reviews.length;

      const totalScore = this.reviews.reduce(
        (sum, r) => sum + r.rating,
        0
      );

      this.averageRating = totalScore / this.totalReviews;

      this.selectedRating = 0;
      this.comment = '';
      console.log("Review added", res);
    },
    error: (err) => {
      console.error("Add review failed", err);
    }
  });
}

}