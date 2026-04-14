import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { SharedModule } from './shared/shared-module';
import { PokedexModule } from './pages/pokedex/pokedex-module';

import { HomeComponent } from './pages/home/home-component/home-component';
import { TeamBuilderComponent } from './pages/team-builder/team-builder-component/team-builder-component';
import { QuizComponent } from './pages/quiz/quiz-component/quiz-component';

@NgModule({
  declarations: [App, HomeComponent, TeamBuilderComponent, QuizComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, SharedModule, PokedexModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
