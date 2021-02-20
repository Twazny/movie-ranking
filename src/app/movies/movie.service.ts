import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'

export type SearchResponse = {
    Response: string;
    Search: MovieResponse;
    totalResults: number
}
export type MovieResponse = Movie[]
export type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private url = 'http://www.omdbapi.com/'

    constructor(
        private http: HttpClient
    ) {}

    search(term: string): Observable<MovieResponse> {
        return this.http.get<SearchResponse>(this.url, {
            params: {
                apikey: environment.omdbAPIkey,
                s: term,
                type: 'movie'
            }
        }).pipe(
            map(res => res.Search)
        )
    }
}