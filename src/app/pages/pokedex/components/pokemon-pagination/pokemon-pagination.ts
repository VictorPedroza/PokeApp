import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Componente de paginação da Pokédex.
 *
 * Responsável por exibir controles de navegação entre páginas
 * e emitir eventos quando o usuário troca de página.
 */
@Component({
  selector: 'app-pokemon-pagination',
  standalone: false,
  templateUrl: './pokemon-pagination.html'
})
export class PokemonPagination {
  /** Página atual selecionada */
  @Input() currentPage!: number;
  /** Total de Páginas */
  @Input() totalPages!: number;
  /** Lista de Páginas a serem exibidas */
  @Input() pages!: number[];
  /** Evento emitido ao selecionar uma nova página */
  @Output() pageChange = new EventEmitter<number>();
}
