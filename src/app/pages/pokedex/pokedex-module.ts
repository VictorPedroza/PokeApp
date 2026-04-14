import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing-module';

import { PokedexComponent } from './pokedex-component';

import { PokemonCard } from './components/pokemon-card/pokemon-card';
import { PokemonPagination } from './components/pokemon-pagination/pokemon-pagination';
import { PokemonModal } from './components/pokemon-modal/pokemon-modal';

import { PokemonSearchService } from './services/pokemon-search';


@NgModule({
  declarations: [PokedexComponent, PokemonCard, PokemonPagination, PokemonModal],
  imports: [CommonModule, PokedexRoutingModule],
  providers: [PokemonSearchService]
})
export class PokedexModule {}
