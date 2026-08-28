import { Component, Input } from '@angular/core';
import { LucideIcon, LucideIconBase, LucideIconData } from '@lucide/angular';

@Component({
  selector: 'sidebar-item',
  standalone: false,
  templateUrl: './sidebar-item.html'
})
export class SidebarItem {
  @Input() label = '';
  @Input() routerLink = '';
}
