import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MovieService, MovieResponse } from '../movie.service'
import { SearchData } from '../search/search.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  moviesSubs: Subscription
  movies: MovieResponse = []

  searchData: SearchData
  noQuery = true
  loading = false

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchData = {
        term: params['term'],
        year: params['year']
      }
      
      if (!this.searchData.term && !this.searchData.year) {
        this.noQuery = true
        this.movies = []
      } else {
        this.noQuery = false

        this.loading = true
        this.moviesSubs =  this.movieService.search(this.searchData.term).subscribe(movies => {
          console.log(movies)
          this.loading = false
          this.movies = movies
        })
      }
    })
  }



  handleSearch(event: SearchData): void {
    let params = {}
    if (event.term) {params['term'] = event.term}
    if (event.year) {params['year'] = event.year}
    this.router.navigate([],{queryParams: params})
  }

}
