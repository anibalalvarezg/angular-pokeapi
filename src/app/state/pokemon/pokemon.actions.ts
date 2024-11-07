export namespace PokemonActions {
  export class GetTotal {
    static readonly type = '[Pokemon] Get total count';
    constructor() { }
  }

  export class GetPokemons {
    static readonly type = '[Pokemon] Get pokemons';
    constructor(public payload: { offset: number, limit: number }) { }
  }
}
