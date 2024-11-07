import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { PokemonActions } from './pokemon.actions';
import { PokemonMetaData, PokemonService } from '../../services/pokemon.service';
import { firstValueFrom } from 'rxjs';

export interface PokemonStateModel {
  pokemons: PokemonMetaData[];
}

@State<PokemonStateModel>({
  name: 'pokemon',
  defaults: {
    pokemons: []
  }
})
@Injectable()
export class PokemonState {
  private _pokemonService = inject(PokemonService);

  @Selector()
  static getPokemons(state: PokemonStateModel) {
    return state.pokemons;
  }

  @Action(PokemonActions.Get)
  async get(ctx: StateContext<PokemonStateModel>) {
    const pokemons = await firstValueFrom(this._pokemonService.getPokemons()) ?? [];
    ctx.setState({
      ...ctx.getState(),
      pokemons: [...ctx.getState().pokemons, ...pokemons]
    });
  
  }
}
