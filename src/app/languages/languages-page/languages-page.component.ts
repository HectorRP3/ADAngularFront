import { Component, inject } from '@angular/core';
import { LanguagesCardComponent } from '../languages-card/languages-card.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LanguagesService } from '../services/languages.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'languages-page',
  imports: [FaIconComponent, LanguagesCardComponent],
  templateUrl: './languages-page.component.html',
  styleUrl: './languages-page.component.css',
})
export class LanguagesPageComponent {
  icon = { faPlus };
  #languagesService = inject(LanguagesService);
  #router = inject(Router);

  languages = rxResource({
    loader: () => this.#languagesService.getLanguages(),
  });

  goCreateLanguage() {
    console.log('goCreateLanguage');
    return this.#router.navigate(['/languages', 'add']);
  }
}
