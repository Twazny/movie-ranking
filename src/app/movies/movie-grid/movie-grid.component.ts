import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../movie.service';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.scss']
})
export class MovieGridComponent implements OnInit {
  @Input() movies: Movie[]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onMovieClick(id: string) {
    this.router.navigate(['movies',id])
  }
}
