import { Component, inject, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PokemonData } from '../../services/pokemon.service';
import { Store } from '@ngxs/store';
import { PokemonState } from '../../state/pokemon/pokemon.state';
import { PokemonInfoComponent } from '../pokemon-info/pokemon-info.component';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [MatCardModule, PokemonInfoComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  private _store = inject(Store);

  constructor() {}

  pokemon: Signal<PokemonData | null> = this._store.selectSignal(
    PokemonState.getSelectedPokemon
  );
  favoritePokemon: Signal<PokemonData | null> = this._store.selectSignal(
    PokemonState.getFavoritePokemon
  );
}
