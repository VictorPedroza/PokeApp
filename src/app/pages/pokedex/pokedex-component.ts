import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pokemon } from '../../shared/consants/pokemon/Pokemon';
import { PokemonSearchService } from './services/pokemon-search';
import { PokemonService } from '../../services/pokemon/pokemon-service';

/**
 * Componente responsável por exibir a pokedex
 *
 * Gerencia:
 * - Listagem de Pokemons (Com paginação)
 * - Busca por Nome e ID.
 * - Seleção do Pokemon (Para exibir o Modal)
 * - Controle de Carregamento e Erro
 **/
@Component({
  selector: 'app-pokedex',
  standalone: false,
  templateUrl: './pokedex-component.html',
})
export class PokedexComponent implements OnInit {
  /** Lista de pokemons carregados na página atual */
  pokemons: Pokemon[] = [];
  /** Lista filtrada usada na renderização */
  filteredPokemons: Pokemon[] = [];
  /** Termo digitado na busca */
  searchTerm = '';
  /** Mensagem de erro da API ou Busca */
  error: string | null = null;
  /** Pokemon selecionado (Exibição no Modal) */
  selectedPokemon: Pokemon | null = null;
  /** Indica carregamento da página */
  isLoading = false;
  /** Página atual */
  currentPage = 1;
  /** Quantidade de pokemons por página */
  itemsPerPage = 20;
  /** Quantidade de pokemons na API */
  totalPokemons = 0;

  /**
   * Número total de páginas baseada no total de pokemons
   **/
  get totalPages(): number {
    return Math.ceil(this.totalPokemons / this.itemsPerPage);
  }

  /**
   * Ger alista de páginas para paginação
   *
   **/
  get pages(): number[] {
    const delta = 2;
    const range: number[] = [];
    const left = Math.max(2, this.currentPage - delta);
    const right = Math.min(this.totalPages - 1, this.currentPage + delta);
    range.push(1);
    if (left > 2) range.push(-1);
    for (let i = left; i <= right; i++) range.push(i);
    if (right < this.totalPages - 1) range.push(-1);
    if (this.totalPages > 1) range.push(this.totalPages);
    return range;
  }

  constructor(
    private pokemonService: PokemonService,
    private searchService: PokemonSearchService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }

  /**
   * Garrega os Pokemons da API baseado na página atual
   *
   * Atualiza:
   * - Lista de Pokemons
   * - Estado de Carregamento
   * - Total de Registros
   * - Tratamento de Erros
   *
   **/
  loadPokemons() {
    this.error = null;
    this.isLoading = true;
    const offset = (this.currentPage - 1) * this.itemsPerPage;

    this.pokemonService.getPokemons(this.itemsPerPage, offset).subscribe({
      next: ({ pokemons, total }) => {
        this.totalPokemons = total;
        this.pokemons = pokemons;
        this.filteredPokemons = pokemons;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erro ao carregar Pokémon. Verifique sua conexão.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  /**
   * Realiza busca de pokemons utilizando o serviço de busca
   *
   * A busca é feita:
   * - Filtragem da Página atual
   * - Fallback de busca na API
   *
   * Atualiza:
   * - Lista filtrada
   * - Mensagem de Erro
   * - Estado de carreamento
   **/
  onSearch() {
    this.isLoading = true;
    this.error = null;

    this.searchService.search(this.searchTerm, this.pokemons).subscribe({
      next: ({ pokemons, error }) => {
        this.filteredPokemons = pokemons;
        this.error = error;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erro ao buscar Pokémon.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  /**
   * Muda a página da Pokédex e recarrega os dados da API.
   *
   * Regras:
   * - Ignora páginas inválidas
   * - Reseta busca ao trocar página
   * - Rola a tela para o topo
   **/
  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.searchTerm = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loadPokemons();
  }

  /**
   * Seleciona um Pokémon e abre o modal de detalhes.
   *
   * Também bloqueia o scroll da página.
   **/
  onSelect(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Fecha o modal de detalhes do Pokémon.
   *
   * Restaura o scroll da página.
   **/
  onClose() {
    this.selectedPokemon = null;
    document.body.style.overflow = 'auto';
  }
}
