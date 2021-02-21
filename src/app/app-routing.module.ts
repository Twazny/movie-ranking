import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MoviesComponent } from './movies/movies/movies.component';

const routes: Routes = [
  {path: '',redirectTo: 'movies', pathMatch: 'full'},
  {path: 'movies', component: MoviesComponent},
  {path: 'movies/:id', component: MovieDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
