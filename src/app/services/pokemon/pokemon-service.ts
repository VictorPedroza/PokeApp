import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Pokemon, PokemonPage } from '../../shared/consants/pokemon/Pokemon';

/**
 * Service responsável por comunicação com a PokeAPI.
 *
 * Centraliza todas as requisições relacionadas a Pokémons:
 * - Listagem paginada
 * - Busca por ID ou nome
 * - Geração de Pokémons aleatórios
 *
 **/
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  /** URL base da PokeAPI */
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  /**
   * Busca Pokemons com Paginação
   *
   * 1. Faz requisição inicial de listagem (nome + URL)
   * 2. Executa requisições paralelas para obter detalhes completos
   * 3. Combina os resultados em uma página estruturada
   *
   * @param {number} limit - quantidade de Pokémons por página (padrão: 20)
   * @param {number} offset - índice inicial da paginação (padrão: 0)
   *
   * @returns Observable contendo:
   * - pokemons: lista completa de Pokémons com detalhes
   * - total: total de registros disponíveis na API
   *
   * @error
   * Em caso de falha, retorna lista vazia e total 0
   **/
  getPokemons(limit: number = 20, offset: number = 0): Observable<PokemonPage> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      switchMap((response) => {
        const total = response.count;
        const requests = response.results.map((pokemon: any) =>
          this.http.get<Pokemon>(pokemon.url),
        );
        return forkJoin(requests as Observable<Pokemon>[]).pipe(
          map((pokemons: Pokemon[]) => ({ pokemons, total })),
        );
      }),
      catchError((error) => {
        console.error('Erro ao carregar Pokémon:', error);
        return of({ pokemons: [], total: 0 });
      }),
    );
  }

  /**
   * Retorna uma lista de Pokémons aleatórios.
   *
   * Gera IDs aleatórios dentro do range da PokeAPI (1–898)
   * e busca os detalhes de cada Pokémon em paralelo.
   *
   * @param {number} count - quantidade de Pokémons aleatórios desejados
   *
   * @returns Observable com lista de Pokémons
   *
   * @error
   * Em caso de erro, retorna lista vazia
   **/
  getRandomPokemons(count: number): Observable<Pokemon[]> {
    const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * 898) + 1);
    const requests = randomIds.map((id) => this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`));
    return forkJoin(requests as Observable<Pokemon>[]).pipe(catchError(() => of([])));
  }

  /**
   * Busca um Pokémon por nome ou ID.
   *
   * A busca é feita diretamente na PokeAPI.
   * Caso não encontre, retorna null ao invés de erro.
   *
   * @param {string} term - nome ou ID do Pokémon
   *
   * @returns Observable com:
   * - Pokémon encontrado
   * - null caso não exista
   *
   * @error
   * Erros HTTP são tratados e convertidos em null*
   *
   **/
  searchPokemon(term: string): Observable<Pokemon | null> {
    return this.http
      .get<Pokemon>(`${this.apiUrl}/pokemon/${term.toLowerCase()}`)
      .pipe(catchError(() => of(null)));
  }

  /**
   * Busca Pokémons por tipo.
   *
   * @param {string} type - tipo do Pokémon (ex: 'fire', 'water')
   * @param {number} limit - quantidade máxima de resultados (padrão: 24)
   *
   * @returns Observable com lista de Pokémons do tipo
   **/
  searchByType(type: string, limit: number = 24): Observable<Pokemon[]> {
    return this.http.get<any>(`${this.apiUrl}/type/${type}`).pipe(
      switchMap((res) => {
        const entries = res.pokemon.slice(0, limit) as { pokemon: { url: string } }[];
        const requests = entries.map((e) => this.http.get<Pokemon>(e.pokemon.url));
        return forkJoin(requests as Observable<Pokemon>[]);
      }),
      catchError(() => of([])),
    );
  }
}
