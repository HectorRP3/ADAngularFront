import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Language, LanguageInsert } from '../interfaces/languages';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  #languagesUrl = 'language';
  #http = inject(HttpClient);

  getLanguages(): Observable<Language[]> {
    return this.#http.get<Language[]>(`${this.#languagesUrl}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
  getLanguageById(id: number): Observable<Language> {
    return this.#http.get<Language>(`${this.#languagesUrl}/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
  createLanguage(language: LanguageInsert): Observable<Language> {
    return this.#http.post<Language>(`${this.#languagesUrl}`, language).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  updateLanguage(language: LanguageInsert, id: number): Observable<Language> {
    return this.#http
      .put<Language>(`${this.#languagesUrl}/${id}`, language)
      .pipe(
        map((r) => {
          console.log(r);
          return r;
        })
      );
  }
}
