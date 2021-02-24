import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  noPosterImage = 'https://allmovies.tube/assets/img/no-poster.png'

  constructor(
    private movieService: MovieService,
    private router: Router
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

  onYourMovieClick(id: string): void {
    this.router.navigate(['movies', id], { queryParamsHandling: 'preserve' })
  }

}
