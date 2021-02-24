import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
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
    review?: Review;
}

export type Review = {
    title: string;
    review: string;
}

export interface SearchData {
    term?: string;
    year?: number;
    page: number;
}

export interface YourMovieFullData extends MovieFullData, YourMovie { }

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private url = 'https://www.omdbapi.com/'
    yourMovies: YourMovie[] = []
    yourMoviesSubject = new BehaviorSubject<YourMovie[]>(this.yourMovies)

    constructor(
        private http: HttpClient
    ) { }

    search(searchData: SearchData): Observable<SearchResponse> {
        let params: { [key: string]: string } = {
            apikey: environment.omdbAPIkey,
            type: 'movie',
            page: '' + searchData.page
        }
        if (searchData.term) {
            params.s = searchData.term
        }
        if (searchData.year) {
            params.y = '' + searchData.year
        }

        return this.http.get<SearchResponse>(
            this.url,
            { params }
        ).pipe(
            map(res => {
                if (res.Response === "False") {
                    res.Search = []
                }
                return res
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