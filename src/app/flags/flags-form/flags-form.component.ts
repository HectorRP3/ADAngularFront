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
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { Flag, flagInsert } from '../interfaces/flags';
import { FlagsService } from '../services/flags.service';
@Component({
  selector: 'flags-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './flags-form.component.html',
  styleUrl: './flags-form.component.css',
})
export class FlagsFormComponent {
  #flagService = inject(FlagsService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);
  #fb = inject(NonNullableFormBuilder);
  #title = inject(Title);
  id = input<number>();
  flagPlus = signal<Flag>({
    id: 0,
    flag: '',
    jokeses: [],
  });

  flagResoruce = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) =>
      this.#flagService.getFlagById(id).pipe(
        tap((f) => {
          this.#title.setTitle(f.flag + '| Spring Jokes');
          this.flagPlus().flag = f.flag;
          this.flagPlus().id = f.id;
        }),
        catchError(() => {
          this.#router.navigate(['/flags']);
          return EMPTY;
        })
      ),
  });

  flagsForm = this.#fb.group({
    flag: [''],
  });

  constructor() {
    effect(() => {
      if (this.flagResoruce.value()) {
        this.flagsForm.controls.flag.setValue(this.flagPlus().flag);
      }
    });
  }

  addFlag() {
    const flagNew: flagInsert = {
      ...this.flagsForm.getRawValue(),
    };

    if (this.flagResoruce.value()) {
      console.log('fda');
      this.#flagService
        .updateFlag(flagNew, this.id()!)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.#router.navigate(['/flags']);
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      this.#flagService
        .addFlag(flagNew)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: () => {
            this.#router.navigate(['/flags']);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }
}
