import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
import { PokemonData } from '../../services/pokemon.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { PokemonActions } from '../../state/pokemon/pokemon.actions';
import { MatDialogClose, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './pokemon-info.component.html',
  styleUrl: './pokemon-info.component.scss',
})
export class PokemonInfoComponent {
  @Input() dialog = false;
  @Output() onClose = new EventEmitter<boolean>();
  private _store = inject(Store);

  pokemon = input<PokemonData | null>();
  favoritePokemon = input<PokemonData | null>();

  onClick($event: PokemonData): void {
    if ($event.id === this.favoritePokemon()?.id) {
      this._store.dispatch(new PokemonActions.SetFavoritePokemon(null));
    } else {
      this._store.dispatch(new PokemonActions.SetFavoritePokemon($event));
    }

    if (this.dialog) this.onClose.emit(true);
  }

  onCloseFn(): void {
    if (this.dialog) this.onClose.emit(true);
  }
}
