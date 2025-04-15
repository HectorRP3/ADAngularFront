import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FlagsService } from '../services/flags.service';
import { FlagsCardComponent } from '../flags-card/flags-card.component';

@Component({
  selector: 'flags-page',
  imports: [FlagsCardComponent],
  templateUrl: './flags-page.component.html',
  styleUrl: './flags-page.component.css',
})
export class FlagsPageComponent {
  #flagsService = inject(FlagsService);
  flags = rxResource({
    loader: () => this.#flagsService.getFlags(),
  });
}
