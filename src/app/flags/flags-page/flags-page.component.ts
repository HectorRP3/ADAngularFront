import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FlagsService } from '../services/flags.service';
import { FlagsCardComponent } from '../flags-card/flags-card.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'flags-page',
  imports: [FlagsCardComponent, FaIconComponent],
  templateUrl: './flags-page.component.html',
  styleUrl: './flags-page.component.css',
})
export class FlagsPageComponent {
  #flagsService = inject(FlagsService);
  flags = rxResource({
    loader: () => this.#flagsService.getFlags(),
  });
  #router = inject(Router);
  icon = faPlus;

  goCreateFlag() {
    return this.#router.navigate(['/flags', 'add']);
  }
}
