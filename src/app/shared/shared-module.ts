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

@NgModule({
  declarations: [Sidebar, SidebarHead, SidebarFoot, SidebarItem, Header, Loading],
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
  exports: [Sidebar, Header, Loading],
})
export class SharedModule {}
