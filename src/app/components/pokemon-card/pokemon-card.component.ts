import { Component, inject, Signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { PokemonData } from '../../services/pokemon.service';
import { Store } from '@ngxs/store';
import { PokemonState } from '../../state/pokemon/pokemon.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  private _store = inject(Store);
  pokemon: Signal<PokemonData | null> = this._store.selectSignal(PokemonState.getSelectedPokemon);
}
