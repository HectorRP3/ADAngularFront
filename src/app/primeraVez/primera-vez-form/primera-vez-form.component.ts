import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ServicesService } from '../services/services.service';
import {
  FormArray,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PrimeraVezJokes } from '../interfaces/PrimeraVez';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { JokesService } from '../../jokes/services/jokes.service';

@Component({
  selector: 'primera-vez-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './primera-vez-form.component.html',
  styleUrl: './primera-vez-form.component.css',
})
export class PrimeraVezFormComponent {
  #primeraVezService = inject(ServicesService);
  #jokesService = inject(JokesService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);
  #fb = inject(NonNullableFormBuilder);
  #title = inject(Title);
  id = input<number>();
  primeraVezPlus = signal<PrimeraVezJokes>({
    id: undefined,
    programa: 'string',
    fechaEmision: 'string',
    telefonoses: [],
    jokes: 0,
  });
  public readonly phones: FormArray = this.#fb.array([]);

  primeraVezForm = this.#fb.group({
    programa: this.#fb.control(''),
    fechaEmision: this.#fb.control(''),
    telefonoses: this.phones,
    jokes: this.#fb.control(0),
  });

  jokesRE = rxResource({
    loader: () => this.#jokesService.getJokes(),
  });

  primeraVezResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) =>
      this.#primeraVezService.getPrimeraVezById(id).pipe(
        tap((j) => {
          this.#title.setTitle(j.id + '| PRIMERA VEZ');
          this.primeraVezPlus().id = j.id;
          this.primeraVezPlus().programa = j.programa;
          this.primeraVezPlus().fechaEmision = j.fechaEmision;
          this.primeraVezPlus().telefonoses = j.telefonoses;
          this.primeraVezPlus().jokes = j.jokes;
          console.log(this.primeraVezPlus());
        })
      ),
  });

  constructor() {
    effect(() => {
      if (this.primeraVezResource.value()) {
        console.log(this.jokesRE.value());
        this.primeraVezForm.patchValue({
          programa: this.primeraVezPlus().programa,
          fechaEmision: this.primeraVezPlus().fechaEmision,
          jokes: this.primeraVezPlus().jokes,
        });
        console.log(this.primeraVezPlus().telefonoses);
        this.loadPhones(this.primeraVezPlus().telefonoses);
      }
    });
    this.addPhone();
  }

  addPrimeraVez() {
    const newPrimeraVez: PrimeraVezJokes = {
      id: this.primeraVezPlus().id ?? undefined,
      programa: this.primeraVezForm.value.programa ?? '',
      fechaEmision: this.primeraVezForm.value.fechaEmision ?? '',
      telefonoses:
        (this.primeraVezForm.controls.telefonoses.value as string[]) ?? [],
      jokes: this.primeraVezForm.value.jokes ?? 0,
    };
    console.log(newPrimeraVez);
    if (this.id()) {
      this.#primeraVezService
        .updatePrimeraVez(newPrimeraVez, this.id()!)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => {
          this.#router.navigate(['/primeravez']);
        });
    } else {
      this.#primeraVezService
        .addPrimeraVez(newPrimeraVez)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => {
          this.#router.navigate(['/primeravez']);
        });
    }
  }

  newPhoneControl() {
    console.log(this.phones.controls);
    return this.#fb.control('', [
      Validators.required, // adapta el patrón a tu caso
    ]);
  }
  newPhoneControlValue(num: string) {
    console.log(this.phones.controls);
    return this.#fb.control(num, [
      Validators.required, // adapta el patrón a tu caso
    ]);
  }

  addPhone() {
    this.phones.push(this.newPhoneControl());
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  private loadPhones(numbers: string[] = []): void {
    this.phones.clear(); // vacía los controles presentes
    numbers.forEach((num) => this.phones.push(this.newPhoneControlValue(num)));
  }
}
