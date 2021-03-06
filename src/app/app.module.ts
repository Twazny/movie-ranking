import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies/movies.component';
import { SearchComponent } from './movies/search/search.component';
import { YourMoviesComponent } from './movies/your-movies/your-movies.component';
import { NoDataMessageComponent } from './movies/no-data-message/no-data-message.component';
import { MovieGridComponent } from './movies/movie-grid/movie-grid.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieGridItemComponent } from './movies/movie-grid/movie-grid-item/movie-grid-item.component';
import { MovieRatingComponent } from './movies/movie-detail/movie-rating/movie-rating.component';
import { MovieReviewComponent } from './movies/movie-detail/movie-review/movie-review.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    SearchComponent,
    YourMoviesComponent,
    NoDataMessageComponent,
    MovieGridComponent,
    MovieDetailComponent,
    MovieGridItemComponent,
    MovieRatingComponent,
    MovieReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
