import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonMetaData, PokemonService } from './services/pokemon.service';
import { Store } from '@ngxs/store';
import { PokemonState } from './state/pokemon/pokemon.state';
import { PokemonActions } from './state/pokemon/pokemon.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-pokeapi';
  private _store = inject(Store);
  pokemons$: Signal<PokemonMetaData[]> = this._store.selectSignal(PokemonState.getPokemons);

  constructor() {
    this._store.dispatch(new PokemonActions.Get());
  }

  ngOnInit(): void {
  }
  
  get test() {
    return this.title;
  }

}
