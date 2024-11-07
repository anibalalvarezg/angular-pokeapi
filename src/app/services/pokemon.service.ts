import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

export interface PokeAPI {
  count: number
  next: string
  previous: any
  results: PokemonMetaData[]
}

export interface PokemonMetaData {
  name: string
  url: string
}


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly _url = 'https://pokeapi.co/api/v2/pokemon/'
  private _http = inject(HttpClient)
  private _total: number = 0;

  getTotalPokemons(offset = 0, limit = 20) {
    return this._http.get<PokeAPI>(this._url).pipe(map(response => response.count));
  }
}
