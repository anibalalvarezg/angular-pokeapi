import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { PokemonActions } from './pokemon.actions';
import { PokemonData, PokemonMetaData, PokemonService } from '../../services/pokemon.service';
import { firstValueFrom } from 'rxjs';

export interface PokemonStateModel {
  pokemons: PokemonMetaData[];
  total: number;
  offset: number;
  limit: number;
  selectedPokemon: PokemonData | null;
}

@State<PokemonStateModel>({
  name: 'pokemon',
  defaults: {
    pokemons: [],
    total: 0,
    offset: 0,
    limit: 20,
    selectedPokemon: null,
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

  @Selector()
  static getSelectedPokemon(state: PokemonStateModel) {
    return state.selectedPokemon;
  }

  @Action(PokemonActions.GetTotal)
  async get(ctx: StateContext<PokemonStateModel>) {
    const total = await firstValueFrom(this._pokemonService.getTotalPokemons()) ?? [];
    ctx.setState({
      ...ctx.getState(),
      total: total,
    });
  
  }

  @Action(PokemonActions.GetPokemons)
  async getPokemons(ctx: StateContext<PokemonStateModel>, action: PokemonActions.GetPokemons) {
    const { offset, limit } = action.payload;
    const pokemons = await firstValueFrom(this._pokemonService.getPokemons(offset, limit)) ?? [];
    ctx.setState({
      ...ctx.getState(),
      offset: offset,
      limit: limit,
      pokemons: pokemons,
    });
  }

  @Action(PokemonActions.GetPokemonById)
  async getPokemonsById(ctx: StateContext<PokemonStateModel>, action: PokemonActions.GetPokemonById) {
    const { url } = action;
    const pokemon = await firstValueFrom(this._pokemonService.getPokemonById(url)) ?? [];
    ctx.setState({
      ...ctx.getState(),
      selectedPokemon: pokemon,
    });
  }
}
