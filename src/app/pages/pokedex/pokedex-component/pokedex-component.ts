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

  typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.error = null;

    console.log('Iniciando carregamento...');

    this.pokemonService.getPokemons(151, 0).subscribe({
      next: (pokemons) => {
        console.log('Pokémons recebidos:', pokemons.length);

        if (pokemons && pokemons.length > 0) {
          this.pokemons = pokemons;
          this.filteredPokemons = pokemons;
          this.cdr.detectChanges();
          console.log('Primeiro Pokémon:', this.pokemons[0]);
        } else {
          this.error = 'Nenhum Pokémon foi carregado.';
        }
      },
      error: (error) => {
        console.error('Erro:', error);
        this.error = 'Erro ao carregar Pokémon. Verifique sua conexão.';
        this.cdr.detectChanges();
      },
    });
  }

  searchPokemon() {
    if (!this.searchTerm.trim()) {
      this.filteredPokemons = this.pokemons;
      return;
    }

    this.filteredPokemons = this.pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(this.searchTerm),
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
    const percentage = (statValue / 255) * 100;
    return `${Math.min(percentage, 100)}%`;
  }

  retryLoad() {
    this.loadPokemons();
  }
}
