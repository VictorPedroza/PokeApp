import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

import { ApiService } from '../../../core/service/api-service';

import {
  EvolutionChain,
  generations,
  Pokemon,
  PokemonType,
  regions,
} from '../../../shared/constants/pokemon/pokemon';

import { environment } from '../../../../environments/environment';
import { pokemonTypeStyles } from '../types/styles';
import { EvolutionChainLink, EvolutionChainResponse, PokemonResponse, PokemonSpeciesResponse, PokemonTypeResponse } from '../types/pokemon';

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
      switchMap(({ pokemon, species }) => {
        const route = species.evolution_chain.url.replace(this.baseUrl, '');
        return this.api.get<EvolutionChainResponse>(this.baseUrl, route).pipe(
          map((evolutionChain) => ({
            ...pokemon,
            generation: generations[species.generation.name],
            region: regions[species.generation.name],
            evolutionChain: this.mapEvolutionChain(evolutionChain.chain),
          })),
        );
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

  private mapEvolutionChain(chain: EvolutionChainLink): EvolutionChain {
    const id = this.getPokemonIdFromUrl(chain.species.url);

    return {
      id,
      name: chain.species.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      evolvesTo: chain.evolves_to.map((evolution) => this.mapEvolutionChain(evolution)),
    };
  }

  private getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]);
  }
}
