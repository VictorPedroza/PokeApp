import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokedexPage, PokemonPage } from './pages';

const routes: Routes = [
  { path: "", component: PokedexPage },
  { path: "pokemon/:pokemon", component: PokemonPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
