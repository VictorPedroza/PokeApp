import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';

import { ApiService } from '../../../core/service/api-service';

import { Pokemon, PokemonResponse, PokemonType } from '../../../shared/constants/pokemon/pokemon';
import { pokemonTypeStyles } from '../../../shared/constants/pokemon/styles';
import { environment } from '../../../../environments/environment';

// Interface específica para o payload do endpoint de tipos da PokeAPI
export interface PokemonTypeEndpointResponse {
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = environment.api.pokemon;

  constructor(private api: ApiService) {}

  buscarPokemons(limit: number = 20, offset: number = 0): Observable<Pokemon[]> {
    return this.api
      .get<PokemonResponse>(this.baseUrl, `pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap((response) => {
          if (!response.results || response.results.length === 0) {
            return of([]);
          }

          const requests = response.results.map((pokemon) => this.buscarPokemon(pokemon.name));
          return forkJoin(requests);
        }),
      );
  }

  buscarPokemon(pokemon: string): Observable<Pokemon> {
    return this.api.get<Pokemon>(this.baseUrl, `pokemon/${pokemon}`);
  }

  buscarPokemonsPorTipo(tipo: string, limit: number = 20): Observable<Pokemon[]> {
    return this.api.get<PokemonTypeEndpointResponse>(this.baseUrl, `type/${tipo}`).pipe(
      switchMap((response) => {
        const pokemonsLimitados = response.pokemon.slice(0, limit);

        if (!pokemonsLimitados || pokemonsLimitados.length === 0) {
          return of([]);
        }

        const requests = pokemonsLimitados.map((item) => this.buscarPokemon(item.pokemon.name));
        return forkJoin(requests);
      }),
    );
  }

  getTypeStyle(type: string) {
    return pokemonTypeStyles[type as PokemonType];
  }
}
