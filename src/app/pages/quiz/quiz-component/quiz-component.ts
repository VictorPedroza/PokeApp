import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon/pokemon-service';
import { Pokemon } from '../../../shared/consants/pokemon/Pokemon';

type QuizState = 'playing' | 'correct' | 'wrong' | 'finished';

interface QuizRound {
  correct: Pokemon;
  options: Pokemon[];
  selectedId: number | null;
}

@Component({
  selector: 'app-quiz-component',
  standalone: false,
  templateUrl: './quiz-component.html',
  styleUrl: './quiz-component.css',
})
export class QuizComponent implements OnInit {
  state: QuizState = 'playing';
  isLoading: boolean = false;

  round: QuizRound | null = null;
  currentQuestion: number = 0;
  totalQuestions: number = 10;
  score: number = 0;

  typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.startQuiz();
  }

  startQuiz() {
    this.score = 0;
    this.currentQuestion = 0;
    this.state = 'playing';
    this.loadRound();
  }

  loadRound() {
    this.isLoading = true;
    this.round = null;
    this.cdr.detectChanges();

    this.pokemonService.getRandomPokemons(4).subscribe({
      next: (pokemons: Pokemon[]) => {
        if (pokemons.length < 4) return;

        // Escolhe o correto aleatoriamente entre os 4
        const correctIndex = Math.floor(Math.random() * 4);

        // Embaralha as opções com Fisher-Yates
        const shuffled = [...pokemons];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        this.round = {
          correct: shuffled[correctIndex],
          options: shuffled,
          selectedId: null,
        };

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  selectAnswer(pokemon: Pokemon) {
    if (!this.round || this.round.selectedId !== null) return;

    this.round.selectedId = pokemon.id;

    if (pokemon.id === this.round.correct.id) {
      this.score++;
      this.state = 'correct';
    } else {
      this.state = 'wrong';
    }

    this.cdr.detectChanges();
  }

  next() {
    this.currentQuestion++;

    if (this.currentQuestion >= this.totalQuestions) {
      this.state = 'finished';
    } else {
      this.state = 'playing';
      this.loadRound();
    }

    this.cdr.detectChanges();
  }

  getOptionClass(pokemon: Pokemon): string {
    if (!this.round || this.round.selectedId === null) {
      return 'border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 cursor-pointer';
    }

    if (pokemon.id === this.round.correct.id) {
      return 'border-green-500 bg-green-50 text-green-800';
    }

    if (pokemon.id === this.round.selectedId) {
      return 'border-red-500 bg-red-50 text-red-800';
    }

    return 'border-gray-200 opacity-50';
  }

  getTypeColor(type: string): string {
    return this.typeColors[type] || '#68A090';
  }

  get scoreMessage(): string {
    const pct = this.score / this.totalQuestions;
    if (pct === 1) return '🏆 Perfeito! Você é um Mestre Pokémon!';
    if (pct >= 0.8) return '🌟 Excelente! Quase perfeito!';
    if (pct >= 0.6) return '👍 Bom trabalho!';
    if (pct >= 0.4) return '😅 Pode melhorar!';
    return '😢 Continue treinando, Treinador!';
  }
}
