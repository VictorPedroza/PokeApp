import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon/pokemon-service';
import { Pokemon } from '../../../shared/consants/pokemon/Pokemon';

@Component({
  selector: 'app-pokedex',
  standalone: false,
  templateUrl: './pokedex-component.html',
  styleUrls: ['./pokedex-component.css'],
})
export class PokedexComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchTerm: string = '';
  error: string | null = null;
  selectedPokemon: Pokemon | null = null;
  isLoading: boolean = false;

  // Paginação
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPokemons: number = 0;

  get totalPages(): number {
    return Math.ceil(this.totalPokemons / this.itemsPerPage);
  }

  get pages(): number[] {
    const delta = 2;
    const range: number[] = [];
    const left = Math.max(2, this.currentPage - delta);
    const right = Math.min(this.totalPages - 1, this.currentPage + delta);

    range.push(1);
    if (left > 2) range.push(-1); // ellipsis
    for (let i = left; i <= right; i++) range.push(i);
    if (right < this.totalPages - 1) range.push(-1); // ellipsis
    if (this.totalPages > 1) range.push(this.totalPages);

    return range;
  }

  typeColors: { [key: string]: string } = {
    normal: '#A8A878', fire: '#F08030', water: '#6890F0',
    electric: '#F8D030', grass: '#78C850', ice: '#98D8D8',
    fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
    flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8',
    dark: '#705848', steel: '#B8B8D0', fairy: '#EE99AC',
  };

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) {}

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

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.searchTerm = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loadPokemons();
  }

  searchPokemon() {
    if (!this.searchTerm.trim()) {
      this.filteredPokemons = this.pokemons;
      return;
    }
    this.filteredPokemons = this.pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(this.searchTerm)
    );
  }

  selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedPokemon = null;
    document.body.style.overflow = 'auto';
  }

  getTypeColor(type: string): string {
    return this.typeColors[type] || '#68A090';
  }

  getStatBarWidth(statValue: number): string {
    return `${Math.min((statValue / 255) * 100, 100)}%`;
  }

  retryLoad() {
    this.loadPokemons();
  }
}
