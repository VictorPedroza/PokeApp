import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing-module';
import { PokedexPage } from './pages/pokedex-page/pokedex-page';

@NgModule({
  declarations: [PokedexPage],
  imports: [CommonModule, PokedexRoutingModule],
})
export class PokedexModule {}
