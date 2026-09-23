import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sidebar-head',
  standalone: false,
  templateUrl: './sidebar-head.html'
})
export class SidebarHead {
  @Output() closeMenu = new EventEmitter<void>();
}
