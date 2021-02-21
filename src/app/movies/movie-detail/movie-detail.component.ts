import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { tap, switchMap, map } from 'rxjs/operators';
import { MovieFullData, MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  id: string
  movieData: MovieFullData

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap((data: Params) => this.id = data['id']),
      switchMap((data: Params) => this.movieService.get(this.id))
    ).subscribe(movieData => {
      this.movieData = movieData
    })
  }
}
