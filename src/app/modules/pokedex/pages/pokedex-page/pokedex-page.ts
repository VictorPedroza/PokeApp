import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon-service';
import { Pokemon, PokemonType, PokemonTypes } from '../../../../shared/constants/pokemon/pokemon';

@Component({
  selector: 'app-pokedex-page',
  standalone: false,
  templateUrl: './pokedex-page.html',
  styleUrl: './pokedex-page.css',
})
export class PokedexPage implements OnInit {
  pokemons: Pokemon[] = [];
  basePokemons: Pokemon[] = [];
  isLoading: boolean = false;

  types: PokemonType[] = PokemonTypes;
  typeSelected: PokemonType | 'all' = 'all';

  constructor(
    private api: PokemonService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.buscarPokemons();
  }

  buscarPokemons() {
    this.isLoading = true;
    this.typeSelected = 'all';
    this.api.buscarPokemons().subscribe({
      next: (response) => {
        console.log(response);
        this.pokemons = response;
        this.basePokemons = response;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error: ', error);
        this.isLoading = false;
      },
    });
  }

  filtrarTipo(type: PokemonType | 'all') {
    if (this.typeSelected === type) return;

    this.typeSelected = type;
    this.isLoading = true;
    this.pokemons = [];

    if (type === 'all') {
      this.buscarPokemons();
    } else {
      this.api.buscarPokemonsPorTipo(type).subscribe({
        next: (response) => {
          this.pokemons = response;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error: ', error);
          this.isLoading = false;
        },
      });
    }
  }

  getStyle(type: string) {
    return this.api.getTypeStyle(type);
  }
}
