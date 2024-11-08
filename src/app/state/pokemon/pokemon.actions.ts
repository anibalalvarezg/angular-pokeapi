import { PokemonData } from '../../services/pokemon.service';

export namespace PokemonActions {
  export class GetTotal {
    static readonly type = '[Pokemon] Get total count';
    constructor() {}
  }

  export class GetPokemons {
    static readonly type = '[Pokemon] Get pokemons';
    constructor(public payload: { offset: number; limit: number }) {}
  }

  export class GetPokemonById {
    static readonly type = '[Pokemon] Get pokemon by ID';
    constructor(public url: string) {}
  }

  export class SetFavoritePokemon {
    static readonly type = '[Pokemon] Set favorite pokemon';
    constructor(public pokemon: PokemonData | null) {}
  }
}
