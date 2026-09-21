import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokedex-pokemon-page',
  standalone: false,
  templateUrl: './pokedex-pokemon-page.html'
})
export class PokedexPokemonPage implements OnInit {
  pokemon!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pokemon = this.route.snapshot.paramMap.get("pokemon")!;

    console.log(this.pokemon);
  }
}
