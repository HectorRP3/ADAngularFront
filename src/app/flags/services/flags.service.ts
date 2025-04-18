import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Flag, flagInsert, flagInsert2 } from '../interfaces/flags';

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  #flagsUrl = 'flags';
  #http = inject(HttpClient);

  getFlags(): Observable<Flag[]> {
    return this.#http.get<Flag[]>(`${this.#flagsUrl}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  getFlagById(id: number): Observable<Flag> {
    return this.#http.get<Flag>(`${this.#flagsUrl}/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  addFlag(flag: flagInsert): Observable<Flag> {
    return this.#http.post<Flag>(`${this.#flagsUrl}`, flag).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
  updateFlag(flag: flagInsert, id: number): Observable<Flag> {
    return this.#http.put<Flag>(`${this.#flagsUrl}/${id}`, flag).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
  updateFlag2(flag: flagInsert2, id: number): Observable<Flag> {
    return this.#http.put<Flag>(`${this.#flagsUrl}/${id}`, flag).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
  deleteFlag(id: number): Observable<Flag> {
    return this.#http.delete<Flag>(`${this.#flagsUrl}/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
}
