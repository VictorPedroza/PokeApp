import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon-service';
import { Pokemon } from '../../../../shared/constants/pokemon/pokemon';

@Component({
  selector: 'app-pokedex-page',
  standalone: false,
  templateUrl: './pokedex-page.html',
  styleUrl: './pokedex-page.css',
})
export class PokedexPage implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private api: PokemonService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.api.buscarPokemons().subscribe({
      next: (response) => {
        console.log(response);
        this.pokemons = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error: ', error);
      },
    });
  }
}
