import { Component, effect, inject, input, signal } from '@angular/core';
import { LanguagesService } from '../services/languages.service';
import {
  FormsModule,
  NonNullableFormBuilder,
  PatternValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Language, LanguageInsert } from '../interfaces/languages';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'languages-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './languages-form.component.html',
  styleUrl: './languages-form.component.css',
})
export class LanguagesFormComponent {
  #languageService = inject(LanguagesService);
  #router = inject(Router);
  #fb = inject(NonNullableFormBuilder);
  #title = inject(Title);
  id = input<number>();

  language = this.#fb.group({
    code: [
      '',
      {
        validators: [Validators.pattern(/^[A-z]{2}$/)],
        nonNullable: true,
      },
    ],
    language: ['', { validators: [], nonNullable: true }],
  });

  lagnuagePlues = signal<Language>({
    id: 0,
    code: '',
    language: '',
  });

  languageResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) =>
      this.#languageService.getLanguageById(id).pipe(
        tap((l) => {
          if (l) {
            this.#title.setTitle(l.id + '| SPRING LANGUAGES');
            this.lagnuagePlues().id = l.id;
            this.lagnuagePlues().code = l.code;
            this.lagnuagePlues().language = l.language;
          }
        })
      ),
  });

  constructor() {
    effect(() => {
      if (this.languageResource.value()) {
        this.language.patchValue({
          code: this.lagnuagePlues().code,
          language: this.lagnuagePlues().language,
        });
      }
    });
  }

  addLanguage() {
    const language: LanguageInsert = {
      code: this.language.value.code!,
      language: this.language.value.language!,
    };
    if (this.id()) {
      this.#languageService
        .updateLanguage(language, this.id()!)
        .subscribe(() => {
          this.#router.navigate(['/languages']);
        });
    } else {
      this.#languageService.createLanguage(language).subscribe(() => {
        this.#router.navigate(['/languages']);
      });
    }
  }
}
