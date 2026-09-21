import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokemonService } from '../../service/pokemon-service';
import { Pokemon } from '../../../../shared/constants/pokemon/pokemon';

@Component({
  selector: 'app-pokedex-pokemon-page',
  standalone: false,
  templateUrl: './pokedex-pokemon-page.html',
})
export class PokedexPokemonPage implements OnInit {
  isLoading = false;
  error = false;

  pokemon!: string;
  currentPokemon!: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private service: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pokemon = this.route.snapshot.paramMap.get('pokemon')!;
    this.buscarPokemon();
  }

  private buscarPokemon(): void {
    this.isLoading = true;
    this.error = false;

    this.service.buscarPokemon(this.pokemon).subscribe({
      next: (pokemon) => {
        this.currentPokemon = pokemon;
        this.isLoading = false;
        this.error = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;
        this.error = true;
        this.cdr.detectChanges();
        console.error(error);
      },
    });
  }

  getStyle(type: string) {
    return this.service.getTypeStyle(type);
  }
}
