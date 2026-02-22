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

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
