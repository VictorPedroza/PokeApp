import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-pagination',
  standalone: false,
  templateUrl: './pokemon-pagination.html'
})
export class PokemonPagination {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() pages!: number[];
  @Output() pageChange = new EventEmitter<number>();
}
