import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService, YourMovie } from '../movie.service';

@Component({
  selector: 'app-your-movies',
  templateUrl: './your-movies.component.html',
  styleUrls: ['./your-movies.component.scss']
})
export class YourMoviesComponent implements OnInit, OnDestroy {
  movies: YourMovie[]
  movieSubs: Subscription

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movieSubs = this.movieService.yourMoviesSubject
      .subscribe(movies => {
        this.movies = movies
      })
  }

  ngOnDestroy(): void {
    this.movieSubs.unsubscribe()
  }

}
