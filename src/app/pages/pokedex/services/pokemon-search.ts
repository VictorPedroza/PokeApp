import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonService } from '../../../services/pokemon/pokemon-service';
import { Pokemon } from '../../../shared/consants/pokemon/Pokemon';

/**
 * Service responsável por busca de Pokémons.
 *
 * - Tenta buscar Pokémon via API (busca remota)
 * - Se não encontrar, faz fallback para busca local na lista já carregada
 *
 */
@Injectable()
export class PokemonSearchService {
  constructor(private pokemonService: PokemonService) {}

  /**
   * Realiza busca de Pokémons por nome ou ID.
   *
   * Fluxo:
   * 1. Normaliza o termo de busca (trim + lowercase)
   * 2. Se vazio, retorna lista local sem filtragem
   * 3. Tenta busca remota via API
   * 4. Se não encontrar, aplica filtro local como fallback
   *
   * @param {string} term - termo digitado pelo usuário (nome ou ID)
   * @param {Pokemon[]} localList - lista local de Pokémons já carregados
   *
   * @returns Observable contendo:
   * - pokemons: lista resultante da busca
   * - error: mensagem de erro caso nenhum resultado seja encontrado
   */
  search(
    term: string,
    localList: Pokemon[],
  ): Observable<{ pokemons: Pokemon[]; error: string | null }> {
    const normalized = term.trim().toLowerCase();

    if (!normalized) return of({ pokemons: localList, error: null });

    return this.pokemonService.searchPokemon(normalized).pipe(
      map((pokemon) => {
        if (pokemon) return { pokemons: [pokemon], error: null };

        const filtered = localList.filter(
          (p) => p.name.toLowerCase().includes(normalized) || p.id.toString().includes(normalized),
        );

        return {
          pokemons: filtered,
          error: filtered.length === 0 ? 'Pokémon não encontrado.' : null,
        };
      }),
    );
  }
}
