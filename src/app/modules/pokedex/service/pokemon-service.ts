import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';

import { ApiService } from '../../../core/service/api-service';

import {
  generations,
  Pokemon,
  PokemonResponse,
  PokemonSpeciesResponse,
  PokemonType,
  PokemonTypeResponse,
  regions,
} from '../../../shared/constants/pokemon/pokemon';
import { pokemonTypeStyles } from '../../../shared/constants/pokemon/styles';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = environment.api.pokemon;

  constructor(private api: ApiService) {}

  buscarPokemons(limit: number = 50, offset: number = 0): Observable<Pokemon[]> {
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
    return forkJoin({
      pokemon: this.api.get<Pokemon>(this.baseUrl, `pokemon/${pokemon}`),
      species: this.api.get<PokemonSpeciesResponse>(this.baseUrl, `pokemon-species/${pokemon}`),
    }).pipe(
      tap(() => console.log('forkJoin terminou')),
      map(({ pokemon, species }) => {
        return {
          ...pokemon,
          generation: generations[species.generation.name],
          region: regions[species.generation.name],
        };
      }),
    );
  }

  buscarPokemonsPorTipo(type: string): Observable<Pokemon[]> {
    return this.api.get<PokemonTypeResponse>(this.baseUrl, `type/${type}`).pipe(
      switchMap((response) => {
        if (!response.pokemon || response.pokemon.length === 0) {
          return of([]);
        }

        const subset = response.pokemon.slice(0, 20).map((p) => p.pokemon);
        const requests: Observable<Pokemon>[] = subset.map((pokemon) =>
          this.buscarPokemon(pokemon.name),
        );

        return forkJoin(requests);
      }),
    );
  }

  getTypeStyle(type: string) {
    return pokemonTypeStyles[type as PokemonType];
  }
}
