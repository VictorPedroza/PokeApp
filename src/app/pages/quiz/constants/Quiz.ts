// constants/Quiz.ts
import { Pokemon } from '../../../shared/consants/pokemon/Pokemon';

export type QuizState = 'playing' | 'correct' | 'wrong' | 'finished';
export type QuizLevel = 1 | 2 | 3;

export interface QuizRound {
  correct: Pokemon;
  options: Pokemon[];
  selectedId: number | null;
  freeAnswer: string;
  blurStep: number;
}

export interface LevelConfig {
  label: string;
  description: string;
  basePoints: number;
  bonusPoints: number;
  hasOptions: boolean;
  hasBlur: boolean;
}

export interface QuizScore {
  total: number;
  perRound: RoundResult[];
}

export interface RoundResult {
  pokemonName: string;
  correct: boolean;
  pointsEarned: number;
  level: QuizLevel;
}

export const TYPE_COLORS: { [key: string]: string } = {
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

export const DEFAULT_TYPE_COLOR = '#68A090';

export const BLUR_STEPS: number[] = [20, 12, 6, 0];

export const MAX_BLUR_HINTS = 2;

export const LEVEL_CONFIGS: Record<QuizLevel, LevelConfig> = {
  1: {
    label: 'Fácil',
    description: 'Imagem normal + 4 alternativas',
    basePoints: 10,
    bonusPoints: 0,
    hasOptions: true,
    hasBlur: false,
  },
  2: {
    label: 'Médio',
    description: 'Imagem embaçada + 4 alternativas',
    basePoints: 20,
    bonusPoints: 5,
    hasOptions: true,
    hasBlur: true,
  },
  3: {
    label: 'Difícil',
    description: 'Imagem normal + resposta livre',
    basePoints: 30,
    bonusPoints: 0,
    hasOptions: false,
    hasBlur: false,
  },
};

export const TOTAL_QUESTIONS = 10;
export const STORAGE_KEY_HIGHSCORE = 'pokemon_quiz_highscore';
export const STORAGE_KEY_SESSION_SCORE = 'pokemon_quiz_session_score';
