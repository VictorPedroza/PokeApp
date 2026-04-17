import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home-component/home-component';
import { TeamBuilderComponent } from './pages/team-builder/team-builder-component/team-builder-component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'pokedex',
    loadChildren: () => import('./pages/pokedex/pokedex-module').then((m) => m.PokedexModule),
  },
  {
    path: 'quiz',
    loadChildren: () => import('./pages/quiz/quiz-module').then((m) => m.QuizModule),
  },
  { path: 'team-builder', component: TeamBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
