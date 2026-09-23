import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  LucideBookOpen,
  LucideHome,
  LucideLayers,
  LucideMap,
  LucideMenu,
  LucideX,
} from '@lucide/angular';

import { Sidebar, Header } from './components';
import { SidebarHead, SidebarFoot, SidebarItem } from './components/layout/sidebar/components';

import { LoadingComponent } from './components/common/loading-component/loading-component';
@NgModule({
  declarations: [
    LoadingComponent,
    Sidebar,
    SidebarHead,
    SidebarFoot,
    SidebarItem,
    Header,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LucideBookOpen,
    LucideHome,
    LucideMap,
    LucideLayers,
    LucideMenu,
    LucideX,
  ],
  exports: [Sidebar, Header, LoadingComponent],
})
export class SharedModule {}
