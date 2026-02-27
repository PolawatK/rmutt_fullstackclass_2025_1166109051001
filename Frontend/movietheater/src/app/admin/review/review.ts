import { Component, OnInit } from '@angular/core';
import { ReviewService, Review } from '../../services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.html',
  styleUrls: ['./review.css']
})
export class ReviewComponent implements OnInit {

  reviews: Review[] = [];
  totalReviews = 0;
  averageRating = 0;
  
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        console.log(this.reviews);
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.reviewService.getReviews().subscribe(data => {
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
    });
  }

  getStars(rating: number): number[] {
  return Array(rating).fill(0);
  }

  

  
}




