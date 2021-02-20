import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService, MovieResponse } from '../movie.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movieObs: Observable<MovieResponse>

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movieObs = this.movieService.search('spider man')
  }

}
