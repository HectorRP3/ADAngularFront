import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category, CategoryInsert } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  #categoryUrl = 'category';
  #http = inject(HttpClient);

  getCategory(): Observable<Category[]> {
    return this.#http.get<Category[]>(`${this.#categoryUrl}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.#http.get<Category>(`${this.#categoryUrl}/${id}`).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }

  createCategory(category: CategoryInsert): Observable<Category> {
    return this.#http.post<Category>(`${this.#categoryUrl}`, category).pipe(
      map((r) => {
        console.log(r);
        return r;
      })
    );
  }
  updateCategory(category: Category): Observable<Category> {
    return this.#http
      .put<Category>(`${this.#categoryUrl}/${category.id}`, category)
      .pipe(
        map((r) => {
          console.log(r);
          return r;
        })
      );
  }
}
