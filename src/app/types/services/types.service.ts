import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Types, TypesInsert } from '../interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  #typesUrl = 'type';
  #http = inject(HttpClient);

  getTypes(): Observable<Types[]> {
    return this.#http.get<Types[]>(this.#typesUrl);
  }
  getTypeById(id: number): Observable<Types> {
    return this.#http.get<Types>(`${this.#typesUrl}/${id}`);
  }
  addType(type: TypesInsert): Observable<Types> {
    return this.#http.post<Types>(this.#typesUrl, type);
  }
  updateType(type: TypesInsert, id: number): Observable<Types> {
    return this.#http.put<Types>(`${this.#typesUrl}/${id}`, type);
  }
}
