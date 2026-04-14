import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pokemon } from '../../shared/consants/pokemon/Pokemon';
import { PokemonSearchService } from './services/pokemon-search';
import { PokemonService } from '../../services/pokemon/pokemon-service';

@Component({
  selector: 'app-pokedex',
  standalone: false,
  templateUrl: './pokedex-component.html',
})
export class PokedexComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchTerm = '';
  error: string | null = null;
  selectedPokemon: Pokemon | null = null;
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 20;
  totalPokemons = 0;

  get totalPages(): number {
    return Math.ceil(this.totalPokemons / this.itemsPerPage);
  }

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

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.searchTerm = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loadPokemons();
  }

  onSelect(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    document.body.style.overflow = 'hidden';
  }

  onClose() {
    this.selectedPokemon = null;
    document.body.style.overflow = 'auto';
  }

  retryLoad() {
    this.loadPokemons();
  }
}
