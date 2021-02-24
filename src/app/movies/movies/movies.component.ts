import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MovieService, MovieResponse, SearchData } from '../movie.service'


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
  found = 0
  numberOfPages = 1
  currentPage = 1

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      
      const page = params['page']
      if (page && +page !== NaN && +page > 0) {
        this.currentPage = +params['page']
      } else {
        this.currentPage = 1
      }

      this.searchData = {
        term: params['term'],
        year: params['year'],
        page: this.currentPage
      }
      
      
      if (!this.searchData.term && !this.searchData.year) {
        this.noQuery = true
        this.movies = []
      } else {
        this.noQuery = false

        this.loading = true
        this.moviesSubs =  this.movieService.search(this.searchData).subscribe(res => {          
          this.loading = false
          this.movies = res.Search
          this.numberOfPages = Math.ceil(res.totalResults / 10)
          this.found = res.totalResults
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

  onPreviousPage(): void {
    if (this.currentPage <= 1) {
      return
    } 
    this.router.navigate([],{
      queryParams: { page: this.currentPage-1 },
      queryParamsHandling: 'merge'
    })
  }

  onNextPage(): void {
    if (this.currentPage >= this.numberOfPages) {
      return
    } 
    this.router.navigate([],{
      queryParams: { page: this.currentPage+1 },
      queryParamsHandling: 'merge'
    })
  }

}
