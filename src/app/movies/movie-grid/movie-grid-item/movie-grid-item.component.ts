import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../movie.service';

@Component({
  selector: 'app-movie-grid-item',
  templateUrl: './movie-grid-item.component.html',
  styleUrls: ['./movie-grid-item.component.scss']
})
export class MovieGridItemComponent implements OnInit {
  @Input() movie: Movie

  noPosterImage = 'https://allmovies.tube/assets/img/no-poster.png'

  constructor() { }

  ngOnInit(): void {
  }

}
