import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { PokemonActions } from './pokemon.actions';
import { PokemonMetaData, PokemonService } from '../../services/pokemon.service';
import { firstValueFrom } from 'rxjs';

export interface PokemonStateModel {
  pokemons: PokemonMetaData[];
  total: number;
}

@State<PokemonStateModel>({
  name: 'pokemon',
  defaults: {
    pokemons: [],
    total: 0,
  }
})
@Injectable()
export class PokemonState {
  private _pokemonService = inject(PokemonService);

  @Selector()
  static getPokemons(state: PokemonStateModel) {
    return state.pokemons;
  }

  @Selector()
  static getTotalPokemons(state: PokemonStateModel) {
    return state.total;
  }

  @Action(PokemonActions.GetTotal)
  async get(ctx: StateContext<PokemonStateModel>) {
    const total = await firstValueFrom(this._pokemonService.getTotalPokemons()) ?? [];
    ctx.setState({
      ...ctx.getState(),
      total: total,
    });
  
  }
}
