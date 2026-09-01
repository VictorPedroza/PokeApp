import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header-component',
  standalone: false,
  templateUrl: './header-component.html'
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();
}
