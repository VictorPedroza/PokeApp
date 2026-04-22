import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TeamBuilderService } from './services/team-builder-service';
import { SavedTeam, POKEMON_TYPES, PokemonType, TYPE_COLORS } from './constants/TeamBuilder';
import { Pokemon } from '../../shared/consants/pokemon/Pokemon';

type SearchMode = 'name' | 'type';

@Component({
  selector: 'app-team-builder-component',
  standalone: false,
  templateUrl: './team-builder-component.html',
})
export class TeamBuilderComponent implements OnInit {
  // ── Busca ─────────────────────────────────────────────────────────────
  searchMode: SearchMode = 'name';
  searchTerm = '';
  selectedType: PokemonType | null = null;
  searchResults: Pokemon[] = [];
  isSearching = false;
  searchError = false;

  // ── Modais ────────────────────────────────────────────────────────────
  showSaveModal = false;
  showLoadModal = false;
  teamName = '';

  // ── Tipos ─────────────────────────────────────────────────────────────
  pokemonTypes = POKEMON_TYPES;

  private nameSearch$ = new Subject<string>();

  constructor(
    public teamService: TeamBuilderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.teamService.loadSavedTeams();
    this._setupNameSearch();
  }

  // ── Slots ─────────────────────────────────────────────────────────────

  onSlotClicked(index: number): void {
    this.teamService.selectSlot(index);
    this._resetSearch();
    this.cdr.detectChanges();
  }

  onPokemonRemoved(index: number): void {
    this.teamService.removeFromTeam(index);
    this.cdr.detectChanges();
  }

  // ── Busca por nome ────────────────────────────────────────────────────

  setSearchMode(mode: SearchMode): void {
    this.searchMode = mode;
    this._resetSearch();
  }

  onNameInput(): void {
    this.nameSearch$.next(this.searchTerm);
  }

  // ── Busca por tipo ────────────────────────────────────────────────────

  selectType(type: PokemonType): void {
    if (this.selectedType === type) {
      this.selectedType = null;
      this.searchResults = [];
      return;
    }
    this.selectedType = type;
    this.isSearching = true;
    this.searchError = false;
    this.cdr.detectChanges();

    this.teamService.searchByType(type, 24).subscribe({
      next: (pokemons) => {
        this.searchResults = pokemons;
        this.isSearching = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isSearching = false;
        this.searchError = true;
        this.cdr.detectChanges();
      },
    });
  }

  // ── Adicionar ao time ─────────────────────────────────────────────────

  addToTeam(pokemon: Pokemon): void {
    if (this.teamService.isPokemonInTeam(pokemon)) return;
    this.teamService.addToTeam(pokemon);
    this._resetSearch();
    this.cdr.detectChanges();
  }

  // ── Salvar/Carregar ───────────────────────────────────────────────────

  onSave(): void {
    if (!this.teamName.trim()) return;
    this.teamService.saveTeam(this.teamName);
    this.teamName = '';
    this.showSaveModal = false;
    this.cdr.detectChanges();
  }

  onTeamLoaded(saved: SavedTeam): void {
    this.teamService.loadTeam(saved);
    this.showLoadModal = false;
    this.cdr.detectChanges();
  }

  onTeamDeleted(index: number): void {
    this.teamService.deleteTeam(index);
    this.cdr.detectChanges();
  }

  onClearTeam(): void {
    this.teamService.clearTeam();
    this._resetSearch();
    this.cdr.detectChanges();
  }

  // ── Helpers ───────────────────────────────────────────────────────────

  getTypeColor(type: string): string {
    return TYPE_COLORS[type] ?? '#68A090';
  }

  isPokemonInTeam(pokemon: Pokemon): boolean {
    return this.teamService.isPokemonInTeam(pokemon);
  }

  get selectedSlot(): number | null {
    return this.teamService.selectedSlot;
  }

  // ── Privados ──────────────────────────────────────────────────────────

  private _setupNameSearch(): void {
    this.nameSearch$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term) => {
        if (!term.trim()) {
          this.searchResults = [];
          this.isSearching = false;
          this.searchError = false;
          this.cdr.detectChanges();
          return EMPTY;
        }
        this.isSearching = true;
        this.searchError = false;
        this.cdr.detectChanges();
        return this.teamService.searchByName(term).pipe(
          catchError(() => of(null))
        );
      }),
    ).subscribe({
      next: (pokemon: Pokemon | null) => {
        this.isSearching = false;
        this.searchResults = pokemon ? [pokemon] : [];
        this.searchError = !pokemon;
        this.cdr.detectChanges();
      },
    });
  }

  private _resetSearch(): void {
    this.searchTerm = '';
    this.selectedType = null;
    this.searchResults = [];
    this.isSearching = false;
    this.searchError = false;
  }
}
