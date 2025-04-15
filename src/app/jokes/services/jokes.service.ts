import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Joke } from '../interfaces/jokes';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  #jokesUrl = 'jokes';
  #http = inject(HttpClient);

  getJokes(): Observable<Joke[]> {
    return this.#http.get<Joke[]>(`${this.#jokesUrl}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  getJokeById(id: number): Observable<Joke> {
    return this.#http.get<Joke>(`${this.#jokesUrl}/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
}
