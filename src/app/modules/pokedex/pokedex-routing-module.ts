import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexPage } from './pages/pokedex-page/pokedex-page';

const routes: Routes = [{ path: "", component: PokedexPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
