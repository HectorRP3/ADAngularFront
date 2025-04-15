import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Flag } from '../interfaces/flags';

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
}
