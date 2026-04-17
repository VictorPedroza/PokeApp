// services/quiz-service.ts
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../../../shared/consants/pokemon/Pokemon';
import { PokemonService } from '../../../services/pokemon/pokemon-service';
import { StorageService } from '../../../services/storage/storage-service';
import {
  BLUR_STEPS,
  DEFAULT_TYPE_COLOR,
  LEVEL_CONFIGS,
  QuizLevel,
  QuizRound,
  QuizState,
  RoundResult,
  STORAGE_KEY_HIGHSCORE,
  STORAGE_KEY_SESSION_SCORE,
  TOTAL_QUESTIONS,
  TYPE_COLORS,
} from '../constants/Quiz';

@Injectable()
export class QuizService {
  state: QuizState = 'playing';
  isLoading = false;
  round: QuizRound | null = null;
  currentQuestion = 0;
  totalQuestions = TOTAL_QUESTIONS;
  score = 0;
  level: QuizLevel = 1;
  roundHistory: RoundResult[] = [];
  highScore = 0;
  sessionScore = 0;

  constructor(
    private pokemonService: PokemonService,
    private storageService: StorageService,
  ) {
    this.highScore = this.storageService.get(STORAGE_KEY_HIGHSCORE) ?? 0;
    this.sessionScore = this.storageService.get(STORAGE_KEY_SESSION_SCORE) ?? 0;
  }

  setLevel(level: QuizLevel): void {
    this.level = level;
  }

  startQuiz(): void {
    this.score = 0;
    this.currentQuestion = 0;
    this.state = 'playing';
    this.roundHistory = [];
    this.round = null;
  }

  loadRound(): Observable<QuizRound> {
    this.isLoading = true;
    this.round = null;
    const count = LEVEL_CONFIGS[this.level].hasOptions ? 4 : 1;

    return this.pokemonService.getRandomPokemons(count).pipe(
      map((pokemons: Pokemon[]) => {
        if (LEVEL_CONFIGS[this.level].hasOptions && pokemons.length < 4) {
          throw new Error('Not enough pokemons');
        }

        const shuffled = this.shuffle([...pokemons]);
        const correctIndex = Math.floor(Math.random() * shuffled.length);

        this.round = {
          correct: shuffled[correctIndex],
          options: LEVEL_CONFIGS[this.level].hasOptions ? shuffled : [],
          selectedId: null,
          freeAnswer: '',
          blurStep: 0,
        };
        this.isLoading = false;
        return this.round;
      }),
    );
  }

  selectAnswer(pokemon: Pokemon): void {
    if (!this.round || this.round.selectedId !== null) return;
    this.round.selectedId = pokemon.id;
    this._resolveAnswer(pokemon.id === this.round.correct.id);
  }

  submitFreeAnswer(): void {
    if (!this.round) return;
    const answer = this.round.freeAnswer.trim().toLowerCase();
    const correct = this.round.correct.name.toLowerCase();
    this._resolveAnswer(answer === correct || correct.startsWith(answer));
  }

  requestHint(): void {
    if (!this.round || this.round.blurStep >= BLUR_STEPS.length - 2) return;
    this.round.blurStep++;
  }

  next(): void {
    this.currentQuestion++;
    if (this.currentQuestion >= this.totalQuestions) {
      this.state = 'finished';
      this._saveHighScore();
    } else {
      this.state = 'playing';
    }
  }

  getTypeColor(type: string): string {
    return TYPE_COLORS[type] ?? DEFAULT_TYPE_COLOR;
  }

  get canRequestHint(): boolean {
    return (
      !!this.round &&
      this.round.selectedId === null &&
      this.round.blurStep < BLUR_STEPS.length - 2
    );
  }

  get levelConfig() {
    return LEVEL_CONFIGS[this.level];
  }

  get scoreMessage(): string {
    const pct = this.score / this.totalQuestions;
    if (pct === 1) return '🏆 Perfeito! Você é um Mestre Pokémon!';
    if (pct >= 0.8) return '🌟 Excelente! Quase perfeito!';
    if (pct >= 0.6) return '👍 Bom trabalho!';
    if (pct >= 0.4) return '😅 Pode melhorar!';
    return '😢 Continue treinando, Treinador!';
  }

  get isNewHighScore(): boolean {
    return this.score > this.highScore;
  }

  private _resolveAnswer(isCorrect: boolean): void {
    if (!this.round) return;
    const config = LEVEL_CONFIGS[this.level];
    let points = 0;

    if (isCorrect) {
      points = config.basePoints;
      if (this.level === 2 && this.round.blurStep === 0) {
        points += config.bonusPoints;
      }
      this.score += points;
      this.sessionScore += points;
      this.storageService.set(STORAGE_KEY_SESSION_SCORE, this.sessionScore);
      this.state = 'correct';
    } else {
      this.state = 'wrong';
    }

    if (this.round && config.hasBlur) {
      this.round.blurStep = BLUR_STEPS.length - 1;
    }

    this.roundHistory.push({
      pokemonName: this.round!.correct.name,
      correct: isCorrect,
      pointsEarned: points,
      level: this.level,
    });
  }

  private _saveHighScore(): void {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.storageService.set(STORAGE_KEY_HIGHSCORE, this.highScore);
    }
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
