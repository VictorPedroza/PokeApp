import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeamBuilderRoutingModule } from './team-builder-routing-module';
import { TeamBuilderService } from './services/team-builder-service';
import { TeamBuilderComponent } from './team-builder-component';

@NgModule({
  declarations: [
    TeamBuilderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TeamBuilderRoutingModule,
  ],
  providers: [TeamBuilderService],
})
export class TeamBuilderModule {}
