import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { JokeInsert, JokeResource } from '../interfaces/jokes';
import { JokesService } from '../services/jokes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../shared/modals/alert-modal/alert-modal.component';

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
  id = input<number>();
  jokesPlues = signal<JokeResource>({
    id: 0,
    text1: '',
    text2: '',
    language: '',
    category: '',
    type: '',
    flags: [],
  });

  jokeResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) =>
      this.#jokesService.getJokeById(id).pipe(
        tap((j) => {
          this.#title.setTitle(j.id + '| SPRING JOKES');
          this.jokesPlues().id = j.id;
          this.jokesPlues().text1 = j.text1;
          this.jokesPlues().text2 = j.text2;
          this.jokesPlues().language = j.language;
          this.jokesPlues().category = j.category;
          this.jokesPlues().type = j.type;
          this.jokesPlues().flags = j.flags;
          console.log(this.jokesPlues());
        }),

        catchError(() => {
          this.#router.navigate(['/jokes']);
          return EMPTY;
        })
      ),
  });

  // languages = [
  //   { id: 1, name: 'Czech' },
  //   { id: 2, name: 'German' },
  //   { id: 3, name: 'English' },
  //   { id: 4, name: 'Spanish' },
  //   { id: 5, name: 'French' },
  //   { id: 6, name: 'Portuguese' },
  // ];
  // categories = [
  //   { id: 1, name: 'Any' },
  //   { id: 2, name: 'Misc' },
  //   { id: 3, name: 'Programming' },
  //   { id: 4, name: 'Dark' },
  //   { id: 5, name: 'Pun' },
  //   { id: 6, name: 'Spooky' },
  //   { id: 7, name: 'Christmas' },
  // ];
  // types = [
  //   { id: 1, name: 'single' },
  //   { id: 2, name: 'twopart' },
  // ];
  languages = rxResource({
    loader: () => this.#jokesService.getLanguages(),
  });
  categories = rxResource({
    loader: () => this.#jokesService.getCategory(),
  });
  types = rxResource({
    loader: () => this.#jokesService.getTypes(),
  });

  jokesForm = this.#fb.group({
    text1: ['', [Validators.required]],
    text2: ['', [Validators.required]],
    language: [0, [Validators.required]],
    categoriesid: [0, [Validators.required]],
    typesid: [0, [Validators.required]],
  });

  constructor() {
    this.#jokesService.getCategory().pipe(
      map((c) => {
        console.log(c);
        return c;
      })
    );
    this.#jokesService.getTypes().pipe(
      map((t) => {
        console.log(t);
        return t;
      })
    );
    this.#jokesService.getLanguages().pipe(
      map((l) => {
        console.log(l);
        return l;
      })
    );

    effect(() => {
      if (this.jokeResource.value()) {
        const lang = this.languages
          .value()!
          .find((l) => l.language === this.jokesPlues().language)?.id;
        const categori = this.categories
          .value()!
          .find((c) => c.category === this.jokesPlues().category)?.id;
        const type = this.types
          .value()!
          .find((t) => t.type === this.jokesPlues().type)?.id;
        this.jokesForm.controls.text1.setValue(this.jokesPlues().text1 ?? '');
        this.jokesForm.controls.text2.setValue(this.jokesPlues().text2 ?? '');
        this.jokesForm.controls.language.setValue(lang ?? 0);
        this.jokesForm.controls.categoriesid.setValue(categori ?? 0);
        this.jokesForm.controls.typesid.setValue(type ?? 0);
        console.log(this.jokesForm.value + '');
      }
    });
  }

  addJokes() {
    const categoriName = this.categories
      .value()!
      .find((c) => c.id === this.jokesForm.value.categoriesid)?.category;
    const typeName = this.types
      .value()!
      .find((t) => t.id === this.jokesForm.value.typesid)?.type;
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
        .updateJoke(newJoke, this.id() ?? 0)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.#router.navigate(['/jokes']);
          },
          error: (err) => {
            console.error(err);
            this.alertModal(
              'Error al guardar los datos. Intenta nuevamente.' +
                err.error.errors,
              'Error'
            );
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
            this.alertModal(
              'Error al guardar los datos. Intenta nuevamente.' +
                err.error.errors,
              'Error'
            );
          },
        });
    }
  }

  #modalService = inject(NgbModal);
  alertModal(text: string, title: string) {
    const modalRef = this.#modalService.open(AlertModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.body = text;
    return modalRef.result.catch(() => false);
  }
}
