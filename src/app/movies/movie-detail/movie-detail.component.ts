import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { tap, switchMap, map } from 'rxjs/operators';
import { YourMovieFullData, MovieService, Review } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  id: string
  movieData: YourMovieFullData
  loading = true
  newReview: Review

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap((data: Params) => this.id = data['id']),
      switchMap((data: Params) => this.movieService.get(this.id))
    ).subscribe(movieData => {
      this.loading = false
      this.movieData = movieData
      this.newReview = null
    })
  }

  onBack(): void {
    this.router.navigate(['movies'], { queryParamsHandling: 'preserve' })
  }
  onAdd(): void {
    this.movieService.updateYourMovie(this.movieData)
  }
  handleRatingChange(rating): void {
    this.movieData.rating = rating
    this.movieService.updateYourMovie(this.movieData)
  }

  onAddReview(): void {
    this.newReview = {
      title: '',
      review: ''
    }
  }

  handleReviewChange(review: Review): void {
    this.newReview = null
    this.movieData.review = review
    this.movieService.updateYourMovie(this.movieData)
  }

  handleReviewCancel(): void {
    this.newReview = null
  }

  onEditReview(): void {
    this.newReview = {...this.movieData.review}
  }
}
