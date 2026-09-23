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

import { Sidebar, Header, Loading } from './components';
import { SidebarHead, SidebarFoot, SidebarItem } from './components/layout/sidebar/components';
import { NotFound } from './components/common/not-found/not-found';

@NgModule({
  declarations: [Sidebar, SidebarHead, SidebarFoot, SidebarItem, Header, Loading, NotFound],
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
  exports: [Sidebar, Header, Loading, NotFound],
})
export class SharedModule {}
