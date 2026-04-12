import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './pages/home/home-component/home-component';
import { PokedexComponent } from './pages/pokedex/pokedex-component/pokedex-component';
import { TeamBuilderComponent } from './pages/team-builder/team-builder-component/team-builder-component';
import { QuizComponent } from './pages/quiz/quiz-component/quiz-component';
import { SharedModule } from './shared/shared-module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    HomeComponent,
    PokedexComponent,
    TeamBuilderComponent,
    QuizComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
