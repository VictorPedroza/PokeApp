import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home-component/home-component';
import { QuizComponent } from './pages/quiz/quiz-component/quiz-component';
import { TeamBuilderComponent } from './pages/team-builder/team-builder-component/team-builder-component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'pokedex',
    loadChildren: () => import('./pages/pokedex/pokedex-module').then((m) => m.PokedexModule),
  },
  { path: 'quiz', component: QuizComponent },
  { path: 'team-builder', component: TeamBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
