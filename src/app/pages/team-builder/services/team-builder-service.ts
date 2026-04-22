import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../../shared/consants/pokemon/Pokemon';
import { StorageService } from '../../../services/storage/storage-service';
import { PokemonService } from '../../../services/pokemon/pokemon-service';
import {
  DEFAULT_TYPE_COLOR,
  STORAGE_KEY_TEAMS,
  SavedTeam,
  TYPE_COLORS,
} from '../constants/TeamBuilder';

@Injectable()
export class TeamBuilderService {
  team: (Pokemon | null)[] = [null, null, null, null, null, null];
  savedTeams: SavedTeam[] = [];
  selectedSlot: number | null = null;

  constructor(
    private pokemonService: PokemonService,
    private storageService: StorageService,
  ) {
    this.loadSavedTeams();
  }

  // ── Slots ─────────────────────────────────────────────────────────────

  selectSlot(index: number): void {
    this.selectedSlot = this.selectedSlot === index ? null : index;
  }

  closeSlot(): void {
    this.selectedSlot = null;
  }

  addToTeam(pokemon: Pokemon, slotIndex?: number | null): void {
    const index = slotIndex ?? this.selectedSlot;
    if (index === null || index === undefined) return;
    if (this.isPokemonInTeam(pokemon)) return;
    this.team[index] = pokemon;
    this.team = [...this.team];
    this.selectedSlot = null;
  }

  removeFromTeam(index: number): void {
    this.team[index] = null;
    if (this.selectedSlot === index) this.selectedSlot = null;
  }

  clearTeam(): void {
    this.team = [null, null, null, null, null, null];
    this.selectedSlot = null;
  }

  isPokemonInTeam(pokemon: Pokemon): boolean {
    return this.team.some((p) => p?.id === pokemon.id);
  }

  get teamCount(): number {
    return this.team.filter((p) => p !== null).length;
  }

  // ── Busca ─────────────────────────────────────────────────────────────

  searchByName(term: string): Observable<Pokemon | null> {
    return this.pokemonService.searchPokemon(term.toLowerCase().trim());
  }

  searchByType(type: string, limit = 24): Observable<Pokemon[]> {
    return this.pokemonService.searchByType(type, limit);
  }

  // ── Persistência ──────────────────────────────────────────────────────

  saveTeam(name: string): void {
    const newTeam: SavedTeam = {
      name: name.trim(),
      pokemons: this.team.filter((p) => p !== null) as Pokemon[],
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    this.savedTeams.push(newTeam);
    this.storageService.set(STORAGE_KEY_TEAMS, this.savedTeams);
  }

  loadTeam(saved: SavedTeam): void {
    this.team = [null, null, null, null, null, null];
    saved.pokemons.forEach((p, i) => {
      this.team[i] = p;
    });
    this.selectedSlot = null;
  }

  deleteTeam(index: number): void {
    this.savedTeams.splice(index, 1);
    this.storageService.set(STORAGE_KEY_TEAMS, this.savedTeams);
  }

  loadSavedTeams(): void {
    this.savedTeams = this.storageService.get(STORAGE_KEY_TEAMS) ?? [];
  }

  // ── Utilitários ───────────────────────────────────────────────────────

  getTypeColor(type: string): string {
    return TYPE_COLORS[type] ?? DEFAULT_TYPE_COLOR;
  }
}
