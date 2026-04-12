import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PokemonService } from '../../../services/pokemon/pokemon-service';
import { Pokemon } from '../../../shared/consants/pokemon/Pokemon';

export interface SavedTeam {
  name: string;
  pokemons: Pokemon[];
  createdAt: string;
}

@Component({
  selector: 'app-team-builder-component',
  standalone: false,
  templateUrl: './team-builder-component.html',
  styleUrl: './team-builder-component.css',
})
export class TeamBuilderComponent implements OnInit {
  team: (Pokemon | null)[] = [null, null, null, null, null, null];
  savedTeams: SavedTeam[] = [];

  searchTerm: string = '';
  searchResults: Pokemon[] = [];
  isSearching: boolean = false;
  searchError: boolean = false;

  selectedSlot: number | null = null;
  teamName: string = '';

  showSaveModal: boolean = false;
  showLoadModal: boolean = false;

  private searchSubject = new Subject<string>();

  typeColors: { [key: string]: string } = {
    normal: '#A8A878', fire: '#F08030', water: '#6890F0',
    electric: '#F8D030', grass: '#78C850', ice: '#98D8D8',
    fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
    flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8',
    dark: '#705848', steel: '#B8B8D0', fairy: '#EE99AC',
  };

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadSavedTeams();
    this.setupSearch();
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (!term.trim()) {
          this.searchResults = [];
          this.isSearching = false;
          this.cdr.detectChanges();
          return [];
        }
        this.isSearching = true;
        this.searchError = false;
        this.cdr.detectChanges();
        return this.pokemonService.searchPokemon(term);
      })
    ).subscribe({
      next: (pokemon: Pokemon | null) => {
        this.isSearching = false;
        this.searchResults = pokemon ? [pokemon] : [];
        this.searchError = !pokemon && this.searchTerm.trim().length > 0;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isSearching = false;
        this.searchResults = [];
        this.searchError = true;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }

  selectSlot(index: number) {
    this.selectedSlot = this.selectedSlot === index ? null : index;
    this.searchTerm = '';
    this.searchResults = [];
    this.searchError = false;
  }

  addToTeam(pokemon: Pokemon) {
    if (this.selectedSlot === null) return;

    if (this.team.some(p => p?.id === pokemon.id)) return;

    this.team[this.selectedSlot] = pokemon;
    this.selectedSlot = null;
    this.searchTerm = '';
    this.searchResults = [];
    this.cdr.detectChanges();
  }

  removeFromTeam(index: number) {
    this.team[index] = null;
    if (this.selectedSlot === index) this.selectedSlot = null;
    this.cdr.detectChanges();
  }

  isPokemonInTeam(pokemon: Pokemon): boolean {
    return this.team.some(p => p?.id === pokemon.id);
  }

  get teamCount(): number {
    return this.team.filter(p => p !== null).length;
  }

  // Salvar
  openSaveModal() {
    this.teamName = '';
    this.showSaveModal = true;
  }

  saveTeam() {
    if (!this.teamName.trim()) return;

    const newTeam: SavedTeam = {
      name: this.teamName.trim(),
      pokemons: this.team.filter(p => p !== null) as Pokemon[],
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };

    this.savedTeams.push(newTeam);
    localStorage.setItem('pokemon-teams', JSON.stringify(this.savedTeams));
    this.showSaveModal = false;
    this.cdr.detectChanges();
  }

  // Carregar
  loadSavedTeams() {
    const raw = localStorage.getItem('pokemon-teams');
    this.savedTeams = raw ? JSON.parse(raw) : [];
  }

  loadTeam(saved: SavedTeam) {
    this.team = [null, null, null, null, null, null];
    saved.pokemons.forEach((p, i) => { this.team[i] = p; });
    this.showLoadModal = false;
    this.selectedSlot = null;
    this.cdr.detectChanges();
  }

  deleteTeam(index: number) {
    this.savedTeams.splice(index, 1);
    localStorage.setItem('pokemon-teams', JSON.stringify(this.savedTeams));
    this.cdr.detectChanges();
  }

  clearTeam() {
    this.team = [null, null, null, null, null, null];
    this.selectedSlot = null;
    this.searchTerm = '';
    this.searchResults = [];
    this.cdr.detectChanges();
  }

  getTypeColor(type: string): string {
    return this.typeColors[type] || '#68A090';
  }
}
