import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  PrimeraVezJokes,
  PrimeraVezJokesInsert,
  PrimeraVezJokesUpdate,
} from '../interfaces/PrimeraVez';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  #primeraVezUrl = 'primeravez';
  #http = inject(HttpClient);

  getPrimeraVez(): Observable<PrimeraVezJokes[]> {
    return this.#http.get<PrimeraVezJokes[]>(`${this.#primeraVezUrl}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  getPrimeraVezById(id: number): Observable<PrimeraVezJokes> {
    return this.#http.get<PrimeraVezJokes>(`${this.#primeraVezUrl}/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  addPrimeraVez(
    primeraVez: PrimeraVezJokes
  ): Observable<PrimeraVezJokesInsert> {
    return this.#http
      .post<PrimeraVezJokesInsert>(`${this.#primeraVezUrl}`, primeraVez)
      .pipe(
        map((r) => {
          console.log(r);
          return r;
        })
      );
  }
  updatePrimeraVez(
    primeraVez: PrimeraVezJokes
  ): Observable<PrimeraVezJokesUpdate> {
    return this.#http
      .put<PrimeraVezJokesUpdate>(`${this.#primeraVezUrl}`, primeraVez)
      .pipe(
        map((r) => {
          console.log(r);
          return r;
        })
      );
  }

  deletePrimeraVez(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#primeraVezUrl}/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
}
