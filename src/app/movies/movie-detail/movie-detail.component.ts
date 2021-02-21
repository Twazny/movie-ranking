import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  loading = true

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
    })
  }

  onBack(): void {
    this.router.navigate(['movies'], {queryParamsHandling: 'preserve'})
  }
}
