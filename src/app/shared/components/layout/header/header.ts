import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header',
  standalone: false,
  templateUrl: './header.html'
})
export class Header {
    @Output() menuClick = new EventEmitter<void>();
}
