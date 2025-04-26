import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Joke, JokeInsert, JokeResource } from '../interfaces/jokes';
import { Categories, languages, types } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  #jokesUrl = 'jokes';
  #http = inject(HttpClient);

  getJokes(texto = ''): Observable<JokeResource[]> {
    if (texto !== '') {
      return this.#http
        .get<JokeResource[]>(`${this.#jokesUrl}?texto=${texto}`)
        .pipe(
          map((r) => {
            console.log(r);
            return r;
          })
        );
    }
    return this.#http.get<JokeResource[]>(`${this.#jokesUrl}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  getCategory(): Observable<Categories[]> {
    return this.#http.get<Categories[]>(`${this.#jokesUrl}/categories`).pipe(
      map((r) => {
        return r;
      })
    );
  }
  getTypes(): Observable<types[]> {
    return this.#http.get<types[]>(`${this.#jokesUrl}/types`).pipe(
      map((r) => {
        return r;
      })
    );
  }
  getLanguages(): Observable<languages[]> {
    return this.#http.get<languages[]>(`${this.#jokesUrl}/languages`).pipe(
      map((r) => {
        return r;
      })
    );
  }

  // jokesWithprimeraVez
  getJokesWithPrimeraVez(): Observable<JokeResource[]> {
    return this.#http.get<JokeResource[]>(`jokesWithprimeraVez`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
  //jokesWithoutPrimeraVez
  getJokesWithoutPrimeraVez(): Observable<JokeResource[]> {
    return this.#http.get<JokeResource[]>(`jokesWithoutprimeraVez`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  getJokeById(id: number): Observable<JokeResource> {
    return this.#http.get<JokeResource>(`${this.#jokesUrl}/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  addJoke(joke: JokeInsert): Observable<Joke> {
    return this.#http.post<Joke>(`${this.#jokesUrl}`, joke).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  updateJoke(joke: JokeInsert, id: number): Observable<Joke> {
    return this.#http.put<Joke>(`${this.#jokesUrl}/${id}`, joke).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  updateJoke2(joke: Joke, id: number): Observable<Joke> {
    return this.#http.put<Joke>(`${this.#jokesUrl}/${id}`, joke).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  deleteJoke(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#jokesUrl}/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
}
