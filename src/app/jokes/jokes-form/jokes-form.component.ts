import { Component, DestroyRef, inject, input } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JokesService } from '../services/jokes.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';
import { JokeInsert } from '../interfaces/jokes';

@Component({
  selector: 'jokes-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './jokes-form.component.html',
  styleUrl: './jokes-form.component.css',
})
export class JokesFormComponent {
  #jokesService = inject(JokesService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);
  #fb = inject(NonNullableFormBuilder);
  #title = inject(Title);
  idJokes = input<number>();

  jokeResource = rxResource({
    request: () => this.idJokes(),
    loader: ({ request: id }) => {
      if (id) {
        this.#jokesService.getJokeById(id).pipe(
          tap((j) => {
            this.#title.setTitle(j.id + '| SPRING JOKES');
          }),
          catchError(() => {
            this.#router.navigate(['/jokes']);
            return EMPTY;
          })
        );
      }
      return EMPTY;
    },
  });

  languages = [
    { id: 1, name: 'Czech' },
    { id: 2, name: 'German' },
    { id: 3, name: 'English' },
    { id: 4, name: 'Spanish' },
    { id: 5, name: 'French' },
    { id: 6, name: 'Portuguese' },
  ];
  categories = [
    { id: 1, name: 'Any' },
    { id: 2, name: 'Misc' },
    { id: 3, name: 'Programming' },
    { id: 4, name: 'Dark' },
    { id: 5, name: 'Pun' },
    { id: 6, name: 'Spooky' },
    { id: 7, name: 'Christmas' },
  ];
  types = [
    { id: 1, name: 'Single' },
    { id: 2, name: 'Twopart' },
  ];

  jokesForm = this.#fb.group({
    text1: ['', [Validators.required]],
    text2: ['', [Validators.required]],
    language: [0, [Validators.required]],
    categoriesid: [0, [Validators.required]],
    typesid: [0, [Validators.required]],
    typesType: ['', [Validators.required]],
  });

  addJokes() {
    const categoriName = this.categories.find(
      (c) => c.id === this.jokesForm.value.categoriesid
    )?.name;
    const typeName = this.types.find(
      (t) => t.id === this.jokesForm.value.typesid
    )?.name;
    const newJoke: JokeInsert = {
      text1: this.jokesForm.value.text1,
      text2: this.jokesForm.value.text2,
      categories: {
        id: this.jokesForm.value.categoriesid ?? 0,
        category: categoriName ?? '',
      },
      types: {
        id: this.jokesForm.value.typesid ?? 0,
        type: typeName ?? '',
      },
      language: {
        id: this.jokesForm.value.language ?? 0,
      },
      flagses: [],
    };
    console.log(newJoke);

    if (this.jokeResource.value()) {
      this.#jokesService
        .updateJoke(newJoke, this.idJokes() ?? 0)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.#router.navigate(['/jokes']);
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      this.#jokesService
        .addJoke(newJoke)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.#router.navigate(['/jokes']);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }
}
