import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'
import { FunctionCall } from '@angular/compiler'

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
export interface MovieFullData extends Movie {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: {
        Source: string;
        value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface YourMovie extends Movie {
    position?: number;
    rating?: 1 | 2 | 3 | 4 | 5;
    review?: string;
}

export interface YourMovieFullData extends MovieFullData, YourMovie { }

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private url = 'http://www.omdbapi.com/'
    yourMovies: YourMovie[] = []
    yourMoviesSubject = new BehaviorSubject<YourMovie[]>(this.yourMovies)

    constructor(
        private http: HttpClient
    ) { }

    search(term: string): Observable<MovieResponse> {
        return this.http.get<SearchResponse>(this.url, {
            params: {
                apikey: environment.omdbAPIkey,
                s: term,
                type: 'movie'
            }
        }).pipe(
            map(res => {
                if (res.Response === "False") {
                    return []
                }
                return res.Search
            })
        )
    }

    get(id: string): Observable<YourMovieFullData> {
        return this.http.get<MovieFullData>(this.url, {
            params: {
                apikey: environment.omdbAPIkey,
                i: id,
                plot: 'full'
            }
        }).pipe(map(movieData => {
            return {
                ...movieData,
                ...this.fromYourMovies(movieData.imdbID)
            }
        }))
    }

    updateYourMovie(movie: YourMovie): void {
        let found = this.yourMovies.find(movieEl => movieEl.imdbID === movie.imdbID)
        if (found) {
            found = { ...found, ...movie }
        } else {
            this.yourMovies.push(movie)
        }
        this.notify()
    }

    private fromYourMovies(id: string): YourMovie | {} {
        const found = this.yourMovies.find(movie => movie.imdbID === id)
        return found || {
            position: null,
            rating: 0,
            review: null
        }
    }

    private notify(): void {
        this.yourMoviesSubject.next(this.yourMovies.slice())
    }
}